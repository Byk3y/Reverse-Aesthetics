import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4">
      <div className="mx-auto max-w-7xl px-4 lg:px-0 xl:px-0">
        {/* Floating Navigation Bar */}
        <nav className="bg-white/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 w-full py-2 lg:py-4 backdrop-saturate-150">
          <div className="flex items-center justify-between px-4 lg:px-16 xl:px-24">
            {/* Logo */}
            <Link href="/" className="text-lg lg:text-xl font-semibold text-gray-900 ml-0 lg:-ml-8">
              Reverse Aesthetics
            </Link>

            {/* Mobile: Hamburger Menu */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <span className="w-6 h-0.5 bg-gray-900 rounded"></span>
              <span className="w-6 h-0.5 bg-gray-900 rounded"></span>
              <span className="w-6 h-0.5 bg-gray-900 rounded"></span>
            </button>

            {/* Desktop: Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
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
                href="/bookings"
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
              <Link
                href="/bookings"
                className="ml-4 rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white uppercase tracking-wide shadow-lg transition hover:bg-purple-700 hover:shadow-xl"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

