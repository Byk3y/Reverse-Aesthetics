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
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Safety First',
    description: 'Hospital-grade protocols, medical screening, and evidence-based care'
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: 'Personalization',
    description: 'Your goals, lifestyle, and features inform your plan'
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: 'Natural Aesthetic',
    description: 'We enhance proportion, balance, and harmony—never overdo'
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
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
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-bronze mb-4">About Us</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-charcoal mb-6" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              More than a clinic. A commitment to confidence.
            </h2>
            <p className="text-lg font-normal text-warm-gray-400 mb-6">
              Reverse Aesthetics was founded to elevate aesthetic medicine in Africa—pairing medical precision with an eye for beauty. We believe the best results are natural, tailored, and responsibly delivered.
            </p>
            <p className="text-lg font-normal text-warm-gray-400 mb-6">
              Founded by Dr. Ral Abana, an award-winning aesthetic medical physician registered with the GMC (UK), our clinic combines nearly a decade of specialty experience with a commitment to subtle, elegant outcomes and uncompromising safety.
            </p>
            <p className="text-lg font-normal text-warm-gray-400">
              Our focus: your confidence, safety, and long-term skin and body health. Through hospital-grade protocols, medical screening, and evidence-based care, we deliver natural transformations expertly delivered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] overflow-hidden border border-warm-gray-100 rounded-[20px]"
          >
            <Image
              src="/images/about/clinic.avif"
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
              className="text-center p-6 bg-white border border-warm-gray-100 rounded-[20px]"
            >
              <div className="text-4xl md:text-5xl font-bold text-bronze mb-2" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
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
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-bronze mb-4">Our Philosophy</p>
              <h3 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                Our Approach
              </h3>
              <p className="text-xl font-normal text-warm-gray-400 max-w-2xl mx-auto">
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
                  className="bg-white p-8 border border-warm-gray-100 rounded-[20px] text-center hover:border-bronze transition-colors duration-300 cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-bronze/10 text-bronze mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold text-charcoal mb-3" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                    {value.title}
                  </h4>
                  <p className="text-warm-gray-400 font-normal">
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
