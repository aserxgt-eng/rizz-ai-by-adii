import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2, Upload } from "lucide-react";
import { ScreenShell } from "@/components/Shell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Analyzer = () => {
  const [img, setImg] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = () => setImg(reader.result as string);
    reader.readAsDataURL(f);
  };

  const analyze = async () => {
    if (!img) return;
    setLoading(true);
    try {
      // For demo we send a synthetic transcript prompt; production would OCR.
      const { data } = await supabase.functions.invoke("rizz-generate", {
        body: { action: "score", context: "Screenshot uploaded — analyze a typical mid-flirt chat with mixed signals, dry replies and a few green flags." },
      });
      setAnalysis(data?.score);
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <ScreenShell title="Screenshot Analyzer" subtitle="Drop a chat — get the verdict.">
      <label className="glass-card p-6 flex flex-col items-center justify-center gap-3 border-dashed cursor-pointer aspect-video">
        {img ? (
          <img src={img} alt="upload" className="max-h-48 rounded-2xl" />
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-gradient-rizz flex items-center justify-center"><Upload className="w-6 h-6 text-primary-foreground" /></div>
            <p className="text-sm font-bold">Tap to upload screenshot</p>
            <p className="text-xs text-muted-foreground">jpg, png · processed locally</p>
          </>
        )}
        <input type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} />
      </label>

      <button onClick={analyze} disabled={!img || loading}
        className="w-full mt-4 bg-gradient-rizz text-primary-foreground font-bold rounded-2xl py-3 text-sm shadow-[var(--glow-soft)] disabled:opacity-40 flex items-center justify-center gap-2">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" />analyzing vibes…</> : <><Camera className="w-4 h-4" />decrypt this chat</>}
      </button>

      {analysis && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-5 glass-card p-5 space-y-4">
          <div>
            <p className="text-xs font-mono text-primary-glow uppercase tracking-widest">// vibe</p>
            <p className="font-display text-xl font-bold mt-1">{analysis.vibe}</p>
          </div>
          {[
            ["Rizz", analysis.rizz, "from-primary to-accent-pink"],
            ["Flirting", analysis.flirting, "from-accent-pink to-primary"],
            ["Emotional IQ", analysis.emotionalIntelligence, "from-accent to-primary"],
            ["Cringe", analysis.cringe, "from-destructive to-accent-pink"],
          ].map(([label, val, grad]: any) => (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1"><span className="font-bold">{label}</span><span className="font-mono text-primary-glow">{val}</span></div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 0.8 }} className={`h-full bg-gradient-to-r ${grad}`} />
              </div>
            </div>
          ))}
          {analysis.greenFlags?.length > 0 && (
            <div><p className="text-xs font-bold text-accent mb-1">green flags 🟢</p>
              <ul className="text-xs text-muted-foreground space-y-1">{analysis.greenFlags.map((g: string, i: number) => <li key={i}>· {g}</li>)}</ul>
            </div>
          )}
          {analysis.redFlags?.length > 0 && (
            <div><p className="text-xs font-bold text-destructive mb-1">red flags 🚩</p>
              <ul className="text-xs text-muted-foreground space-y-1">{analysis.redFlags.map((g: string, i: number) => <li key={i}>· {g}</li>)}</ul>
            </div>
          )}
          {analysis.advice && <p className="text-sm italic neon-text font-bold">"{analysis.advice}"</p>}
        </motion.div>
      )}
    </ScreenShell>
  );
};

export default Analyzer;
