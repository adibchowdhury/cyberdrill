import { ComingSoon } from "@/components/journey/coming-soon";

const planned = [
  "You get a short practical case drawn from the target job, not a trivia quiz.",
  "You work the parts of the job the competencies describe, such as checking evidence and explaining a decision.",
  "CyberDrill compares what you could do with the competency list for that role.",
  "The result names areas to practice. It does not invent a hiring score.",
];

export function AssessmentPreview() {
  return (
    <ComingSoon title="Diagnostic assessment">
      <p>The diagnostic is planned. There are no questions to answer in this version.</p>
      <ol className="list-decimal space-y-2 pl-5">
        {planned.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </ComingSoon>
  );
}
