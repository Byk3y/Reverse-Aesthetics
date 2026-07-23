"use client";

export interface CardOption {
  value: string;
  label: string;
  hint?: string;
}

interface OptionCardGroupProps {
  options: CardOption[];
  value: string | null;
  onChange: (value: string) => void;
  name: string;
}

export default function OptionCardGroup({
  options,
  value,
  onChange,
  name,
}: OptionCardGroupProps) {
  return (
    <div className="grid gap-[10px]">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-[14px] rounded-[12px] border-2 bg-white px-[18px] py-[15px] transition-all ${
              selected
                ? "border-[var(--color-clinic-teal)] shadow-[0_8px_22px_-10px_rgba(46,147,111,0.55)]"
                : "border-[rgba(35,32,29,0.14)] hover:border-[rgba(35,32,29,0.32)]"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span
              className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${
                selected
                  ? "bg-[var(--color-clinic-teal)]"
                  : "border-[1.5px] border-[rgba(35,32,29,0.28)]"
              }`}
            >
              {selected && <span className="h-[8px] w-[8px] rounded-full bg-white" />}
            </span>
            <span className="flex flex-col">
              <span className="text-[15.5px] font-semibold leading-[1.25] text-[var(--color-clinic-navy)]">
                {option.label}
              </span>
              {option.hint && (
                <span className="mt-[2px] text-[13px] leading-[1.4] text-[#6f6a64]">
                  {option.hint}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
