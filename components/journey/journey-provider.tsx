"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getJob, type Job } from "@/lib/journey/jobs";

const STORAGE_KEY = "cyberdrill-v2-target-job";
const CHANGE_EVENT = "cyberdrill-v2-job";

function readSlug(): string | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const job = getJob(raw);
    if (!job || job.status !== "available") return null;
    return job.slug;
  } catch {
    return null;
  }
}

function subscribe(onStoreChange: () => void) {
  const notify = () => onStoreChange();
  window.addEventListener("storage", notify);
  window.addEventListener(CHANGE_EVENT, notify);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const job = getJob(raw);
      if (!job || job.status !== "available") {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  } catch {
    // Storage can be blocked. The journey still works without a saved role.
  }
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(CHANGE_EVENT, notify);
  };
}

function publish() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

let clientReady = false;

function subscribeReady(onStoreChange: () => void) {
  const timer = window.setTimeout(() => {
    clientReady = true;
    onStoreChange();
  }, 0);
  return () => window.clearTimeout(timer);
}

function readReady() {
  return clientReady;
}

type JourneyValue = {
  selectedJob: Job | null;
  selectJob: (slug: string) => void;
  clearJob: () => void;
  ready: boolean;
};

const JourneyContext = createContext<JourneyValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const slug = useSyncExternalStore(subscribe, readSlug, () => null);
  const ready = useSyncExternalStore(subscribeReady, readReady, () => false);

  const selectJob = useCallback((nextSlug: string) => {
    const job = getJob(nextSlug);
    if (!job || job.status !== "available") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, job.slug);
      publish();
    } catch {
      // Ignore a failed write. The button can be used again.
    }
  }, []);

  const clearJob = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      publish();
    } catch {
      // Ignore a failed clear.
    }
  }, []);

  const selectedJob = ready && slug ? (getJob(slug) ?? null) : null;

  return (
    <JourneyContext.Provider value={{ selectedJob, selectJob, clearJob, ready }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney(): JourneyValue {
  const value = useContext(JourneyContext);
  if (!value) {
    throw new Error("useJourney must be used within JourneyProvider");
  }
  return value;
}
