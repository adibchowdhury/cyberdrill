import type { Metadata } from "next";
import Link from "next/link";
import { MasteryRing } from "@/components/mastery-ring";
import { PageHeader, SectionHeading } from "@/components/page-header";
import { SkillMeter } from "@/components/skill-meter";
import { formatDate, formatDuration } from "@/lib/format";
import {
  getCatalogStats,
  getCompletionHistory,
  getDifficultyBreakdown,
  getSkillSummaries,
} from "@/lib/labs";

export const metadata: Metadata = {
  title: "My Progress",
};

export default function ProgressPage() {
  const stats = getCatalogStats();
  const skills = getSkillSummaries();
  const history = getCompletionHistory();
  const difficulties = getDifficultyBreakdown();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Performance"
        title="My Progress"
        description="Completion, scores, and skill mastery across the scenarios in the current catalog."
      />

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-line bg-surface shadow-sm p-5 sm:p-6">
          <SectionHeading title="Overall completion" />
          <MasteryRing value={stats.completionRate} label="Catalog complete" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <article className="rounded-xl border border-line bg-surface shadow-sm px-5 py-4">
            <p className="text-xs font-medium text-muted">Average score</p>
            <p className="mt-2 font-mono text-2xl text-foreground">{stats.averageScore}</p>
            <p className="mt-1 text-xs text-muted">Across completed scenarios</p>
          </article>
          <article className="rounded-xl border border-line bg-surface shadow-sm px-5 py-4">
            <p className="text-xs font-medium text-muted">Time practiced</p>
            <p className="mt-2 font-mono text-2xl text-foreground">
              {formatDuration(stats.minutesCompleted)}
            </p>
            <p className="mt-1 text-xs text-muted">Estimated time of finished labs</p>
          </article>
          <article className="rounded-xl border border-line bg-surface shadow-sm px-5 py-4">
            <p className="text-xs font-medium text-muted">In progress</p>
            <p className="mt-2 font-mono text-2xl text-foreground">{stats.inProgress}</p>
            <p className="mt-1 text-xs text-muted">{stats.notStarted} still not started</p>
          </article>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface shadow-sm p-5 sm:p-6">
          <SectionHeading title="Skill mastery" />
          <div className="space-y-5">
            {skills.map((skill) => (
              <SkillMeter
                key={skill.category}
                label={skill.category}
                value={skill.mastery}
                detail={`${skill.completed} completed · ${skill.inProgress} in progress · ${skill.total} total`}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-surface shadow-sm p-5 sm:p-6">
          <SectionHeading title="Completion history" />
          <ol className="divide-y divide-line">
            {history.map((lab) => (
              <li key={lab.slug} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <Link
                    href={`/labs/${lab.slug}`}
                    className="text-sm font-medium text-foreground outline-none hover:text-cyan-text focus-visible:ring-2 focus-visible:ring-cyan/70"
                  >
                    {lab.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted">
                    {lab.category} · {formatDate(lab.completedAt)}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-sm text-foreground">{lab.score}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <SectionHeading title="Performance by difficulty" />
        <ul className="grid gap-4 md:grid-cols-3">
          {difficulties.map((item) => (
            <li key={item.difficulty} className="rounded-xl border border-line bg-surface shadow-sm p-5">
              <SkillMeter
                label={item.difficulty}
                value={item.rate}
                detail={`${item.completed} of ${item.total} completed`}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
