"use client";

import Link from "next/link";
import { useStoredProgress } from "@/components/speedrun/use-stored-progress";
import { ProgressTrack } from "@/components/progress-track";
import { getPathway, skillHref } from "@/lib/pathways";

export function HomeProgress() {
  const records = useStoredProgress();
  const linux = getPathway("linux-administration");
  const beginner = linux?.levels.find((level) => level.id === "beginner");
  const skills = beginner?.skills ?? [];
  const done = skills.filter((skill) => records[skill.id]).length;
  const total = skills.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const next =
    skills.find((skill) => skill.questions.length > 0 && !records[skill.id]) ??
    skills.find((skill) => !records[skill.id]) ??
    skills[0];

  return (
    <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-semibold tracking-tight text-foreground">Your progress</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        {done === 0
          ? "No beginner Linux skills completed yet. Progress stays in this browser."
          : `${done} of ${total} beginner Linux skills completed.`}
      </p>
      <div className="mt-4 max-w-md">
        <ProgressTrack value={percent} label="Linux Administration · Beginner" />
      </div>
      {next ? (
        <Link
          href={skillHref(next.pathway, next.level, next.slug)}
          className="mt-4 inline-flex text-sm font-medium text-cyan-text outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {done === 0 ? "Start with" : "Next up"}: {next.title}
        </Link>
      ) : null}
    </section>
  );
}
