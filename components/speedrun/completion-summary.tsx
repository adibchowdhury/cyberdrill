"use client";

import Link from "next/link";
import { accuracyPercent, formatElapsed } from "@/lib/speedrun-progress";

export function CompletionSummary({
  title,
  correct,
  total,
  seconds,
  bestCorrect,
  onRetry,
  nextHref,
  nextLabel,
}: {
  title: string;
  correct: number;
  total: number;
  seconds: number;
  bestCorrect: number;
  onRetry: () => void;
  nextHref: string;
  nextLabel: string;
}) {
  const accuracy = accuracyPercent(correct, total);
  const best = accuracyPercent(bestCorrect, total);

  return (
    <section
      aria-labelledby="summary-heading"
      className="scroll-mt-20 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-8"
    >
      <p className="font-mono text-[11px] tracking-[0.16em] text-success-text uppercase">Skill completed</p>
      <h2 id="summary-heading" className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-raised px-4 py-3">
          <dt className="text-xs text-muted">Correct answers</dt>
          <dd className="mt-1 font-mono text-lg font-semibold text-foreground">
            {correct} of {total}
          </dd>
        </div>
        <div className="rounded-lg border border-line bg-raised px-4 py-3">
          <dt className="text-xs text-muted">Accuracy</dt>
          <dd className="mt-1 font-mono text-lg font-semibold text-foreground">{accuracy}%</dd>
        </div>
        <div className="rounded-lg border border-line bg-raised px-4 py-3">
          <dt className="text-xs text-muted">Time spent</dt>
          <dd className="mt-1 font-mono text-lg font-semibold text-foreground">{formatElapsed(seconds)}</dd>
        </div>
      </dl>
      {best > accuracy ? (
        <p className="mt-4 text-sm text-muted">Best accuracy so far is {best}%.</p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-10 items-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Retry Speedrun
        </button>
        <Link
          href={nextHref}
          className="inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {nextLabel}
        </Link>
      </div>
    </section>
  );
}
