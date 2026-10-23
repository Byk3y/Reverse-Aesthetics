-- ============================================================
-- Reverse Aesthetics — allowlist another admin
--
-- Applied directly to the live project on 2026-10-22. Idempotent.
-- ============================================================

insert into public.admin_allowlist (email, note) values
  ('imehjohnlamech16@gmail.com', 'Admin')
on conflict (email) do nothing;

-- They had already signed in once, so the trigger won't fire until their next
-- sign-in. Enrol them now.
insert into public.admin_users (user_id, email)
select u.id, u.email
from auth.users u
where lower(u.email) = 'imehjohnlamech16@gmail.com'
on conflict (user_id) do nothing;
