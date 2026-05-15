import { useEffect, useState, useCallback } from "react";

export interface RizzStats {
  replies: number;
  score: number;
  wins: number;
  analyzed: number;
  lastBoost: number; // % delta vs yesterday
}

const KEY = "rizz.stats.v1";
const DEFAULT: RizzStats = { replies: 0, score: 0, wins: 0, analyzed: 0, lastBoost: 0 };

const read = (): RizzStats => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch { return DEFAULT; }
};

const write = (s: RizzStats) => {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("rizz:stats", { detail: s }));
};

export const useStats = () => {
  const [stats, setStats] = useState<RizzStats>(read);

  useEffect(() => {
    const sync = () => setStats(read());
    window.addEventListener("rizz:stats", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("rizz:stats", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const bump = useCallback((patch: Partial<RizzStats>) => {
    const cur = read();
    const next: RizzStats = {
      replies: cur.replies + (patch.replies ?? 0),
      analyzed: cur.analyzed + (patch.analyzed ?? 0),
      wins: cur.wins + (patch.wins ?? 0),
      score: patch.score ?? cur.score,
      lastBoost: patch.lastBoost ?? cur.lastBoost,
    };
    write(next);
    setStats(next);
  }, []);

  const reset = useCallback(() => { write(DEFAULT); setStats(DEFAULT); }, []);

  return { stats, bump, reset };
};
