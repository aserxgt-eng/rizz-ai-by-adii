import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, ShieldCheck, ArrowRight } from "lucide-react";

const STEPS = [
  {
    icon: Sparkles,
    eyebrow: "Meet RizzAI",
    title: "Replies that read the room.",
    text: "Context-aware messages in your tone — smart, flirty, savage, or chill. You pick the energy.",
  },
  {
    icon: Heart,
    eyebrow: "Built for the chronically online",
    title: "Sound like you. Just sharper.",
    text: "Personalities, screenshot decoder, rizz score. Across 16+ languages including Hinglish & Roman Marathi.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Private by default",
    title: "Your chats never leave your phone.",
    text: "Local-first processing. No keylogging. Zero message storage unless you opt in.",
  },
];

const Onboarding = () => {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const next = () => (step < STEPS.length - 1 ? setStep(step + 1) : nav("/home"));
  const S = STEPS[step];

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16 pb-8 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: i === step ? 28 : 8,
                background: i <= step ? "var(--gradient-rizz)" : "hsl(var(--surface-3))",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => nav("/home")}
          className="text-[13px] text-muted-foreground hover:text-foreground transition"
        >
          Skip
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col justify-center"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
            style={{
              background: "linear-gradient(160deg, hsl(247 100% 72%), hsl(265 75% 55%))",
              boxShadow: "var(--glow-soft)",
            }}
          >
            <S.icon className="w-7 h-7 text-primary-foreground" strokeWidth={2.2} />
          </div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-primary-glow font-medium mb-3">
            {S.eyebrow}
          </p>
          <h2 className="font-display text-[34px] leading-[1.08] font-bold tracking-tight text-balance neon-text mb-4">
            {S.title}
          </h2>
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm">{S.text}</p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={next}
        className="btn-primary py-4 px-6 flex items-center justify-center gap-2 text-[15px]"
      >
        {step === STEPS.length - 1 ? "Get started" : "Continue"}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
export default Onboarding;
