import { Clock3, MapPin, MessageCircle } from "lucide-react";
import MapEmbed from "./MapEmbed";
import { LOCATIONS, PHONE_DISPLAY, WHATSAPP_URL } from "./homeData";

export function ContactSection() {
  return (
    <section id="contact" className="bg-white pt-[34px] pb-[70px] md:py-[100px]">
      <div className="mx-auto grid max-w-[1160px] gap-[18px] px-[20px] md:grid-cols-[0.9fr_1.1fr] md:items-start md:px-[40px]">
        <div className="reveal-on-scroll rounded-[8px] bg-[#e7efe7] p-[26px] md:self-start md:p-[34px]">
          <p className="mb-[12px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
            Visit us
          </p>
          <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[44px]">
            Two clinics. Lagos &amp; Abuja.
          </h2>
          <p className="mt-[18px] text-[15px] leading-[1.7] text-[#5f6c69]">
            Send your name, the treatment you&apos;re curious about, your city, and
            your preferred day — and we&apos;ll confirm a time that works.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-[28px] inline-flex h-[46px] items-center justify-center gap-[8px] rounded-full bg-[var(--color-clinic-teal)] px-[24px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white"
          >
            {PHONE_DISPLAY}
            <MessageCircle className="h-[16px] w-[16px]" aria-hidden />
          </a>
        </div>

        <div className="grid gap-[14px] md:grid-cols-2">
          {/* Location cards */}
          {LOCATIONS.map((loc) => (
            <div
              key={loc.city}
              className="motion-card rounded-[8px] border border-[#e6ece7] p-[22px]"
            >
              <MapPin className="mb-[22px] h-[28px] w-[28px] text-[var(--color-clinic-teal)]" aria-hidden />
              <h3 className="text-[21px] font-bold text-[var(--color-clinic-navy)]">
                {loc.city} clinic
              </h3>
              <p className="mt-[10px] text-[14px] leading-[1.6] text-[#65716e]">
                {loc.address}
              </p>
              <a
                href={loc.mapDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-[14px] inline-flex items-center gap-[6px] text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal-dark)]"
              >
                Get directions
                <MapPin className="h-[13px] w-[13px]" aria-hidden />
              </a>
            </div>
          ))}

          {/* Opening hours */}
          <div className="motion-card rounded-[8px] border border-[#e6ece7] p-[22px] md:col-span-2">
            <Clock3 className="mb-[18px] h-[28px] w-[28px] text-[var(--color-clinic-teal)]" aria-hidden />
            <h3 className="text-[21px] font-bold text-[var(--color-clinic-navy)]">Opening hours</h3>
            <p className="mt-[10px] text-[14px] leading-[1.6] text-[#65716e]">
              Both clinics: Monday–Saturday, 9:00 AM – 7:00 PM. Sunday closed.
              Message ahead to confirm your slot at your preferred location.
            </p>
          </div>

          {/* Maps — one per clinic */}
          <div className="reveal-on-scroll rounded-[8px] bg-[#e4edf1] p-[10px] md:col-span-2">
            <div className="grid gap-[10px] md:grid-cols-2">
              {LOCATIONS.map((loc) => (
                <div key={loc.city} className="rounded-[8px] bg-white/45 p-[8px]">
                  <div className="flex items-center justify-between px-[8px] py-[8px]">
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-teal)]">
                      {loc.city} · {loc.short}
                    </p>
                    <a
                      href={loc.mapDirectionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-[32px] items-center gap-[6px] rounded-full bg-white px-[12px] text-[10px] font-bold uppercase tracking-[0.09em] text-[var(--color-clinic-navy)]"
                    >
                      Directions
                      <MapPin className="h-[12px] w-[12px]" aria-hidden />
                    </a>
                  </div>
                  <MapEmbed
                    address={loc.address}
                    className="h-[240px] md:h-[280px]"
                    directionsUrl={loc.mapDirectionsUrl}
                    embedUrl={loc.mapEmbedUrl}
                    title={`Map showing Reverse Aesthetics ${loc.city}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
