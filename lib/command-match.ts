/** Compare a typed command with an explicit list of accepted commands. */
export function normalizeCommand(input: string): string {
  return input.trim().replace(/\s+/g, " ").replace(/\s*,\s*/g, ",");
}

export function commandAccepted(input: string, accepted: readonly string[]): boolean {
  const normalized = normalizeCommand(input);
  if (!normalized) return false;

  const forms = [normalized];
  if (normalized.startsWith("sudo ")) {
    const rest = normalized.slice(5);
    if (rest) forms.push(rest);
  }

  const targets = new Set(accepted.map((answer) => normalizeCommand(answer)));
  return forms.some((form) => targets.has(form));
}
