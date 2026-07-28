-- MENU TREE menus table schema.
-- Run this in the Supabase SQL Editor after recreating the table.

create table if not exists public.menus (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null check (category in ('한식', '아시아식', '양식')),
  price_from integer not null check (price_from >= 0),
  price_to integer not null check (price_to >= price_from),
  weight text not null check (weight in ('heavy', 'light', 'adventurous')),
  temperature text not null check (temperature in ('hot', 'mild', 'cold')),
  spicy_level text not null check (spicy_level in ('none', 'medium', 'high')),
  meal_time text not null check (meal_time in ('lunch', 'dinner', 'late')),
  company text[] not null check (
    cardinality(company) > 0
    and company <@ array['solo', 'pair', 'group']::text[]
  ),
  main_ingredient text not null check (main_ingredient in ('meat', 'seafood', 'vegetable')),
  meal_format text not null check (meal_format in ('one_dish', 'share', 'handheld')),
  description text not null,
  created_at timestamptz not null default now()
);

alter table public.menus enable row level security;

drop policy if exists "Anyone can read menus" on public.menus;
create policy "Anyone can read menus"
on public.menus
for select
to anon, authenticated
using (true);
