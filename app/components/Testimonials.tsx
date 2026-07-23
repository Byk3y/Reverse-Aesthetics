"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Dr. Abana and the team completely transformed my skin. I came in with severe acne scarring and left with glowing, even-toned skin. The care was personalized and the results speak for themselves.",
    name: "Adaeze N.",
    treatment: "Aesthetics & Dermatology",
  },
  {
    quote:
      "I lost 18kg on the medical weight loss program. What made it different was the medical supervision — I felt safe the entire time and the results were sustainable.",
    name: "Chidi O.",
    treatment: "Weight Loss Program",
  },
  {
    quote:
      "My smile makeover was the best investment I've ever made. The veneers look incredibly natural and the process was comfortable from start to finish.",
    name: "Funke A.",
    treatment: "Dental Aesthetics",
  },
  {
    quote:
      "The hair transplant results exceeded my expectations. My hairline looks completely natural and my confidence has never been higher. World-class service right here in Lagos.",
    name: "Emeka T.",
    treatment: "Hair Restoration",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 lg:py-32 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <hr className="divider-gold mx-auto mb-7" />
          <h2
            className="text-charcoal mb-4"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            What Our Patients Say
          </h2>
          <p className="text-warm-gray-400 text-lg font-normal">
            Real stories from real transformations.
          </p>
        </div>

        {/* Active Testimonial — dramatic pull-quote */}
        <div className="max-w-4xl mx-auto relative">
          {/* Giant decorative quote mark */}
          <div
            className="absolute -top-6 left-0 lg:left-8 text-[140px] lg:text-[180px] leading-none text-bronze/[0.07] select-none pointer-events-none"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center relative z-10 px-4 lg:px-16"
            >
              {/* Quote text — large editorial display */}
              <p
                className="text-2xl lg:text-[2.25rem] font-semibold text-charcoal leading-snug lg:leading-[1.3] mb-10"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>

              {/* Attribution */}
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-charcoal mb-1">
                  {testimonials[activeIndex].name}
                </p>
                <p className="text-[12px] uppercase tracking-[0.1em] text-bronze font-medium">
                  {testimonials[activeIndex].treatment}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation — editorial thin dashes */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === index
                    ? "w-10 bg-bronze"
                    : "w-3 bg-warm-gray-200 hover:bg-warm-gray-300"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
