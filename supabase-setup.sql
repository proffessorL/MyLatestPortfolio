-- ============================================================
-- EUSHA.dev — Dynamic Project Stats (views + likes)
-- Run this once in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

create table if not exists public.project_stats (
  project_id text primary key,
  view_count integer not null default 0,
  star_count integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.project_stats enable row level security;

-- Anyone can read the counters
drop policy if exists "public can read project stats" on public.project_stats;
create policy "public can read project stats"
  on public.project_stats for select
  using (true);

-- Atomic, race-safe increments (no direct insert/update access needed)
create or replace function public.increment_project_view(p_project_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.project_stats (project_id, view_count, star_count)
  values (p_project_id, 1, 0)
  on conflict (project_id)
  do update set
    view_count = public.project_stats.view_count + 1,
    updated_at = now();
end;
$$;

create or replace function public.set_project_star(p_project_id text, p_starred boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.project_stats (project_id, view_count, star_count)
  values (p_project_id, 0, case when p_starred then 1 else 0 end)
  on conflict (project_id)
  do update set
    star_count = greatest(public.project_stats.star_count + case when p_starred then 1 else -1 end, 0),
    updated_at = now();
end;
$$;

-- Allow anonymous (public) visitors to call the counters
grant execute on function public.increment_project_view(text) to anon, authenticated;
grant execute on function public.set_project_star(text, boolean) to anon, authenticated;
