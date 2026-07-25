-- ============================================================
-- Close the anon-key data leak on the three pre-existing tables.
--
-- These predate the blog and belong to Reverse Chat (~/reverse chat frontend)
-- and an n8n automation. All three had row level security switched off, so the
-- anon key — which ships in the browser bundle of both apps — granted full
-- read and write access to 2,862 patient conversations, 2,326 chat history
-- rows, and the price list quoted to patients over WhatsApp.
--
-- Reverse Chat's login was a shared password compared in a route handler,
-- which set a cookie Postgres never saw. It protected the UI, not the data:
-- anyone who pulled the anon key out of the JS bundle could read every
-- conversation straight from the REST API without visiting the login page.
--
-- Reverse Chat now signs in with Google against this same project and is
-- gated on `admin_users`, so `is_admin()` is a real check for it too.
--
-- n8n connects over direct Postgres, which bypasses RLS, so the automation is
-- unaffected. Confirmed against 24h of API logs: the only REST traffic to
-- these tables was our own verification probes.
-- ============================================================

-- ---- n8n_chat_histories: nothing in any browser reads this ----
-- RLS with no policies denies anon and authenticated outright.
alter table public.n8n_chat_histories enable row level security;

-- ---- messages: patient PII, staff only ------------------------
alter table public.messages enable row level security;

drop policy if exists "admins use messages" on public.messages;
create policy "admins use messages" on public.messages
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---- services_pricing -----------------------------------------
-- Reads stay open: these prices are published on the website anyway, and
-- leaving them readable avoids breaking any server-side consumer not
-- accounted for. Writes are the real exposure — these figures are quoted to
-- patients, and anyone with the anon key could rewrite them.
alter table public.services_pricing enable row level security;

drop policy if exists "anyone reads pricing" on public.services_pricing;
create policy "anyone reads pricing" on public.services_pricing
  for select to anon, authenticated using (true);

drop policy if exists "admins write pricing" on public.services_pricing;
create policy "admins write pricing" on public.services_pricing
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
