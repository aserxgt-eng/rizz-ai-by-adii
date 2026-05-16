import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy, Sparkles, Loader2, Heart, Flame, Smile, Zap, Wand2, Mic, Baby, Ghost, ShieldCheck,
  Coffee, Skull, HeartHandshake, HeartCrack, Star, Check,
} from "lucide-react";
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

const ReplyGenerator = ({
  defaultMode = "smart",
  title = "Compose",
  subtitle = "Paste the convo, pick a vibe, ship the W.",
}: Props) => {
  const [mode, setMode] = useState(defaultMode);
  const [persona, setPersona] = useState("Gen Z");
  const [context, setContext] = useState("");
  const [replies, setReplies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const { lang } = useLanguage();
  const langInfo = findLang(lang);
  const dir = isRTL(lang) ? "rtl" : "ltr";
  const { bump } = useStats();

  const generate = async () => {
    if (!context.trim()) { toast.error("Drop the convo first"); return; }
    setLoading(true); setReplies([]);
    try {
      const { data, error } = await supabase.functions.invoke("rizz-generate", {
        body: { mode, personality: persona, context, action: "reply", language: lang },
      });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); return; }
      const r = data.replies ?? [];
      setReplies(r);
      if (r.length) bump({ replies: r.length });
    } catch (e: any) {
      toast.error(e.message ?? "Something broke");
    } finally { setLoading(false); }
  };

  const copy = (t: string, i: number) => {
    navigator.clipboard.writeText(t);
    setCopiedIdx(i);
    toast.success("Copied");
    setTimeout(() => setCopiedIdx(null), 1400);
  };

  const voice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { toast.error("Voice not supported on this browser"); return; }
    const r = new SR(); r.lang = lang === "en" ? "en-US" : lang; r.start();
    r.onresult = (e: any) => setContext((p) => (p ? p + " " : "") + e.results[0][0].transcript);
  };

  return (
    <ScreenShell title={title} subtitle={subtitle} trailing={<LanguageSelector />}>
      {/* Mode chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
        {MODES.map((m) => {
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12.5px] font-medium transition-all ${
                active ? "" : "chip"
              }`}
              style={
                active
                  ? { background: "var(--gradient-rizz)", color: "hsl(var(--primary-foreground))", boxShadow: "var(--glow-soft)" }
                  : undefined
              }
            >
              <m.icon className="w-3.5 h-3.5" strokeWidth={2.2} />
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Persona chips — quieter row */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1 mt-2 -mx-1 px-1">
        {PERSONAS.map((p) => (
          <button
            key={p}
            onClick={() => setPersona(p)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-mono transition ${
              persona === p
                ? "text-primary-glow"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={{
              background: persona === p ? "hsl(247 100% 70% / 0.12)" : "transparent",
              border: `1px solid ${persona === p ? "hsl(247 100% 70% / 0.35)" : "hsl(var(--border))"}`,
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Composer card */}
      <div className="surface-elevated p-3 mt-4">
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          dir={dir}
          placeholder={`them: hey wyd...\nyou: ...`}
          className="w-full h-32 bg-transparent resize-none outline-none text-[14px] placeholder:text-muted-foreground/50 leading-relaxed px-2 py-1.5"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        />
        <div className="flex items-center gap-2 mt-1 px-1">
          <button
            onClick={voice}
            className="w-10 h-10 rounded-full flex items-center justify-center text-primary-glow"
            style={{ background: "hsl(247 100% 70% / 0.10)", border: "1px solid hsl(247 100% 70% / 0.25)" }}
            aria-label="Voice input"
          >
            <Mic className="w-4 h-4" />
          </button>
          <p className="flex-1 text-[11px] text-muted-foreground/70">
            {context.length > 0 ? `${context.length} chars` : "Tap mic or paste a message"}
          </p>
          <button
            onClick={generate}
            disabled={loading}
            className="btn-primary px-5 h-10 inline-flex items-center justify-center gap-2 text-[13.5px] disabled:opacity-50"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Cooking…</>
            ) : (
              <><Wand2 className="w-4 h-4" />Generate</>
            )}
          </button>
        </div>
      </div>

      {/* Replies */}
      <div className="mt-5 space-y-2.5">
        <AnimatePresence mode="popLayout">
          {loading && (
            <motion.div
              key="skel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2.5"
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="surface p-4 animate-pulse">
                  <div className="h-3 rounded-full bg-muted w-[85%] mb-2" />
                  <div className="h-3 rounded-full bg-muted w-[60%]" />
                </div>
              ))}
            </motion.div>
          )}

          {!loading && replies.map((r, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="surface p-4 group"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[11px] font-display font-bold text-primary-foreground mt-0.5"
                  style={{ background: "var(--gradient-rizz)" }}
                >
                  {i + 1}
                </div>
                <p dir={dir} className="flex-1 text-[14.5px] leading-relaxed text-foreground/95">
                  {r}
                </p>
                <button
                  onClick={() => copy(r, i)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition shrink-0"
                  aria-label="Copy"
                >
                  {copiedIdx === i ? <Check className="w-4 h-4 text-primary-glow" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!replies.length && !loading && (
          <div className="text-center py-12 px-6">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center"
              style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}
            >
              <Sparkles className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-[14px] font-medium text-foreground/80 mb-1">No replies yet</p>
            <p className="text-[12.5px] text-muted-foreground/70">
              Paste a chat above and tap Generate · {langInfo.native}
            </p>
          </div>
        )}
      </div>
    </ScreenShell>
  );
};

export default ReplyGenerator;
