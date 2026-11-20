"use client";

import Link from "next/link";
import { useStoredProgress } from "@/components/speedrun/use-stored-progress";
import { accuracyPercent } from "@/lib/speedrun-progress";
import type { Skill } from "@/lib/pathways";

export function SkillCard({
  skill,
  href,
  index,
  meta,
}: {
  skill: Skill;
  href: string;
  index?: number;
  meta?: string;
}) {
  const record = useStoredProgress()[skill.id];
  const status = record
    ? `Completed · ${accuracyPercent(record.bestCorrect, record.total)}%`
    : skill.placeholder
      ? "Preview"
      : "Not started";

  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        {typeof index === "number" ? (
          <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
        ) : (
          <span className="text-xs text-muted">{meta}</span>
        )}
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-medium ${
            record ? "bg-success/10 text-success-text" : "bg-raised text-muted"
          }`}
        >
          {status}
        </span>
      </div>
      <h2 className="mt-3 text-base font-semibold tracking-tight text-foreground">{skill.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{skill.description}</p>
      <p className="mt-4 font-mono text-xs text-muted">{skill.minutes} min</p>
      <Link
        href={href}
        className="mt-4 inline-flex h-10 w-fit items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        Start Speedrun
      </Link>
    </article>
  );
}
