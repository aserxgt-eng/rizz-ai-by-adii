import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy, Sparkles, Loader2, Heart, Flame, Smile, Zap, Wand2, Mic, Baby, Ghost, ShieldCheck,
  Coffee, Skull, HeartHandshake, HeartCrack, Star, Check, RefreshCw, Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LanguageSelector } from "@/components/LanguageSelector";
import { RizzWordmark } from "@/components/RizzWordmark";
import { useLanguage } from "@/hooks/useLanguage";
import { findLang, isRTL } from "@/lib/languages";
import { useStats } from "@/hooks/useStats";

const MODES = [
  { id: "flirty", label: "Flirty", icon: Smile },
  { id: "savage", label: "Savage", icon: Flame },
  { id: "loving", label: "Loving", icon: Heart },
  { id: "caring", label: "Caring", icon: ShieldCheck },
  { id: "smart", label: "Smart", icon: Sparkles },
  { id: "funny", label: "Funny", icon: Smile },
  { id: "romantic", label: "Romantic", icon: Heart },
  { id: "pickup", label: "Pickup", icon: Zap },
  { id: "innocent", label: "Innocent", icon: Baby },
  { id: "emotional", label: "Emotional", icon: HeartCrack },
  { id: "emotionless", label: "Emotionless", icon: Ghost },
  { id: "chill", label: "Chill", icon: Coffee },
  { id: "toxic", label: "Toxic", icon: Skull },
  { id: "stylish", label: "Stylish", icon: Star },
  { id: "loving-partner", label: "Loving Partner", icon: HeartHandshake },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

interface Props { defaultMode?: string; title?: string; subtitle?: string; }

const ReplyGenerator = ({
  defaultMode = "flirty",
  title = "Reply Generator",
  subtitle = "Get the perfect reply for any message.",
}: Props) => {
  const nav = useNavigate();
  const [mode, setMode] = useState(defaultMode);
  const [context, setContext] = useState("");
  const [replies, setReplies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const { lang } = useLanguage();
  const langInfo = findLang(lang);
  const dir = isRTL(lang) ? "rtl" : "ltr";
  const { bump, stats } = useStats();

  const generate = async () => {
    if (!context.trim()) { toast.error("Drop the convo first"); return; }
    setLoading(true); setReplies([]);
    try {
      const { data, error } = await supabase.functions.invoke("rizz-generate", {
        body: { mode, personality: "Gen Z", context, action: "reply", language: lang },
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
    <div className="min-h-screen pb-28 px-5 pt-10 max-w-md mx-auto">
      {/* Top bar — menu · Rizz wordmark · credits */}
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="flex items-center justify-between mb-7"
      >
        <button
          onClick={() => nav("/settings")}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground/80"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <RizzWordmark size={30} />
        <div
          className="h-10 px-3 rounded-full inline-flex items-center gap-1.5"
          style={{
            background: "hsl(247 100% 70% / 0.10)",
            border: "1px solid hsl(247 100% 70% / 0.28)",
          }}
        >
          <Zap className="w-3.5 h-3.5 text-primary-glow" fill="currentColor" />
          <span className="text-[12.5px] font-semibold text-primary-glow font-mono">
            {Math.max(0, 12 - stats.replies)}
          </span>
        </div>
      </motion.header>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, duration: 0.45, ease: easeOut }}
        className="mb-6"
      >
        <h1 className="font-display text-[34px] leading-[1.05] font-bold tracking-tight neon-text inline-flex items-center gap-2">
          {title}
          <motion.span
            animate={{ rotate: [0, 15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-primary-glow"
          >
            <Sparkles className="w-5 h-5" />
          </motion.span>
        </h1>
        <p className="text-[13.5px] text-muted-foreground mt-1.5">{subtitle}</p>
      </motion.div>

      {/* Their message (composer styled as chat bubble) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] text-muted-foreground font-medium">Their message</p>
          <LanguageSelector />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: easeOut }}
          className="surface-elevated p-3 flex items-start gap-3"
        >
          <div
            className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-base font-bold text-primary-foreground"
            style={{
              background: "linear-gradient(135deg, hsl(330 80% 70%), hsl(265 75% 60%))",
            }}
          >
            💬
          </div>
          <div className="flex-1 min-w-0">
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              dir={dir}
              placeholder="Hey, what are you up to later?"
              maxLength={150}
              className="w-full h-14 bg-transparent resize-none outline-none text-[14.5px] placeholder:text-foreground/50 leading-snug"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            />
            <div className="flex items-center justify-between mt-1">
              <button
                onClick={voice}
                className="text-[11px] text-primary-glow inline-flex items-center gap-1"
                aria-label="Voice"
              >
                <Mic className="w-3 h-3" /> voice
              </button>
              <span className="text-[11px] text-muted-foreground font-mono">
                {context.length}/150
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Choose your vibe */}
      <div className="mb-6">
        <p className="text-[12px] text-muted-foreground font-medium mb-3">Choose your vibe</p>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
          {MODES.map((m) => {
            const active = mode === m.id;
            return (
              <motion.button
                key={m.id}
                whileTap={{ scale: 0.94 }}
                onClick={() => setMode(m.id)}
                className="relative shrink-0 inline-flex items-center gap-2 h-11 px-4 rounded-full text-[13px] font-medium transition-colors"
                style={
                  active
                    ? {
                        background: "hsl(247 100% 70% / 0.14)",
                        border: "1.5px solid hsl(247 100% 70% / 0.6)",
                        color: "hsl(var(--primary-glow))",
                        boxShadow: "0 0 0 4px hsl(247 100% 70% / 0.08)",
                      }
                    : {
                        background: "hsl(var(--surface-2) / 0.6)",
                        border: "1px solid hsl(var(--border))",
                        color: "hsl(var(--foreground-muted))",
                      }
                }
              >
                <m.icon className="w-4 h-4" strokeWidth={2.2} />
                {m.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Generated replies */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] text-muted-foreground font-medium inline-flex items-center gap-1.5">
          Generated replies
          <Sparkles className="w-3 h-3 text-primary-glow" />
        </p>
        {!replies.length && !loading && (
          <button onClick={generate} className="btn-primary h-9 px-4 text-[12.5px] inline-flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5" /> Generate
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {loading &&
            [1, 2, 3].map((i) => (
              <motion.div
                key={`skel-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="surface-elevated p-4 flex gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-muted animate-pulse shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 rounded-full bg-muted animate-pulse w-[90%]" />
                  <div className="h-3 rounded-full bg-muted animate-pulse w-[65%]" />
                </div>
              </motion.div>
            ))}

          {!loading &&
            replies.map((r, i) => (
              <motion.div
                key={`r-${i}`}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: easeOut }}
                className="surface-elevated p-3.5 flex items-start gap-3 group"
              >
                <div
                  className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-[15px] font-display font-bold text-primary-glow"
                  style={{
                    background: "hsl(247 100% 70% / 0.12)",
                    border: "1px solid hsl(247 100% 70% / 0.32)",
                  }}
                >
                  {i + 1}
                </div>
                <p
                  dir={dir}
                  className="flex-1 text-[14px] leading-[1.45] text-foreground/95 self-center"
                >
                  {r}
                </p>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => copy(r, i)}
                  className="p-2 rounded-lg text-primary-glow hover:bg-primary/10 transition shrink-0"
                  aria-label="Copy"
                >
                  {copiedIdx === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </motion.button>
              </motion.div>
            ))}
        </AnimatePresence>

        {!replies.length && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-10 px-6"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center"
              style={{
                background: "hsl(247 100% 70% / 0.10)",
                border: "1px solid hsl(247 100% 70% / 0.25)",
              }}
            >
              <Sparkles className="w-6 h-6 text-primary-glow" />
            </motion.div>
            <p className="text-[13.5px] font-medium text-foreground/80 mb-1">
              Type a message above
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Pick a vibe · tap Generate · {langInfo.native}
            </p>
          </motion.div>
        )}
      </div>

      {/* Generate new replies CTA */}
      {(replies.length > 0 || loading) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-6"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={generate}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-primary-glow disabled:opacity-50"
            style={{
              background: "hsl(247 100% 70% / 0.10)",
              border: "1px solid hsl(247 100% 70% / 0.25)",
            }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Generate new replies
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ReplyGenerator;
