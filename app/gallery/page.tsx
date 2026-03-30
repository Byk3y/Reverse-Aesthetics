"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";

const categories = ["All", "Aesthetics", "Weight Loss", "Dental", "Hair"];

const galleryItems = [
  {
    category: "Aesthetics",
    before: "/images/services/acne-face.avif",
    after: "/images/services/acne-healed-face.avif",
    title: "Acne Scar Treatment",
    description: "Multi-session protocol — clear, smooth skin restored.",
  },
  {
    category: "Aesthetics",
    before: "/images/generated/aesthetics_service.avif",
    after: "/images/generated/aesthetics_service.avif",
    title: "Skin Rejuvenation",
    description: "Laser treatment — even-toned, radiant skin achieved.",
  },
  {
    category: "Dental",
    before: "/images/services/dental.avif",
    after: "/images/generated/dental_smile.avif",
    title: "Smile Makeover",
    description: "Full veneer transformation — Hollywood smile achieved.",
  },
  {
    category: "Hair",
    before: "/images/services/hair-services.avif",
    after: "/images/services/hair-services-2.avif",
    title: "Hair Restoration",
    description: "FUE procedure — natural hairline fully restored.",
  },
  {
    category: "Weight Loss",
    before: "/images/services/weight-loss-before.avif",
    after: "/images/services/weight-loss-after.avif",
    title: "Body Transformation",
    description: "Medical program — sustainable weight loss achieved.",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center max-w-3xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-5">
            Before & After
          </p>
          <h1
            className="text-charcoal mb-6"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Real results. <span className="italic">Real transformations.</span>
          </h1>
          <p className="text-warm-gray-400 text-lg leading-relaxed font-light">
            Every image tells a story of confidence restored. Hover to see the
            transformation — all results are from actual Reverse Aesthetics patients.
          </p>
        </div>
      </section>

      {/* Filter Tabs — editorial text tabs with underline */}
      <section className="bg-white sticky top-[73px] z-30 border-b border-warm-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex gap-8 py-5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap pb-1 ${
                  activeCategory === cat
                    ? "text-charcoal"
                    : "text-warm-gray-300 hover:text-warm-gray-500"
                }`}
              >
                {cat}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-bronze transition-all duration-300 ${
                    activeCategory === cat ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, index) => (
              <div
                key={item.title}
                className="card-luxury group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Before/After Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={
                      hoveredIndex === index ? item.after : item.before
                    }
                    alt={`${item.title} - ${
                      hoveredIndex === index ? "After" : "Before"
                    }`}
                    fill
                    className="object-cover transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Before/After Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${
                        hoveredIndex === index
                          ? "bg-bronze text-white"
                          : "bg-white/90 text-charcoal"
                      } transition-all duration-300`}
                    >
                      {hoveredIndex === index ? "After" : "Before"}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] bg-charcoal/70 text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-charcoal text-lg mb-1"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-warm-gray-400 text-sm font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-warm-gray-400 text-lg font-light">
                No results in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="See yourself in our results?"
        subtitle="Book a consultation to discuss your personalized treatment plan."
      />
      <Footer />
    </main>
  );
}
