import Link from "next/link";
import { notFound } from "next/navigation";
import PatientForm from "../../../../../components/admin/patients/PatientForm";
import { getPatient } from "../../../../../lib/patients/queries";

export default async function EditPatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = await getPatient(id);

  if (!patient) notFound();

  return (
    <main className="mx-auto max-w-[820px] px-[20px] py-[28px] md:px-[36px] md:py-[38px]">
      <Link
        href={`/admin/patients/${patient.id}`}
        className="text-[13px] font-semibold text-[#8a857f] transition-colors hover:text-[var(--color-clinic-teal)]"
      >
        ← {patient.full_name}
      </Link>

      <h1
        className="mb-[26px] mt-[10px] text-[27px] font-semibold tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[31px]"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        Edit details
      </h1>

      <PatientForm patient={patient} />
    </main>
  );
}
