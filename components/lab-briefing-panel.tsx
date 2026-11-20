"use client";

import { useEffect, useState } from "react";
import { DifficultyBadge } from "@/components/badges";
import { SkillMeter } from "@/components/skill-meter";
import type { Lab } from "@/lib/labs";

function formatElapsed(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const clock = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  if (hours === 0) return clock;
  return `${hours}:${clock}`;
}

export function LabBriefingPanel({
  lab,
  hints,
}: {
  lab: Lab;
  hints: readonly string[];
}) {
  const [elapsed, setElapsed] = useState(0);
  const [completed, setCompleted] = useState<ReadonlySet<number>>(() => new Set());
  const [hintsOpen, setHintsOpen] = useState(false);
  const [shownHints, setShownHints] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setElapsed((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const milestone = lab.objectives.length === 0 ? 0 : Math.round((completed.size / lab.objectives.length) * 100);

  function toggleObjective(index: number) {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="space-y-4 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-muted">{lab.code}</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">{lab.title}</h2>
          <div className="mt-3">
            <DifficultyBadge difficulty={lab.difficulty} />
          </div>
        </div>
        <div className="rounded-lg border border-line bg-surface px-3 py-2 text-right">
          <p className="text-[11px] tracking-wide text-muted uppercase">Timer</p>
          <p className="mt-1 font-mono text-lg text-foreground">{formatElapsed(elapsed)}</p>
        </div>
      </div>

      <section className="rounded-xl border border-line bg-surface shadow-sm p-4">
        <h3 className="text-sm font-semibold tracking-tight">Scenario</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{lab.summary}</p>
      </section>

      <section className="rounded-xl border border-line bg-surface shadow-sm p-4">
        <h3 className="text-sm font-semibold tracking-tight">Incident briefing</h3>
        <div className="mt-3 space-y-3 text-sm leading-6 text-muted">
          {lab.briefing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-line bg-surface shadow-sm p-4">
        <h3 className="text-sm font-semibold tracking-tight">Milestone progress</h3>
        <div className="mt-4">
          <SkillMeter
            label="Objectives checked"
            value={milestone}
            detail={`${completed.size} of ${lab.objectives.length}`}
          />
        </div>
      </section>

      <section className="rounded-xl border border-line bg-surface shadow-sm p-4">
        <h3 className="text-sm font-semibold tracking-tight">Objectives</h3>
        <ul className="mt-3 space-y-2">
          {lab.objectives.map((objective, index) => {
            const done = completed.has(index);
            return (
              <li key={objective}>
                <label className="flex cursor-pointer gap-3 rounded-lg px-1 py-1.5 text-sm leading-6 hover:bg-raised">
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleObjective(index)}
                    className="mt-1 h-4 w-4 shrink-0 accent-accent"
                  />
                  <span className={done ? "text-muted" : "text-foreground"}>
                    <span className="mr-2 font-mono text-xs text-cyan-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {objective}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-xl border border-line bg-surface shadow-sm">
        <h3>
          <button
            type="button"
            aria-expanded={hintsOpen}
            onClick={() => setHintsOpen((current) => !current)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
          >
            Hints
            <span className="text-xs font-medium text-muted">{hintsOpen ? "Hide" : "Show"}</span>
          </button>
        </h3>
        {hintsOpen ? (
          <div className="border-t border-line px-4 py-3">
            <ol className="space-y-3">
              {hints.slice(0, shownHints).map((hint, index) => (
                <li key={hint} className="text-sm leading-6 text-muted">
                  <span className="mr-2 font-mono text-xs text-cyan-text">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {hint}
                </li>
              ))}
            </ol>
            {shownHints < hints.length ? (
              <button
                type="button"
                onClick={() => setShownHints((current) => current + 1)}
                className="mt-3 text-sm font-medium text-cyan-text outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
              >
                Next hint
              </button>
            ) : (
              <p className="mt-3 text-xs text-muted">All hints for this lab are visible.</p>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}
