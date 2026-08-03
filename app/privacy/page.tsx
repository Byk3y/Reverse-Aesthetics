import type { Metadata } from "next";
import Link from "next/link";
import ClinicNavbar from "../components/home/ClinicNavbar";
import { Breadcrumbs } from "../components/home/Breadcrumbs";
import ScrollMotion from "../components/home/ScrollMotion";
import { SiteFooter } from "../components/home/SiteFooter";
import FloatingWhatsApp from "../components/home/FloatingWhatsApp";
import { EMAIL, LOCATIONS, PHONE_DISPLAY, PHONE_TEL } from "../components/home/homeData";

export const metadata: Metadata = {
  title: "Privacy Policy | Reverse Aesthetics",
  description:
    "What Reverse Aesthetics collects when you enquire or book, why we hold it, who else can see it, and how to have it corrected or deleted.",
  alternates: { canonical: "/privacy" },
};

/**
 * The clinic's privacy notice.
 *
 * Hand-edited, deliberately: it has to describe what this codebase actually
 * does, so it can't be a generic template. Anything that changes what leaves
 * the site changes this page too. The three that matter:
 *   - app/intake/actions.ts       — the fields the enquiry form writes
 *   - app/api/cal/webhook/route.ts — what Cal.com hands us per booking
 *   - app/components/Analytics.tsx — silent today; the cookies section below
 *     says the site carries no analytics tag, which stops being true the
 *     moment NEXT_PUBLIC_GA_ID or NEXT_PUBLIC_GTM_ID is set in Vercel.
 *
 * `LAST_UPDATED` is typed by hand rather than generated. It records when the
 * wording last changed, which is not the same as when the page was built.
 */
const LAST_UPDATED = "2 August 2026";

export default function PrivacyPage() {
  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-clinic-hero-top)]">
        <Breadcrumbs items={[{ label: "Privacy policy" }]} />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Your Information
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Privacy{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">policy</span>
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            What we collect when you contact us or book, why we hold it, who
            else can see it, and how to have it removed.
          </p>
          <p className="hero-copy-reveal [animation-delay:340ms] mt-[22px] text-[13px] font-semibold uppercase tracking-[0.12em] text-[#8a857f]">
            Last updated {LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        <section className="bg-white py-[60px] md:py-[86px]">
          <div className="mx-auto max-w-[760px] px-[20px] md:px-[40px]">
            <div className="article-body">
              <p>
                This page explains how Reverse Aesthetics handles personal
                information collected through this website. It is written to
                match what the site actually does, so it is short and specific
                rather than general. If anything here is unclear, ask us and we
                will answer plainly.
              </p>

              <h2>Who is responsible for your information</h2>
              <p>
                Reverse Aesthetics is the data controller. We operate two
                clinics:
              </p>
              <ul>
                {LOCATIONS.map((location) => (
                  <li key={location.city}>
                    <strong>{location.city}</strong> — {location.address}.
                    Telephone {location.phoneDisplay}.
                  </li>
                ))}
              </ul>
              <p>
                For anything about your information, email{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{" "}
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>. We handle
                personal data under the Nigeria Data Protection Act 2023.
              </p>

              <h2>What we collect</h2>

              <h3>When you send us your details</h3>
              <p>
                Our enquiry form asks for your name and a phone number, and
                optionally your email address, which of the two clinics is
                easier for you, which treatments you are interested in, and
                anything else you want us to know. There is a tick box asking
                whether we may contact you about treatments and offers. We also
                record which page you filled the form in from, and, if a member
                of staff sent you the link, which one.
              </p>

              <h3>When you book an appointment</h3>
              <p>
                Bookings run through Cal.com. It collects your name, email
                address, phone number and the treatment you are booking, then
                sends that to us so the appointment appears in the clinic&apos;s
                own records. Your appointment time and the treatment you chose
                are stored alongside your contact details.
              </p>

              <h3>When you become a patient</h3>
              <p>
                Your clinical records — consultation notes, consent forms,
                medical history and any photographs taken as part of your
                treatment — are held by the clinic under our duties as a medical
                provider. They are separate from the website and are never
                published or used for marketing.
              </p>

              <h3>When you are only reading the site</h3>
              <p>
                Reading these pages, including the blog, requires nothing from
                you. Our servers briefly record the IP address of anyone
                submitting the enquiry form, which is what stops the form being
                flooded with automated submissions. That is discarded shortly
                afterwards and is not tied to your enquiry.
              </p>

              <h2>Why we hold it</h2>
              <ul>
                <li>
                  <strong>To answer you and arrange your care.</strong> If you
                  ask us a question or request an appointment, we need your
                  details to reply and to see you.
                </li>
                <li>
                  <strong>Because you told us.</strong> Which treatments you are
                  interested in says something about your health, so we treat it
                  as sensitive. We hold it because you chose to tell us, and you
                  can ask us to erase it at any point.
                </li>
                <li>
                  <strong>To send you offers, if you ticked the box.</strong>{" "}
                  Marketing rests on your consent and nothing else. Untick it,
                  or tell us later, and it stops.
                </li>
                <li>
                  <strong>To keep the records we are required to keep.</strong>{" "}
                  As a medical provider we have record-keeping obligations that
                  apply to patients we have treated.
                </li>
              </ul>

              <h2>Who else can see it</h2>
              <p>
                We use a small number of outside companies to run the clinic and
                this website. They process information on our instructions and
                may not use it for their own purposes.
              </p>
              <ul>
                <li>
                  <strong>Supabase</strong> — the database holding enquiries,
                  patient contact details and appointment records.
                </li>
                <li>
                  <strong>Vercel</strong> — hosts this website and serves its
                  pages.
                </li>
                <li>
                  <strong>Cal.com</strong> — runs the booking calendar and
                  collects the details you enter when booking.
                </li>
                <li>
                  <strong>Google</strong> — the maps on our contact and location
                  pages are loaded from Google, so Google receives your IP
                  address when a map appears on your screen.
                </li>
                <li>
                  <strong>WhatsApp</strong> — if you message us there, the
                  conversation is carried by WhatsApp and its owner, Meta, on
                  their own terms.
                </li>
              </ul>
              <p>
                We do not sell your details. We do not hand them to anyone for
                their own marketing. Beyond the companies above, we share
                information only where a court or a regulator requires it, or
                where it is needed urgently to protect someone&apos;s life or
                health.
              </p>

              <h2>Cookies</h2>
              <p>
                A cookie is a small piece of text a website asks your browser to
                store and hand back on your next visit, which is how a site
                recognises a returning browser.
              </p>
              <p>
                The public pages of this site set no cookies of our own. There
                is no advertising tag and no analytics tag on the site, so
                nothing here is tracking you between pages or between visits.
                Two things are worth knowing anyway. The Google map on our
                contact and location pages is loaded from Google and may set its
                own cookies in your browser under google.com. And clinic staff
                signing into the private admin area receive a session cookie,
                which is only what keeps them signed in.
              </p>
              <p>
                If we ever add analytics, we will update this page before
                switching it on.
              </p>

              <h2>How long we keep it</h2>
              <p>
                An enquiry that never becomes an appointment is kept while it is
                still useful to follow up, and deleted after that. Records of
                patients we have treated are kept for as long as our obligations
                as a medical provider require. If you ask us to delete your
                information, we will, apart from anything we are legally obliged
                to retain, and we will tell you if that applies to you.
              </p>

              <h2>Your rights</h2>
              <p>Under the Nigeria Data Protection Act 2023 you may:</p>
              <ul>
                <li>ask what we hold about you, and get a copy of it</li>
                <li>have anything wrong corrected</li>
                <li>ask us to delete it</li>
                <li>withdraw consent you previously gave</li>
                <li>tell us to stop sending you marketing</li>
                <li>object to how we are using it</li>
              </ul>
              <p>
                Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will reply
                within one month. There is no charge, and asking will never
                affect the care you receive. If you are not satisfied with our
                answer, you can complain to the Nigeria Data Protection
                Commission.
              </p>

              <h2>Stopping marketing messages</h2>
              <p>
                Tell us on WhatsApp, reply to any message asking us to stop, or
                email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We will act on it
                without asking why. Appointment reminders and replies to
                questions you asked us are not marketing and will continue.
              </p>

              <h2>Keeping it safe</h2>
              <p>
                Everything you send us travels over an encrypted connection.
                Enquiry and patient records sit in a database that refuses
                access unless the request comes from a signed-in member of
                clinic staff, and the list of who counts as staff is short and
                maintained by hand. No system is perfect, but nothing here is
                left open to the public internet.
              </p>

              <h2>Children</h2>
              <p>
                This website is meant for adults and we do not knowingly collect
                information from anyone under 18 through it. Treatment of a
                patient under 18 is arranged with a parent or guardian, in
                person at the clinic.
              </p>

              <h2>Changes to this page</h2>
              <p>
                If we change how we handle your information, we will change this
                page and move the date at the top. This version was last updated
                on {LAST_UPDATED}.
              </p>

              <h2>Contact us</h2>
              <p>
                Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, call{" "}
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>, or use the{" "}
                <Link href="/contact">contact page</Link> to reach either
                clinic.
              </p>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>

      <FloatingWhatsApp />
    </div>
  );
}
