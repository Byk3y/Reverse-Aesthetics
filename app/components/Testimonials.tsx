"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "Dr. Abana and the team completely transformed my skin. I came in with severe acne scarring and left with glowing, even-toned skin. The care was personalized and the results speak for themselves.",
    name: "Adaeze N.",
    treatment: "Aesthetics & Dermatology",
    image: "/images/generated/testimonial_patient.png",
  },
  {
    quote:
      "I lost 18kg on the medical weight loss program. What made it different was the medical supervision — I felt safe the entire time and the results were sustainable.",
    name: "Chidi O.",
    treatment: "Weight Loss Program",
    image: null,
  },
  {
    quote:
      "My smile makeover was the best investment I've ever made. The veneers look incredibly natural and the process was comfortable from start to finish.",
    name: "Funke A.",
    treatment: "Dental Aesthetics",
    image: null,
  },
  {
    quote:
      "The hair transplant results exceeded my expectations. My hairline looks completely natural and my confidence has never been higher. World-class service right here in Lagos.",
    name: "Emeka T.",
    treatment: "Hair Restoration",
    image: null,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-14">
          <hr className="divider-gold mx-auto mb-6" />
          <h2
            className="text-plum mb-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            What Our Patients Say
          </h2>
          <p className="text-plum-muted text-lg max-w-2xl mx-auto">
            Real stories from real transformations.
          </p>
        </div>

        {/* Active Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-ivory rounded-2xl p-8 lg:p-12 relative">
            {/* Quote Mark */}
            <div className="absolute top-6 left-8 text-gold/20 text-[80px] leading-none font-serif">
              &ldquo;
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center relative z-10">
              {/* Image */}
              {activeTestimonial.image && (
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/30">
                  <Image
                    src={activeTestimonial.image}
                    alt={activeTestimonial.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              {/* Content */}
              <div className="text-center lg:text-left">
                <p className="text-plum text-lg lg:text-xl leading-relaxed mb-6 italic">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-plum text-sm">
                    {activeTestimonial.name}
                  </p>
                  <p className="text-gold text-xs font-medium uppercase tracking-wider">
                    {activeTestimonial.treatment}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-gold"
                    : "w-2.5 bg-warm-gray-200 hover:bg-warm-gray-300"
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
