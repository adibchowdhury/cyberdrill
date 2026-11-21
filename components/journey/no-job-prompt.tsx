import Link from "next/link";

export function NoJobPrompt() {
  return (
    <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Choose a target job first</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        Skill assessment, training, and demonstration all depend on the role you are preparing for. Pick one
        available role, and these steps will use that role.
      </p>
      <Link
        href="/jobs"
        className="mt-5 inline-flex h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors"
      >
        Choose your target job
      </Link>
    </div>
  );
}
