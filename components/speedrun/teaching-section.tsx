import { CodeExample } from "@/components/speedrun/code-example";
import type { Skill, TeachingBlock } from "@/lib/pathways";

const bits = [
  { bit: "r", label: "read", value: 4 },
  { bit: "w", label: "write", value: 2 },
  { bit: "x", label: "execute", value: 1 },
] as const;

function trioValue(value: string): number {
  return bits.reduce((sum, item, index) => sum + (value[index] === item.bit ? item.value : 0), 0);
}

function PermissionExample({ mode, note }: { mode: string; note: string }) {
  const groups = [
    { name: "Owner", value: mode.slice(0, 3) },
    { name: "Group", value: mode.slice(3, 6) },
    { name: "Others", value: mode.slice(6, 9) },
  ];

  return (
    <figure className="rounded-xl border border-line bg-raised p-4">
      <figcaption className="font-mono text-sm font-medium tracking-wide text-foreground">{mode}</figcaption>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.name} className="rounded-lg border border-line bg-surface px-3 py-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">{group.name}</p>
              <p className="font-mono text-sm font-semibold text-accent">{trioValue(group.value)}</p>
            </div>
            <p className="mt-2 font-mono text-lg tracking-[0.2em] text-foreground">{group.value}</p>
            <p className="mt-1 text-xs leading-5 text-muted">
              {bits
                .map((item, index) => (group.value[index] === item.bit ? item.label : null))
                .filter(Boolean)
                .join(", ") || "no access"}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{note}</p>
    </figure>
  );
}

function Block({ block }: { block: TeachingBlock }) {
  if (block.type === "heading") {
    return <h2 className="pt-2 text-base font-semibold tracking-tight text-foreground">{block.text}</h2>;
  }
  if (block.type === "list") {
    return (
      <ul className="space-y-2 text-sm leading-6 text-foreground">
        {block.items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "code") {
    return <CodeExample label={block.label} code={block.code} />;
  }
  if (block.type === "permissions") {
    return <PermissionExample mode={block.mode} note={block.note} />;
  }
  return <p className="text-sm leading-6 text-foreground">{block.text}</p>;
}

export function TeachingSection({ skill }: { skill: Skill }) {
  return (
    <section aria-labelledby="learn-heading" className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-8">
      <p className="font-mono text-[11px] tracking-[0.16em] text-cyan-text uppercase">Learn</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h1 id="learn-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {skill.title}
        </h1>
        <p className="font-mono text-xs text-muted">{skill.minutes} min</p>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{skill.description}</p>
      {skill.placeholder ? (
        <p className="mt-4 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm leading-6 text-warning-text">
          Placeholder speedrun. The lesson and challenges for this skill are not written yet.
        </p>
      ) : null}
      <div className="mt-6 space-y-4">
        {skill.teaching.map((block, index) => (
          <Block key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
    </section>
  );
}
