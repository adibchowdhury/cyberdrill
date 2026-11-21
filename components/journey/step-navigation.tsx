"use client";

import Link from "next/link";
import { STEPS, type StepId } from "@/lib/journey/steps";
import { useJourney } from "@/components/journey/journey-provider";

const primary =
  "inline-flex h-11 items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors";

const secondary =
  "inline-flex h-11 items-center justify-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors";

export function StepNavigation({ stepId }: { stepId: StepId }) {
  const { selectedJob, ready } = useJourney();
  const index = STEPS.findIndex((step) => step.id === stepId);
  const previous = index > 0 ? STEPS[index - 1] : undefined;
  const next = index >= 0 && index < STEPS.length - 1 ? STEPS[index + 1] : undefined;
  const blockNext = stepId === "jobs" && (!ready || !selectedJob);

  return (
    <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {previous ? (
          <Link href={previous.href} className={secondary}>
            Back to {previous.title}
          </Link>
        ) : (
          <span className="text-sm text-muted">Step 1 of 4</span>
        )}
      </div>
      {next ? (
        <div className="sm:text-right">
          {blockNext && ready ? (
            <p id="jobs-next-hint" className="mb-2 text-sm text-muted">
              Select a role to continue.
            </p>
          ) : null}
          {blockNext ? (
            <button type="button" className={`${primary} cursor-not-allowed opacity-50`} disabled aria-describedby={ready ? "jobs-next-hint" : undefined}>
              Next: {next.title}
            </button>
          ) : (
            <Link href={next.href} className={primary}>
              Next: {next.title}
            </Link>
          )}
        </div>
      ) : (
        <div className="max-w-md sm:text-right">
          <p className="text-sm leading-6 text-muted">
            When you are ready, review the training pathway or go back and change the role you are preparing for.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 sm:justify-end">
            <Link href="/training" className={secondary}>
              Review the pathway
            </Link>
            <Link href="/jobs" className={primary}>
              Change job
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
