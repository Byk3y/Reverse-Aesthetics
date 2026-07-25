# Blog + Admin Setup

The blog is backed by Supabase. Posts are written in `/admin`, stored in Postgres,
and rendered as static pages that revalidate every 5 minutes (plus immediately
on publish).

Nothing below needs a code change — it's all configuration.

---

## 1. Run the schema

In the Supabase dashboard → **SQL Editor** → **New query**, paste the whole of:

```
supabase/migrations/0001_blog_schema.sql
```

and run it. This creates:

| Table | Purpose |
| --- | --- |
| `posts` | Articles — body, SEO fields, takeaways, FAQs, status, schedule |
| `categories` | Seeded with the six clinic topics |
| `authors` | Bylines and "medically reviewed by" — seeded with Dr. Ral Abana |
| `tags` / `post_tags` | Free-form topics per post |
| `admin_users` | Who may sign in to `/admin` |

It also enables row level security, adds the policies, and creates a public
`blog-media` storage bucket for image uploads.

**What RLS enforces:** anonymous visitors can read a post only when
`status = 'published'` *and* `published_at <= now()`. Drafts and future-dated
scheduled posts are invisible even to someone who guesses the URL. All writes
require a row in `admin_users`.

---

## 2. Add the environment variables

Copy the example file and fill it in from **Project Settings → API**:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

Restart the dev server afterwards — Next only reads env files at boot.

> The service-role key is deliberately unused. Every write goes through the
> signed-in admin's session so RLS stays in force.

For production, add the same two variables in your host's environment settings
(Vercel → Project → Settings → Environment Variables).

---

## 3. Create the first admin

Supabase Auth has no public signup here — accounts are created by you.

**a. Create the user.** Dashboard → **Authentication** → **Users** →
**Add user** → *Create new user*. Set an email and password, and tick
**Auto Confirm User** so they can sign in straight away.

**b. Put them on the roster.** SQL Editor:

```sql
insert into admin_users (user_id, email, full_name)
select id, email, 'Full Name Here'
from auth.users
where email = 'them@reverseaesthetic.com';
```

Repeat for each person who should be able to publish. To revoke access, delete
their `admin_users` row — the login still works but the admin refuses them, and
RLS blocks every write.

Then sign in at **`/admin/login`**.

---

## 4. Writing a post

`/admin` → **New post**.

- **Title** auto-fills the URL slug; edit the slug if you want, but don't change
  it after publishing (it breaks existing links).
- **Excerpt** is what shows on cards and in Google results.
- **Body** is a rich text editor. Use **Heading 2** for each main section — those
  become the article's table of contents automatically.
- **Key takeaways** render in a box above the article. Worth filling in on every
  post: it's the passage ChatGPT, Perplexity, and Google AI Overviews are most
  likely to quote when citing the page.
- **FAQs** publish as FAQ schema, which is what earns the expandable
  question results in Google.
- **Category** drives the in-article booking CTA — a post in *Hair Restoration*
  points at `/clinics/hair`.
- **Medically reviewed by** adds the trust badge and `reviewedBy` schema.

**Status:**
- *Draft* — invisible to everyone but admins.
- *Published* — live immediately (leave the date empty to use "now").
- *Scheduled* — set a future date; it appears by itself when that time passes.

Publishing revalidates `/blog`, the post URL, its category page, the RSS feed,
and the sitemap.

---

## 5. What the reader gets

- `/blog` — featured post, category filter, paginated grid
- `/blog/[slug]` — article with TOC, reading progress, key takeaways, author
  card, FAQs, booking CTA, related posts
- `/blog/category/[slug]` — topic hubs
- `/blog/feed.xml` — RSS
- `Article` + `MedicalWebPage` + `FAQPage` + `BreadcrumbList` structured data on
  every post, and posts auto-register in `sitemap.xml`

---

## Troubleshooting

**"Supabase isn't connected yet"** — env vars missing or the dev server wasn't
restarted after adding them.

**"This account doesn't have blog access"** — the user exists in Auth but has no
`admin_users` row. The page shows the exact SQL to fix it.

**Uploads fail with a row-level security error** — same cause: the signed-in
user isn't on the roster.

**A published post doesn't appear** — check `published_at` isn't in the future,
and that status is *published* rather than *scheduled*.

**Images don't load** — `next.config.ts` allows `*.supabase.co` under
`/storage/v1/object/public/**`. If you moved the bucket or use a custom domain
for storage, add that hostname there.
