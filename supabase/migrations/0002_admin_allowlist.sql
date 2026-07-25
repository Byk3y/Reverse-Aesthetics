-- ============================================================
-- Reverse Aesthetics — admin allowlist
--
-- `admin_users.user_id` is a foreign key to `auth.users`, so a person can
-- only be added to the roster *after* they have signed in once. That makes
-- onboarding a two-step dance: sign in, get refused, ask someone with
-- database access to add you, sign in again.
--
-- This lists the emails that are allowed to become admins ahead of time, and
-- enrols them automatically the first time they sign in with Google.
-- ============================================================

create table if not exists public.admin_allowlist (
  email      text primary key,
  note       text,
  created_at timestamptz not null default now()
);

comment on table public.admin_allowlist is
  'Emails permitted to become admins. Enrolment happens on first sign-in via the trigger on auth.users.';

alter table public.admin_allowlist enable row level security;

-- Never readable from the browser by anonymous visitors: knowing which
-- addresses hold the keys is a head start for anyone phishing them.
drop policy if exists "admins read allowlist" on public.admin_allowlist;
create policy "admins read allowlist" on public.admin_allowlist
  for select to authenticated using (public.is_admin());

drop policy if exists "admins write allowlist" on public.admin_allowlist;
create policy "admins write allowlist" on public.admin_allowlist
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------
-- Enrol on first sign-in
-- ------------------------------------------------------------
create or replace function public.enrol_admin_from_allowlist()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Google hands back a verified address, but be defensive: a provider that
  -- omits the email must not match an allowlist row.
  if new.email is null then
    return new;
  end if;

  if exists (
    select 1 from public.admin_allowlist
    where lower(email) = lower(new.email)
  ) then
    insert into public.admin_users (user_id, email)
    values (new.id, new.email)
    on conflict (user_id) do nothing;
  end if;

  return new;
end;
$$;

-- Fires on first sign-in (insert) *and* on every subsequent one, so someone
-- who signed in before being allowlisted is picked up next time they log in
-- rather than being stranded on the "no access" screen forever.
drop trigger if exists enrol_admin_on_signup on auth.users;
create trigger enrol_admin_on_signup
  after insert or update of last_sign_in_at on auth.users
  for each row execute function public.enrol_admin_from_allowlist();

-- ------------------------------------------------------------
-- Who is allowed in
-- ------------------------------------------------------------
insert into public.admin_allowlist (email, note) values
  ('reverseaestheticscalender@gmail.com', 'Clinic — owns the Supabase and Google Cloud projects'),
  ('reverseaestheticabuja@gmail.com',     'Clinic — Abuja'),
  ('francischukwuma.dev@gmail.com',       'Developer'),
  ('francischukwuma.blog@gmail.com',      'Blog author')
on conflict (email) do nothing;

-- Anyone on the list who already signed in predates the trigger, so catch
-- them up. Idempotent: re-running this changes nothing.
insert into public.admin_users (user_id, email)
select u.id, u.email
from auth.users u
join public.admin_allowlist a on lower(a.email) = lower(u.email)
on conflict (user_id) do nothing;
