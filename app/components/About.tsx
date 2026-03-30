'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 200, suffix: '+', label: 'Happy Clients' },
  { value: 15, suffix: '+', label: 'Treatments Offered' },
  { value: 99, suffix: '%', label: 'Satisfaction Rate' }
];

function CountUp({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();
    const ms = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ms, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return (
    <div ref={ref}>
      {count}{suffix}
    </div>
  );
}

const values = [
  {
    icon: '🛡️',
    title: 'Safety First',
    description: 'Hospital-grade protocols, medical screening, and evidence-based care'
  },
  {
    icon: '🎯',
    title: 'Personalization',
    description: 'Your goals, lifestyle, and features inform your plan'
  },
  {
    icon: '✨',
    title: 'Natural Aesthetic',
    description: 'We enhance proportion, balance, and harmony—never overdo'
  },
  {
    icon: '💜',
    title: 'Aftercare',
    description: 'Clear guidance, easy access to the team, and thoughtful follow-ups'
  }
];

export default function About({ compact = false }: { compact?: boolean }) {
  return (
    <section id="about" className={`${compact ? 'py-16 lg:py-24' : 'pt-12 pb-20 md:py-20'} bg-ivory relative overflow-hidden`}>
      <div className={`${compact ? 'mx-auto max-w-7xl px-6 lg:px-12' : 'container mx-auto px-4'} relative z-10`}>
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${compact ? '' : 'mb-20'}`}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-4">About Us</p>
            <h2 className="text-4xl md:text-5xl font-light text-charcoal mb-6" style={{ fontFamily: 'var(--font-display), serif' }}>
              More than a clinic. A commitment to confidence.
            </h2>
            <p className="text-lg font-light text-warm-gray-400 mb-6">
              Reverse Aesthetics was founded to elevate aesthetic medicine in Africa—pairing medical precision with an eye for beauty. We believe the best results are natural, tailored, and responsibly delivered.
            </p>
            <p className="text-lg font-light text-warm-gray-400 mb-6">
              Founded by Dr. Ral Abana, an award-winning aesthetic medical physician registered with the GMC (UK), our clinic combines nearly a decade of specialty experience with a commitment to subtle, elegant outcomes and uncompromising safety.
            </p>
            <p className="text-lg font-light text-warm-gray-400">
              Our focus: your confidence, safety, and long-term skin and body health. Through hospital-grade protocols, medical screening, and evidence-based care, we deliver natural transformations expertly delivered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] overflow-hidden border border-warm-gray-100"
          >
            <Image
              src="/images/about/clinic.png"
              alt="Reverse Aesthetics Clinic"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Stats — shown in both modes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${compact ? 'mt-16' : 'mb-20'}`}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="text-center p-6 bg-white border border-warm-gray-100"
            >
              <div className="text-4xl md:text-5xl font-light text-bronze mb-2" style={{ fontFamily: 'var(--font-display), serif' }}>
                <CountUp value={stat.value} suffix={stat.suffix} duration={2.2} />
              </div>
              <div className="text-warm-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values — full mode only */}
        {!compact && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-4">Our Philosophy</p>
              <h3 className="text-3xl md:text-4xl font-light text-charcoal mb-4" style={{ fontFamily: 'var(--font-display), serif' }}>
                Our Approach
              </h3>
              <p className="text-xl font-light text-warm-gray-400 max-w-2xl mx-auto">
                How we deliver exceptional results with care and precision
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 border border-warm-gray-100 text-center hover:border-bronze transition-colors duration-300"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h4 className="text-xl font-light text-charcoal mb-3" style={{ fontFamily: 'var(--font-display), serif' }}>
                    {value.title}
                  </h4>
                  <p className="text-warm-gray-400 font-light">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
