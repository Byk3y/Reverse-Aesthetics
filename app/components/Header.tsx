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
          ? "glass-nav"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav className="flex items-center justify-between py-5 lg:py-6">
          {/* Logo — Editorial: uppercase tracked + italic lowercase accent */}
          <Link
            href="/"
            className={`text-lg lg:text-xl font-bold uppercase tracking-[0.05em] transition-colors duration-300 ${isScrolled ? "text-charcoal" : "text-white lg:text-charcoal"}`}
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Reverse{" "}
            <span className="font-semibold">
              Aesthetics
            </span>
          </Link>

          {/* Mobile: Hamburger — thin editorial lines */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col gap-[7px] p-2 z-50 relative"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-[2px] transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-[9px] bg-charcoal" : isScrolled ? "bg-charcoal" : "bg-white"
              }`}
            />
            <span
              className={`w-6 h-[2px] transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : isScrolled ? "bg-charcoal" : "bg-white"
              }`}
            />
            <span
              className={`w-6 h-[2px] transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-[9px] bg-charcoal" : isScrolled ? "bg-charcoal" : "bg-white"
              }`}
            />
          </button>

          {/* Desktop Nav — Editorial: tiny uppercase, tracked, underline reveal */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 pb-1 ${
                  isActive(link.href)
                    ? "text-charcoal"
                    : "text-warm-gray-400 hover:text-charcoal"
                }`}
              >
                {link.label}
                {/* Active underline indicator */}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-bronze transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/booking"
              className="btn-gold text-[10px] py-3 px-7"
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
            className="absolute inset-0 bg-charcoal/15 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Menu Panel — Editorial: clean, generous spacing */}
          <div
            className={`absolute top-0 right-0 w-[80%] max-w-sm h-full bg-ivory shadow-2xl transition-transform duration-400 ease-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col pt-24 px-8 gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`text-base font-light uppercase tracking-[0.15em] py-4 transition-colors border-b border-warm-gray-100 ${
                    isActive(link.href)
                      ? "text-charcoal font-normal"
                      : "text-warm-gray-500 hover:text-charcoal"
                  }`}
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-8">
                <Link
                  href="/booking"
                  onClick={closeMenu}
                  className="btn-gold w-full text-center block"
                >
                  Book a Visit
                </Link>
              </div>

              {/* Contact info in mobile menu */}
              <div className="mt-10 pt-6 border-t border-warm-gray-100">
                <p className="text-[10px] uppercase tracking-[0.25em] text-warm-gray-500 mb-4 font-medium">
                  Get in touch
                </p>
                <a
                  href="tel:+2349159188094"
                  className="text-sm text-charcoal hover:text-bronze transition-colors block mb-2"
                >
                  +234 915 918 8094
                </a>
                <a
                  href="mailto:reverseaestheticsng@gmail.com"
                  className="text-sm text-warm-gray-500 hover:text-bronze transition-colors block"
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
