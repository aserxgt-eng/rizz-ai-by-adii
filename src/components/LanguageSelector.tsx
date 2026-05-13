import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { LANGUAGES, getRecent, findLang } from "@/lib/languages";
import { useLanguage } from "@/hooks/useLanguage";

interface Props { compact?: boolean }

export const LanguageSelector = ({ compact }: Props) => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = findLang(lang);
  const recent = getRecent().filter((c) => c !== lang).slice(0, 3);
  const recentLangs = recent.map(findLang);
  const others = LANGUAGES.filter((l) => l.code !== lang && !recent.includes(l.code));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-full glass border border-primary/20 text-primary-glow font-mono ${
          compact ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"
        }`}
      >
        <Globe className="w-3 h-3" />
        <span>{current.flag}</span>
        <span>{current.native}</span>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              className="absolute right-0 top-full mt-2 w-56 max-h-72 overflow-y-auto scrollbar-hide glass-card p-2 z-50"
            >
              {recentLangs.length > 0 && (
                <>
                  <p className="text-[10px] font-mono text-muted-foreground/60 px-2 py-1">recent</p>
                  {recentLangs.map((l) => (
                    <LangRow key={l.code} l={l} active={false} onClick={() => { setLang(l.code); setOpen(false); }} />
                  ))}
                  <div className="h-px bg-border my-1" />
                </>
              )}
              <LangRow l={current} active onClick={() => setOpen(false)} />
              {others.map((l) => (
                <LangRow key={l.code} l={l} active={false} onClick={() => { setLang(l.code); setOpen(false); }} />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const LangRow = ({ l, active, onClick }: { l: typeof LANGUAGES[number]; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-2 py-2 rounded-xl text-xs hover:bg-secondary/50 transition ${
      active ? "bg-primary/10 text-primary-glow" : ""
    }`}
  >
    <span className="text-base">{l.flag}</span>
    <span className="flex-1 text-left font-semibold">{l.native}</span>
    <span className="text-[10px] text-muted-foreground/60">{l.name}</span>
    {active && <Check className="w-3 h-3 text-primary-glow" />}
  </button>
);
