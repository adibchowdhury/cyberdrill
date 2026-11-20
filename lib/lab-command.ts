/** Prompt shown beside the lab workspace input and on echoed command lines. */
export const labPrompt = "student@lab-server:~$";

/** User and host portion of the lab prompt, used in the terminal title bar. */
export const labPromptIdentity = "student@lab-server";

/**
 * Handles one line typed in the lab terminal.
 * Returns null when the line should echo a prompt without output.
 * Replace this function with the simulated Linux command engine later.
 * It must not run commands on the real machine.
 */
export function executeLabCommand(input: string): string | null {
  if (input.trim().length === 0) return null;
  return "Command not supported for this lab";
}
