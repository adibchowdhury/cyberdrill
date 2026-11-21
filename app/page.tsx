import Link from "next/link";
import { ContinuePrompt } from "@/components/journey/continue-prompt";
import { getJob } from "@/lib/journey/jobs";
import { getPathway } from "@/lib/journey/pathways";
import { STEPS } from "@/lib/journey/steps";

const featured = getJob("vulnerability-management-analyst");
const pathway = getPathway("vulnerability-management-analyst");

export default function HomePage() {
  return (
    <div className="space-y-16">
      <ContinuePrompt />
      <section className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Train for the cybersecurity job you actually want.
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Identify your skill gaps, practice real-world technical responsibilities, and demonstrate the abilities
          employers look for.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/jobs"
            className="inline-flex h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            Explore Cybersecurity Jobs
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex h-11 items-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            How CyberDrill Works
          </a>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">How CyberDrill works</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {STEPS.map((step) => (
            <li key={step.id}>
              <Link
                href={step.href}
                className="block h-full rounded-xl border border-line bg-surface p-5 shadow-sm outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <span className="font-mono text-xs text-accent">{step.number}</span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {featured && pathway ? (
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">Available now</h2>
          <article className="mt-6 rounded-xl border border-line bg-surface p-6 shadow-sm">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">{featured.level}</p>
            <h3 className="mt-2 text-xl font-semibold">{featured.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{featured.summary}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {pathway.competencies.map((item) => (
                <li key={item.id} className="rounded-lg bg-raised px-3 py-2 text-sm text-foreground">
                  {item.title}
                </li>
              ))}
            </ul>
            <Link
              href="/jobs"
              className="mt-6 inline-flex h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Explore this role
            </Link>
          </article>
        </section>
      ) : null}

      <section className="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">Why practical job skills matter</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          Reading about a control is different from deciding whether a finding is real, who should fix it, and what
          you would write down afterward. CyberDrill is organized around that kind of work for one role at a time.
          The diagnostic, the practice, and the demonstration are still being built. What you see today is the path
          those pieces will follow.
        </p>
      </section>

      <figure className="overflow-hidden rounded-xl border border-terminal-border bg-terminal text-terminal-foreground shadow-sm">
        <figcaption className="border-b border-terminal-border px-4 py-2 text-xs text-terminal-muted">
          Illustrative example, not a live environment
        </figcaption>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-6">
          <code>{`host: sample-workstation
scan: weekly-sample
status: incomplete
note: one asset did not respond
finding: missing update — needs validation`}</code>
        </pre>
      </figure>

      <section className="rounded-xl border border-line bg-surface px-6 py-8 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight">Start with a role</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Nineteen roles are listed so you can see the map. One role can be selected today.
        </p>
        <Link
          href="/jobs"
          className="mt-5 inline-flex h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Explore Cybersecurity Jobs
        </Link>
      </section>
    </div>
  );
}
