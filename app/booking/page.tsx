"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppointment } from "../contexts/AppointmentContext";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function BookingPage() {
  const { selectedService } = useAppointment();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  const inputClasses = "w-full px-4 py-3.5 bg-white border border-warm-gray-200 focus:outline-none focus:border-bronze transition-colors text-charcoal";
  const labelClasses = "block text-[11px] font-medium uppercase tracking-[0.15em] text-charcoal mb-2.5";

  return (
    <>
      <Head>
        <title>Book a Consultation | Reverse Aesthetics</title>
        <meta name="description" content="Schedule a consultation or treatment at Reverse Aesthetics Lagos." />
      </Head>
      <main>
        <Header />

        <section className="pt-28 lg:pt-36 pb-16 bg-ivory min-h-screen">
          <div className="mx-auto max-w-3xl px-6 lg:px-12">

            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-5">
                Secure Your Time
              </p>
              <h1
                className="text-charcoal mb-6"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Book a <span className="italic">Consultation</span>
              </h1>
              <p className="text-warm-gray-400 leading-relaxed font-light">
                Take the first step towards your personalized aesthetics journey.
                Our patient care coordinator will confirm your appointment shortly.
              </p>
            </div>

            {/* Form Container — editorial flat */}
            <div className="bg-white border border-warm-gray-100 p-8 md:p-12">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border border-bronze flex items-center justify-center mx-auto mb-6">
                    <svg className="w-5 h-5 text-bronze" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2
                    className="text-2xl text-charcoal mb-4 font-light"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    Request Received
                  </h2>
                  <p className="text-warm-gray-400 mb-8 max-w-md mx-auto font-light">
                    Thank you, {formData.name}. We have received your booking request for {formData.service || 'a consultation'}. Our team will contact you via WhatsApp or Email within 2 hours to confirm your time slot.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-gold"
                  >
                    Book Another Visit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClasses}>Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClasses}>Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="+234 XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="jane@example.com"
                    />
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label htmlFor="service" className={labelClasses}>Interested Service *</label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="" disabled>Select a clinic or treatment...</option>
                        <optgroup label="Aesthetics & Dermatology">
                          <option value="Anti-Wrinkle Injections">Anti-Wrinkle Injections</option>
                          <option value="Dermal Fillers">Dermal Fillers</option>
                          <option value="Chemical Peels">Chemical Peels</option>
                          <option value="Dermatology Consultation">Dermatology Consultation</option>
                        </optgroup>
                        <optgroup label="Medical Weightloss">
                          <option value="Semaglutide Program">Semaglutide Weightloss</option>
                          <option value="Body Contouring">Body Contouring</option>
                        </optgroup>
                        <optgroup label="Wellness & IV Therapy">
                          <option value="IV Vitamin Therapy">IV Vitamin Therapy</option>
                          <option value="NAD+ Therapy">NAD+ Anti-Aging Therapy</option>
                        </optgroup>
                        <optgroup label="Dental Aesthetics">
                          <option value="Teeth Whitening">Teeth Whitening</option>
                          <option value="Dental Scaling">Scaling & Polishing</option>
                        </optgroup>
                        <optgroup label="Hair Restoration">
                          <option value="PRP Hair Treatment">PRP Hair Treatment</option>
                        </optgroup>
                        <option value="General Consultation">General Consultation (Not Sure)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-warm-gray-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className={labelClasses}>Preferred Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`${inputClasses} text-charcoal`}
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className={labelClasses}>Preferred Time</label>
                      <div className="relative">
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className={`${inputClasses} appearance-none`}
                        >
                          <option value="">Any Time</option>
                          <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                          <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                          <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-warm-gray-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label htmlFor="notes" className={labelClasses}>Additional Requests or Concerns</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      className={`${inputClasses} resize-none`}
                      placeholder="Please share any specific concerns or questions..."
                    ></textarea>
                  </div>

                  {/* Submit */}
                  <button type="submit" className="w-full btn-gold py-4 text-[11px] mt-4">
                    Request Appointment
                  </button>

                  <p className="text-center text-sm text-warm-gray-300 mt-6 font-light">
                    By booking, you agree to our <span className="underline">cancellation policy</span>.
                  </p>
                </form>
              )}
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
