import type { Metadata } from "next";
import Link from "next/link";
import { HomeProgress } from "@/components/home-progress";
import { PathwayCard } from "@/components/pathway-card";
import { SkillCard } from "@/components/skill-card";
import { getFeaturedSkills, pathways, skillHref } from "@/lib/pathways";

export const metadata: Metadata = {
  title: { absolute: "CyberDrill" },
  description:
    "Learn practical IT and cybersecurity skills in minutes. Skip the fluff, master the essentials, and prove what you know.",
};

const steps = [
  {
    title: "Pick a skill",
    body: "Choose one job you want to be able to do. A speedrun is a single skill, not a long course.",
  },
  {
    title: "Learn the essentials",
    body: "Read a short explanation, the commands that matter, and one clear example.",
  },
  {
    title: "Prove it",
    body: "Answer a few questions right away, including a command you type yourself, and see your score.",
  },
];

export default function HomePage() {
  const featured = getFeaturedSkills();

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-line bg-surface px-6 py-10 shadow-sm sm:px-10">
        <p className="font-mono text-[11px] tracking-[0.16em] text-cyan-text uppercase">CyberDrill</p>
        <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Speedrun Your Technical Skills.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Learn practical IT and cybersecurity skills in minutes. Skip the fluff, master the essentials, and
          prove what you know.
        </p>
        <Link
          href="/pathways/linux-administration"
          className="mt-6 inline-flex h-11 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Start Learning
        </Link>
      </section>

      <section>
        <h2 className="text-base font-semibold tracking-tight text-foreground">Featured skill speedruns</h2>
        <ul className="mt-4 grid gap-4 lg:grid-cols-3">
          {featured.map((skill) => (
            <li key={skill.id}>
              <SkillCard
                skill={skill}
                href={skillHref(skill.pathway, skill.level, skill.slug)}
                meta="Linux · Beginner"
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold tracking-tight text-foreground">Available learning pathways</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pathways.map((pathway) => (
            <li key={pathway.slug}>
              <PathwayCard pathway={pathway} />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold tracking-tight text-foreground">How CyberDrill works</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-line bg-surface p-5 shadow-sm">
              <p className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <HomeProgress />
    </div>
  );
}
