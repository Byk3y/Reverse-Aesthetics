import Link from "next/link";
import {
  BOOKING_URL,
  EMAIL,
  LOCATIONS,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from "./homeData";

/* Social profile links — update with the real handles when confirmed */
const SOCIALS = {
  instagram: "https://www.instagram.com/reverseaesthetics",
  facebook: "https://www.facebook.com/reverseaesthetics",
  youtube: "https://www.youtube.com/@reverseaesthetics",
  linkedin: "https://www.linkedin.com/company/reverse-aesthetics",
  x: "https://x.com/reverseaesthetics",
};

type SocialName = "linkedin" | "instagram" | "facebook" | "youtube" | "x";

function SocialIcon({ name }: { name: SocialName }) {
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6.94 8.98H3.55v10.83h3.39V8.98Zm.23-3.35a1.96 1.96 0 1 0-3.92 0 1.96 1.96 0 0 0 3.92 0Zm13.58 8.02c0-3.1-1.65-4.54-3.85-4.54a3.32 3.32 0 0 0-3 1.65h-.05V8.98h-3.25v10.83h3.39v-5.36c0-1.41.27-2.78 2.02-2.78 1.72 0 1.74 1.61 1.74 2.87v5.27h3.39v-5.94c0-.08 0-.15-.01-.22Z" />
      </svg>
    );
  }
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7.7 2.75h8.6a4.96 4.96 0 0 1 4.95 4.95v8.6a4.96 4.96 0 0 1-4.95 4.95H7.7a4.96 4.96 0 0 1-4.95-4.95V7.7A4.96 4.96 0 0 1 7.7 2.75Zm0 1.8A3.15 3.15 0 0 0 4.55 7.7v8.6a3.15 3.15 0 0 0 3.15 3.15h8.6a3.15 3.15 0 0 0 3.15-3.15V7.7a3.15 3.15 0 0 0-3.15-3.15H7.7Zm4.3 3.15a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6Zm0 1.8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.2-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.4 21.5v-8.65h2.9l.44-3.37H13.4V7.33c0-.97.27-1.63 1.66-1.63h1.78V2.69a23.9 23.9 0 0 0-2.6-.14c-2.57 0-4.33 1.57-4.33 4.45v2.48H7v3.37h2.91v8.65h3.49Z" />
      </svg>
    );
  }
  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M21.58 7.18a2.8 2.8 0 0 0-1.97-1.98C17.87 4.75 12 4.75 12 4.75s-5.87 0-7.61.45a2.8 2.8 0 0 0-1.97 1.98A29.14 29.14 0 0 0 2 12a29.14 29.14 0 0 0 .42 4.82 2.8 2.8 0 0 0 1.97 1.98c1.74.45 7.61.45 7.61.45s5.87 0 7.61-.45a2.8 2.8 0 0 0 1.97-1.98A29.14 29.14 0 0 0 22 12a29.14 29.14 0 0 0-.42-4.82Zm-11.72 8.07v-6.5L15.4 12l-5.54 3.25Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M13.9 10.47 21.35 2h-1.76l-6.47 7.35L7.96 2H2l7.81 11.1L2 22h1.76l6.83-7.76L16.04 22H22l-8.1-11.53Zm-2.42 2.75-.79-1.1-6.3-8.82h2.72l5.08 7.12.79 1.1 6.61 9.25h-2.72l-5.39-7.55Z" />
    </svg>
  );
}

const clinicLinks = [
  { label: "Aesthetics & Dermatology", href: "/clinics/aesthetics" },
  { label: "Weight Loss", href: "/clinics/weightloss" },
  { label: "Dental Aesthetics", href: "/clinics/dental" },
  { label: "Hair Restoration", href: "/clinics/hair" },
  { label: "All clinics", href: "/clinics" },
];

const exploreLinks = [
  { label: "Our story", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Book appointment", href: BOOKING_URL },
];

const socialButtons: { name: SocialName; href: string; label: string }[] = [
  { name: "instagram", href: SOCIALS.instagram, label: "Reverse Aesthetics on Instagram" },
  { name: "facebook", href: SOCIALS.facebook, label: "Reverse Aesthetics on Facebook" },
  { name: "youtube", href: SOCIALS.youtube, label: "Reverse Aesthetics on YouTube" },
  { name: "linkedin", href: SOCIALS.linkedin, label: "Reverse Aesthetics on LinkedIn" },
  { name: "x", href: SOCIALS.x, label: "Reverse Aesthetics on X" },
];

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-[rgba(35,32,29,0.08)]">
      <div className="mx-auto max-w-[1160px] px-[20px] pt-[64px] pb-[52px] md:px-[40px] md:pt-[70px]">
        <div className="grid grid-cols-2 gap-[36px] md:grid-cols-[repeat(3,minmax(130px,1fr))_minmax(210px,0.8fr)] md:gap-[42px] md:items-start">
          {/* Clinics */}
          <div>
            <h4 className="mb-[18px] text-[1rem] font-semibold text-[#0a0a0a]">Clinics</h4>
            <div className="grid gap-[14px]">
              {clinicLinks.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="text-[1.02rem] leading-[1.6] text-[#736f69] transition-colors hover:text-[var(--color-clinic-navy)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-[18px] text-[1rem] font-semibold text-[#0a0a0a]">Explore</h4>
            <div className="grid gap-[14px]">
              {exploreLinks.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="text-[1.02rem] leading-[1.6] text-[#736f69] transition-colors hover:text-[var(--color-clinic-navy)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-[18px] text-[1rem] font-semibold text-[#0a0a0a]">Contact</h4>
            <div className="grid gap-[14px] text-[1.02rem] leading-[1.6] text-[#736f69]">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[var(--color-clinic-navy)]"
              >
                WhatsApp
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="transition-colors hover:text-[var(--color-clinic-navy)]"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="break-all transition-colors hover:text-[var(--color-clinic-navy)]"
              >
                {EMAIL}
              </a>
              {LOCATIONS.map((loc) => (
                <span key={loc.city}>
                  <strong className="font-semibold text-[#4a4640]">{loc.city}:</strong>{" "}
                  {loc.address}
                </span>
              ))}
            </div>
          </div>

          {/* Follow */}
          <div className="col-span-2 md:col-span-1 md:justify-self-end">
            <h4 className="mb-[18px] text-[1rem] font-semibold text-[#0a0a0a]">Follow</h4>
            <div className="flex flex-wrap items-center gap-[14px]" aria-label="Social links">
              {socialButtons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-[34px] w-[34px] place-items-center rounded-[8px] border-[1.5px] border-[var(--color-clinic-navy)] text-[var(--color-clinic-navy)] transition duration-200 [&_svg]:h-[21px] [&_svg]:w-[21px] [&_svg]:fill-current hover:-translate-y-[2px] hover:bg-[var(--color-clinic-navy)] hover:text-white"
                >
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-[80px] text-center md:mt-[120px]">
          <h2
            className="m-0 mb-[18px] font-medium leading-[0.95] tracking-[-0.03em] text-[var(--color-clinic-navy)]"
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(2.5rem, 7.4vw, 7rem)",
            }}
          >
            Naturally you, only refined.
            <sup className="align-super text-[0.28em] leading-[0]">TM</sup>
          </h2>
          <p className="m-0 text-[0.98rem] font-bold text-[#0a0a0a]">
            Copyright 2025 © Reverse Aesthetics • Proudly Nigerian
            <span
              aria-hidden="true"
              className="ml-[8px] inline-block h-[24px] w-[16px] rounded-[3px] align-middle"
              style={{
                background:
                  "linear-gradient(90deg, #008751 0 38%, #ffffff 38% 62%, #008751 62% 100%)",
              }}
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
