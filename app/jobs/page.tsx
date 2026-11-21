import type { Metadata } from "next";
import { JobCatalog } from "@/components/journey/job-catalog";
import { PageHeader } from "@/components/journey/page-header";
import { StepNavigation } from "@/components/journey/step-navigation";
import { StepProgress } from "@/components/journey/step-progress";
import { getStep } from "@/lib/journey/steps";

const step = getStep("jobs");

export const metadata: Metadata = { title: step.title };

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow={`Step ${step.number}`} title={step.title} description={step.description} />
      <StepProgress current="jobs" />
      <p className="max-w-3xl text-sm leading-6 text-muted">
        One role can be selected. The others are listed so the map is visible, and they cannot be selected yet.
        Career level is an approximate band for the kind of work, not a promise about a particular job.
      </p>
      <JobCatalog />
      <StepNavigation stepId="jobs" />
    </div>
  );
}
