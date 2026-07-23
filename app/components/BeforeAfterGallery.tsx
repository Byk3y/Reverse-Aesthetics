'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const galleries = [
  {
    id: 1,
    category: 'Botox & Fillers',
    before: '/images/gallery/botox-before.jpg',
    after: '/images/gallery/botox-after.jpg',
    treatment: 'Botox & Lip Fillers',
    description: '3 weeks after treatment'
  },
  {
    id: 2,
    category: 'Laser Treatments',
    before: '/images/gallery/laser-before.jpg',
    after: '/images/gallery/laser-after.jpg',
    treatment: 'Laser Skin Resurfacing',
    description: '6 weeks post-treatment'
  },
  {
    id: 3,
    category: 'Skin Treatments',
    before: '/images/gallery/facial-before.jpg',
    after: '/images/gallery/facial-after.jpg',
    treatment: 'Chemical Peel Series',
    description: '8 weeks after 3 sessions'
  },
  {
    id: 4,
    category: 'Botox & Fillers',
    before: '/images/gallery/filler-before.jpg',
    after: '/images/gallery/filler-after.jpg',
    treatment: 'Dermal Fillers',
    description: '2 weeks after treatment'
  },
  {
    id: 5,
    category: 'Body Contouring',
    before: '/images/gallery/body-before.jpg',
    after: '/images/gallery/body-after.jpg',
    treatment: 'CoolSculpting',
    description: '12 weeks post-treatment'
  },
  {
    id: 6,
    category: 'Skin Treatments',
    before: '/images/gallery/microneedling-before.jpg',
    after: '/images/gallery/microneedling-after.jpg',
    treatment: 'Microneedling with PRP',
    description: '4 weeks after treatment'
  }
];

const categories = ['All', 'Botox & Fillers', 'Laser Treatments', 'Skin Treatments', 'Body Contouring'];

export default function BeforeAfterGallery({ compact = false }: { compact?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredGalleries = selectedCategory === 'All'
    ? galleries
    : galleries.filter(item => item.category === selectedCategory);

  const displayGalleries = compact ? filteredGalleries.slice(0, 3) : filteredGalleries;

  return (
    <section id="gallery" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-bronze mb-4">Gallery</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-charcoal mb-4" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
            Real Results
          </h2>
          <p className="text-xl font-normal text-warm-gray-400 max-w-2xl mx-auto mb-8">
            See the transformative results our clients have achieved
          </p>

          {/* Category Filter — full mode only */}
          {!compact && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 font-medium transition-all duration-300 text-sm rounded-[20px] cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-bronze text-white'
                      : 'bg-warm-gray-50 text-charcoal hover:bg-warm-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayGalleries.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border border-warm-gray-100 rounded-[20px] overflow-hidden hover:border-bronze transition-colors duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative h-80 overflow-hidden">
                  {/* Before/After Slider */}
                  <div className="relative w-full h-full">
                    <Image
                      src={item.before}
                      alt={`${item.treatment} - Before`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <motion.div
                      className="absolute top-0 right-0 h-full overflow-hidden"
                      initial={{ width: '0%' }}
                      animate={{ width: hoveredId === item.id ? '100%' : '50%' }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={item.after}
                        alt={`${item.treatment} - After`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </motion.div>

                    {/* Before/After Labels */}
                    <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full">
                      Before
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full">
                      After
                    </div>

                    {/* Divider Line */}
                    <motion.div
                      className="absolute top-0 h-full w-1 bg-white shadow-sm"
                      initial={{ left: '50%' }}
                      animate={{ left: hoveredId === item.id ? '100%' : '50%' }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-sm rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="inline-block px-3 py-1.5 bg-bronze/10 text-bronze text-[12px] font-semibold uppercase tracking-[0.1em] rounded-full mb-3">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                    {item.treatment}
                  </h3>
                  <p className="text-warm-gray-400 font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          {compact ? (
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-charcoal hover:text-bronze transition-colors duration-300"
            >
              View Full Gallery
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ) : (
            <>
              <p className="text-warm-gray-400 font-normal mb-6">
                Results may vary. Individual results depend on various factors including skin type, age, and lifestyle.
              </p>
              <button className="btn-gold cursor-pointer">
                Schedule Your Consultation
              </button>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
