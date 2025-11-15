"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useAppointment } from "../contexts/AppointmentContext";

export default function BookAppointmentCard() {
  const pathname = usePathname();
  const { isOpen, closeAppointment } = useAppointment();
  const [formData, setFormData] = useState({
    location: "lagos",
    service: "",
    date: "",
    name: "",
    phone: "",
    email: "",
  });
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const services = [
    { category: "Aesthetics & Dermatology", services: ["Botox", "Dermal Fillers", "Skin Rejuvenation", "Acne Treatment", "HIFU", "Thread Lift"] },
    { category: "Hair Restoration", services: ["Hair Transplant", "Hair Regeneration", "Hairline Design", "Beard Transplant"] },
    { category: "Weight Loss", services: ["Medical Weight Loss", "Body Contouring", "Fat Reduction", "Wellness Programs"] },
    { category: "Dental", services: ["Teeth Whitening", "Veneers", "Smile Design", "Gum Contouring"] },
  ];

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close services dropdown when clicking outside
  useEffect(() => {
    if (!isServicesOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.services-dropdown-container')) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationSelect = (location: string) => {
    setFormData({
      ...formData,
      location: location,
    });
  };

  const handleServiceSelect = (service: string) => {
    setFormData({
      ...formData,
      service: service,
    });
    setIsServicesOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  // Close card when clicking on backdrop (not on card itself)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the backdrop, not on child elements
    if (e.target === e.currentTarget) {
      closeAppointment();
    }
  };

  // Prevent clicks inside the card from closing it
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Mobile: Bottom Sheet - Rendered via portal when open */}
      {isOpen && mounted && typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={handleBackdropClick}
            suppressHydrationWarning
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              margin: 0,
              padding: 0,
              zIndex: 9998,
              pointerEvents: 'auto',
            }}
          />
          
          {/* Card */}
          <div 
            className="lg:hidden fixed bottom-0 left-0 right-0 z-[9999] animate-slide-up" 
            ref={cardRef}
            onClick={handleCardClick}
            suppressHydrationWarning
            style={{ 
              pointerEvents: 'auto',
              zIndex: 9999,
            }}
          >
            <div className="bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 h-[60vh] flex flex-col" suppressHydrationWarning>
              <div className="flex-shrink-0 px-5 py-3 border-b border-gray-200" suppressHydrationWarning>
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <h2 className="text-lg font-semibold text-gray-900 text-center">Book Appointment</h2>
              </div>
              
              <div className="flex-1 overflow-hidden" suppressHydrationWarning>
                <form onSubmit={handleSubmit} className="h-full flex flex-col px-5 py-4" suppressHydrationWarning>
                  {/* Location Buttons */}
                  <div className="mb-3" suppressHydrationWarning>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Location</label>
                    <div className="flex gap-2" suppressHydrationWarning>
                      <button
                        type="button"
                        onClick={() => handleLocationSelect("lagos")}
                        className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                          formData.location === "lagos"
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Lagos
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLocationSelect("abuja")}
                        className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                          formData.location === "abuja"
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Abuja
                      </button>
                    </div>
                    <input
                      type="hidden"
                      name="location"
                      value={formData.location}
                      required
                    />
                  </div>

                  {/* Services Section */}
                  <div className="mb-3 relative services-dropdown-container" suppressHydrationWarning>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Service</label>
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-left flex items-center justify-between transition-all ${
                        formData.service
                          ? "bg-purple-50 border-purple-300 text-gray-900"
                          : "bg-white text-gray-500"
                      }`}
                    >
                      <span className={formData.service ? "text-gray-900" : "text-gray-500"}>
                        {formData.service || "Select a service"}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <input
                      type="hidden"
                      name="service"
                      value={formData.service}
                      required
                    />
                    
                    {/* Services Dropdown */}
                    {isServicesOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto" suppressHydrationWarning>
                        {services.map((category, idx) => (
                          <div key={idx} className="border-b border-gray-100 last:border-b-0" suppressHydrationWarning>
                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 uppercase tracking-wide" suppressHydrationWarning>
                              {category.category}
                            </div>
                            {category.services.map((service, serviceIdx) => (
                              <button
                                key={serviceIdx}
                                type="button"
                                onClick={() => handleServiceSelect(service)}
                                className={`w-full px-4 py-2.5 text-sm text-left hover:bg-purple-50 transition-colors ${
                                  formData.service === service ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-700"
                                }`}
                              >
                                {service}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Date and Phone Row */}
                  <div className="grid grid-cols-2 gap-2 mb-3" suppressHydrationWarning>
                    <div suppressHydrationWarning>
                      <label htmlFor="date" className="block text-xs font-medium text-gray-600 mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                    <div suppressHydrationWarning>
                      <label htmlFor="phone" className="block text-xs font-medium text-gray-600 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Phone number"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Full Name - Full Width */}
                  <div className="mb-3" suppressHydrationWarning>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>

                  {/* Email - Full Width */}
                  <div className="mb-4" suppressHydrationWarning>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-auto bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-sm uppercase tracking-wide shadow-lg transition hover:bg-purple-700 hover:shadow-xl"
                  >
                    Book Appointment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Desktop: Modal Overlay */}
      {isOpen && mounted && typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop - Clickable area */}
          <div 
            className="hidden lg:block fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]" 
            onClick={handleBackdropClick}
            suppressHydrationWarning
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              margin: 0,
              padding: 0,
              pointerEvents: 'auto',
            }}
          />
          
          {/* Desktop Card Modal Container */}
          <div 
            className="hidden lg:flex fixed inset-0 z-[9999] items-center justify-center p-4 pointer-events-none" 
            suppressHydrationWarning
            style={{ 
              zIndex: 9999,
            }}
          >
            {/* Desktop Card Modal */}
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto" 
              onClick={handleCardClick}
              suppressHydrationWarning
            >
            <div className="p-8 lg:p-10" suppressHydrationWarning>
            <div className="text-center mb-6" suppressHydrationWarning>
              <h2 className="text-3xl lg:text-4xl font-normal mb-2">
                Book an{" "}
                <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  Appointment
                </span>
              </h2>
              <p className="text-gray-600 text-base">
                Choose your location and provide your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
              {/* Location Buttons */}
              <div suppressHydrationWarning>
                <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                <div className="flex gap-3" suppressHydrationWarning>
                  <button
                    type="button"
                    onClick={() => handleLocationSelect("lagos")}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium text-base transition-all ${
                      formData.location === "lagos"
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Lagos
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocationSelect("abuja")}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium text-base transition-all ${
                      formData.location === "abuja"
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Abuja
                  </button>
                </div>
                <input
                  type="hidden"
                  name="location"
                  value={formData.location}
                  required
                />
              </div>

              {/* Services Section */}
              <div className="relative services-dropdown-container" suppressHydrationWarning>
                <label className="block text-sm font-medium text-gray-700 mb-3">Service</label>
                <button
                  type="button"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-left flex items-center justify-between transition-all ${
                    formData.service
                      ? "bg-purple-50 border-purple-300 text-gray-900"
                      : "bg-white text-gray-500"
                  }`}
                >
                  <span className={formData.service ? "text-gray-900" : "text-gray-500"}>
                    {formData.service || "Select a service"}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <input
                  type="hidden"
                  name="service"
                  value={formData.service}
                  required
                />
                
                {/* Services Dropdown */}
                {isServicesOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto" suppressHydrationWarning>
                    {services.map((category, idx) => (
                      <div key={idx} className="border-b border-gray-100 last:border-b-0" suppressHydrationWarning>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 uppercase tracking-wide" suppressHydrationWarning>
                          {category.category}
                        </div>
                        {category.services.map((service, serviceIdx) => (
                          <button
                            key={serviceIdx}
                            type="button"
                            onClick={() => handleServiceSelect(service)}
                            className={`w-full px-4 py-2.5 text-sm text-left hover:bg-purple-50 transition-colors ${
                              formData.service === service ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-700"
                            }`}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4" suppressHydrationWarning>
                {/* Date */}
                <div suppressHydrationWarning>
                  <label htmlFor="date-desktop" className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date-desktop"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                {/* Name */}
                <div suppressHydrationWarning>
                  <label htmlFor="name-desktop" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name-desktop"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div suppressHydrationWarning>
                  <label htmlFor="phone-desktop" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone-desktop"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div suppressHydrationWarning>
                  <label htmlFor="email-desktop" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email-desktop"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 bg-purple-600 text-white py-3.5 px-6 rounded-lg font-semibold uppercase tracking-wide shadow-lg transition hover:bg-purple-700 hover:shadow-xl"
              >
                Book Appointment
              </button>
            </form>
            </div>
          </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
