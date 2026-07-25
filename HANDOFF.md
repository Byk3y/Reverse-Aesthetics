# Session handoff — Reverse Aesthetics

Paste everything below the line into the new session.

---

We're mid-project on the **Reverse Aesthetics** clinic site (`~/Reverse-Aesthetics`, Next 16 + Tailwind v4, app router at repo root, alias `@/*` → `./*`, branch `feature/medvi-rebrand`, remote `github.com/Byk3y/Reverse-Aesthetics`). Read `MEMORY.md` and both memory files first — they carry the design-system recipe and the Cal.com contract. Don't re-derive any of it.

**Housekeeping before anything else.** The repo was just moved out of a `~/reverse website/` wrapper folder into `~/Reverse-Aesthetics` — that wrapper is deleted. Because Claude Code reads `.mcp.json` from its working directory, and the old cwd sat *above* the repo, the project's MCP servers never loaded. Now that cwd and repo root are the same, you should have `cal` (Cal.com, 149 tools) and `supabase` available. Confirm the `cal` tools are actually reachable before relying on them — if they aren't, fall back to the Cal.com REST API, which definitely works (details below). Also note there is a **stale clone of this same repo** at `~/Reverse Aesthetics` (with a space), last commit Nov 2025. Never edit it. I'd like it gone, but confirm with me first.

Start the dev server (`npm run dev`) — I usually want it running.

## What the site is

A medical aesthetics clinic in Nigeria. Founder Dr. Ral Abana (GMC UK). **Two open locations** — Lagos (Historia Mews, No. 5 Ayo Babatunde Crescent, Oniru, Lekki) and Abuja (4 Adamu Mathew Street, near Royal Hospital, Behind Capital Hub, Mabushi). Hours Mon–Sat 9–7. Phone/WhatsApp 09159188094. Full approved copy is in `site-copy.md`. Abuja is **open**, not "by appointment" — if you find copy anywhere still saying otherwise, that's a bug.

Two-level information architecture: the homepage spotlights the **5 flagship services**, each deep-linking to its own `/lp/[slug]` Google Ads landing page; `/clinics` holds the full catalogue by category. The `/lp` pages are intentionally nav-less (logo links home) because they're paid-traffic destinations.

## Where we just got to — Cal.com

I finished configuring the **Lagos** Cal.com account. Six event types now exist, all consistent, all verified via the API:

`consultation` (30m, the general catch-all), `dermal-fillers` (30m), `facial-profile-balancing` (30m), `hair-restoration` (30m), `bumps-treatment` (30m), `glass-skin-facials` (**60m**, seats off because it occupies a room for the full hour). The five consultations carry **3 seats** — three different patients can hold the same slot, matching real clinic capacity.

Every event shares schedule "Lagos clinic hours" (id `2130490`, Mon–Sat 09:00–19:00, Africa/Lagos) and has: In-Person location with the Lekki address shown publicly, 4h minimum notice, 15m after-buffer, 60-day rolling window, guests disabled, attendee info **not** shared between seat-mates (patients would otherwise see each other's names and treatment in their calendar invite — health data, NDPA), a required phone field, and a required Select question with identifier `treatment`.

**The one contract that will bite you:** the `treatment` question's options must match `TREATMENTS[].label` in `app/components/booking/bookingData.ts` exactly, character for character — including the em dash in "Not sure — general consultation". Cal silently ignores a Select prefill that doesn't match an option, which would turn a required field into friction on paid traffic. If you ever add a treatment, change both sides together.

**Code side is wired and typechecked.** `BookingClinic` stores `calUser` rather than a full link; `calLinkFor(clinic, slug)` composes `user/slug` and falls back to `GENERAL_CAL_SLUG` for anything without a dedicated event. `CalInline` and `CalPopupButton` pass both `notes` and `treatment` through Cal's embed config. LP slugs in `lpData.ts` are deliberately identical to the Cal slugs, so `/lp/hair-restoration` books `reverse-aesthetics/hair-restoration`. Desktop gets the inline calendar, mobile gets the popup — that split was deliberate and tested, don't collapse it.

**Cal.com REST API**, if you need bulk work: `https://api.cal.com/v2`, header `cal-api-version: 2024-06-14`, Bearer key from Settings → Developer (ask me for it, it's not in the repo). Two traps: Cloudflare returns `403 error code: 1010` for any request without a browser-like `User-Agent` — send `curl/8.7.1`; and PATCHing `bookingFields` replaces the entire array, so always read-modify-write.

## What's still open

1. **Two dead Cal events** — `30min` and `aesthetics-skin-consultation`. I verified both have zero bookings and nothing in the codebase references them. They just need deleting; ask me before you do it.
2. **Reminder workflow** — a 24h-before reminder email hasn't been built. One workflow applied to all six events. This is the biggest lever on no-shows and it's still missing. The "arrive 10 minutes early" instruction and the phone number belong here, deliberately kept out of the event descriptions so they don't give people an escape hatch from booking.
3. **Verify the `treatment` prefill in a real browser** — open `/lp/dermal-fillers` and confirm "Dermal Fillers" arrives pre-selected. It's wired correctly but has never been visually confirmed; I can't check a rendered SPA from a terminal.
4. **Abuja account doesn't exist.** Plan is a second free Cal.com account (`reverse-aesthetics-abuja`) so the two cities can't block each other's calendars. Once I create it and hand you the API key, clone all six events with the Mabushi address, then flip `calReady: true` in `bookingData.ts`. Until then the Abuja tab correctly shows a WhatsApp fallback.
5. **Client-side Cal.com fixes I can't do for them** — they still need to rename the profile from "REVERSE AESTHETICS CALENDER".
6. **Inner-page restyle continues.** About is done. Remaining: `/clinics` and its five sub-pages, `/treatments` (index + ~9), `/contact`, `/locations/*`, gallery, blog. The reusable page recipe is in memory — follow it rather than inventing new section styles.

## How I like to work

Be direct and tell me when I'm wrong — I'd rather hear "that's redundant, here's why" than get agreement. When I ask "is this right?", actually check it rather than affirming; you've caught real misconfigurations that way (a phone field I left optional, guests I left enabled, availability still on Cal's Mon–Fri 9–5 default). Verify with real commands and show me the output; don't tell me something works because it should. Explain the *why* behind a recommendation in a sentence or two, especially where it touches conversion tracking or patient privacy, then get on with it. Keep prose tight — no bullet-point padding, no restating what I just said back to me.

There's one pre-existing `tsc` error in `app/lib/blog/queries.ts` that predates this work and is unrelated — ignore it, don't "fix" it as a side quest.
