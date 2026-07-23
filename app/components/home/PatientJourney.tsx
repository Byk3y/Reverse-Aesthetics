import { JOURNEY } from "./homeData";

export function PatientJourney() {
  return (
    <section id="how-it-works" className="bg-white pb-[42px] pt-[36px] md:pb-[52px] md:pt-[44px]">
      <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
        <div className="motion-heading mb-[34px] max-w-[640px]">
          <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
            How it works
          </p>
          <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
            From first message to a clear, natural-first plan.
          </h2>
        </div>

        <div className="reveal-on-scroll relative rounded-[8px] border border-[#e6ece7] bg-[#f8fbf9] px-[18px] py-[28px] md:px-[34px] md:py-[38px]">
          <div className="absolute bottom-[52px] left-[45px] top-[52px] w-px bg-[#cfdcd4] md:bottom-auto md:left-[90px] md:right-[90px] md:top-[68px] md:h-px md:w-auto" />
          <div className="grid gap-[34px] md:grid-cols-3 md:gap-[24px]">
            {JOURNEY.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="motion-card relative grid grid-cols-[54px_1fr] gap-[14px] md:block md:pt-[58px]"
                >
                  <div className="relative z-[1] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white shadow-[0_0_0_8px_#f8fbf9] md:absolute md:left-0 md:top-0">
                    <span className="absolute -right-[3px] -top-[3px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[var(--color-clinic-navy)] text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                    <Icon className="h-[23px] w-[23px] text-[var(--color-clinic-teal)]" aria-hidden />
                  </div>

                  <div className="pb-[4px] md:max-w-[280px]">
                    <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#9aa7a2]">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-[12px] text-[22px] font-bold tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[24px]">
                      {step.title}
                    </h3>
                    <p className="mt-[10px] text-[14px] leading-[1.65] text-[#65716e]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
