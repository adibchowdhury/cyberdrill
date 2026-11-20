"use client";

import { useState, type FormEvent } from "react";
import { AnswerFeedback } from "@/components/speedrun/answer-feedback";
import { commandAccepted } from "@/lib/command-match";
import type { TerminalQuestion } from "@/lib/pathways";

export function TerminalChallenge({
  question,
  onScored,
}: {
  question: TerminalQuestion;
  onScored: (correct: boolean) => void;
}) {
  const [draft, setDraft] = useState("");
  const [result, setResult] = useState<boolean | null>(null);
  const [notice, setNotice] = useState("");
  const formId = `terminal-${question.id}`;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (result !== null) return;
    if (!draft.trim()) {
      setNotice("Type a command first.");
      return;
    }
    const correct = commandAccepted(draft, question.accepted);
    setNotice("");
    setResult(correct);
    onScored(correct);
  }

  return (
    <div>
      <p className="text-base font-medium leading-6 text-foreground">{question.prompt}</p>
      <form
        id={formId}
        onSubmit={submit}
        className="scheme-dark mt-4 overflow-hidden rounded-lg border border-terminal-border bg-terminal text-terminal-foreground"
      >
        <div className="border-b border-terminal-border px-3 py-2 font-mono text-[11px] text-terminal-muted">
          {question.scenario}
        </div>
        <div className="flex items-center gap-2 px-3 py-3 font-mono text-sm">
          <label htmlFor={question.id} className="shrink-0 text-terminal-prompt">
            $
          </label>
          <input
            id={question.id}
            value={draft}
            disabled={result !== null}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Command"
            placeholder="Type a command"
            onChange={(event) => setDraft(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-terminal-foreground outline-none placeholder:text-terminal-muted disabled:opacity-80"
          />
        </div>
      </form>
      {notice ? <p className="mt-3 text-sm text-warning-text">{notice}</p> : null}
      {result === null ? (
        <button
          type="submit"
          form={formId}
          className="mt-4 inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Check command
        </button>
      ) : (
        <AnswerFeedback correct={result} explanation={question.explanation} />
      )}
    </div>
  );
}
