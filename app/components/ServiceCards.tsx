"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const services = [
  {
    title: "Aesthetics & Dermatology",
    description:
      "Advanced skincare, injectables, skin tightening, and glow treatments tailored to your unique complexion.",
    image: "/images/generated/aesthetics_service.avif",
    href: "/clinics/aesthetics",
    treatmentLinks: [
      { label: "Botox & Fillers", href: "/treatments/botox-and-dermal-fillers-lagos" },
      { label: "HIFU & Skin Tightening", href: "/treatments/hifu-skin-tightening-nigeria" },
      { label: "Laser Treatments", href: "/treatments/laser-skin-resurfacing-lagos" },
      { label: "IV Glow Therapy", href: "/treatments/iv-glow-therapy-lagos" },
    ],
  },
  {
    title: "Weight Loss",
    description:
      "Medical programs, injection support, and body contouring for sustainable, healthy transformation.",
    image: "/images/generated/hero_weightloss_consult.avif",
    href: "/clinics/weightloss",
    treatmentLinks: [
      { label: "Medical Programs", href: "/treatments/medical-weight-loss-lagos" },
      { label: "Injection Support", href: "/treatments/medical-weight-loss-lagos" },
      { label: "Body Contouring", href: "/treatments/medical-weight-loss-lagos" },
    ],
  },
  {
    title: "Dental Aesthetics",
    description:
      "Smile makeovers, whitening, veneers, and gum aesthetics for your most confident smile.",
    image: "/images/services/dental.avif",
    href: "/clinics/dental",
    treatmentLinks: [
      { label: "Teeth Whitening", href: "/treatments/dental-aesthetics-lagos" },
      { label: "Veneers", href: "/treatments/dental-aesthetics-lagos" },
      { label: "Smile Design", href: "/treatments/dental-aesthetics-lagos" },
    ],
  },
  {
    title: "Hair Restoration",
    description:
      "Transplant, regeneration, and hair health optimization with surgical and non-surgical solutions.",
    image: "/images/services/hair-services.avif",
    href: "/clinics/hair",
    treatmentLinks: [
      { label: "Hair Transplant", href: "/treatments/hair-transplant-nigeria" },
      { label: "PRP Therapy", href: "/treatments/hair-transplant-nigeria" },
      { label: "Scalp Treatments", href: "/treatments/hair-transplant-nigeria" },
    ],
  },
];

function ServiceSpread({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const reversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      <div
        onClick={() => router.push(service.href)}
        className={`group flex flex-col ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } border-b border-warm-gray-100 cursor-pointer`}
      >
        {/* Image — 55% width on desktop */}
        <div className="relative w-full lg:w-[55%] h-72 lg:h-[480px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 55vw"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Content — 45% width on desktop */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 py-10 lg:px-14 xl:px-20 lg:py-0">
          {/* Number label */}
          <span className="text-[11px] font-medium tracking-[0.3em] text-bronze mb-4">
            0{index + 1}
          </span>

          <h3
            className="text-3xl lg:text-4xl xl:text-[2.75rem] font-semibold text-charcoal leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            {service.title}
          </h3>

          <p className="text-base text-warm-gray-400 font-normal leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Treatment tags — linked to spoke pages */}
          <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-warm-gray-300 mb-8">
            {service.treatmentLinks.map((link, i) => (
              <span key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-bronze transition-colors duration-300 py-1 inline-block"
                >
                  {link.label}
                </Link>
                {i < service.treatmentLinks.length - 1 && <span> / </span>}
              </span>
            ))}
          </p>

          {/* Explore link — underline reveal */}
          <Link
            href={service.href}
            onClick={(e) => e.stopPropagation()}
            className="relative inline-block text-[13px] font-semibold uppercase tracking-[0.12em] text-charcoal w-fit py-1"
          >
            Explore
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-bronze group-hover:w-full transition-all duration-400" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceCards() {
  return (
    <section className="section-padding bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20 lg:px-12">
          <hr className="divider-gold mx-auto mb-7" />
          <h2
            className="text-charcoal mb-4"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Our Specialties
          </h2>
          <p className="text-warm-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Four specialist disciplines under one roof, each led by accredited professionals
            delivering world-class results.
          </p>
        </div>

        {/* Editorial Spreads */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceSpread key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
