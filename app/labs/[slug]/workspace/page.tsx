import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LabWorkspace } from "@/components/lab-workspace";
import { getLab, labs } from "@/lib/labs";
import { getLabWorkspace } from "@/lib/workspace";

type WorkspacePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return labs.map((lab) => ({ slug: lab.slug }));
}

export async function generateMetadata({ params }: WorkspacePageProps): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLab(slug);
  return { title: lab ? `${lab.title} workspace` : "Lab workspace" };
}

export default function WorkspacePage({ params }: WorkspacePageProps) {
  return (
    <Suspense fallback={<p className="p-6 text-sm text-muted">Opening workspace…</p>}>
      <WorkspaceContent params={params} />
    </Suspense>
  );
}

async function WorkspaceContent({ params }: WorkspacePageProps) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) notFound();

  return <LabWorkspace lab={lab} workspace={getLabWorkspace(lab.slug)} />;
}
