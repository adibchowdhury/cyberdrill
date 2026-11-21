import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/journey/page-header";

export const metadata: Metadata = { title: "How it works" };

const steps = [
  {
    title: "Choose a Job",
    description:
      "Pick the cybersecurity role you want to prepare for. The later steps use that role as their context.",
  },
  {
    title: "Find Skill Gaps",
    description:
      "A practical check will show which parts of the role you can already do. That assessment is still being built, so nothing is scored yet.",
  },
  {
    title: "Train",
    description:
      "Practice the responsibilities of the role you chose. The training modules are still being built.",
  },
  {
    title: "Prove Skills",
    description:
      "A later assessment is where you would show the work. That assessment is not available yet.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="How it works"
        description="CyberDrill follows four steps from a target job through practice and a later assessment. Training and assessments are still being built."
      />
      <ol className="grid gap-4">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-xl border border-line bg-surface p-5 shadow-sm">
            <p className="font-mono text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{step.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
      <Link
        href="/jobs"
        className="inline-flex h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors"
      >
        Explore Careers
      </Link>
    </div>
  );
}
