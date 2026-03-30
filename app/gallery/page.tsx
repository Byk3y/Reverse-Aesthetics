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
    before: "/images/services/dermal-fillers-before.avif",
    after: "/images/services/dermal-fillers-after.avif",
    title: "Dermal Fillers",
    description: "Lip & cheek enhancement — natural volume restored.",
  },
  {
    category: "Aesthetics",
    before: "/images/services/skin-before.avif",
    after: "/images/services/skin-after.avif",
    title: "Skin Rejuvenation",
    description: "Laser treatment — even-toned, radiant skin achieved.",
  },
  {
    category: "Aesthetics",
    before: "/images/services/acne-scarring-before.avif",
    after: "/images/services/acne-scarring-after.avif",
    title: "Acne Scar Treatment",
    description: "Multi-session protocol — clear, smooth skin restored.",
  },
  {
    category: "Dental",
    before: "/images/services/dental-before.avif",
    after: "/images/services/dental-after.avif",
    title: "Smile Makeover",
    description: "Full veneer transformation — Hollywood smile achieved.",
  },
  {
    category: "Hair",
    before: "/images/services/hair-before.avif",
    after: "/images/services/hair-after.avif",
    title: "Hair Transplant",
    description: "FUE procedure — natural hairline fully restored.",
  },
  {
    category: "Weight Loss",
    before: "/images/services/body-before.avif",
    after: "/images/services/body-after.avif",
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
      <section className="pt-28 lg:pt-32 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Before & After
          </p>
          <h1
            className="text-plum mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Real results. <span className="italic">Real transformations.</span>
          </h1>
          <p className="text-plum-muted text-lg leading-relaxed">
            Every image tells a story of confidence restored. Hover to see the
            transformation — all results are from actual Reverse Aesthetics patients.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white sticky top-[73px] z-30 border-b border-warm-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-ivory text-plum-muted hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                {cat}
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
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        hoveredIndex === index
                          ? "bg-gold text-white"
                          : "bg-white/90 text-plum"
                      } transition-all duration-300`}
                    >
                      {hoveredIndex === index ? "After" : "Before"}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-plum/70 text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-plum text-lg mb-1"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-plum-muted text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-plum-muted text-lg">
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
