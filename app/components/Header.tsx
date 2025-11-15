"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppointment } from "../contexts/AppointmentContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openAppointment } = useAppointment();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 lg:pt-4" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl lg:px-0 xl:px-0" suppressHydrationWarning>
        {/* Navigation Bar - Sticky on Mobile, Floating on Desktop */}
        <nav className="bg-white/40 backdrop-blur-2xl lg:rounded-2xl shadow-2xl border border-white/40 w-full py-2 lg:py-4 backdrop-saturate-150">
          <div className="flex items-center justify-between px-4 lg:px-16 xl:px-24" suppressHydrationWarning>
            {/* Logo */}
            <Link href="/" className="text-lg lg:text-xl font-semibold text-gray-900 ml-0 lg:-ml-8">
              Reverse Aesthetics
            </Link>

            {/* Mobile: Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="lg:hidden flex flex-col gap-1.5 p-2 z-50 relative"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`w-6 h-0.5 bg-gray-900 rounded transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-900 rounded transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-900 rounded transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>

            {/* Desktop: Navigation Links */}
            <div className="hidden lg:flex items-center gap-8" suppressHydrationWarning>
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/clinics"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                Clinics
              </Link>
              <Link
                href="/#book"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                Bookings
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                Contact
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openAppointment();
                }}
                className="ml-4 rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white uppercase tracking-wide shadow-lg transition hover:bg-purple-700 hover:shadow-xl"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Mobile: Dropdown Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            suppressHydrationWarning
          >
            <div className="px-4 py-6 space-y-4 border-t border-white/20 mt-2" suppressHydrationWarning>
              <Link
                href="/"
                onClick={closeMenu}
                className="block text-base font-medium text-gray-700 hover:text-purple-600 transition-colors py-2"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={closeMenu}
                className="block text-base font-medium text-gray-700 hover:text-purple-600 transition-colors py-2"
              >
                About
              </Link>
              <Link
                href="/clinics"
                onClick={closeMenu}
                className="block text-base font-medium text-gray-700 hover:text-purple-600 transition-colors py-2"
              >
                Clinics
              </Link>
                  <Link
                    href="/#book"
                    onClick={closeMenu}
                    className="block text-base font-medium text-gray-700 hover:text-purple-600 transition-colors py-2"
                  >
                    Bookings
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="block text-base font-medium text-gray-700 hover:text-purple-600 transition-colors py-2"
                  >
                    Contact
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      openAppointment();
                    }}
                    className="block w-full mt-4 rounded-lg bg-purple-600 px-6 py-3 text-base font-semibold text-white uppercase tracking-wide shadow-lg transition hover:bg-purple-700 hover:shadow-xl text-center"
                  >
                    Book Appointment
                  </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

