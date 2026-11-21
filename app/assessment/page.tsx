import type { Metadata } from "next";
import { AssessmentPreview } from "@/components/journey/assessment-preview";
import { CompetencyCard } from "@/components/journey/competency-card";
import { EmptyState } from "@/components/journey/empty-state";
import { JobGate } from "@/components/journey/job-gate";
import { PageHeader } from "@/components/journey/page-header";
import { StepNavigation } from "@/components/journey/step-navigation";
import { StepProgress } from "@/components/journey/step-progress";
import { getPathway } from "@/lib/journey/pathways";
import { getStep } from "@/lib/journey/steps";

const step = getStep("assessment");
const pathway = getPathway("vulnerability-management-analyst");

export const metadata: Metadata = { title: step.title };

export default function AssessmentPage() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow={`Step ${step.number}`} title={step.title} description={step.description} />
      <StepProgress current="assessment" />
      <p className="max-w-3xl text-sm leading-6 text-muted">
        The diagnostic will be a practical check of the competencies for your target job. It is not built yet, so
        nothing here is scored and every area stays marked not yet assessed.
      </p>
      <JobGate>
        {pathway ? (
          <>
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Competencies for this role</h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {pathway.competencies.map((competency) => (
                  <li key={competency.id}>
                    <CompetencyCard competency={competency} />
                  </li>
                ))}
              </ul>
            </section>
            <AssessmentPreview />
            <EmptyState title="Results">
              Results appear here after a diagnostic exists. This page does not show a score, a sample of your data,
              or a completed assessment.
            </EmptyState>
          </>
        ) : null}
      </JobGate>
      <StepNavigation stepId="assessment" />
    </div>
  );
}
