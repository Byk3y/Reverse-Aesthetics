'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const stats = [
  { number: '10+', label: 'Years Experience' },
  { number: '200+', label: 'Happy Clients' },
  { number: '15+', label: 'Treatments Offered' },
  { number: '99%', label: 'Satisfaction Rate' }
];

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

export default function About() {
  return (
    <section id="about" className="pt-12 pb-20 md:py-20 bg-gradient-to-br from-gray-50 via-purple-50/20 to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-0 w-80 h-80 bg-purple-100/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-rose-100/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              More than a clinic. A commitment to confidence.
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Reverse Aesthetics was founded to elevate aesthetic medicine in Africa—pairing medical precision with an eye for beauty. We believe the best results are natural, tailored, and responsibly delivered.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Founded by Dr. Ral Abana, an award-winning aesthetic medical physician registered with the GMC (UK), our clinic combines nearly a decade of specialty experience with a commitment to subtle, elegant outcomes and uncompromising safety.
            </p>
            <p className="text-lg text-gray-600">
              Our focus: your confidence, safety, and long-term skin and body health. Through hospital-grade protocols, medical screening, and evidence-based care, we deliver natural transformations expertly delivered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white rounded-xl shadow-md"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#D4A574] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Approach
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
