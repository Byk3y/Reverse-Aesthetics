'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

type Service = {
  title: string;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  hasBeforeAfter?: boolean;
  treatments: string[];
};

const services: Service[] = [
  {
    title: 'Aesthetics & Dermatology',
    description: 'Advanced skincare, injectables, skin tightening, and glow treatments.',
    image: '/images/services/aesthetics.jpg',
    beforeImage: '/images/services/acne-face.jpg',
    afterImage: '/images/services/acne-healed-face.jpg',
    hasBeforeAfter: true,
    treatments: ['Botox & Fillers', 'HIFU & Thread Lift', 'Laser & RF', 'Acne Treatment', 'Chemical Peels', 'Hydradermabrasion']
  },
  {
    title: 'Weight Loss',
    description: 'Medical programs, injection support, and body contouring.',
    image: '/images/services/weightloss.jpg',
    beforeImage: '/images/services/weight-loss-before.jpg',
    afterImage: '/images/services/weight-loss-after.jpg',
    hasBeforeAfter: true,
    treatments: ['Medical Weight Loss', 'Injection Support', 'Body Contouring', 'Skin Firming', 'Wellness Programs']
  },
  {
    title: 'Dental',
    description: 'Smile makeovers, whitening, veneers, and gum aesthetics.',
    image: '/images/services/dental.avif',
    treatments: ['Teeth Whitening', 'Veneers & Laminates', 'Smile Design', 'Gum Contouring', 'Dental Bonding']
  },
  {
    title: 'Hair',
    description: 'Transplant, regeneration, and hair health optimization.',
    image: '/images/services/hair-services.jpg',
    treatments: ['Hair Transplant', 'Beard & Eyebrow', 'Hair Regeneration', 'Hairline Design', 'Scalp Treatments']
  }
];

export default function Services() {
  const [showAfter, setShowAfter] = useState<Record<string, boolean>>({});
  const intervalRefs = useRef<Record<string, NodeJS.Timeout>>({});
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  // Auto-loop transition every 2 seconds for each service with before/after
  useEffect(() => {
    const servicesWithBeforeAfter = services
      .filter(service => service.hasBeforeAfter)
      .map(service => service.title);

    // Initialize all to false (show before first)
    const initial: Record<string, boolean> = {};
    servicesWithBeforeAfter.forEach(title => {
      initial[title] = false;
    });
    setShowAfter(initial);

    servicesWithBeforeAfter.forEach((title, index) => {
      // Stagger the initial start time for each service (1 second apart)
      const initialDelay = index * 1000;
      
      // Set initial timeout to start the first transition
      timeoutRefs.current[title] = setTimeout(() => {
        setShowAfter((prev) => ({
          ...prev,
          [title]: !prev[title]
        }));

        // Then set up the interval to continue looping every 2 seconds
        intervalRefs.current[title] = setInterval(() => {
          setShowAfter((prev) => ({
            ...prev,
            [title]: !prev[title]
          }));
        }, 2000);
      }, initialDelay);
    });

    return () => {
      // Cleanup all timeouts and intervals
      Object.values(timeoutRefs.current).forEach(timeout => clearTimeout(timeout));
      Object.values(intervalRefs.current).forEach(interval => clearInterval(interval));
      timeoutRefs.current = {};
      intervalRefs.current = {};
    };
  }, []);

  return (
    <section id="services" className="pt-20 pb-12 md:py-20 bg-gradient-to-b from-white via-purple-50/30 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of aesthetic treatments designed to enhance your natural beauty
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                
                {/* Before/After Transition for services with before/after images */}
                {service.hasBeforeAfter && service.beforeImage && service.afterImage ? (
                  <>
                    {/* Before Image */}
                    <Image
                      src={service.beforeImage}
                      alt={`${service.title} - Before treatment`}
                      fill
                      className="object-cover transition-opacity duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      style={{
                        opacity: showAfter[service.title] ? 0 : 1
                      }}
                    />
                    {/* After Image */}
                    <Image
                      src={service.afterImage}
                      alt={`${service.title} - After treatment`}
                      fill
                      className="object-cover transition-opacity duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      style={{
                        opacity: showAfter[service.title] ? 1 : 0
                      }}
                    />
                    {/* Before/After Labels */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium z-20 transition-opacity duration-500"
                      style={{ opacity: showAfter[service.title] ? 0 : 1 }}
                    >
                      Before
                    </div>
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium z-20 transition-opacity duration-500"
                      style={{ opacity: showAfter[service.title] ? 1 : 0 }}
                    >
                      After
                    </div>
                  </>
                ) : (
                  /* Regular Image for other services */
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                )}
                
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white z-20">
                  {service.title}
                </h3>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6 flex-1">
                  {service.treatments.map((treatment) => (
                    <div
                      key={treatment}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-[#D4A574]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {treatment}
                    </div>
                  ))}
                </div>

                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 mt-auto">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
