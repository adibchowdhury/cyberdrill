"use client";

import Link from "next/link";
import { useStoredProgress } from "@/components/speedrun/use-stored-progress";
import { ProgressTrack } from "@/components/progress-track";
import type { PathwayLevel } from "@/lib/pathways";

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
};

export function LevelCard({ pathwaySlug, level }: { pathwaySlug: string; level: PathwayLevel }) {
  const style = tone[level.id];
  const records = useStoredProgress();
  const done = level.skills.filter((skill) => records[skill.id]).length;
  const total = level.skills.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <Link
      href={`/pathways/${pathwaySlug}/${level.id}`}
      className={`flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm outline-none transition-colors hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent/40 ${style.card}`}
    >
      <h2 className={`text-xl font-semibold tracking-tight ${style.title}`}>{level.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{level.description}</p>
      <p className="mt-4 font-mono text-xs text-muted">
        {total} {total === 1 ? "skill" : "skills"}
      </p>
      <div className="mt-4">
        <ProgressTrack value={percent} label={`${done} of ${total} completed`} fillClassName={style.fill} />
      </div>
    </Link>
  );
}
