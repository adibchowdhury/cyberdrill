"use client";

import Link from "next/link";
import { PathwayGlyph } from "@/components/icons";
import { useStoredProgress } from "@/components/speedrun/use-stored-progress";
import { ProgressTrack } from "@/components/progress-track";
import { pathwaySkillCount, pathwaySkillIds, type Pathway } from "@/lib/pathways";

export function PathwayCard({ pathway }: { pathway: Pathway }) {
  const skills = pathwaySkillCount(pathway);
  const records = useStoredProgress();
  const ids = pathwaySkillIds(pathway);
  const done = ids.filter((id) => records[id]).length;
  const percent = ids.length === 0 ? 0 : Math.round((done / ids.length) * 100);

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
          <PathwayGlyph name={pathway.icon} className="h-5 w-5" />
        </span>
        {pathway.available ? null : (
          <span className="rounded-md border border-line bg-raised px-2 py-0.5 text-xs font-medium text-muted">
            Coming soon
          </span>
        )}
      </div>
      <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground group-hover:text-accent">
        {pathway.name}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{pathway.description}</p>
      {pathway.available ? (
        <div className="mt-4">
          <ProgressTrack value={percent} label={`${done} of ${skills} skills`} />
        </div>
      ) : (
        <p className="mt-4 text-xs text-muted">Progress opens with this pathway</p>
      )}
      <p className="mt-3 font-mono text-xs text-muted">
        {pathway.available ? `${skills} skills` : "Skills coming soon"}
      </p>
    </>
  );

  if (!pathway.available) {
    return (
      <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-sm">
        {body}
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-sm transition-colors hover:border-accent/40 hover:shadow-md has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40">
      <Link
        href={`/pathways/${pathway.slug}`}
        className="outline-none after:absolute after:inset-0 focus-visible:outline-none"
      >
        <span className="sr-only">Open {pathway.name}</span>
      </Link>
      {body}
    </article>
  );
}
