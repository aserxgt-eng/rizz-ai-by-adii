import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Sparkles, Loader2, Heart, Flame, Smile, Zap, Wand2, Mic, Baby, Ghost, ShieldCheck, Coffee, Skull, HeartHandshake, HeartCrack, Star } from "lucide-react";
import { ScreenShell } from "@/components/Shell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import { findLang, isRTL } from "@/lib/languages";
import { useStats } from "@/hooks/useStats";

const MODES = [
  { id: "smart", label: "Smart", icon: Sparkles },
  { id: "flirty", label: "Flirty", icon: Heart },
  { id: "funny", label: "Funny", icon: Smile },
  { id: "savage", label: "Savage", icon: Flame },
  { id: "romantic", label: "Romantic", icon: Heart },
  { id: "pickup", label: "Pickup", icon: Zap },
  { id: "loving", label: "Loving", icon: HeartHandshake },
  { id: "caring", label: "Caring", icon: ShieldCheck },
  { id: "innocent", label: "Innocent", icon: Baby },
  { id: "emotional", label: "Emotional", icon: HeartCrack },
  { id: "emotionless", label: "Emotionless", icon: Ghost },
  { id: "chill", label: "Chill", icon: Coffee },
  { id: "toxic", label: "Toxic", icon: Skull },
  { id: "stylish", label: "Stylish", icon: Star },
];

const PERSONAS = [
  "Gen Z", "Sigma", "Savage", "Soft Boy", "Soft Girl", "Mature", "Chill", "Confident",
  "Toxic Funny", "Caring Boy", "Caring Girl", "Loving Partner", "Innocent", "Emotionless",
  "Hopeless Romantic", "Mysterious", "Playful Tease", "Protective", "Shy", "Bold",
];

interface Props { defaultMode?: string; title?: string; subtitle?: string; }

const ReplyGenerator = ({ defaultMode = "smart", title = "AI Reply Generator", subtitle = "Paste the convo, pick a vibe, ship the W." }: Props) => {
  const [mode, setMode] = useState(defaultMode);
  const [persona, setPersona] = useState("Gen Z");
  const [context, setContext] = useState("");
  const [replies, setReplies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { lang } = useLanguage();
  const langInfo = findLang(lang);
  const dir = isRTL(lang) ? "rtl" : "ltr";

  const generate = async () => {
    if (!context.trim()) { toast.error("Drop the convo first"); return; }
    setLoading(true); setReplies([]);
    try {
      const { data, error } = await supabase.functions.invoke("rizz-generate", {
        body: { mode, personality: persona, context, action: "reply", language: lang },
      });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); return; }
      setReplies(data.replies ?? []);
    } catch (e: any) {
      toast.error(e.message ?? "Something broke");
    } finally { setLoading(false); }
  };

  const copy = (t: string) => { navigator.clipboard.writeText(t); toast.success("copied 🔥"); };

  const voice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { toast.error("Voice not supported on this browser"); return; }
    const r = new SR(); r.lang = lang === "en" ? "en-US" : lang; r.start();
    r.onresult = (e: any) => setContext(prev => (prev ? prev + " " : "") + e.results[0][0].transcript);
  };

  return (
    <ScreenShell title={title} subtitle={subtitle}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-mono text-muted-foreground/70">output · {langInfo.native}</p>
        <LanguageSelector />
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              mode === m.id ? "bg-gradient-rizz text-primary-foreground shadow-[var(--glow-soft)]" : "glass text-muted-foreground"
            }`}>
            <m.icon className="w-3.5 h-3.5" />{m.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mt-2 -mx-1 px-1">
        {PERSONAS.map(p => (
          <button key={p} onClick={() => setPersona(p)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-mono transition-all ${
              persona === p ? "bg-primary/20 text-primary-glow border border-primary/40" : "text-muted-foreground border border-border"
            }`}>{p}</button>
        ))}
      </div>

      <div className="glass-card p-4 mt-4">
        <textarea
          value={context} onChange={e => setContext(e.target.value)}
          dir={dir}
          placeholder="them: hey wyd...&#10;you: ..."
          className="w-full h-32 bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground/60 font-mono"
        />
        <div className="flex gap-2 mt-2">
          <button onClick={voice} className="p-2 rounded-xl glass text-primary-glow"><Mic className="w-4 h-4" /></button>
          <button onClick={generate} disabled={loading}
            className="flex-1 bg-gradient-rizz text-primary-foreground font-bold rounded-2xl py-3 text-sm shadow-[var(--glow-soft)] disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />cooking…</> : <><Wand2 className="w-4 h-4" />generate rizz</>}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <AnimatePresence>
          {replies.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="glass-card p-4 flex items-start gap-3 group hover:border-primary/40 transition-all">
              <div className="w-7 h-7 rounded-xl bg-gradient-rizz flex items-center justify-center shrink-0 text-[11px] font-display font-black text-primary-foreground">
                {i + 1}
              </div>
              <p dir={dir} className="flex-1 text-sm leading-relaxed">{r}</p>
              <button onClick={() => copy(r)} className="p-1.5 rounded-lg text-muted-foreground hover:text-primary-glow opacity-0 group-hover:opacity-100 transition">
                <Copy className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {!replies.length && !loading && (
          <p className="text-center text-xs text-muted-foreground/60 font-mono mt-8">// awaiting input_</p>
        )}
      </div>
    </ScreenShell>
  );
};

export default ReplyGenerator;
