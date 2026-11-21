import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
import { PageHeader } from "@/components/journey/page-header";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a CyberDrill account with your email and password.",
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md">
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <PageHeader
          eyebrow="Account"
          title="Sign up"
          description="Create an account with your email and a password."
        />
        <Suspense fallback={<p className="mt-6 text-sm text-muted">Loading sign-up…</p>}>
          <AuthForm mode="signup" />
        </Suspense>
      </section>
    </div>
  );
}
