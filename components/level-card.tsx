"use client";

import Link from "next/link";
import { useStoredProgress } from "@/components/speedrun/use-stored-progress";
import { ProgressTrack } from "@/components/progress-track";
import { levelBenchmarkNote, type PathwayLevel } from "@/lib/pathways";

const tone: Record<PathwayLevel["id"], { title: string; fill: string; card: string }> = {
  beginner: {
    title: "text-success-text",
    fill: "bg-success",
    card: "hover:border-success/40",
  },
  intermediate: {
    title: "text-warning-text",
    fill: "bg-warning",
    card: "hover:border-warning/40",
  },
  advanced: {
    title: "text-expert-text",
    fill: "bg-expert",
    card: "hover:border-expert/40",
  },
  expert: {
    title: "text-foreground",
    fill: "bg-muted",
    card: "",
  },
};

export function LevelCard({ pathwaySlug, level }: { pathwaySlug: string; level: PathwayLevel }) {
  const style = tone[level.id];
  const records = useStoredProgress();
  const done = level.skills.filter((skill) => records[skill.id]).length;
  const total = level.skills.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const comingLater = level.id === "expert";
  const className = `flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm ${
    comingLater
      ? ""
      : `outline-none transition-colors hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent/40 ${style.card}`
  }`;
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h2 className={`text-xl font-semibold tracking-tight ${style.title}`}>{level.title}</h2>
        {comingLater ? (
          <span className="shrink-0 rounded-md bg-raised px-2 py-0.5 text-xs font-medium text-muted">Coming later</span>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{level.description}</p>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{levelBenchmarkNote}</p>
      {comingLater ? null : (
        <>
          <p className="mt-4 font-mono text-xs text-muted">
            {total} {total === 1 ? "skill" : "skills"}
          </p>
          <div className="mt-4">
            <ProgressTrack value={percent} label={`${done} of ${total} completed`} fillClassName={style.fill} />
          </div>
        </>
      )}
    </>
  );

  if (comingLater) return <article className={className}>{content}</article>;

  return (
    <Link href={`/pathways/${pathwaySlug}/${level.id}`} className={className}>
      {content}
    </Link>
  );
}
