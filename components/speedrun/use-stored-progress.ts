"use client";

import { useEffect, useState } from "react";
import { PROGRESS_EVENT, readProgress, type SkillRecord } from "@/lib/speedrun-progress";

export function useStoredProgress(): Record<string, SkillRecord> {
  const [records, setRecords] = useState<Record<string, SkillRecord>>({});

  useEffect(() => {
    const load = () => setRecords(readProgress());
    load();
    window.addEventListener(PROGRESS_EVENT, load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return records;
}
