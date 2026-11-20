"use client";

import { useState, type ReactNode } from "react";
import { AnswerFeedback } from "@/components/speedrun/answer-feedback";
import type { Choice } from "@/lib/pathways";

export function ChoiceQuestion({
  prompt,
  choices,
  correctId,
  explanation,
  before,
  onScored,
}: {
  prompt: string;
  choices: Choice[];
  correctId: string;
  explanation: string;
  before?: ReactNode;
  onScored: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = selected === correctId;

  function submit() {
    if (submitted || !selected) return;
    setSubmitted(true);
    onScored(selected === correctId);
  }

  return (
    <div>
      {before}
      <p className="text-base font-medium leading-6 text-foreground">{prompt}</p>
      <div className="mt-4 grid gap-2" role="group" aria-label="Answer choices">
        {choices.map((choice) => {
          const isSelected = selected === choice.id;
          const showCorrect = submitted && choice.id === correctId;
          const showWrong = submitted && isSelected && !correct;
          return (
            <button
              key={choice.id}
              type="button"
              aria-pressed={isSelected}
              disabled={submitted}
              onClick={() => setSelected(choice.id)}
              className={`rounded-lg border px-4 py-3 text-left text-sm leading-6 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-default ${
                showCorrect
                  ? "border-success/40 bg-success/10 text-success-text"
                  : showWrong
                    ? "border-warning/40 bg-warning/10 text-warning-text"
                    : isSelected
                      ? "border-accent/40 bg-accent/10 text-foreground"
                      : "border-line bg-background text-foreground hover:border-accent/30"
              }`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
      {submitted ? (
        <AnswerFeedback correct={correct} explanation={explanation} />
      ) : (
        <button
          type="button"
          onClick={submit}
          disabled={!selected}
          className="mt-4 inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Check answer
        </button>
      )}
    </div>
  );
}
