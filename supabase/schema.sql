-- ============================================================
-- FITNESS PLANNER — SUPABASE SCHEMA
-- Run this entire file once in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. USER PLAN OVERRIDES
-- Stores any meals/workouts the user has swapped from the default
create table if not exists user_plans (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users not null,
  day_index   integer not null,           -- 0–27 (4 weeks × 7 days)
  meal_type   text,                       -- 'breakfast'|'lunch'|'dinner'|'snack' or NULL for exercise
  item_id     text not null,              -- e.g. 'b1', 'l4', 'd12', 'c1'
  updated_at  timestamptz default now(),
  unique(user_id, day_index, meal_type)
);

-- 2. COMPLETION TRACKING
create table if not exists completions (
  id       uuid primary key default gen_random_uuid(),
  user_id  uuid references auth.users not null,
  date     date not null,
  type     text not null,   -- 'workout' | 'meal_breakfast' | 'meal_lunch' | 'meal_dinner' | 'meal_snack'
  unique(user_id, date, type)
);

-- 3. WEIGHT LOG
create table if not exists weight_log (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users not null,
  date       date not null,
  weight_kg  numeric(5,2) not null,
  unique(user_id, date)
);

-- 4. PUSH NOTIFICATION SUBSCRIPTIONS
create table if not exists push_subscriptions (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references auth.users not null unique,
  subscription      jsonb not null,
  meal_reminder     boolean default true,
  workout_reminder  boolean default true,
  weekly_summary    boolean default true,
  created_at        timestamptz default now()
);

-- ── Row Level Security ──────────────────────────────────────────────────────

alter table user_plans         enable row level security;
alter table completions        enable row level security;
alter table weight_log         enable row level security;
alter table push_subscriptions enable row level security;

-- user_plans: users can only see/edit their own rows
create policy "own plans"    on user_plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own completions" on completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own weight"   on weight_log
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own push sub" on push_subscriptions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Allow service role (edge function) to read all push subscriptions
create policy "service role reads subs" on push_subscriptions
  for select using (auth.role() = 'service_role');

-- ── Enable anonymous sign-in ────────────────────────────────────────────────
-- Go to: Supabase Dashboard → Authentication → Providers → Anonymous → Enable
-- (Cannot be done via SQL, must be done in the dashboard UI)
