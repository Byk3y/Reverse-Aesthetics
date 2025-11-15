'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    category: 'All',
    questions: [
      {
        q: 'Are my results going to look natural?',
        a: 'Yes. Our philosophy prioritizes proportion, subtlety, and harmony. We tailor plans to enhance, not change, your features.'
      },
      {
        q: 'How do I know which treatment is right for me?',
        a: 'Start with a consultation. We assess your goals, lifestyle, and medical history, then recommend a clear, step-by-step plan.'
      },
      {
        q: 'Do you offer non-surgical alternatives?',
        a: 'Absolutely—threads, injectables, energy-based tightening, and skin programs often achieve meaningful results without surgery.'
      },
      {
        q: 'How long is recovery?',
        a: 'It depends on the treatment. Many services have minimal downtime. We outline recovery and aftercare before we begin.'
      },
      {
        q: 'Are treatments safe?',
        a: 'We use medical-grade products, accredited techniques, and hospital-standard safety protocols. Suitability is always assessed first.'
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Ask our team during consultation; options may be available for selected treatments and packages.'
      },
      {
        q: 'Do you treat men and women?',
        a: 'Yes. We regularly treat a diverse range of patients and tailor plans to each person\'s anatomy and goals.'
      },
      {
        q: 'Where are you located?',
        a: 'Lagos (Oniru, Lekki). Abuja (by appointment). See our Contact page for details and hours.'
      }
    ]
  }
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const currentFAQ = faqs.find(f => f.category === selectedCategory);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-white via-purple-50/25 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-100/20 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our treatments and services
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">

          {/* Questions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {currentFAQ?.questions.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg font-semibold text-gray-900 flex-1">
                      {faq.q}
                    </span>
                    <motion.svg
                      animate={{ rotate: openQuestion === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 text-[#D4A574] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {openQuestion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center bg-gradient-to-br from-purple-50 to-transparent rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help! Schedule a free consultation or give us a call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-medium">
                Book Free Consultation
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300 font-medium">
                Call Us: 09159188094
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
