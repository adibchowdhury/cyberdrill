"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChoiceQuestion } from "@/components/speedrun/choice-question";
import { CompletionSummary } from "@/components/speedrun/completion-summary";
import { TeachingSection } from "@/components/speedrun/teaching-section";
import { TerminalChallenge } from "@/components/speedrun/terminal-challenge";
import { VisualQuestion } from "@/components/speedrun/visual-question";
import { elapsedSeconds, nowMs, saveAttempt } from "@/lib/speedrun-progress";
import type { Question, Skill } from "@/lib/pathways";

function ChallengeBody({
  question,
  onScored,
}: {
  question: Question;
  onScored: (correct: boolean) => void;
}) {
  if (question.type === "multiple-choice") {
    return (
      <ChoiceQuestion
        prompt={question.prompt}
        choices={question.choices}
        correctId={question.correctId}
        explanation={question.explanation}
        onScored={onScored}
      />
    );
  }
  if (question.type === "visual") {
    return <VisualQuestion question={question} onScored={onScored} />;
  }
  return <TerminalChallenge question={question} onScored={onScored} />;
}

export function SpeedrunSession({
  skill,
  nextHref,
  nextLabel,
}: {
  skill: Skill;
  nextHref: string;
  nextLabel: string;
}) {
  const questions = skill.questions;
  const answersRef = useRef<(boolean | null)[]>(questions.map(() => null));
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => questions.map(() => null));
  const [startedAt, setStartedAt] = useState(nowMs);
  const [finishedSeconds, setFinishedSeconds] = useState<number | null>(null);
  const [bestCorrect, setBestCorrect] = useState(0);
  const [run, setRun] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (finishedSeconds === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    summaryRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [finishedSeconds, run]);

  function onScored(index: number, correct: boolean) {
    const current = answersRef.current;
    if (current[index] !== null) return;
    const next = current.slice();
    next[index] = correct;
    answersRef.current = next;
    setAnswers(next);
    if (next.every((value) => value !== null)) {
      const seconds = elapsedSeconds(startedAt);
      const correctCount = next.filter(Boolean).length;
      const saved = saveAttempt(skill.id, correctCount, next.length, seconds);
      setFinishedSeconds(seconds);
      setBestCorrect(saved.bestCorrect);
    }
  }

  function retry() {
    const blank = questions.map(() => null);
    answersRef.current = blank;
    setAnswers(blank);
    setStartedAt(nowMs());
    setFinishedSeconds(null);
    setRun((value) => value + 1);
  }

  const answered = answers.filter((value) => value !== null).length;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <TeachingSection skill={skill} />
      <section aria-labelledby="practice-heading" className="space-y-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-cyan-text uppercase">Practice</p>
          <h2 id="practice-heading" className="mt-2 text-xl font-semibold tracking-tight text-foreground">
            Check what you know
          </h2>
          {questions.length > 0 ? (
            <p className="mt-2 text-sm text-muted">
              {answered} of {questions.length} answered
            </p>
          ) : (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Challenges for this skill are not written yet.
            </p>
          )}
        </div>
        {questions.length === 0 ? (
          <Link
            href="/pathways/linux-administration/beginner/read-file-permissions"
            className="inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            Open the file permissions speedrun
          </Link>
        ) : (
          <ol className="space-y-4">
            {questions.map((question, index) => (
              <li key={`${run}-${question.id}`}>
                <article className="rounded-xl border border-line bg-surface p-5 shadow-sm">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                    Question {index + 1} of {questions.length}
                  </p>
                  <div className="mt-3">
                    <ChallengeBody question={question} onScored={(correct) => onScored(index, correct)} />
                  </div>
                </article>
              </li>
            ))}
          </ol>
        )}
        {finishedSeconds !== null ? (
          <div ref={summaryRef}>
            <CompletionSummary
              title={skill.title}
              correct={answers.filter(Boolean).length}
              total={questions.length}
              seconds={finishedSeconds}
              bestCorrect={bestCorrect}
              onRetry={retry}
              nextHref={nextHref}
              nextLabel={nextLabel}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}
