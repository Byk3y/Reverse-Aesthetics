import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const newsOutlets = [
    { name: "CNN Africa", fontStyle: "font-bold" },
    { name: "Vanguard", fontStyle: "font-semibold" },
    { name: "ThisDay", fontStyle: "font-normal italic" },
    { name: "The Guardian Nigeria", fontStyle: "font-bold" },
    { name: "Punch", fontStyle: "font-semibold uppercase tracking-wider" },
  ];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Mobile Layout */}
      <div className="flex h-full flex-col lg:hidden">
        <div className="relative h-[52vh] min-h-[300px]">
          <Image
            src="/images/hero/hero-home.png"
            alt="Professional aesthetic treatment at Reverse Aesthetics"
            fill
            className="object-cover object-right -scale-x-100"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#F2F0F7]" />
          
          {/* Text overlay on image */}
          <div className="absolute bottom-20 left-0 right-0 px-6 z-10">
            <p className="text-xs font-medium uppercase tracking-wider text-white drop-shadow-md">
              Nigeria&apos;s Leading Aesthetic Clinic
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-[#F2F0F7]">
          <div className="-mt-12 h-12 bg-gradient-to-b from-transparent to-[#F2F0F7]" />
          <div className="px-6 -mt-4 py-8 space-y-4 text-gray-900 relative z-10">
            <h1 className="text-[2.5rem] font-normal leading-tight">
              Natural{" "}
              <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                transformations
              </span>
              .
              <br />
              <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Expertly
              </span>{" "}
              delivered.
            </h1>

            <p className="text-base leading-relaxed text-gray-700">
              Personalized, medically led treatments for skin, face, body, hair, and smile—designed to look like you,
              only refined.
            </p>

            <div className="pt-2 flex justify-center">
              <Link
                href="/bookings"
                className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-20 py-2 text-base font-semibold text-white uppercase tracking-wide shadow-xl transition hover:bg-purple-700 hover:shadow-2xl whitespace-nowrap w-full max-w-md"
              >
                Book Appointment
              </Link>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-800 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                GMC Registered • Award-winning medical team
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-800 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                Lagos &amp; Abuja Clinics
              </div>
            </div>
          </div>

          <div className="mt-auto pb-8">
            <div className="bg-white rounded-t-2xl shadow-md px-6 py-3 overflow-hidden">
              <div className="flex items-center gap-6">
                <span className="text-xs uppercase tracking-wider font-medium text-gray-600 whitespace-nowrap flex-shrink-0">Featured on</span>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-6 animate-scroll">
                    {/* First set */}
                    {newsOutlets.map((outlet) => (
                      <span
                        key={`first-${outlet.name}`}
                        className={`text-sm ${outlet.fontStyle} whitespace-nowrap text-gray-600 flex-shrink-0`}
                      >
                        {outlet.name}
                      </span>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {newsOutlets.map((outlet) => (
                      <span
                        key={`second-${outlet.name}`}
                        className={`text-sm ${outlet.fontStyle} whitespace-nowrap text-gray-600 flex-shrink-0`}
                      >
                        {outlet.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden h-full lg:block">
        <div className="relative h-full">
          <Image
            src="/images/hero/hero-home.png"
            alt="Professional aesthetic treatment at Reverse Aesthetics"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#FAF9FC]/92 via-[#F5F3F9]/75 to-transparent" />

          <div className="relative z-10 flex h-full items-center">
            <div className="w-full">
              <div className="flex flex-col px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
                <div className="max-w-lg space-y-4 text-gray-900">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-700">
                    Nigeria&apos;s Leading Aesthetic Clinic
                  </p>

                  <h1 className="text-5xl font-normal leading-tight xl:text-6xl">
                    Natural{" "}
                    <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                      transformations
                    </span>
                    .
                    <br />
                    <span className="italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                      Expertly
                    </span>{" "}
                    delivered.
                  </h1>

                  <p className="text-lg leading-relaxed text-gray-700">
                    Personalized, medically led treatments for skin, face, body, hair, and smile—designed to look like
                    you, only refined.
                  </p>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md px-4 py-2 border border-white/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                      <p className="text-xs font-medium text-gray-800">
                        GMC Registered • Award-winning medical team
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md px-4 py-2 border border-white/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                      <p className="text-xs font-medium text-gray-800">Lagos &amp; Abuja Clinics</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/bookings"
                      className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-12 py-5 text-lg font-semibold text-white uppercase tracking-wide shadow-lg transition hover:bg-purple-700 hover:shadow-xl"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="w-full px-8 py-4">
              <div className="bg-white rounded-t-2xl shadow-2xl px-8 py-4">
                <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 xl:gap-12">
                  <p className="text-gray-600 text-xs uppercase tracking-wider font-medium whitespace-nowrap">
                    Featured on
                  </p>
                  {newsOutlets.map((outlet) => (
                    <div
                      key={outlet.name}
                      className={`text-gray-800 text-sm lg:text-base xl:text-lg ${outlet.fontStyle} whitespace-nowrap`}
                    >
                      {outlet.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
