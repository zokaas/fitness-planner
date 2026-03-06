import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project values
// Found in: Supabase Dashboard → Project Settings → API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Sign in anonymously — creates a persistent user per device
export async function ensureAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) return session.user

  const { data, error } = await supabase.auth.signInAnonymously()
  if (error) throw error
  return data.user
}
