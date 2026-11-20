import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BackLink, Breadcrumbs } from "@/components/breadcrumbs";
import { SpeedrunSession } from "@/components/speedrun/speedrun-session";
import { getLevel, getNextSkill, getPathway, getSkill, skillHref, skillParams } from "@/lib/pathways";

type SkillPageProps = {
  params: Promise<{ pathway: string; level: string; skill: string }>;
};

export function generateStaticParams() {
  return skillParams();
}

export async function generateMetadata({ params }: SkillPageProps): Promise<Metadata> {
  const { pathway, level, skill: skillSlug } = await params;
  const skill = getSkill(pathway, level, skillSlug);
  return {
    title: skill ? skill.title : "Skill",
    description: skill?.description,
  };
}

export default function SkillPage({ params }: SkillPageProps) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Opening skill…</p>}>
      <SkillDetail params={params} />
    </Suspense>
  );
}

async function SkillDetail({ params }: SkillPageProps) {
  const { pathway: pathwaySlug, level: levelId, skill: skillSlug } = await params;
  const pathway = getPathway(pathwaySlug);
  const level = getLevel(pathwaySlug, levelId);
  const skill = getSkill(pathwaySlug, levelId, skillSlug);
  if (!pathway?.available || !level || !skill) notFound();

  const next = getNextSkill(pathwaySlug, levelId, skillSlug);
  const nextHref = next
    ? skillHref(pathway.slug, level.id, next.slug)
    : `/pathways/${pathway.slug}/${level.id}`;
  const nextLabel = next ? "Next Skill" : `Back to ${level.title}`;

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <BackLink href={`/pathways/${pathway.slug}/${level.id}`} label={`Back to ${level.title}`} />
        <Breadcrumbs
          items={[
            { label: "Pathways", href: "/pathways" },
            { label: pathway.name, href: `/pathways/${pathway.slug}` },
            { label: level.title, href: `/pathways/${pathway.slug}/${level.id}` },
            { label: skill.title },
          ]}
        />
      </div>
      <SpeedrunSession skill={skill} nextHref={nextHref} nextLabel={nextLabel} />
    </div>
  );
}
