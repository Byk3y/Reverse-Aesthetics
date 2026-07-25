# Keyword & Competitor Analysis Report

**Date:** March 2026  
**Target Markets:** Lagos & Abuja  
**Objective:** Analyze the current Search Engine Results Pages (SERPs) to understand who Reverse Aesthetics is competing against and what real users are searching for.

---

## 1. Top Keyword Searches & SERP Analysis

I used the Firecrawl engine to perform searches for some of the highest intent keywords potential clients would use. The results were incredibly revealing about the current state of SEO in the Nigerian aesthetics market.

### Keyword 1: `"aesthetic clinic lagos"`
**User Intent:** High. A user looking to book a general aesthetics consultation or treatment in Lagos.

**Top Ranking Competitors:**
1. **Derma Oaks Aesthetics** (Instagram Profile)
2. **The Aesthetic Clinic** (Instagram & Facebook Pages)
3. **Refulgent Skin** (Actual Website)
4. **Xtragleam Aesthetic Clinic** (Fresha Booking Directory)
5. **Perfect Aesthetic Clinic** (TikTok Video)

*Takeaway:* The first page of Google is overwhelmingly dominated by Instagram profiles, TikTok videos, and generic booking directories (Fresha). Very few actual clinic websites are ranking.

### Keyword 2: `"botox lagos"`
**User Intent:** Very High. A user actively looking for a specific treatment and ready to spend.

**Top Ranking Competitors:**
1. **Botox-Lagos** (A very basic free Wix site: `botoxlagos.wixsite.com`)
2. **Phoenix Derma** (A dedicated blog post: "Botox in Lagos: Everything You Need to Know")
3. **HeliumDoc** (Doctor directory)
4. **Various Instagram Reels & Facebook Hashtags**

*Takeaway:* The competition here is astonishingly weak. The #1 rank is a free Wix subdomain website simply because its name matches the keyword. The #2 rank proves my overarching implementation plan right: Phoenix Derma is ranking highly purely because they wrote a comprehensive, educational blog post about the treatment.

### Keyword 3: `"hair transplant lagos"`
**User Intent:** Very High. A high-ticket procedure requiring immense trust.

**Top Ranking Competitors:**
1. **Vinci Hair Clinic Nigeria** (Actual Website - Highly Optimized Landing Page)
2. **MC Turkish Hair Transplant** (Ranks via Instagram tags, LinkedIn profiles, and Indeed job postings)
3. Various Instagram hashtag pages.

*Takeaway:* Vinci Hair Clinic understands SEO. They have a dedicated, localized URL (`/en/vinci-hair-clinic-lagos/`) which captures the #1 spot easily. The rest of the page is filled with scattered social media links. We can easily take the #2 spot by mimicking Vinci's localized landing page architecture.

### Keyword 4: `"dermatologist abuja"`
**User Intent:** High. Looking for medical skin expertise in the capital.

**Top Ranking Competitors:**
1. **HeliumDoc** (Medical Directory)
2. **Skin Doctor Chito** (Instagram Profile)
3. **DermaRx Aesthetics** (Instagram / Facebook)
4. TikTok discovery pages.

*Takeaway:* Abuja's aesthetic SEO is almost non-existent. There are basically no standalone clinic websites ranking on the first page; it is entirely captured by aggregator directories and Instagram profiles.

---

## 2. The Golden Opportunity

Based on these findings, we have a **massive, undeniable SEO opportunity**. 

1. **Google prefers real websites over social media algorithms.** Right now, Google is forced to rank Instagram and TikTok pages because local clinics simply do not have well-built websites. 
2. A fast, modern Next.js website (like Reverse Aesthetics) that has proper XML sitemaps, structured data (Schema markup), and fast load times will inherently push social media pages down the search rankings.
3. **Content is King:** The fact that *Phoenix Derma* ranks #2 for "Botox Lagos" solely because of one blog post, and *Vinci Hair Clinic* ranks #1 because of a specific `/lagos` landing page, proves exactly what we need to build.

## 3. Actionable Next Steps

To dominate these keywords based on what people are actually searching for, we must:

1. **Build Dedicated Treatment Pages:** (e.g., `/treatments/botox-lagos`, `/treatments/dermal-fillers-abuja`). We shouldn't just list services on the homepage. They need their own URLs, just like Vinci Hair Clinic did.
2. **Build Location Hubs:** Create `/clinics/lagos` and `/clinics/abuja`. We need to target "aesthetic clinic lagos" and "dermatologist abuja" explicitly on these pages.
3. **Launch the Knowledge Hub (Blog):** Replicate Phoenix Derma's success. Write comprehensive guides ("Cost of Botox in Nigeria", "Things to know before a hair transplant in Lagos") and store them in the Supabase backend.
4. **Outrank the Wix Sites:** The fact that a `.wixsite.com` address is ranking #1 means the competition is sleeping. We will crush them with Next.js Core Web Vitals and Semantic HTML.
