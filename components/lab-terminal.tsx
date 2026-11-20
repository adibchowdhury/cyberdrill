"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { executeLabCommand, labPrompt, labPromptIdentity } from "@/lib/lab-command";

type TerminalLine = {
  id: string;
  kind: "system" | "notice" | "command" | "response";
  text: string;
};

const lineClass: Record<TerminalLine["kind"], string> = {
  system: "text-terminal-muted",
  notice: "text-terminal-notice",
  command: "text-terminal-foreground",
  response: "text-terminal-response",
};

function welcomeLines(hostname: string): TerminalLine[] {
  return [
    { id: "welcome-title", kind: "system", text: "CyberDrill lab workspace" },
    { id: "welcome-host", kind: "system", text: `Simulated host ${hostname}` },
    {
      id: "welcome-notice",
      kind: "notice",
      text: "Simulation engine: not connected. Typed commands stay in this browser and are not executed.",
    },
  ];
}

export function LabTerminal({ hostname, active }: { hostname: string; active: boolean }) {
  const [lines, setLines] = useState<TerminalLine[]>(() => welcomeLines(hostname));
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [stashedDraft, setStashedDraft] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lineId = useRef(0);
  const submitLock = useRef(false);

  useEffect(() => {
    const node = outputRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [lines, draft]);

  useEffect(() => {
    const node = inputRef.current;
    if (!node) return;
    const visible = node.getClientRects().length > 0;
    if (active || visible) node.focus();
  }, [active]);

  function focusInput() {
    inputRef.current?.focus();
  }

  function remember(value: string) {
    setDraft(value);
    requestAnimationFrame(() => {
      const node = inputRef.current;
      if (!node) return;
      node.setSelectionRange(value.length, value.length);
    });
  }

  function submit() {
    if (submitLock.current) return;
    submitLock.current = true;
    queueMicrotask(() => {
      submitLock.current = false;
    });
    const command = draft;
    const trimmed = command.trim();
    function nextId() {
      lineId.current += 1;
      return `line-${lineId.current}`;
    }
    const nextLines: TerminalLine[] = [
      { id: nextId(), kind: "command", text: `${labPrompt} ${command}` },
    ];
    const output = executeLabCommand(command);
    if (output !== null) {
      nextLines.push({ id: nextId(), kind: "response", text: output });
      setHistory((current) => [...current, trimmed]);
    }
    setLines((current) => [...current, ...nextLines]);
    setDraft("");
    setHistoryIndex(null);
    setStashedDraft("");
    focusInput();
  }

  function focusContent(event: MouseEvent<HTMLElement>) {
    if (event.target instanceof HTMLInputElement) return;
    event.preventDefault();
    focusInput();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      if (historyIndex === null) {
        setStashedDraft(draft);
        remember(history[history.length - 1] ?? "");
        setHistoryIndex(history.length - 1);
        return;
      }
      const next = Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      remember(history[next] ?? "");
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      submit();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      if (historyIndex >= history.length - 1) {
        setHistoryIndex(null);
        remember(stashedDraft);
        return;
      }
      const next = historyIndex + 1;
      setHistoryIndex(next);
      remember(history[next] ?? "");
    }
  }

  return (
    <section className="scheme-dark flex min-h-0 min-w-0 flex-1 flex-col bg-terminal text-terminal-foreground">
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-terminal-border bg-black/40 px-4 font-mono text-xs text-terminal-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-terminal-prompt shadow-[0_0_8px_var(--color-terminal-prompt)]" />
        <span className="text-terminal-prompt">{labPromptIdentity}</span>
        <span>bash</span>
      </div>
      <div
        ref={outputRef}
        onMouseDown={focusContent}
        className="min-h-0 flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6"
      >
        {lines.map((line) => (
          <p key={line.id} className={`whitespace-pre-wrap ${lineClass[line.kind]}`}>
            {line.text}
          </p>
        ))}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <div className="flex items-center">
            <span className="shrink-0 whitespace-pre text-terminal-prompt">{`${labPrompt} `}</span>
            <label className="inline-flex min-w-0 items-center">
              <span className="sr-only">Command</span>
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => {
                  setDraft(event.target.value);
                  setHistoryIndex(null);
                }}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                aria-label={`Command on ${hostname}`}
                className="bg-transparent text-terminal-foreground caret-transparent outline-none"
                style={{ width: `${Math.max(draft.length, 1)}ch` }}
              />
              <span aria-hidden="true" className="terminal-caret ml-px inline-block h-[1.05em] w-[0.55ch] bg-terminal-prompt shadow-[0_0_8px_var(--color-terminal-prompt)]" />
            </label>
          </div>
        </form>
      </div>
    </section>
  );
}
