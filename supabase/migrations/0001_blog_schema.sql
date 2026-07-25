-- ============================================================
-- Reverse Aesthetics — Blog schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)
-- ============================================================

-- ------------------------------------------------------------
-- Helper: is the current request an authenticated admin?
-- ------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  full_name  text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- ------------------------------------------------------------
-- Authors (post byline + "medically reviewed by")
-- ------------------------------------------------------------
create table if not exists public.authors (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  role        text,                       -- "Founder & Aesthetic Medical Physician"
  credentials text,                       -- "MBBS · GMC (UK) Registered"
  bio         text,
  avatar_url  text,
  same_as     jsonb not null default '[]'::jsonb,  -- profile URLs for schema.org sameAs
  created_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Categories (mirror the five clinics)
-- ------------------------------------------------------------
create table if not exists public.categories (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  description  text,
  clinic_href  text,                      -- matching treatment/clinic page for the inline CTA
  cta_label    text,                      -- "Book a skin consultation"
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Posts
-- ------------------------------------------------------------
create table if not exists public.posts (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  excerpt          text,

  body             jsonb,                 -- Tiptap document JSON (source of truth for editing)
  body_html        text,                  -- rendered HTML (what the public page renders)

  cover_image_url  text,
  cover_image_alt  text,

  category_id      uuid references public.categories (id) on delete set null,
  author_id        uuid references public.authors (id) on delete set null,
  reviewer_id      uuid references public.authors (id) on delete set null,

  status           text not null default 'draft'
                     check (status in ('draft', 'scheduled', 'published')),
  published_at     timestamptz,
  featured         boolean not null default false,
  reading_minutes  integer not null default 1,

  key_takeaways    jsonb not null default '[]'::jsonb,  -- string[]
  faqs             jsonb not null default '[]'::jsonb,  -- { question, answer }[]

  seo_title        text,
  seo_description  text,
  og_image_url     text,

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- A post is publicly visible only when published AND its publish time has arrived.
create index if not exists posts_live_idx
  on public.posts (published_at desc)
  where status = 'published';

create index if not exists posts_category_idx on public.posts (category_id);
create index if not exists posts_status_idx   on public.posts (status);

-- Full-text search over title + excerpt for the admin list and public search.
create index if not exists posts_search_idx on public.posts
  using gin (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(excerpt, '')));

-- ------------------------------------------------------------
-- Tags (many-to-many)
-- ------------------------------------------------------------
create table if not exists public.tags (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  name       text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.post_tags (
  post_id uuid not null references public.posts (id) on delete cascade,
  tag_id  uuid not null references public.tags  (id) on delete cascade,
  primary key (post_id, tag_id)
);

create index if not exists post_tags_tag_idx on public.post_tags (tag_id);

-- ------------------------------------------------------------
-- updated_at trigger
-- ------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_touch_updated_at on public.posts;
create trigger posts_touch_updated_at
  before update on public.posts
  for each row execute function public.touch_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.posts       enable row level security;
alter table public.categories  enable row level security;
alter table public.authors     enable row level security;
alter table public.tags        enable row level security;
alter table public.post_tags   enable row level security;
alter table public.admin_users enable row level security;

-- ---- Public read -------------------------------------------------
-- Anonymous visitors see live posts only. Drafts and future-dated
-- scheduled posts stay invisible even if someone guesses the slug.
drop policy if exists "public reads live posts" on public.posts;
create policy "public reads live posts" on public.posts
  for select to anon, authenticated
  using (
    (status = 'published' and published_at is not null and published_at <= now())
    or public.is_admin()
  );

drop policy if exists "public reads categories" on public.categories;
create policy "public reads categories" on public.categories
  for select to anon, authenticated using (true);

drop policy if exists "public reads authors" on public.authors;
create policy "public reads authors" on public.authors
  for select to anon, authenticated using (true);

drop policy if exists "public reads tags" on public.tags;
create policy "public reads tags" on public.tags
  for select to anon, authenticated using (true);

drop policy if exists "public reads post_tags" on public.post_tags;
create policy "public reads post_tags" on public.post_tags
  for select to anon, authenticated using (true);

-- ---- Admin write -------------------------------------------------
drop policy if exists "admins write posts" on public.posts;
create policy "admins write posts" on public.posts
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins write categories" on public.categories;
create policy "admins write categories" on public.categories
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins write authors" on public.authors;
create policy "admins write authors" on public.authors
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins write tags" on public.tags;
create policy "admins write tags" on public.tags
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins write post_tags" on public.post_tags;
create policy "admins write post_tags" on public.post_tags
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Admins can see the admin roster (so the UI can show who has access),
-- but rows are only ever added from the Supabase dashboard or via the
-- service-role key — never from the browser.
drop policy if exists "admins read roster" on public.admin_users;
create policy "admins read roster" on public.admin_users
  for select to authenticated using (public.is_admin());

-- ============================================================
-- Storage — blog media bucket
-- ============================================================
insert into storage.buckets (id, name, public)
values ('blog-media', 'blog-media', true)
on conflict (id) do nothing;

drop policy if exists "public reads blog media" on storage.objects;
create policy "public reads blog media" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'blog-media');

drop policy if exists "admins upload blog media" on storage.objects;
create policy "admins upload blog media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'blog-media' and public.is_admin());

drop policy if exists "admins update blog media" on storage.objects;
create policy "admins update blog media" on storage.objects
  for update to authenticated
  using (bucket_id = 'blog-media' and public.is_admin());

drop policy if exists "admins delete blog media" on storage.objects;
create policy "admins delete blog media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'blog-media' and public.is_admin());

-- ============================================================
-- Seed — categories mirroring the five clinics, plus the founding author
-- ============================================================
insert into public.categories (slug, name, description, clinic_href, cta_label, sort_order) values
  ('skincare-dermatology', 'Skincare & Dermatology',
   'Skin health, acne, pigmentation, and clinical facials from our dermatology team.',
   '/clinics/aesthetics', 'Book a skin consultation', 1),
  ('injectables-anti-ageing', 'Injectables & Anti-Ageing',
   'Botox, dermal fillers, threads, and non-surgical lifting explained by our physicians.',
   '/treatments/botox-and-dermal-fillers-lagos', 'Book an injectables consultation', 2),
  ('weight-loss', 'Weight Loss',
   'Medical weight management, body contouring, and metabolic health.',
   '/clinics/weightloss', 'Book a weight loss consultation', 3),
  ('hair-restoration', 'Hair Restoration',
   'Hair loss causes, transplant options, and non-surgical regrowth therapies.',
   '/clinics/hair', 'Book a hair consultation', 4),
  ('dental-aesthetics', 'Dental Aesthetics',
   'Veneers, whitening, alignment, and everything behind a natural smile.',
   '/clinics/dental', 'Book a dental consultation', 5),
  ('wellness', 'Wellness',
   'IV therapy, nutrition, sleep, and the internal health behind external results.',
   '/clinics/wellness', 'Book a wellness consultation', 6)
on conflict (slug) do nothing;

insert into public.authors (slug, name, role, credentials, bio, same_as) values
  ('dr-ral-abana', 'Dr. Ral Abana',
   'Founder & Aesthetic Medical Physician',
   'GMC (UK) Registered · Award-winning in Aesthetic Medicine',
   'Dr. Ral Abana founded Reverse Aesthetics to raise the standard of aesthetic medicine in Africa. Nearly a decade of specialty experience and GMC (UK) registration underpin an ethics-first, results-driven philosophy — enhancing proportion and balance so results always look natural.',
   '[]'::jsonb)
on conflict (slug) do nothing;
