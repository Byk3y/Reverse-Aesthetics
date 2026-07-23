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
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<{ y: number; time: number } | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null);

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

  // Prevent body scroll when card is open
  useEffect(() => {
    if (isOpen) {
      // Prevent background scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Restore scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

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

    // Format the message for WhatsApp
    const locationCapitalized = formData.location.charAt(0).toUpperCase() + formData.location.slice(1);

    // Format date to be more readable (e.g., "2025-11-17" -> "November 17, 2025")
    const formatDate = (dateString: string) => {
      if (!dateString) return dateString;
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const message = `Hello! I would like to book an appointment at Reverse Aesthetics:

📍 *Location:* ${locationCapitalized}
💆 *Service:* ${formData.service}
📅 *Preferred Date:* ${formatDate(formData.date)}
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📧 *Email:* ${formData.email}

Please confirm if this date works for you. Thank you!`;

    // Create WhatsApp URL
    const phoneNumber = '2349159188094'; // Clinic WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Close the modal after a short delay
    setTimeout(() => {
      closeAppointment();
      // Reset form
      setFormData({
        location: "lagos",
        service: "",
        date: "",
        name: "",
        phone: "",
        email: "",
      });
    }, 500);
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

  // Swipe to close handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only allow swipe from the drag handle area (top section with gray bar)
    const target = e.target as HTMLElement;
    const isInDragHandle = dragHandleRef.current?.contains(target) ||
                          target.closest('.drag-handle-area') !== null;

    if (isInDragHandle) {
      e.stopPropagation();
      setTouchStart({
        y: e.touches[0].clientY,
        time: Date.now(),
      });
      setTouchCurrent(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    e.preventDefault(); // Prevent page scroll when dragging
    const currentY = e.touches[0].clientY;
    setTouchCurrent(currentY);

    // Only allow downward swipes
    const deltaY = currentY - touchStart.y;
    if (deltaY > 0 && cardRef.current) {
      // Apply transform to card for visual feedback
      const maxTransform = Math.min(deltaY, 300); // Limit max transform
      cardRef.current.style.transform = `translateY(${maxTransform}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || touchCurrent === null) {
      setTouchStart(null);
      setTouchCurrent(null);
      return;
    }

    const deltaY = touchCurrent - touchStart.y;
    const deltaTime = Date.now() - touchStart.time;
    const velocity = deltaY / deltaTime;

    // Reset transform
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }

    // Close if swiped down more than 100px or with sufficient velocity
    if (deltaY > 100 || (deltaY > 50 && velocity > 0.3)) {
      closeAppointment();
    }

    setTouchStart(null);
    setTouchCurrent(null);
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            suppressHydrationWarning
            style={{
              pointerEvents: 'auto',
              zIndex: 9999,
              transition: touchStart === null ? 'transform 0.2s ease-out' : 'none',
            }}
          >
            <div className="bg-white rounded-t-[20px] shadow-sm border-t border-warm-gray-100 max-h-[85vh] flex flex-col" suppressHydrationWarning>
              <div
                ref={dragHandleRef}
                className="drag-handle-area flex-shrink-0 px-5 py-3 border-b border-warm-gray-100 cursor-grab active:cursor-grabbing"
                suppressHydrationWarning
              >
                <div className="w-12 h-1 bg-warm-gray-200 rounded-full mx-auto mb-2"></div>
                <h2 className="text-lg font-semibold text-charcoal text-center" style={{ fontFamily: 'var(--font-display), sans-serif' }}>Book Appointment</h2>
              </div>

              <div
                className="flex-1 overflow-y-auto overscroll-contain"
                suppressHydrationWarning
                style={{ touchAction: 'pan-y' }}
                onTouchStart={(e) => {
                  // Prevent swipe-to-close when touching form content
                  const target = e.target as HTMLElement;
                  if (!dragHandleRef.current?.contains(target) &&
                      target.closest('.drag-handle-area') === null) {
                    if (touchStart !== null) {
                      setTouchStart(null);
                      setTouchCurrent(null);
                    }
                  }
                }}
              >
                <form onSubmit={handleSubmit} className="flex flex-col px-5 py-3 pb-4" suppressHydrationWarning>
                  {/* Location Buttons */}
                  <div className="mb-2.5" suppressHydrationWarning>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-2">Location</label>
                    <div className="flex gap-2" suppressHydrationWarning>
                      <button
                        type="button"
                        onClick={() => handleLocationSelect("lagos")}
                        className={`flex-1 px-4 py-3 font-medium text-sm rounded-[12px] transition-all ${
                          formData.location === "lagos"
                            ? "bg-bronze text-white"
                            : "bg-warm-gray-50 text-charcoal hover:bg-warm-gray-100"
                        }`}
                      >
                        Lagos
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLocationSelect("abuja")}
                        className={`flex-1 px-4 py-3 font-medium text-sm rounded-[12px] transition-all ${
                          formData.location === "abuja"
                            ? "bg-bronze text-white"
                            : "bg-warm-gray-50 text-charcoal hover:bg-warm-gray-100"
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
                  <div className="mb-2.5 relative services-dropdown-container" suppressHydrationWarning>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-2">Service</label>
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`w-full px-3 py-2 text-sm border rounded-[12px] text-left flex items-center justify-between transition-all ${
                        formData.service
                          ? "bg-ivory border-bronze text-charcoal"
                          : "bg-white border-warm-gray-100 text-warm-gray-400"
                      }`}
                    >
                      <span className={formData.service ? "text-charcoal" : "text-warm-gray-400"}>
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
                      <div className="absolute z-10 w-full mt-1 bg-white border border-warm-gray-100 rounded-[12px] shadow-sm max-h-64 overflow-y-auto" suppressHydrationWarning>
                        {services.map((category, idx) => (
                          <div key={idx} className="border-b border-warm-gray-100 last:border-b-0" suppressHydrationWarning>
                            <div className="px-3 py-2 text-[11px] font-medium text-bronze bg-ivory uppercase tracking-[0.25em]" suppressHydrationWarning>
                              {category.category}
                            </div>
                            {category.services.map((service, serviceIdx) => (
                              <button
                                key={serviceIdx}
                                type="button"
                                onClick={() => handleServiceSelect(service)}
                                className={`w-full px-4 py-2.5 text-sm text-left hover:bg-ivory transition-colors ${
                                  formData.service === service ? "bg-ivory text-bronze font-medium" : "text-charcoal"
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
                  <div className="grid grid-cols-2 gap-4 mb-2.5" suppressHydrationWarning>
                    <div className="min-w-0" suppressHydrationWarning>
                      <label htmlFor="date" className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-1.5">
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
                        className="w-full px-2.5 py-2 text-base border border-warm-gray-100 rounded-[12px] focus:ring-2 focus:ring-bronze focus:border-transparent box-border"
                      />
                    </div>
                    <div className="min-w-0" suppressHydrationWarning>
                      <label htmlFor="phone" className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-1.5">
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
                        className="w-full px-2.5 py-2 text-base border border-warm-gray-100 rounded-[12px] focus:ring-2 focus:ring-bronze focus:border-transparent box-border"
                      />
                    </div>
                  </div>

                  {/* Full Name - Full Width */}
                  <div className="mb-2.5" suppressHydrationWarning>
                    <label htmlFor="name" className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-1.5">
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
                      className="w-full px-3 py-2 text-base border border-warm-gray-100 rounded-[12px] focus:ring-2 focus:ring-bronze focus:border-transparent"
                    />
                  </div>

                  {/* Email - Full Width */}
                  <div className="mb-2.5" suppressHydrationWarning>
                    <label htmlFor="email" className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-1.5">
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
                      className="w-full px-3 py-2 text-base border border-warm-gray-100 rounded-[12px] focus:ring-2 focus:ring-bronze focus:border-transparent"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-4 mb-2 bg-bronze text-white py-4 px-6 font-semibold text-[13px] uppercase tracking-[0.08em] rounded-[20px] transition hover:bg-bronze-dark"
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
              className="bg-white border border-warm-gray-100 max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={handleCardClick}
              suppressHydrationWarning
            >
            <div className="p-8 lg:p-10" suppressHydrationWarning>
            <div className="text-center mb-6" suppressHydrationWarning>
              <h2 className="text-3xl lg:text-4xl font-light mb-2 text-charcoal">
                Book an{" "}
                <span className="italic" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                  Appointment
                </span>
              </h2>
              <p className="text-warm-gray-400 font-light text-base">
                Choose your location and provide your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
              {/* Location Buttons */}
              <div suppressHydrationWarning>
                <label className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-3">Location</label>
                <div className="flex gap-3" suppressHydrationWarning>
                  <button
                    type="button"
                    onClick={() => handleLocationSelect("lagos")}
                    className={`flex-1 px-6 py-3 font-medium text-base rounded-[12px] transition-all ${
                      formData.location === "lagos"
                        ? "bg-bronze text-white"
                        : "bg-warm-gray-50 text-charcoal hover:bg-warm-gray-100"
                    }`}
                  >
                    Lagos
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocationSelect("abuja")}
                    className={`flex-1 px-6 py-3 font-medium text-base rounded-[12px] transition-all ${
                      formData.location === "abuja"
                        ? "bg-bronze text-white"
                        : "bg-warm-gray-50 text-charcoal hover:bg-warm-gray-100"
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
                <label className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-3">Service</label>
                <button
                  type="button"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`w-full px-4 py-2.5 border rounded-[12px] text-left flex items-center justify-between transition-all ${
                    formData.service
                      ? "bg-ivory border-bronze text-charcoal"
                      : "bg-white border-warm-gray-100 text-warm-gray-400"
                  }`}
                >
                  <span className={formData.service ? "text-charcoal" : "text-warm-gray-400"}>
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
                  <div className="absolute z-10 w-full mt-1 bg-white border border-warm-gray-100 rounded-[12px] shadow-sm max-h-80 overflow-y-auto" suppressHydrationWarning>
                    {services.map((category, idx) => (
                      <div key={idx} className="border-b border-warm-gray-100 last:border-b-0" suppressHydrationWarning>
                        <div className="px-4 py-2 text-[11px] font-medium text-bronze bg-ivory uppercase tracking-[0.25em]" suppressHydrationWarning>
                          {category.category}
                        </div>
                        {category.services.map((service, serviceIdx) => (
                          <button
                            key={serviceIdx}
                            type="button"
                            onClick={() => handleServiceSelect(service)}
                            className={`w-full px-4 py-2.5 text-sm text-left hover:bg-ivory transition-colors ${
                              formData.service === service ? "bg-ivory text-bronze font-medium" : "text-charcoal"
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
                  <label htmlFor="date-desktop" className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-2">
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
                    className="w-full px-4 py-2.5 border border-warm-gray-100 rounded-[12px] focus:ring-2 focus:ring-bronze focus:border-transparent"
                  />
                </div>

                {/* Name */}
                <div suppressHydrationWarning>
                  <label htmlFor="name-desktop" className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-2">
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
                    className="w-full px-4 py-2.5 border border-warm-gray-100 rounded-[12px] focus:ring-2 focus:ring-bronze focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div suppressHydrationWarning>
                  <label htmlFor="phone-desktop" className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-2">
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
                    className="w-full px-4 py-2.5 border border-warm-gray-100 rounded-[12px] focus:ring-2 focus:ring-bronze focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div suppressHydrationWarning>
                  <label htmlFor="email-desktop" className="block text-[11px] font-medium uppercase tracking-[0.25em] text-bronze mb-2">
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
                    className="w-full px-4 py-2.5 border border-warm-gray-100 rounded-[12px] focus:ring-2 focus:ring-bronze focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 bg-bronze text-white py-4 px-6 font-semibold text-[13px] uppercase tracking-[0.08em] rounded-[20px] transition hover:bg-bronze-dark"
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
