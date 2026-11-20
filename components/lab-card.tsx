import Link from "next/link";
import { DifficultyBadge, StatusBadge } from "@/components/badges";
import type { Lab } from "@/lib/labs";

export function LabCard({ lab }: { lab: Lab }) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-sm transition-colors hover:border-accent/40 hover:shadow-md has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-xs text-muted">{lab.code}</p>
        <StatusBadge status={lab.status} />
      </div>
      <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground group-hover:text-cyan-text">
        <Link
          href={`/labs/${lab.slug}`}
          className="outline-none after:absolute after:inset-0 focus-visible:outline-none"
        >
          {lab.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{lab.summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={lab.difficulty} />
        <span className="text-xs text-muted">{lab.category}</span>
        <span className="ml-auto font-mono text-xs text-muted">{lab.durationMinutes} min</span>
      </div>
    </article>
  );
}
