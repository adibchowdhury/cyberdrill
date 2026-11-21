import type { Metadata } from "next";
import { ComingSoon } from "@/components/journey/coming-soon";
import { EmptyState } from "@/components/journey/empty-state";
import { JobGate } from "@/components/journey/job-gate";
import { PageHeader } from "@/components/journey/page-header";
import { StepNavigation } from "@/components/journey/step-navigation";
import { StepProgress } from "@/components/journey/step-progress";
import { getPathway } from "@/lib/journey/pathways";
import { getStep } from "@/lib/journey/steps";

const step = getStep("demonstrate");
const pathway = getPathway("vulnerability-management-analyst");

export const metadata: Metadata = { title: step.title };

export default function DemonstratePage() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow={`Step ${step.number}`} title={step.title} description={step.description} />
      <StepProgress current="demonstrate" />
      <p className="max-w-3xl text-sm leading-6 text-muted">
        This step is where finished work would be recorded. Nothing here is a certificate, a badge, or a score.
      </p>
      <JobGate>
        {pathway ? (
          <>
            <ComingSoon title={pathway.finalAssessment.title}>
              <p>{pathway.finalAssessment.description}</p>
              <p className="font-medium text-foreground">Planned tasks</p>
              <ul className="list-disc space-y-1 pl-5">
                {pathway.finalAssessment.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </ComingSoon>
            <EmptyState title="Demonstrated competencies">
              Competencies you have shown in an assessment will be listed here. None have been demonstrated.
            </EmptyState>
            <EmptyState title="Assessment history">
              Finished assessments will be listed here. There is no history yet.
            </EmptyState>
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Shareable portfolio</h2>
              <p className="max-w-3xl text-sm leading-6 text-muted">
                A portfolio page is planned. These sections describe what it would hold. There is no share action.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {pathway.portfolioSections.map((section) => (
                  <li key={section.title} className="rounded-xl border border-dashed border-warning/40 bg-surface p-5">
                    <p className="text-xs font-medium text-warning-text">Planned</p>
                    <h3 className="mt-2 text-base font-semibold">{section.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{section.description}</p>
                  </li>
                ))}
              </ul>
            </section>
            <EmptyState title="Job readiness">
              No score is shown until real assessments exist. This page does not estimate whether you are ready for
              a job.
            </EmptyState>
          </>
        ) : null}
      </JobGate>
      <StepNavigation stepId="demonstrate" />
    </div>
  );
}
