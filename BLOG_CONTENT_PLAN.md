# Blog content plan — Reverse Aesthetics

A brief for whoever writes the posts. Read this before writing anything, then read `BLOG_SETUP.md` for the publishing mechanics.

## Why the blog is the lever

Search results in this market are unusually soft. Checked July 2026:

- "botox lagos" — top result is a free Wix subdomain. A competitor, `skintisfaction.com`, holds a position with an educational post titled "Botox vs Fillers in Nigeria".
- "how much does botox cost in lagos" — owned by a 2020 health blog and directories like VisCorner and AfricaInfoline. No clinic ranks.
- "keloid treatment nigeria" — directories, a US clinic, and one Abuja practice ranking off a single blog post.
- "dermatologist abuja" — no standalone clinic website on page one at all.

The pattern is consistent: clinics that publish real educational content rank, and almost nobody does. That's the whole opportunity. It won't stay open.

The clinic already has treatment pages for the commercial queries. The blog's job is different — capture people earlier, when they're researching rather than buying, and route them to the treatment page that closes.

## Non-negotiables

Break any of these and the post does more damage than not existing. This is a medical business; the previous website was taken apart for exactly these mistakes.

**Never claim credentials the clinic doesn't hold.** Dr. Ral Abana is an aesthetic medical physician registered with the GMC (UK). She is not a dermatologist and the clinic does not employ dermatologists. Do not write "our dermatologists", "certified dermatologists", or "skin doctors". "Our doctors", "our medical team" and "doctor-led" are all accurate. Never invent a team member, a qualification, or a years-of-experience figure.

**Never invent statistics or studies.** No "studies show", no "research suggests", no percentages you can't source. If you cite something, link it and check the link resolves. An unsourced number in health content is worse than no number.

**Never describe a procedure the clinic doesn't perform.** The old site advertised rhinoplasty, breast lifts and liposuction because nobody read the theme's demo content. Check the `services_pricing` table and the `/clinics` pages for what's actually offered. Writing about a treatment they don't do generates enquiries they have to turn away.

**Prices come from the database, never from your head.** The `services_pricing` table has 67 active services with real figures. Quote them as ranges, state the date, and add that a consultation confirms the final figure. Naira prices move; a post claiming a fixed price becomes wrong within months. Five rows currently have malformed `price_text` (missing the ₦, no separators) — fix the row rather than publishing it as-is.

**No outcome guarantees.** "Results vary" is not a disclaimer to bury, it's the truth. No "guaranteed", no "permanent" unless it genuinely is, no before/after claims without a real documented case and the patient's written consent.

**Never diagnose.** Posts explain what a condition is and what options exist. They end at "book a consultation", not at "you should have X".

## What makes a post work here

Write for someone typing a worried question into a phone at midnight, not for a search engine.

Answer the title question in the first two sentences. Google pulls featured snippets from direct answers, and AI assistants quote passages that stand alone. A post that spends three paragraphs warming up gets skipped by both.

Use the question as an H2 where it's natural, because that's what people search. Keep paragraphs to two or three sentences. Sub-1,000 words is usually too thin to rank for anything competitive; 1,200–1,800 is the working range.

Every post links to at least one treatment page, in the body where it's relevant rather than only at the end. That internal link is what passes authority from the post to the page that has to rank commercially.

Ground it in Nigeria. Most aesthetics content online is written for white skin in temperate climates. Harmattan, humidity, Fitzpatrick V–VI skin types, and Naira prices are all things no US blog will cover, and they're the reason a Lagos reader trusts you over a better-funded American site.

Prose follows the `no-slop` skill. No "in today's world", no three-item rhetorical lists, no promotional adjectives.

## Topic queue

Ordered by commercial value against how weak the current results are. `Botox in Lagos: what it costs and what to expect` is already published — use it as the model for the price posts.

### Price and cost queries

Highest intent. Someone searching a price is close to booking, and no clinic currently owns these.

1. **Hair transplant cost in Nigeria — what you actually pay** → `/treatments/hair-transplant-nigeria`
   Vinci Hair Clinic holds the commercial term with a localised landing page, but the cost question is softer. Cover graft counts, why per-graft pricing varies, what a realistic total looks like, and what the price should include. Category: Hair Restoration.

2. **Dermal filler prices in Lagos, by treatment area** → `/treatments/botox-and-dermal-fillers-lagos`
   Database has ₦350,000–₦750,000 per syringe. Explain why one syringe treats some areas but not others, and why cheap filler is the most common cause of the results people ask to have dissolved. Filler dissolving is itself a priced service — that's a credible, non-salesy hook. Category: Injectables & Anti-Ageing.

3. **What weight loss injections cost in Nigeria** → `/treatments/medical-weight-loss-lagos`
   Semaglutide search volume is enormous and the Nigerian results are thin. Programme price is ₦850,000. Cover what a medically supervised programme includes versus buying pens off Instagram, which is the real competitor here and a genuine safety issue. Category: Weight Loss.

4. **Teeth whitening in Lagos: costs and what actually works** → `/treatments/dental-aesthetics-lagos`
   ₦100,000 in the database. Compare in-clinic whitening against the charcoal and DIY methods that dominate Nigerian social media. Category: Dental Aesthetics.

### Nigeria-specific gaps

The strongest differentiation available. International content doesn't cover these, so a well-written post can rank quickly.

5. **Keloids: why they form and what treatment actually works** → `/treatments/acne-scar-treatment-lagos`
   Keloids are far more common in people of African descent and the current results are directories plus one Abuja clinic. High personal stakes, high search volume, almost no good content. Be careful to describe only treatments the clinic performs. Category: Skincare & Dermatology.

6. **Hyperpigmentation and melasma on dark skin** → `/treatments/laser-skin-resurfacing-lagos`
   Laser settings that are routine on pale skin can cause burns and post-inflammatory hyperpigmentation on Fitzpatrick V–VI. Explaining that difference demonstrates real expertise and is genuinely useful. Category: Skincare & Dermatology.

7. **Skin lightening: what's safe, what isn't, and what medical brightening actually means**
   → `/clinics/aesthetics`
   Handle with care and without moralising. Enormous search demand in Nigeria, and a serious public health issue with hydroquinone and mercury products. The clinic offers brightening drips and targeted brightening, so there's an honest answer to give: what the risks of unregulated products are, and what a supervised alternative involves. Do not shame the reader. Category: Skincare & Dermatology.

8. **Traction alopecia: catching it before it's permanent** → `/treatments/hair-transplant-nigeria`
   Very common among Nigerian women from braids, weaves and tight styling, and reversible if caught early. Almost no local content. Category: Hair Restoration.

9. **Harmattan skincare: what the dry season does to your skin**
   → `/clinics/aesthetics`
   Publish in October so it indexes before the season. Recurring annual traffic, and impossible for non-Nigerian sites to compete on. Category: Skincare & Dermatology.

### Comparison and decision queries

People at the point of choosing between options. They convert well.

10. **Botox or fillers — which one do you actually need?** → `/treatments/botox-and-dermal-fillers-lagos`
    A competitor already ranks with this exact topic, which proves the demand. Beat it on depth and on being specific about Nigerian pricing. Category: Injectables & Anti-Ageing.

11. **HIFU, thread lift or neither: non-surgical lifting compared** → `/treatments/hifu-skin-tightening-nigeria`
    Be honest about what non-surgical lifting can't do. Managing expectations converts better than overselling, and it's the safer claim. Category: Injectables & Anti-Ageing.

12. **Chemical peels or microneedling for acne scars?** → `/treatments/acne-scar-treatment-lagos`
    Both are priced in the database. Category: Skincare & Dermatology.

### Trust

13. **How to tell a safe aesthetic clinic from a dangerous one in Nigeria**
    → `/about`
    The market is full of untrained injectors working out of apartments and Instagram DMs. A clear, factual guide on what to check — qualifications, premises, products, consent, what happens if something goes wrong — is genuinely useful public information, and it happens to describe exactly what a legitimate clinic does. The strongest trust post available and the hardest for a competitor to copy credibly. Category: Wellness.

14. **What happens at your first consultation** → `/booking`
    Removes the main friction for first-timers: not knowing what they're walking into. Category: Wellness.

## Cadence and process

Two posts a week is more than enough. Consistency beats volume, and every post needs a real medical review before it goes live — that review is the difference between content that builds authority and content that creates liability.

Publish through the pipeline in `content/posts/*.mjs`, not by hand. A post stores its body twice and writing only the HTML silently destroys the article the next time someone opens it in the editor. The details are in the project memory and `BLOG_SETUP.md`.

Once Search Console has a few weeks of data, stop guessing. It will show which queries the site already picks up impressions for without ranking, and those are worth more than anything on this list — they're proven demand where you're already close.
