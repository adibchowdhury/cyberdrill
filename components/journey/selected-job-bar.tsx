import Link from "next/link";
import type { Job } from "@/lib/journey/jobs";

export function SelectedJobBar({ job }: { job: Job }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">Target job</p>
        <p className="mt-1 text-base font-semibold text-foreground">{job.title}</p>
        <p className="text-sm text-muted">{job.level}</p>
      </div>
      <Link
        href="/jobs"
        className="inline-flex h-9 items-center justify-center rounded-lg border border-line px-3 text-sm font-medium text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors"
      >
        Change job
      </Link>
    </div>
  );
}

export function JobSkeleton({ className = "h-16" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-raised ${className}`} aria-hidden="true" />;
}
