'use client';

import { useState } from 'react';
import Image from 'next/image';
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

export default function BeforeAfterGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredGalleries = selectedCategory === 'All'
    ? galleries
    : galleries.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white via-rose-50/20 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-20 w-96 h-96 bg-purple-100/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-20 w-80 h-80 bg-rose-100/15 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            See the transformative results our clients have achieved
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredGalleries.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Before
                    </div>
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      After
                    </div>

                    {/* Divider Line */}
                    <motion.div
                      className="absolute top-0 h-full w-1 bg-white shadow-lg"
                      initial={{ left: '50%' }}
                      animate={{ left: hoveredId === item.id ? '100%' : '50%' }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-[#D4A574]/10 text-[#D4A574] rounded-full text-sm font-medium mb-3">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.treatment}
                  </h3>
                  <p className="text-gray-600">
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
          <p className="text-gray-600 mb-6">
            Results may vary. Individual results depend on various factors including skin type, age, and lifestyle.
          </p>
          <button className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-medium">
            Schedule Your Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
