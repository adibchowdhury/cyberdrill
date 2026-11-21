"use client";

import Link from "next/link";
import { STEPS, type StepId } from "@/lib/journey/steps";
import { useJourney } from "@/components/journey/journey-provider";

function statusLabel(stepNumber: number, currentNumber: number, hasJob: boolean): string {
  if (stepNumber === 1) {
    if (hasJob) return "Completed";
    return stepNumber === currentNumber ? "Current" : "Next";
  }
  if (stepNumber === currentNumber) return "Preview";
  return "Not started";
}

export function StepProgress({ current }: { current: StepId }) {
  const { selectedJob, ready } = useJourney();
  const currentStep = STEPS.find((step) => step.id === current) ?? STEPS[0];

  return (
    <nav aria-label="Journey steps">
      <ol className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STEPS.map((step, index) => {
          const active = step.id === current;
          const label = ready ? statusLabel(step.number, currentStep.number, Boolean(selectedJob)) : "";
          return (
            <li key={step.id} className="min-w-0">
              <Link
                href={step.href}
                aria-current={active ? "step" : undefined}
                className={`flex h-full min-w-0 flex-col rounded-xl border px-3 py-3 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors ${
                  active
                    ? "border-accent bg-accent/5 shadow-sm"
                    : "border-line bg-surface hover:bg-raised"
                } ${index > 0 ? "lg:relative" : ""}`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                      active ? "bg-accent text-on-accent" : "bg-raised text-foreground"
                    }`}
                  >
                    {step.number}
                  </span>
                  {ready ? (
                    <span className="text-[11px] font-medium tracking-wide text-muted uppercase">{label}</span>
                  ) : (
                    <span className="inline-block h-3 w-16 rounded bg-raised" aria-hidden="true" />
                  )}
                </span>
                <span className="mt-2 text-sm font-semibold leading-5 text-foreground">{step.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
