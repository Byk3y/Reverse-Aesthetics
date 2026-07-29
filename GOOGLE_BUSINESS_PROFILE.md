# Google Business Profile setup — Reverse Aesthetics

For the client to execute. Two profiles are needed, one per clinic.

## Why this comes first

Search "botox lagos" or "dermatologist abuja" and the map of three businesses sits above every ordinary result. That block is drawn from Google Business Profile, not from the website. A clinic with no profile cannot appear in it at any budget.

The current competition is weak. As of March the first page for "aesthetic clinic lagos" was Instagram profiles, a Fresha booking directory and a TikTok video. "Botox lagos" was topped by a free Wix subdomain. Nobody in this market has built a defensible local presence, so the map pack is winnable.

None of this depends on the new website shipping. Start today.

## One business, two profiles

This is the part people get wrong. A Google Business Profile represents a *location*, not a company. Reverse Aesthetics is one business with two clinics, so it gets two profiles, both managed from the same Google account under one business group.

That isn't duplication and it doesn't risk a suspension. The rule Google enforces is one profile per physical location where staff meet patients face to face. Two clinics, two profiles, correct.

The stakes are concrete. Map results are chosen by proximity to the searcher. A profile pinned in Lekki will not appear for someone searching "aesthetic clinic near me" from Wuse, no matter how strong it gets. Without its own profile, the Abuja clinic is invisible in Abuja — and Abuja is the softer of the two markets, with no standalone clinic websites on page one as of March.

The Lagos profile already exists. For Abuja, search Google Maps from a phone in Abuja first: Google auto-generates listings from third-party data, so one may already be there unclaimed. If it is, use "Claim this business" rather than creating a second one. If it exists with wrong details, claim it first and fix the details after — ownership comes before accuracy.

## Access and ownership

The clinic owns its accounts. Anyone doing the SEO work gets delegated access, never a password. This protects both sides: the clinic can't be held hostage by a contractor, and the contractor isn't holding credentials to a medical business's Google identity.

Business Profile: the clinic keeps Primary Owner. Add contractors as **Manager** — enough to edit details, post, reply to reviews and upload photos, not enough to delete the profile or hand it to someone else. Path: profile → Menu → Business Profile settings → People and access → Add.

Analytics: the property must be created inside the clinic's own Google account. GA4 data cannot be moved between accounts, so a property created under a contractor's login strands every visitor and conversion there permanently. Contractors go in as Administrator under Property access management.

Search Console: verified with the contractor's account, by DNS TXT record. This is the deliberate exception. DNS verification can't lock the clinic out — whoever controls the domain can re-verify at any time and immediately sees the full history, because the data belongs to the domain rather than the account. It also puts Google's alerts about indexing failures and manual actions in front of the person able to act on them. Add the clinic's account as an Owner alongside.

A related piece of housekeeping: settle on one Google account as the clinic's canonical identity and move everything under it. Right now Cal.com and the site database sit under one address and the published contact email is another.

## Profile 1 — Lagos

| Field | Value |
|---|---|
| Business name | `Reverse Aesthetics` |
| Address | `Historia Mews, No. 5 Ayo Babatunde Crescent, Oniru, Lekki, Lagos` |
| Phone | `+234 915 918 8094` |
| Website | `https://reverseaesthetic.com/locations/lagos` |
| Hours | Mon–Sat 09:00–19:00, Sunday closed |

## Profile 2 — Abuja

| Field | Value |
|---|---|
| Business name | `Reverse Aesthetics` |
| Address | `4 Adamu Mathew Street, near Royal Specialist Hospital, Mabushi, Abuja 900108` |
| Phone | `+234 901 020 3696` |
| Website | `https://reverseaesthetic.com/locations/abuja` |
| Hours | Mon–Sat 09:00–19:00, Sunday closed |

Point each profile at its own location page, not at the homepage. Someone who clicks through from the Abuja map listing should land on the Abuja page, and Google reads the match between the listing's address and the page's address as a consistency signal.

Two notes on these values. The business name is `Reverse Aesthetics` and nothing else — see the suspension risks below. And both clinics currently share one phone number, which is allowed but weak; a separate line per clinic is a stronger signal that these are genuinely two locations, and it lets you tell which clinic a call came from.

## Categories

The primary category does more for local ranking than any other field. Everything else is secondary.

Primary, both profiles: **Medical spa**

Secondary, both profiles:

- Skin care clinic
- Hair transplant clinic
- Weight loss service
- Teeth whitening service
- Wellness center

Do not select "Dermatologist". Dr. Abana is a GMC-registered aesthetic medical physician, which is not the same specialty, and the category implies a credential the clinic doesn't hold. It would rank well for "dermatologist abuja" and it is exactly the kind of claim that got the old website into trouble.

## Services

Add each as a service item with a two-line description. These feed the "botox near me" style queries where Google matches the search term against service names, and they show up as browsable list on the profile.

Use the same wording as the booking form so a patient sees one consistent vocabulary:

- Aesthetics & Dermatology
- Dermal Fillers
- Facial Profile Balancing
- Glass Skin Facial
- Bumps Treatment
- Hair Restoration
- Weight Loss
- Dental Aesthetics

Add these too, since they have dedicated pages on the site and are searched by name:

- HIFU Skin Tightening
- Laser Skin Resurfacing
- Acne Scar Treatment
- IV Glow Therapy
- Hair Transplant

Where a service has a page on the site, link it from the service description.

## Photos

Photo count correlates with how often a profile gets clicked, and Google uses the exterior shot during verification.

- Exterior, showing the building and any signage, shot in daylight. Take one for each clinic. This is the photo that answers "will I find this place", and it's the one verification wants.
- Reception and waiting area.
- Each treatment room.
- Equipment, particularly the laser and HIFU machines.
- Dr. Abana and the team, in clinic, not stock portraits.
- Logo and a cover image.

Aim for fifteen or more per profile at launch, then add a few monthly. Skip before-and-after patient images here; Google's policies on medical imagery are inconsistently enforced and a removal can drag the whole profile into review. Those belong on the website's gallery.

Ignore any advice about geotagging photos. Google strips EXIF data on upload. It does nothing.

## Verification

Nigeria is usually video verification now. A recording that shows the street and signage, the entrance, the interior, and then proof you control the business — a utility bill, CAC documents, or branded equipment. Have the paperwork ready before starting, because the recording is one continuous take and a failed attempt costs days.

Verify Lagos first. Once one location is verified, the second is often faster.

## Reviews

This is the difference between the two clinics and everyone else on the map, and it's the part nobody sustains.

Get the review short link from the profile dashboard under "Ask for reviews". It looks like `g.page/r/...`. Save both links.

The flow that works: ask at discharge, while the patient is still in the room and pleased with the result, then send the link by WhatsApp the same afternoon. Asking a week later by email gets almost nothing. Since bookings already run through Cal.com, the practical hook is a message after the appointment ends.

Reply to every review, positive or negative, within a couple of days. Replies are public and prospective patients read them more closely than the reviews. For a negative review, respond once, factually, and move the detail to a private channel. Never mention a patient's treatment in a reply — confirming publicly that a named person had a procedure is a data breach under the NDPA regardless of what they posted themselves.

Never offer a discount or anything else for a review. It violates Google's policy, the reviews get stripped when detected, and it puts the profile at risk.

A realistic target is two to three genuine reviews a week per clinic. That beats any competitor in this market inside three months.

## What gets a profile suspended

Reinstatement takes weeks and sometimes fails, so treat these as hard rules.

- Keyword stuffing the business name. `Reverse Aesthetics | Best Botox Clinic Lagos` is the single most common cause of suspension.
- A registered office, a co-working desk, or any address without staff physically present during stated hours.
- Hours on the profile that don't match reality or the website.
- Buying or incentivising reviews.
- Categories claiming credentials the practice doesn't hold.

## Weekly upkeep

Fifteen minutes.

- Reply to new reviews.
- Post once. Treatment explainers and clinic news both work; the post itself matters less than the profile staying active.
- Answer anything new in the Q&A section. Seed it yourself with the questions patients actually ask at reception, then answer them from the business account.
- Check the insights panel for the search terms people used to find the profile. Those terms are the most reliable keyword research available for this market, better than any tool, because they're the clinic's own patients.

## Open questions for the client

These need answers before the profiles go live.

1. Does a listing already exist for either address, claimed or unclaimed?
2. Can Abuja get its own phone line?
3. Exact map pin for each clinic. Once the profiles are verified, send the coordinates so the website's structured data matches. The Abuja coordinates were deliberately left blank rather than guessed, since a wrong pin on a medical listing sends patients to the wrong building.
4. Confirm hours are Mon–Sat 09:00–19:00, so the profiles and the site agree.
