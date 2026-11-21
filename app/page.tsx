import Link from "next/link";
import { ComingSoonBadge } from "@/components/journey/coming-soon";

const primaryButton =
  "inline-flex h-11 items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors";

const secondaryButton =
  "inline-flex h-11 items-center justify-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors";

const tools = [
  {
    title: "Career Match",
    description: "Discover careers that fit your interests, strengths, and work style.",
    label: "Free assessment",
  },
  {
    title: "Career Insights",
    description: "Compare cybersecurity salaries, demand, and technical skills.",
    label: "Explore market data",
  },
];

const path = [
  { number: "01", title: "Choose a Job" },
  { number: "02", title: "Find Skill Gaps" },
  { number: "03", title: "Train" },
  { number: "04", title: "Prove Skills" },
];

export default function HomePage() {
  return (
    <div className="space-y-20 py-6 sm:space-y-28 sm:py-10">
      <section className="max-w-3xl">
        <p className="text-sm font-medium text-accent">Practical cybersecurity career training</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Build the skills. Gain the confidence. Pursue the career.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-muted">
          Discover cybersecurity careers, find your strengths, and develop practical skills for the job you want.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/jobs" className={primaryButton}>
            Explore Careers
          </Link>
          <Link href="/how-it-works" className={secondaryButton}>
            How It Works
          </Link>
        </div>
      </section>

      <section>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Not sure which cybersecurity career fits you?
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <li key={tool.title}>
              <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm">
                <ComingSoonBadge />
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{tool.title}</h3>
                <p className="mt-2 flex-1 text-base leading-7 text-muted">{tool.description}</p>
                <p className="mt-6 text-sm font-medium text-foreground">{tool.label}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Your path to practical cybersecurity skills
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {path.map((step, index) => (
            <li key={step.number} className="relative lg:pr-6">
              {index < path.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-5 left-1/2 hidden h-px w-full bg-line lg:block"
                />
              ) : null}
              <p className="relative z-10 w-fit bg-background pr-3 font-mono text-4xl font-semibold tracking-tight text-foreground">
                {step.number}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
