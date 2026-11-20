import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BackLink, Breadcrumbs } from "@/components/breadcrumbs";
import { SkillCard } from "@/components/skill-card";
import { PageHeader } from "@/components/page-header";
import { getLevel, getPathway, levelParams, skillHref } from "@/lib/pathways";

type LevelPageProps = {
  params: Promise<{ pathway: string; level: string }>;
};

export function generateStaticParams() {
  return levelParams();
}

export async function generateMetadata({ params }: LevelPageProps): Promise<Metadata> {
  const { pathway: pathwaySlug, level: levelId } = await params;
  const pathway = getPathway(pathwaySlug);
  const level = getLevel(pathwaySlug, levelId);
  if (!pathway?.available || !level) return { title: "Level" };
  return { title: `${level.title} · ${pathway.name}`, description: level.description };
}

export default function LevelPage({ params }: LevelPageProps) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Opening level…</p>}>
      <LevelDetail params={params} />
    </Suspense>
  );
}

async function LevelDetail({ params }: LevelPageProps) {
  const { pathway: pathwaySlug, level: levelId } = await params;
  const pathway = getPathway(pathwaySlug);
  const level = getLevel(pathwaySlug, levelId);
  if (!pathway?.available || !level) notFound();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <BackLink href={`/pathways/${pathway.slug}`} label={`Back to ${pathway.name}`} />
        <Breadcrumbs
          items={[
            { label: "Pathways", href: "/pathways" },
            { label: pathway.name, href: `/pathways/${pathway.slug}` },
            { label: level.title },
          ]}
        />
        <PageHeader eyebrow={pathway.name} title={level.title} description={level.description} />
      </div>
      <ul className="grid gap-4 lg:grid-cols-2">
        {level.skills.map((skill, index) => (
          <li key={skill.id}>
            <SkillCard
              skill={skill}
              index={index}
              href={skillHref(pathway.slug, level.id, skill.slug)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
