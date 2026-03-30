"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ivory">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Content */}
        <div className="w-1/2 flex items-center relative z-10">
          <div className="px-12 xl:px-24 py-20 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-6 animate-fade-in">
              Nigeria&apos;s Leading Aesthetic Clinic
            </p>
            <h1
              className="text-5xl xl:text-6xl leading-[1.1] mb-6 text-plum animate-fade-in delay-100"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Natural{" "}
              <span className="italic">transformations</span>.
              <br />
              <span className="italic">Expertly</span> delivered.
            </h1>
            <p className="text-lg text-plum-muted leading-relaxed mb-8 animate-fade-in delay-200">
              Personalized, medically led treatments for skin, face, body, hair,
              and smile — designed to look like you, only refined.
            </p>

            {/* CTAs */}
            <div className="flex gap-4 mb-10 animate-fade-in delay-300">
              <Link href="/booking" className="btn-gold">
                Book a Visit
              </Link>
              <a
                href="https://wa.me/2349159188094"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 animate-fade-in delay-400">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm border border-warm-gray-100">
                <span className="h-2 w-2 rounded-full bg-purple-600" />
                <span className="text-xs font-medium text-plum">
                  GMC Registered • Award-winning team
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm border border-warm-gray-100">
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span className="text-xs font-medium text-plum">
                  Lagos & Abuja Clinics
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-1/2 relative">
          <Image
            src="/images/hero/hero-home.jpg"
            alt="Professional aesthetic treatment at Reverse Aesthetics clinic in Lagos"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
          {/* Soft gradient overlay from left */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ivory to-transparent" />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden min-h-screen">
        {/* Image Section */}
        <div className="relative h-[50vh] min-h-[320px]">
          <Image
            src="/images/generated/hero_mobile.png"
            alt="Professional aesthetic treatment at Reverse Aesthetics clinic in Lagos"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-ivory px-6 -mt-8 relative z-10 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Nigeria&apos;s Leading Aesthetic Clinic
          </p>
          <h1
            className="text-[2.25rem] leading-[1.1] mb-4 text-plum"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Natural{" "}
            <span className="italic">transformations</span>.
            <br />
            <span className="italic">Expertly</span> delivered.
          </h1>
          <p className="text-base text-plum-muted leading-relaxed mb-6">
            Personalized, medically led treatments for skin, face, body, hair,
            and smile — designed to look like you, only refined.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 mb-6">
            <Link href="/booking" className="btn-gold w-full text-center">
              Book a Visit
            </Link>
            <a
              href="https://wa.me/2349159188094"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full text-center"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-warm-gray-100">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
              <span className="text-xs font-medium text-plum">
                GMC Registered • Award-winning team
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-warm-gray-100">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-xs font-medium text-plum">
                Lagos & Abuja Clinics
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
