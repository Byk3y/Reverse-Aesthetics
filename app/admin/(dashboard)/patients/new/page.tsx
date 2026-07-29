import Link from "next/link";
import PatientForm from "../../../../components/admin/patients/PatientForm";

export default function NewPatientPage() {
  return (
    <main className="mx-auto max-w-[820px] px-[20px] py-[28px] md:px-[36px] md:py-[38px]">
      <Link
        href="/admin/patients"
        className="text-[13px] font-semibold text-[#8a857f] transition-colors hover:text-[var(--color-clinic-teal)]"
      >
        ← All patients
      </Link>

      <h1
        className="mb-[8px] mt-[10px] text-[27px] font-semibold tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[31px]"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        Add a patient
      </h1>
      <p className="mb-[26px] max-w-[520px] text-[14px] leading-[1.6] text-[#8a857f]">
        For walk-ins and phone enquiries. If they can fill it in themselves,
        send them the intake link instead — fewer typos, and the consent tick
        comes from them rather than from you.
      </p>

      <PatientForm />
    </main>
  );
}
