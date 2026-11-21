import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
import { PageHeader } from "@/components/journey/page-header";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to CyberDrill with your email and password.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <PageHeader
          eyebrow="Account"
          title="Log in"
          description="Use the email and password for your CyberDrill account."
        />
        <Suspense fallback={<p className="mt-6 text-sm text-muted">Loading sign-in…</p>}>
          <AuthForm mode="login" />
        </Suspense>
      </section>
    </div>
  );
}
