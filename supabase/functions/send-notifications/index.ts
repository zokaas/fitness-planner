// supabase/functions/send-notifications/index.ts
// Deployed as a Supabase Edge Function.
// Triggered by pg_cron schedule (set in Supabase dashboard).
//
// Schedule examples:
//   "0 6 * * *"   → 08:00 Helsinki (UTC+2 summer) = daily meal reminder
//   "0 13 * * *"  → 15:30 Helsinki                 = workout reminder
//   "0 16 * * 0"  → 18:00 Helsinki Sunday           = weekly summary

import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL      = Deno.env.get("SUPABASE_URL")!
const SERVICE_ROLE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const VAPID_SUBJECT     = Deno.env.get("VAPID_SUBJECT")!        // e.g. "mailto:you@email.com"
const VAPID_PUBLIC_KEY  = Deno.env.get("VAPID_PUBLIC_KEY")!
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

// ── Determine which notification to send based on current UTC hour ────────
function getNotificationPayload(utcHour: number, dayOfWeek: number) {
  // Meal reminder: 06:00 UTC → 08:00 Helsinki summer
  if (utcHour === 6) return {
    title: "🍳 Good morning!",
    body: "Your breakfast is planned. Check today's meals →",
    tag: "meal-reminder",
    url: "/fitness-planner/#plan",
  }
  // Workout reminder: 13:30 UTC → 15:30 Helsinki
  if (utcHour === 13) return {
    title: "💪 Workout window in 30 min",
    body: "Your workout starts at 16:00. Ready?",
    tag: "workout-reminder",
    url: "/fitness-planner/#plan",
  }
  // Weekly summary: Sunday 16:00 UTC → 18:00 Helsinki
  if (utcHour === 16 && dayOfWeek === 0) return {
    title: "📈 Weekly Summary",
    body: "Check your progress for the week. Keep going!",
    tag: "weekly-summary",
    url: "/fitness-planner/#progress",
  }
  return null
}

// ── VAPID signing (manual, no external lib needed in Deno) ────────────────
async function signVapid(audience: string, subject: string, publicKey: string, privateKey: string): Promise<string> {
  const header = { typ: "JWT", alg: "ES256" }
  const now = Math.floor(Date.now() / 1000)
  const payload = { aud: audience, exp: now + 12 * 3600, sub: subject }

  const encode = (obj: object) => btoa(JSON.stringify(obj)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")
  const unsigned = `${encode(header)}.${encode(payload)}`

  const keyData = Uint8Array.from(atob(privateKey.replace(/-/g,"+").replace(/_/g,"/")), c => c.charCodeAt(0))
  const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name:"ECDSA", namedCurve:"P-256" }, false, ["sign"])
  const sig = await crypto.subtle.sign({ name:"ECDSA", hash:"SHA-256" }, cryptoKey, new TextEncoder().encode(unsigned))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")
  return `${unsigned}.${sigB64}`
}

async function sendPush(subscription: any, payload: object): Promise<boolean> {
  const endpoint: string = subscription.endpoint
  const audience = new URL(endpoint).origin

  const jwt = await signVapid(audience, VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)
  const auth = `vapid t=${jwt},k=${VAPID_PUBLIC_KEY}`

  const body = JSON.stringify(payload)
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": auth,
      "Content-Type": "application/json",
      "TTL": "86400",
    },
    body,
  })
  return res.ok || res.status === 201
}

// ── Main handler ──────────────────────────────────────────────────────────
Deno.serve(async (req) => {
  const now = new Date()
  const utcHour   = now.getUTCHours()
  const dayOfWeek = now.getUTCDay()

  const notif = getNotificationPayload(utcHour, dayOfWeek)
  if (!notif) {
    return new Response(JSON.stringify({ skipped: true, utcHour }), { status: 200 })
  }

  // Fetch all active subscriptions
  const { data: subs, error } = await supabase
    .from("push_subscriptions")
    .select("subscription, meal_reminder, workout_reminder, weekly_summary")

  if (error) return new Response(JSON.stringify({ error }), { status: 500 })

  let sent = 0, failed = 0

  for (const row of (subs || [])) {
    // Respect per-user preferences
    const tag = notif.tag
    if (tag === "meal-reminder"   && !row.meal_reminder)    continue
    if (tag === "workout-reminder"&& !row.workout_reminder) continue
    if (tag === "weekly-summary"  && !row.weekly_summary)   continue

    const ok = await sendPush(row.subscription, notif)
    ok ? sent++ : failed++
  }

  return new Response(JSON.stringify({ sent, failed, notif: notif.title }), {
    headers: { "Content-Type": "application/json" }
  })
})
