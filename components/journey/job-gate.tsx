"use client";

import type { ReactNode } from "react";
import { NoJobPrompt } from "@/components/journey/no-job-prompt";
import { JobSkeleton, SelectedJobBar } from "@/components/journey/selected-job-bar";
import { useJourney } from "@/components/journey/journey-provider";

export function JobGate({ children }: { children: ReactNode }) {
  const { selectedJob, ready } = useJourney();
  if (!ready) return <JobSkeleton className="h-40" />;
  if (!selectedJob) return <NoJobPrompt />;
  return (
    <div className="space-y-8">
      <SelectedJobBar job={selectedJob} />
      {children}
    </div>
  );
}
