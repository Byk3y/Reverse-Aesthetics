"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/clinics", label: "Clinics" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-nav shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav className="flex items-center justify-between py-4 lg:py-5">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl lg:text-2xl font-semibold tracking-tight text-plum"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Reverse <span className="italic font-normal">Aesthetics</span>
          </Link>

          {/* Mobile: Hamburger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col gap-1.5 p-2 z-50 relative"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-plum rounded-full transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-plum rounded-full transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-plum rounded-full transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-purple-600"
                    : "text-plum-muted hover:text-purple-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="btn-gold text-xs py-3 px-6"
            >
              Book a Visit
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-400 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-plum/20 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div
            className={`absolute top-0 right-0 w-[80%] max-w-sm h-full bg-ivory shadow-2xl transition-transform duration-400 ease-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col pt-24 px-8 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`text-lg font-medium py-3 transition-colors border-b border-warm-gray-100 ${
                    isActive(link.href)
                      ? "text-purple-600"
                      : "text-plum hover:text-purple-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6">
                <Link
                  href="/booking"
                  onClick={closeMenu}
                  className="btn-gold w-full text-center block"
                >
                  Book a Visit
                </Link>
              </div>

              {/* Contact info in mobile menu */}
              <div className="mt-8 pt-6 border-t border-warm-gray-100">
                <p className="text-xs uppercase tracking-wider text-plum-muted mb-3 font-medium">
                  Get in touch
                </p>
                <a
                  href="tel:+2349159188094"
                  className="text-sm text-plum hover:text-purple-600 transition-colors block mb-2"
                >
                  +234 915 918 8094
                </a>
                <a
                  href="mailto:reverseaestheticsng@gmail.com"
                  className="text-sm text-plum-muted hover:text-purple-600 transition-colors block"
                >
                  reverseaestheticsng@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
