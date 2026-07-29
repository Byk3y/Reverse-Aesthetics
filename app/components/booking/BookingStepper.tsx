"use client";

const STEPS = [
  { label: "Clinic" },
  { label: "Treatment" },
  { label: "Time" },
];

export default function BookingStepper({ currentIndex }: { currentIndex: number }) {
  return (
    <nav aria-label="Booking progress">
      <ul className="flex items-center">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          return (
            <li key={step.label} className="flex items-center">
              <div
                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:h-[30px] sm:w-[30px]"
                style={{
                  borderColor: isActive
                    ? "var(--color-clinic-violet)"
                    : isCompleted
                      ? "var(--color-clinic-teal)"
                      : "rgba(35,32,29,0.22)",
                  background: isCompleted ? "var(--color-clinic-teal)" : "transparent",
                }}
              >
                {isCompleted ? (
                  <svg className="h-[11px] w-[11px]" viewBox="0 0 14 11" fill="none">
                    <path
                      d="M1 5.5L5 9.5L13 1.5"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : isActive ? (
                  <span className="h-[8px] w-[8px] rounded-full bg-[var(--color-clinic-violet)]" />
                ) : null}
              </div>
              <span
                className={`ml-[6px] text-[13px] font-semibold whitespace-nowrap sm:text-[14px] ${
                  isActive ? "" : "hidden sm:inline"
                }`}
                style={{
                  color: isActive
                    ? "var(--color-clinic-violet-dark)"
                    : isCompleted
                      ? "var(--color-clinic-teal)"
                      : "rgba(35,32,29,0.38)",
                }}
              >
                {step.label}
              </span>
              {index < STEPS.length - 1 && (
                <div
                  className="mx-[8px] h-[2px] w-[36px] shrink-0 sm:w-[70px]"
                  style={{
                    background:
                      index < currentIndex
                        ? "var(--color-clinic-teal)"
                        : "rgba(35,32,29,0.15)",
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
