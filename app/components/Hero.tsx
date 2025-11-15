"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppointment } from "../contexts/AppointmentContext";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openAppointment } = useAppointment();
  const newsOutlets = [
    { name: "CNN Africa", fontStyle: "font-bold" },
    { name: "Vanguard", fontStyle: "font-semibold" },
    { name: "ThisDay", fontStyle: "font-normal italic" },
    { name: "The Guardian Nigeria", fontStyle: "font-bold" },
    { name: "Punch", fontStyle: "font-semibold uppercase tracking-wider" },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen overflow-hidden" suppressHydrationWarning>
      {/* Mobile Layout */}
      <div className="flex h-full flex-col lg:hidden" suppressHydrationWarning>
        {/* Slider Container */}
        <div className="relative h-[52vh] min-h-[300px] overflow-hidden" suppressHydrationWarning>
          {/* Slide 1: Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            suppressHydrationWarning
          >
            <Image
              src="/images/hero/hero-home.png"
              alt="Professional aesthetic treatment at Reverse Aesthetics"
              fill
              className="object-cover object-right -scale-x-100"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#F2F0F7]" suppressHydrationWarning />
            
            {/* Text overlay on image */}
            <div className="absolute bottom-20 left-0 right-0 px-6 z-10" suppressHydrationWarning>
              <p className="text-xs font-medium uppercase tracking-wider text-white drop-shadow-md">
                Nigeria&apos;s Leading Aesthetic Clinic
              </p>
            </div>
          </div>

          {/* Slide 2: Image - Top on Mobile */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            suppressHydrationWarning
          >
            {/* Background Image */}
            <div className="absolute inset-0" suppressHydrationWarning>
              <Image
                src="/images/hero/reveresaest.avif"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                aria-hidden="true"
              />
            </div>
            {/* Square Image on Top */}
            <div className="relative h-[52vh] min-h-[300px] z-10" suppressHydrationWarning>
              <Image
                src="/images/hero/D945A6DA-82DB-4D15-9E9E-08F28796ED9E.PNG"
                alt="Hair restoration treatment at Reverse Aesthetics"
                fill
                className="object-cover object-center rounded-lg"
                sizes="100vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#F2F0F7]" suppressHydrationWarning />
            </div>
          </div>

          {/* Pagination Indicators - Bottom Left (Mobile) */}
          <div className="absolute bottom-4 left-4 z-20 flex gap-2" suppressHydrationWarning>
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-white"
                    : "w-6 bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-[#F2F0F7]" suppressHydrationWarning>
          <div className="-mt-12 h-12 bg-gradient-to-b from-transparent to-[#F2F0F7]" suppressHydrationWarning />
          <div className="px-6 -mt-4 py-8 space-y-4 text-gray-900 relative z-10" suppressHydrationWarning>
            {currentSlide === 0 ? (
              <>
                <h1 className="text-[2.5rem] font-normal leading-tight">
                  Natural{" "}
                  <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    transformations
                  </span>
                  .
                  <br />
                  <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    Expertly
                  </span>{" "}
                  delivered.
                </h1>

                <p className="text-base leading-relaxed text-gray-700">
                  Personalized, medically led treatments for skin, face, body, hair, and smile—designed to look like you,
                  only refined.
                </p>

                <div className="pt-2 flex justify-center" suppressHydrationWarning>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      openAppointment();
                    }}
                    className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-20 py-2 text-base font-semibold text-white uppercase tracking-wide shadow-xl transition hover:bg-purple-700 hover:shadow-2xl whitespace-nowrap w-full max-w-md"
                  >
                    Book Appointment
                  </button>
                </div>

                <div className="flex flex-col gap-2 pt-2" suppressHydrationWarning>
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-800 shadow-sm" suppressHydrationWarning>
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                    GMC Registered • Award-winning medical team
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-800 shadow-sm" suppressHydrationWarning>
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                    Lagos &amp; Abuja Clinics
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-[2.5rem] font-normal leading-tight">
                  Hair{" "}
                  <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    restoration
                  </span>
                  .
                  <br />
                  <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    Expertly
                  </span>{" "}
                  restored.
                </h1>

                <p className="text-base leading-relaxed text-gray-700">
                  We restore density, refine hairlines, and protect long-term hair health with surgical and non-surgical solutions—always with a natural finish.
                </p>

                <div className="pt-2 flex justify-center" suppressHydrationWarning>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      openAppointment();
                    }}
                    className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-20 py-2 text-base font-semibold text-white uppercase tracking-wide shadow-xl transition hover:bg-purple-700 hover:shadow-2xl whitespace-nowrap w-full max-w-md"
                  >
                    Book Hair Assessment
                  </button>
                </div>

                <div className="flex flex-col gap-2 pt-2" suppressHydrationWarning>
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-800 shadow-sm" suppressHydrationWarning>
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                    Natural-looking density and design
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-800 shadow-sm" suppressHydrationWarning>
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                    Surgical &amp; non-surgical solutions
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-auto pb-8" suppressHydrationWarning>
            <div className="bg-white rounded-t-2xl shadow-md px-6 py-3 overflow-hidden" suppressHydrationWarning>
              <div className="flex items-center gap-6" suppressHydrationWarning>
                <span className="text-xs uppercase tracking-wider font-medium text-gray-600 whitespace-nowrap flex-shrink-0">Featured on</span>
                <div className="flex-1 overflow-hidden" suppressHydrationWarning>
                  <div className="flex items-center gap-6 animate-scroll" suppressHydrationWarning>
                    {/* First set */}
                    {newsOutlets.map((outlet) => (
                      <span
                        key={`first-${outlet.name}`}
                        className={`text-sm ${outlet.fontStyle} whitespace-nowrap text-gray-600 flex-shrink-0`}
                      >
                        {outlet.name}
                      </span>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {newsOutlets.map((outlet) => (
                      <span
                        key={`second-${outlet.name}`}
                        className={`text-sm ${outlet.fontStyle} whitespace-nowrap text-gray-600 flex-shrink-0`}
                      >
                        {outlet.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden h-full lg:block" suppressHydrationWarning>
        <div className="relative h-full overflow-hidden" suppressHydrationWarning>
          {/* Slide 1: Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            suppressHydrationWarning
          >
            <Image
              src="/images/hero/hero-home.png"
              alt="Professional aesthetic treatment at Reverse Aesthetics"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#FAF9FC]/92 via-[#F5F3F9]/75 to-transparent" suppressHydrationWarning />
          </div>

          {/* Slide 2: Image - Square on Right */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            suppressHydrationWarning
          >
            {/* Background Image */}
            <div className="absolute inset-0" suppressHydrationWarning>
              <Image
                src="/images/hero/reveresaest.avif"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                aria-hidden="true"
              />
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#FAF9FC]/92 via-[#F5F3F9]/75 to-transparent z-10" suppressHydrationWarning />
            <div className="absolute right-0 top-0 bottom-0 w-1/2 pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 pb-28 flex items-center justify-center z-10" suppressHydrationWarning>
              <div className="relative w-full max-w-2xl aspect-square" suppressHydrationWarning>
                <Image
                  src="/images/hero/D945A6DA-82DB-4D15-9E9E-08F28796ED9E.PNG"
                  alt="Hair restoration treatment at Reverse Aesthetics"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  sizes="(max-width: 1024px) 50vw, 672px"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex h-full items-center" suppressHydrationWarning>
            <div className="w-full" suppressHydrationWarning>
              <div className="flex flex-col px-6 py-12 sm:px-10 lg:px-16 xl:px-24" suppressHydrationWarning>
                <div className="max-w-lg space-y-4 text-gray-900" suppressHydrationWarning>
                  {currentSlide === 0 ? (
                    <>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-700">
                        Nigeria&apos;s Leading Aesthetic Clinic
                      </p>

                      <h1 className="text-5xl font-normal leading-tight xl:text-6xl">
                        Natural{" "}
                        <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                          transformations
                        </span>
                        .
                        <br />
                        <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                          Expertly
                        </span>{" "}
                        delivered.
                      </h1>

                      <p className="text-lg leading-relaxed text-gray-700">
                        Personalized, medically led treatments for skin, face, body, hair, and smile—designed to look like
                        you, only refined.
                      </p>

                      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center" suppressHydrationWarning>
                        <div className="flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md px-4 py-2 border border-white/40" suppressHydrationWarning>
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                          <p className="text-xs font-medium text-gray-800">
                            GMC Registered • Award-winning medical team
                          </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md px-4 py-2 border border-white/40" suppressHydrationWarning>
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                          <p className="text-xs font-medium text-gray-800">Lagos &amp; Abuja Clinics</p>
                        </div>
                      </div>

                      <div className="pt-4" suppressHydrationWarning>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            openAppointment();
                          }}
                          className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-12 py-5 text-lg font-semibold text-white uppercase tracking-wide shadow-lg transition hover:bg-purple-700 hover:shadow-xl"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-700">
                        Hair Restoration Clinic
                      </p>

                      <h1 className="text-5xl font-normal leading-tight xl:text-6xl">
                        Hair{" "}
                        <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                          restoration
                        </span>
                        .
                        <br />
                        <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                          Expertly
                        </span>{" "}
                        restored.
                      </h1>

                      <p className="text-lg leading-relaxed text-gray-700">
                        We restore density, refine hairlines, and protect long-term hair health with surgical and non-surgical solutions—always with a natural finish.
                      </p>

                      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center" suppressHydrationWarning>
                        <div className="flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md px-4 py-2 border border-white/40" suppressHydrationWarning>
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                          <p className="text-xs font-medium text-gray-800">
                            Natural-looking density and design
                          </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md px-4 py-2 border border-white/40" suppressHydrationWarning>
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                          <p className="text-xs font-medium text-gray-800">Surgical &amp; non-surgical solutions</p>
                        </div>
                      </div>

                      <div className="pt-4" suppressHydrationWarning>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            openAppointment();
                          }}
                          className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-12 py-5 text-lg font-semibold text-white uppercase tracking-wide shadow-lg transition hover:bg-purple-700 hover:shadow-xl"
                        >
                          Book Hair Assessment
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Indicators - Bottom Right (Desktop) */}
          <div className="absolute bottom-24 right-8 z-20 flex gap-2" suppressHydrationWarning>
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-white"
                    : "w-6 bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20" suppressHydrationWarning>
            <div className="w-full px-8 py-4" suppressHydrationWarning>
              <div className="bg-white rounded-t-2xl shadow-2xl px-8 py-4" suppressHydrationWarning>
                <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 xl:gap-12" suppressHydrationWarning>
                  <p className="text-gray-600 text-xs uppercase tracking-wider font-medium whitespace-nowrap">
                    Featured on
                  </p>
                  {newsOutlets.map((outlet) => (
                    <div
                      key={outlet.name}
                      className={`text-gray-800 text-sm lg:text-base xl:text-lg ${outlet.fontStyle} whitespace-nowrap`}
                      suppressHydrationWarning
                    >
                      {outlet.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
