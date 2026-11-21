import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/journey/page-header";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Pricing"
        description="Pricing is not finalized. CyberDrill is in early development."
      />
      <Link
        href="/jobs"
        className="inline-flex h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors"
      >
        Explore Careers
      </Link>
    </div>
  );
}
