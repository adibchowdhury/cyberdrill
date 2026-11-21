"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { login, signup, type AuthState } from "@/app/auth/actions";

const initialState: AuthState = { error: null, message: null };

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const params = useSearchParams();
  const action = mode === "login" ? login : signup;
  const [state, formAction, pending] = useActionState(action, initialState);
  const queryError = mode === "login" ? params.get("error") : null;
  const error = state.error ?? queryError;

  if (state.message) {
    return (
      <p className="mt-6 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm leading-6 text-success-text" role="status">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <label className="block text-sm font-medium text-foreground">
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1.5 h-10 w-full rounded-lg border border-line bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        />
      </label>
      <label className="block text-sm font-medium text-foreground">
        Password
        <input
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          className="mt-1.5 h-10 w-full rounded-lg border border-line bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        />
      </label>
      {error ? (
        <p className="text-sm leading-6 text-warning-text" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-accent text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
      </button>
      <p className="text-sm text-muted">
        {mode === "login" ? (
          <>
            New to CyberDrill?{" "}
            <Link href="/signup" className="font-medium text-cyan-text outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-cyan-text outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40">
              Log in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
