"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-charcoal">
      {/* Desktop Layout — Full-bleed cinematic */}
      <div className="hidden lg:block min-h-screen relative">
        {/* Background Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero/hero-home.avif"
            alt="Professional aesthetic treatment at Reverse Aesthetics clinic in Lagos"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Strong gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        </motion.div>

        {/* Content — positioned bottom-left, editorial */}
        <div className="absolute inset-0 flex items-end z-10">
          <div className="pb-24 pl-12 xl:pl-24 pr-12 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze mb-6"
            >
              Nigeria&apos;s Leading Aesthetic Clinic
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-6xl xl:text-[5.5rem] font-light text-white leading-[0.95] mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Natural{" "}
              <span className="italic">transformations</span>.
              <br />
              <span className="italic">Expertly</span> delivered.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-lg text-white/90 font-light leading-relaxed mb-10 max-w-xl"
            >
              Personalized, medically led treatments for skin, face, body, hair,
              and smile — designed to look like you, only refined.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex gap-4"
            >
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[11px] font-semibold uppercase tracking-[0.15em] cursor-pointer transition-all duration-300 hover:bg-bronze hover:text-white"
              >
                Book a Visit
              </Link>
              <a
                href="https://wa.me/2349159188094"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 border border-white/50 text-white text-[11px] font-semibold uppercase tracking-[0.15em] cursor-pointer transition-all duration-300 hover:border-white hover:bg-white/15"
              >
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Layout — Cinematic vertical */}
      <div className="flex flex-col lg:hidden min-h-screen">
        {/* Image Section */}
        <div className="relative h-[55vh] min-h-[360px]">
          <Image
            src="/images/generated/hero_mobile.avif"
            alt="Professional aesthetic treatment at Reverse Aesthetics clinic in Lagos"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

          {/* Book button on image */}
          <Link
            href="/booking"
            className="absolute bottom-20 left-6 z-10 inline-flex items-center justify-center px-8 py-3 bg-white text-charcoal text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-bronze hover:text-white"
          >
            Book a Visit
          </Link>
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-charcoal px-6 -mt-12 relative z-10 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze mb-5">
            Nigeria&apos;s Leading Aesthetic Clinic
          </p>
          <h1
            className="text-[2.5rem] leading-[0.98] mb-5 text-white font-light"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Natural{" "}
            <span className="italic">transformations</span>.
            <br />
            <span className="italic">Expertly</span> delivered.
          </h1>
          <p className="text-base text-white/85 font-light leading-relaxed mb-8">
            Personalized, medically led treatments for skin, face, body, hair,
            and smile — designed to look like you, only refined.
          </p>

          {/* CTA */}
          <a
            href="https://wa.me/2349159188094"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-8 py-4 border border-white/50 text-white text-[11px] font-semibold uppercase tracking-[0.15em] cursor-pointer transition-all duration-300 hover:border-white text-center"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
