import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DifficultyBadge, StatusBadge } from "@/components/badges";
import { StartLabButton } from "@/components/start-lab-button";
import { getLab, labs } from "@/lib/labs";

type LabPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return labs.map((lab) => ({ slug: lab.slug }));
}

export async function generateMetadata({ params }: LabPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) return { title: "Lab" };
  return {
    title: lab.title,
    description: lab.summary,
  };
}

export default function LabDetailPage({ params }: LabPageProps) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading briefing…</p>}>
      <LabDetail params={params} />
    </Suspense>
  );
}

async function LabDetail({ params }: LabPageProps) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) notFound();

  return (
    <div>
      <Link
        href="/labs/linux-administration"
        className="text-sm text-muted outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan/70"
      >
        Training Labs
      </Link>

      <header className="mt-4 max-w-3xl">
        <p className="font-mono text-xs text-muted">{lab.code}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {lab.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <DifficultyBadge difficulty={lab.difficulty} />
          <StatusBadge status={lab.status} />
          <span className="text-sm text-muted">{lab.category}</span>
          <span className="font-mono text-sm text-muted">{lab.durationMinutes} min</span>
        </div>
      </header>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="order-2 space-y-6 lg:order-1">
          <section className="rounded-xl border border-line bg-surface shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-semibold tracking-tight">Scenario</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              {lab.briefing.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-line bg-surface shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-semibold tracking-tight">Objectives</h2>
            <ol className="mt-4 space-y-3">
              {lab.objectives.map((objective, index) => (
                <li key={objective} className="flex gap-3 text-sm leading-6 text-foreground">
                  <span className="mt-0.5 font-mono text-xs text-cyan-text">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{objective}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="order-1 rounded-xl border border-line bg-surface shadow-sm p-5 lg:sticky lg:top-8 lg:order-2">
          <h2 className="text-sm font-semibold tracking-tight">Lab details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Status</dt>
              <dd>
                <StatusBadge status={lab.status} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Difficulty</dt>
              <dd>
                <DifficultyBadge difficulty={lab.difficulty} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Duration</dt>
              <dd className="font-mono text-foreground">{lab.durationMinutes} min</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Category</dt>
              <dd className="text-right text-foreground">{lab.category}</dd>
            </div>
          </dl>

          <div className="mt-5 border-t border-line pt-5">
            <StartLabButton slug={lab.slug} />
          </div>

          <div className="mt-5 border-t border-line pt-5">
            <h3 className="text-xs font-medium text-muted">Topics</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {lab.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-line bg-raised px-2 py-1 text-xs text-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
