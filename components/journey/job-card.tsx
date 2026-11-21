"use client";

import Link from "next/link";
import { ComingSoonBadge } from "@/components/journey/coming-soon";
import { useJourney } from "@/components/journey/journey-provider";
import type { Job } from "@/lib/journey/jobs";

export function JobCard({ job, featured = false }: { job: Job; featured?: boolean }) {
  const { selectedJob, selectJob } = useJourney();
  const selected = selectedJob?.slug === job.slug;
  const available = job.status === "available";

  return (
    <article
      className={`flex h-full flex-col rounded-xl border bg-surface p-5 shadow-sm ${
        featured ? "border-accent shadow-md" : "border-line"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {available ? (
          <span className="inline-flex items-center rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success-text">
            Available
          </span>
        ) : (
          <ComingSoonBadge />
        )}
        <span className="text-xs font-medium text-muted">{job.level}</span>
      </div>
      <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{job.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{job.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skill areas">
        {job.skillAreas.map((area) => (
          <li key={area} className="rounded-md bg-raised px-2 py-1 text-xs text-foreground">
            {area}
          </li>
        ))}
      </ul>
      {available ? (
        <div className="mt-5 flex flex-col gap-2">
          {selected ? (
            <>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-success-text">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
                </svg>
                Selected
              </p>
              <Link
                href="/assessment"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-3 text-sm font-semibold text-on-accent outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                Continue to Skill Assessment
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={() => selectJob(job.slug)}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-3 text-sm font-semibold text-on-accent outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Select this role
            </button>
          )}
        </div>
      ) : null}
    </article>
  );
}
