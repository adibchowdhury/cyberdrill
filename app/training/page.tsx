import type { Metadata } from "next";
import { ComingSoon } from "@/components/journey/coming-soon";
import { EmptyState } from "@/components/journey/empty-state";
import { JobGate } from "@/components/journey/job-gate";
import { PageHeader } from "@/components/journey/page-header";
import { StepNavigation } from "@/components/journey/step-navigation";
import { StepProgress } from "@/components/journey/step-progress";
import { TrainingModuleCard } from "@/components/journey/training-module-card";
import { getPathway } from "@/lib/journey/pathways";
import { getStep } from "@/lib/journey/steps";

const step = getStep("training");
const pathway = getPathway("vulnerability-management-analyst");

export const metadata: Metadata = { title: step.title };

const kinds = [
  { label: "Learn", text: "Read the idea well enough to explain it in the language of the job." },
  { label: "Practice", text: "Work a bounded task with the materials an analyst would look at." },
  { label: "Apply", text: "Make a decision and write down the evidence for it." },
  { label: "Demonstrate", text: "Show the same work in the assessment, once that assessment exists." },
];

export default function TrainingPage() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow={`Step ${step.number}`} title={step.title} description={step.description} />
      <StepProgress current="training" />
      <div className="max-w-3xl space-y-3 text-sm leading-6 text-muted">
        <p>
          Training moves from learning a concept, to practicing it, to applying it on a realistic responsibility.
          Demonstrating it comes later, in the assessment. Learning the fundamentals is the reading. Applying the
          knowledge is doing the check and recording the result.
        </p>
        <p>When the diagnostic exists, this pathway will be tailored to the gaps it finds. It is the full pathway for now.</p>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kinds.map((item) => (
          <li key={item.label} className="rounded-xl border border-line bg-surface p-4">
            <p className="text-sm font-semibold text-foreground">{item.label}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
          </li>
        ))}
      </ol>
      <JobGate>
        {pathway ? (
          <>
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Pathway</h2>
              <ol className="grid gap-4">
                {pathway.modules.map((module) => (
                  <li key={module.id}>
                    <TrainingModuleCard module={module} />
                  </li>
                ))}
              </ol>
            </section>
            <ComingSoon title="Practical challenges">
              <p>
                Later challenges will use the materials of this job: scanner output, an asset list, a scan that
                failed, a misconfiguration, and a remediation workflow. None of that is built in this version, and
                there is no simulation to start.
              </p>
            </ComingSoon>
            <EmptyState title="Progress">
              Training progress will show which modules you have actually finished. There is no count, bar, or
              percentage until that work exists.
            </EmptyState>
          </>
        ) : null}
      </JobGate>
      <StepNavigation stepId="training" />
    </div>
  );
}
