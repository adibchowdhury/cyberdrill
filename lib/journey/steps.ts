export const STEPS = [
  {
    number: 1,
    id: "jobs",
    navLabel: "Explore Jobs",
    title: "Choose Your Target Job",
    href: "/jobs",
    description:
      "Pick the security role you want to prepare for. The rest of CyberDrill uses that role as its context.",
  },
  {
    number: 2,
    id: "assessment",
    navLabel: "Skill Assessment",
    title: "Identify Your Skill Gaps",
    href: "/assessment",
    description:
      "A job-specific diagnostic will show which competencies you can already do and which ones still need practice.",
  },
  {
    number: 3,
    id: "training",
    navLabel: "Training",
    title: "Train for the Job",
    href: "/training",
    description:
      "Work through the role's fundamentals, then practice and apply them on responsibilities that show up in the job.",
  },
  {
    number: 4,
    id: "demonstrate",
    navLabel: "Demonstrate Skills",
    title: "Demonstrate Your Skills",
    href: "/demonstrate",
    description:
      "Show what you can do with a practical assessment and a record of the work, once those pieces are available.",
  },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

export function getStep(id: StepId) {
  return STEPS.find((step) => step.id === id) ?? STEPS[0];
}
