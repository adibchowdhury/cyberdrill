import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BackLink, Breadcrumbs } from "@/components/breadcrumbs";
import { LevelCard } from "@/components/level-card";
import { PageHeader } from "@/components/page-header";
import { getPathway, pathwayParams } from "@/lib/pathways";

type PathwayPageProps = {
  params: Promise<{ pathway: string }>;
};

export function generateStaticParams() {
  return pathwayParams();
}

export async function generateMetadata({ params }: PathwayPageProps): Promise<Metadata> {
  const { pathway: slug } = await params;
  const pathway = getPathway(slug);
  if (!pathway?.available) return { title: "Pathway" };
  return { title: pathway.name, description: pathway.description };
}

export default function PathwayPage({ params }: PathwayPageProps) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Opening pathway…</p>}>
      <PathwayDetail params={params} />
    </Suspense>
  );
}

async function PathwayDetail({ params }: PathwayPageProps) {
  const { pathway: slug } = await params;
  const pathway = getPathway(slug);
  if (!pathway?.available) notFound();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <BackLink href="/pathways" label="Back to pathways" />
        <Breadcrumbs
          items={[
            { label: "Pathways", href: "/pathways" },
            { label: pathway.name },
          ]}
        />
        <PageHeader eyebrow="Pathway" title={pathway.name} description={pathway.description} />
      </div>
      <ul className="grid gap-4 lg:grid-cols-3">
        {pathway.levels.map((level) => (
          <li key={level.id} className="min-w-0">
            <LevelCard pathwaySlug={pathway.slug} level={level} />
          </li>
        ))}
      </ul>
    </div>
  );
}
