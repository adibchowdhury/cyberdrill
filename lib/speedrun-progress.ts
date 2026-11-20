const STORAGE_KEY = "cyberdrill-speedruns";
export const PROGRESS_EVENT = "cyberdrill-progress";

export type SkillRecord = {
  correct: number;
  total: number;
  seconds: number;
  bestCorrect: number;
  updatedAt: number;
};

export function readProgress(): Record<string, SkillRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, SkillRecord>;
  } catch {
    return {};
  }
}

export function saveAttempt(
  skillId: string,
  correct: number,
  total: number,
  seconds: number,
): SkillRecord {
  const all = readProgress();
  const previous = all[skillId];
  const record: SkillRecord = {
    correct,
    total,
    seconds,
    bestCorrect: Math.max(previous?.bestCorrect ?? 0, correct),
    updatedAt: Date.now(),
  };
  all[skillId] = record;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
  return record;
}

export function accuracyPercent(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

export function nowMs(): number {
  return Date.now();
}

export function elapsedSeconds(startedAt: number): number {
  return Math.max(1, Math.round((Date.now() - startedAt) / 1000));
}

export function formatElapsed(seconds: number): string {
  const safe = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(safe / 60);
  const remain = safe % 60;
  if (minutes === 0) return `${remain}s`;
  return `${minutes}m ${remain.toString().padStart(2, "0")}s`;
}
