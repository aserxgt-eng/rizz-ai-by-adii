import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Sparkles, X, Copy, RefreshCw, Mic, Wand2, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import { findLang, isRTL } from "@/lib/languages";
import { toast } from "sonner";
import { useStats } from "@/hooks/useStats";

const HIDDEN_ROUTES = ["/", "/onboarding"];
const MODES = ["smart", "flirty", "funny", "savage", "romantic", "loving", "caring", "innocent", "emotional", "emotionless", "chill", "toxic"] as const;
type Mode = typeof MODES[number];

export const RizzBubble = () => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("smart");
  const [context, setContext] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const dragControls = useDragControls();
  const longPressTimer = useRef<number | null>(null);
  const [hidden, setHidden] = useState(false);
  const { bump } = useStats();

  useEffect(() => {
    setHidden(localStorage.getItem("rizz.bubble.hidden") === "1");
  }, []);

  if (HIDDEN_ROUTES.includes(pathname) || hidden) return null;

  const generate = async (regen = false) => {
    if (!regen && !context.trim()) { toast.error("type something first"); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("rizz-generate", {
        body: { mode, personality: "Gen Z", context, action: "reply", language: lang, count: 1 },
      });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); return; }
      setReply(data.replies?.[0] ?? "");
    } catch (e: any) {
      toast.error(e.message ?? "failed");
    } finally { setLoading(false); }
  };

  const voice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { toast.error("voice not supported"); return; }
    const r = new SR();
    r.lang = lang === "en" ? "en-US" : `${lang}`;
    r.start();
    r.onresult = (e: any) => setContext((p) => (p ? p + " " : "") + e.results[0][0].transcript);
  };

  const copy = () => {
    if (!reply) return;
    navigator.clipboard.writeText(reply);
    toast.success("copied 🔥");
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    longPressTimer.current = window.setTimeout(() => {
      localStorage.setItem("rizz.bubble.hidden", "1");
      setHidden(true);
      toast("bubble hidden — re-enable in Settings", { duration: 2500 });
    }, 700);
    dragControls.start(e);
  };
  const clearLP = () => { if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; } };

  const dir = isRTL(lang) ? "rtl" : "ltr";
  const langInfo = findLang(lang);

  return (
    <>
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.15}
        dragConstraints={{ left: -window.innerWidth + 80, right: 10, top: -window.innerHeight + 200, bottom: 10 }}
        initial={{ x: 0, y: 0 }}
        className="fixed bottom-32 right-4 z-[60]"
        style={{ touchAction: "none" }}
      >
        <button
          onPointerDown={handlePointerDown}
          onPointerUp={clearLP}
          onPointerCancel={clearLP}
          onPointerLeave={clearLP}
          onClick={() => { if (!longPressTimer.current) setOpen(true); clearLP(); }}
          className="relative w-14 h-14 rounded-full bg-gradient-rizz animate-pulse-glow flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[var(--glow-primary)]"
          aria-label="Open Rizz bubble"
        >
          <span className="absolute inset-0 rounded-full animate-gradient bg-gradient-to-r from-primary via-accent-pink to-accent opacity-40 blur-md" />
          <Sparkles className="w-6 h-6 text-primary-foreground relative z-10" />
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-3 bg-background/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-sm p-4 border border-primary/30"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-rizz flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-display font-black text-sm neon-text">RizzAI</p>
                    <p className="text-[9px] font-mono text-muted-foreground">mini · {langInfo.native}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <LanguageSelector compact />
                  <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg glass text-muted-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-2">
                {MODES.map((m) => (
                  <button key={m} onClick={() => setMode(m)}
                    className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition ${
                      mode === m ? "bg-gradient-rizz text-primary-foreground" : "glass text-muted-foreground"
                    }`}>{m}</button>
                ))}
              </div>

              <div className="glass-card p-2 mt-2">
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  dir={dir}
                  placeholder={langInfo.code === "ar" ? "اكتب الرسالة هنا..." : langInfo.code === "ur" ? "یہاں پیغام لکھیں..." : "paste message..."}
                  className="w-full h-20 bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground/60 font-mono px-2 py-1"
                />
                <div className="flex gap-1.5 mt-1">
                  <button onClick={voice} className="p-2 rounded-xl glass text-primary-glow"><Mic className="w-3.5 h-3.5" /></button>
                  <button onClick={() => generate(false)} disabled={loading}
                    className="flex-1 bg-gradient-rizz text-primary-foreground font-bold rounded-xl py-2 text-xs disabled:opacity-50 flex items-center justify-center gap-1.5">
                    {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />cooking…</> : <><Wand2 className="w-3.5 h-3.5" />generate</>}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {reply && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-3 mt-3 border border-primary/20">
                    <p dir={dir} className="text-sm leading-relaxed">{reply}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={copy} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg glass text-xs text-primary-glow font-bold">
                        <Copy className="w-3 h-3" />copy
                      </button>
                      <button onClick={() => generate(true)} disabled={loading}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg glass text-xs text-accent font-bold">
                        <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />regenerate
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-[9px] font-mono text-muted-foreground/50 text-center mt-3">
                drag bubble to move · long-press to hide
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
