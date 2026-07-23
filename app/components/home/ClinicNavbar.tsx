"use client";

import { ChevronRight, Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BOOKING_URL,
  CITIES_SHORT,
  EMAIL,
  LOCATIONS,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from "./homeData";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Clinics", href: "/clinics" },
  { label: "Treatments", href: "/treatments" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function ClinicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowAddress((current) => !current);
    }, 3600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      {/* Announcement bar */}
      <div
        className={`bg-white text-center px-[16px] text-[12px] md:text-[14px] font-medium overflow-hidden whitespace-nowrap transition-all duration-300 border-b border-[#eee] ${
          scrolled ? "max-h-0 py-0 border-b-0" : "max-h-[50px] py-[10px]"
        }`}
      >
        {showAddress ? (
          <span className="font-bold text-[var(--color-clinic-navy)]">
            {CITIES_SHORT}
          </span>
        ) : (
          <>
            <span className="text-[var(--color-clinic-teal)] font-bold">
              Now open in Lagos &amp; Abuja
            </span>{" "}
            — new patients welcome
          </>
        )}
      </div>

      {/* Nav bar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white border-b border-[#e8e8e8] shadow-sm"
            : "bg-[var(--color-clinic-hero-top)]"
        }`}
      >
        <div className="mx-auto max-w-[1000px] px-[24px] md:px-[20px] h-[68px] md:h-[76px] flex items-center justify-between">
          <Link
            href="/"
            aria-label="Reverse Aesthetics home"
            className="inline-flex items-baseline gap-[6px] text-[17px] md:text-[19px] font-bold uppercase tracking-[0.08em] text-[var(--color-clinic-navy)]"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Reverse
            <span className="font-extrabold text-[var(--color-clinic-teal)]">
              Aesthetics
            </span>
          </Link>

          <div className="flex items-center gap-[14px] md:gap-[20px]">
            <Link
              href={BOOKING_URL}
              className="hidden h-[44px] items-center justify-center rounded-full bg-[var(--color-clinic-navy)] px-[26px] text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black md:inline-flex"
            >
              {scrolled ? "Book Now" : "Book Appointment"}
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="flex h-[26px] w-[26px] flex-col justify-center gap-[6px]"
            >
              <span className="block h-[2.5px] w-full rounded-full bg-[var(--color-clinic-navy)]" />
              <span className="block h-[2.5px] w-full rounded-full bg-[var(--color-clinic-navy)]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer */}
      {menuOpen && (
        <div className="drawer-overlay fixed inset-0 z-[200] bg-black/45">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className="drawer-panel absolute bottom-[10px] right-0 top-[10px] flex w-[calc(100%-72px)] max-w-[430px] flex-col overflow-y-auto overscroll-contain rounded-l-[24px] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.18)] md:bottom-[24px] md:top-[24px] md:w-[420px] md:rounded-l-[28px]"
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-[24px] pb-[22px] pt-[26px] md:px-[32px] md:pb-[24px] md:pt-[30px]">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                aria-label="Reverse Aesthetics home"
                className="inline-flex items-baseline gap-[6px] text-[18px] font-bold uppercase tracking-[0.08em] text-[var(--color-clinic-navy)]"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Reverse
                <span className="font-extrabold text-[var(--color-clinic-teal)]">
                  Aesthetics
                </span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full text-[var(--color-clinic-navy)] transition-colors hover:bg-[#eef5f2]"
              >
                <X className="h-[24px] w-[24px]" aria-hidden />
              </button>
            </div>

            <nav className="px-[24px] md:px-[32px]" aria-label="Main menu">
              <ul className="grid gap-[2px]">
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between border-b border-[#eef1f0] py-[13px] text-[17px] font-semibold tracking-[-0.01em] text-[#252827] transition-colors hover:text-[var(--color-clinic-teal)] md:py-[14px] md:text-[18px]"
                    >
                      {link.label}
                      <ChevronRight className="h-[21px] w-[21px] shrink-0" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto border-t border-[#edf0ef] px-[24px] py-[22px] md:px-[32px] md:py-[26px]">
              <div className="grid gap-[12px] text-[14px] font-semibold text-[#303b39] md:text-[15px]">
                {LOCATIONS.map((loc) => (
                  <a
                    key={loc.city}
                    href={loc.mapDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-[12px] transition-colors hover:text-[var(--color-clinic-teal)]"
                  >
                    <MapPin className="mt-[1px] h-[18px] w-[18px] shrink-0 text-[var(--color-clinic-teal)]" aria-hidden />
                    <span>
                      <strong className="text-[var(--color-clinic-navy)]">{loc.city}:</strong>{" "}
                      {loc.short}
                    </span>
                  </a>
                ))}
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center gap-[12px] transition-colors hover:text-[var(--color-clinic-teal)]"
                >
                  <Phone className="h-[18px] w-[18px] shrink-0 text-[var(--color-clinic-teal)]" aria-hidden />
                  <span>{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-[12px] transition-colors hover:text-[var(--color-clinic-teal)]"
                >
                  <Mail className="h-[18px] w-[18px] shrink-0 text-[var(--color-clinic-teal)]" aria-hidden />
                  <span>{EMAIL}</span>
                </a>
              </div>
              <div className="mt-[22px] grid gap-[10px]">
                <Link
                  href={BOOKING_URL}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-[48px] w-full items-center justify-center gap-[9px] rounded-full bg-[var(--color-clinic-navy)] px-[22px] text-[11px] font-bold uppercase tracking-[0.12em] text-white"
                >
                  Book Appointment
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[48px] w-full items-center justify-center gap-[9px] rounded-full border border-[var(--color-clinic-teal)] px-[22px] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-teal)]"
                >
                  Chat on WhatsApp
                  <MessageCircle className="h-[16px] w-[16px]" aria-hidden />
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
