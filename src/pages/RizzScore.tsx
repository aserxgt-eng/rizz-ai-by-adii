import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Trophy } from "lucide-react";
import { ScreenShell } from "@/components/Shell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const RizzScore = () => {
  const [context, setContext] = useState("");
  const [score, setScore] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!context.trim()) { toast.error("Paste your conversation"); return; }
    setLoading(true);
    try {
      const { data } = await supabase.functions.invoke("rizz-generate", { body: { action: "score", context } });
      setScore(data?.score);
    } catch (e: any) { toast.error(e.message); } finally { setLoading(false); }
  };

  const overall = score ? Math.round((score.rizz + score.confidence + score.humor + score.flirting) / 4) : 0;

  return (
    <ScreenShell title="Rizz Score" subtitle="How fire is your texting, really?">
      <textarea value={context} onChange={e => setContext(e.target.value)}
        placeholder="paste full convo here…"
        className="w-full h-28 glass-card p-4 text-sm font-mono outline-none resize-none placeholder:text-muted-foreground/60" />
      <button onClick={run} disabled={loading}
        className="w-full mt-3 bg-gradient-rizz text-primary-foreground font-bold rounded-2xl py-3 text-sm shadow-[var(--glow-soft)] disabled:opacity-40 flex items-center justify-center gap-2">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" />judging…</> : <><Trophy className="w-4 h-4" />calculate score</>}
      </button>

      {score && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="mt-6 glass-card p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-rizz opacity-10 animate-gradient" />
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-primary-glow relative">// overall</p>
          <p className="font-display text-7xl font-black neon-text my-2 relative">{overall}</p>
          <p className="text-sm text-muted-foreground mb-4 relative">{score.vibe}</p>
          <div className="grid grid-cols-2 gap-3 relative">
            {[["Rizz", score.rizz], ["Confidence", score.confidence], ["Humor", score.humor], ["Flirting", score.flirting], ["EQ", score.emotionalIntelligence], ["Cringe", score.cringe]].map(([l, v]: any) => (
              <div key={l} className="bg-secondary/40 rounded-2xl p-3">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">{l}</p>
                <p className="font-display text-2xl font-bold neon-text">{v}</p>
              </div>
            ))}
          </div>
          {score.advice && <p className="mt-4 text-sm italic font-semibold relative">💡 {score.advice}</p>}
        </motion.div>
      )}
    </ScreenShell>
  );
};

export default RizzScore;
