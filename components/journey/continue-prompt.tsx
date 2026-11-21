"use client";

import Link from "next/link";
import { JobSkeleton } from "@/components/journey/selected-job-bar";
import { useJourney } from "@/components/journey/journey-provider";

export function ContinuePrompt() {
  const { selectedJob, ready } = useJourney();
  if (!ready) return <JobSkeleton className="h-14" />;
  if (!selectedJob) return null;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-foreground">
        Continue with <span className="font-semibold">{selectedJob.title}</span>
      </p>
      <Link
        href="/assessment"
        className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        Continue
      </Link>
    </div>
  );
}
