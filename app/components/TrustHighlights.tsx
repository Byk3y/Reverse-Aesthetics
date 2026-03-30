"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    title: "Medical-Led Care",
    description: "GMC (UK) registered physicians with decades of combined expertise.",
  },
  {
    title: "Natural Results",
    description: "Subtle enhancements that look like you, only refined and refreshed.",
  },
  {
    title: "Accredited Clinicians",
    description: "Award-winning specialists across aesthetics, dental, and hair.",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees. Clear consultation and treatment costs upfront.",
  },
];

export default function TrustHighlights() {
  return (
    <section className="py-16 lg:py-20 bg-white border-t border-b border-warm-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center lg:border-r lg:last:border-r-0 border-warm-gray-200 lg:px-6"
            >
              <p
                className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal mb-2"
              >
                {item.title}
              </p>
              <p className="text-sm text-warm-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
