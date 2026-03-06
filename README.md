# 🌿 Fitness Planner

Monthly fitness & meal planner with tracking, weight logging, and push notifications.  
Hosted free on **GitHub Pages** · Data stored in **Supabase** · Notifications via **Web Push**.

---

## What you get

- 📅 4-week meal + workout plan (fully swappable)
- ✓ Tap to mark meals and workouts as done
- 📈 Weight progress tracker with chart
- 🔔 Push notifications (meal reminder 8am, workout reminder 3:30pm, weekly summary Sunday 6pm)
- 🏠 Works offline as a PWA (add to home screen)
- 🔒 Data syncs across devices per anonymous user account

---

## Step 1 — Supabase setup (10 min)

### 1a. Create a project
1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New project**, name it `fitness-planner`, choose a region close to Finland (e.g. Frankfurt)
3. Wait ~2 min for it to provision

### 1b. Run the database schema
1. In your Supabase project, go to **SQL Editor**
2. Open the file `supabase/schema.sql` from this repo
3. Paste the entire contents and click **Run**

### 1c. Enable Anonymous auth
1. Go to **Authentication → Providers**
2. Find **Anonymous** and toggle it **on**
3. Click Save

### 1d. Get your API keys
Go to **Project Settings → API** and copy:
- **Project URL** → you'll need this as `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_ANON_KEY`
- **service_role** key → needed for the Edge Function later (keep this secret!)

---

## Step 2 — Generate VAPID keys (2 min)

VAPID keys are what let your server send push notifications to browsers.

```bash
# Install web-push globally (one-time)
npm install -g web-push

# Generate a key pair
web-push generate-vapid-keys
```

You'll get output like:
```
Public Key: BNFj...
Private Key: abc123...
```

Save both — you'll need them in the next steps.

---

## Step 3 — GitHub repository setup (5 min)

### 3a. Create the repo
1. Go to [github.com/new](https://github.com/new)
2. Name it exactly `fitness-planner`
3. Set it to **Public** (required for free GitHub Pages)
4. Don't initialize with README (you already have files)
5. Click **Create repository**

### 3b. Push the code
```bash
# In the fitness-planner folder:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fitness-planner.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3c. Add secrets to GitHub
Go to your repo → **Settings → Secrets and variables → Actions → New repository secret**

Add these 3 secrets:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | Your Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_VAPID_PUBLIC_KEY` | Your VAPID Public Key |

### 3d. Enable GitHub Pages
1. Go to repo → **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Click Save

### 3e. Trigger the first deploy
The workflow runs automatically on every push to `main`.  
Go to **Actions** tab in your repo to watch it build.  
After ~2 min your site will be live at:
```
https://YOUR_USERNAME.github.io/fitness-planner/
```

---

## Step 4 — Deploy the notification Edge Function (10 min)

### 4a. Install Supabase CLI
```bash
npm install -g supabase
supabase login
```

### 4b. Link to your project
```bash
cd fitness-planner
supabase link --project-ref YOUR_PROJECT_REF
```
Your project ref is the string in your Supabase URL: `https://YOUR_PROJECT_REF.supabase.co`

### 4c. Set Edge Function secrets
```bash
supabase secrets set VAPID_SUBJECT="mailto:your@email.com"
supabase secrets set VAPID_PUBLIC_KEY="your-vapid-public-key"
supabase secrets set VAPID_PRIVATE_KEY="your-vapid-private-key"
```
> ⚠️ Use your actual email for VAPID_SUBJECT — it's required by the web push spec.

### 4d. Deploy the function
```bash
supabase functions deploy send-notifications
```

### 4e. Schedule it with pg_cron
In Supabase **SQL Editor**, run:

```sql
-- Enable pg_cron extension (one-time)
create extension if not exists pg_cron;

-- Daily meal reminder at 08:00 Helsinki (= 06:00 UTC in summer, 07:00 UTC in winter)
select cron.schedule(
  'meal-reminder',
  '0 6 * * *',
  $$select net.http_post(
    url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-notifications',
    headers := '{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
  )$$
);

-- Workout reminder at 15:30 Helsinki (= 13:30 UTC summer)
select cron.schedule(
  'workout-reminder',
  '30 13 * * *',
  $$select net.http_post(
    url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-notifications',
    headers := '{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
  )$$
);

-- Weekly summary Sunday at 18:00 Helsinki (= 16:00 UTC summer)
select cron.schedule(
  'weekly-summary',
  '0 16 * * 0',
  $$select net.http_post(
    url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-notifications',
    headers := '{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
  )$$
);
```

Replace `YOUR_PROJECT_REF` and `YOUR_ANON_KEY` with your actual values.

---

## Step 5 — Test notifications

1. Open your app at `https://YOUR_USERNAME.github.io/fitness-planner/`
2. Tap the 🔕 bell icon in the top right
3. Accept the browser notification permission prompt
4. The bell will turn to 🔔

To test immediately (without waiting for the schedule), run this in Supabase SQL Editor:
```sql
select net.http_post(
  url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-notifications',
  headers := '{"Authorization": "Bearer YOUR_ANON_KEY", "x-test-hour": "6"}'::jsonb
);
```

---

## Install as a phone app (PWA)

**iPhone/iPad:**
1. Open the site in Safari
2. Tap the Share button → **Add to Home Screen**
3. It will appear as a full-screen app

**Android:**
1. Open in Chrome
2. Tap the three-dot menu → **Add to Home Screen** or **Install app**

---

## Local development

```bash
# Create a .env.local file:
echo "VITE_SUPABASE_URL=your-url" >> .env.local
echo "VITE_SUPABASE_ANON_KEY=your-key" >> .env.local
echo "VITE_VAPID_PUBLIC_KEY=your-vapid-public-key" >> .env.local

# Install and run:
npm install
npm run dev
```

The app will be at `http://localhost:5173/fitness-planner/`

---

## Updating the plan

To push changes, just commit and push to `main`:
```bash
git add .
git commit -m "Update meals"
git push
```
GitHub Actions deploys automatically in ~2 min.

---

## Troubleshooting

**App shows blank page:**  
Check that `base: '/fitness-planner/'` in `vite.config.js` matches your exact repo name.

**Supabase connection fails:**  
Verify your secrets in GitHub match the values in Supabase → Project Settings → API.

**Notifications not arriving:**  
- Make sure you accepted the permission prompt in the browser
- Check the Supabase Edge Function logs: Dashboard → Edge Functions → send-notifications → Logs
- pg_cron only works on paid Supabase plans — on free tier, trigger manually via the SQL above

**Data not persisting:**  
Check that Anonymous auth is enabled in Supabase → Authentication → Providers.
