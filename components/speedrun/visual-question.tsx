"use client";

import { ChoiceQuestion } from "@/components/speedrun/choice-question";
import type { VisualQuestion as VisualQuestionData } from "@/lib/pathways";

export function VisualQuestion({
  question,
  onScored,
}: {
  question: VisualQuestionData;
  onScored: (correct: boolean) => void;
}) {
  return (
    <ChoiceQuestion
      prompt={question.prompt}
      choices={question.choices}
      correctId={question.correctId}
      explanation={question.explanation}
      onScored={onScored}
      before={
        <figure className="scheme-dark mb-4 overflow-hidden rounded-lg border border-terminal-border bg-terminal">
          <figcaption className="border-b border-terminal-border px-3 py-1.5 font-mono text-[11px] tracking-wide text-terminal-muted uppercase">
            {question.output.caption}
          </figcaption>
          <pre className="overflow-x-auto px-3 py-3 font-mono text-sm leading-6 text-terminal-foreground">
            <code>{question.output.lines.join("\n")}</code>
          </pre>
        </figure>
      }
    />
  );
}
