import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, ShieldCheck, ArrowRight } from "lucide-react";

const STEPS = [
  { icon: Sparkles, title: "AI that gets the vibe", text: "Context-aware replies in your tone. Smart, flirty, savage — your call." },
  { icon: Heart, title: "Built for the chronically online", text: "Gen Z personalities, dangerous rizz, screenshot decoder, score system." },
  { icon: ShieldCheck, title: "Privacy-first", text: "Local-first processing. No keylogging. Zero message storage by default." },
];

const Onboarding = () => {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const next = () => step < STEPS.length - 1 ? setStep(step + 1) : nav("/home");
  const S = STEPS[step];
  return (
    <div className="min-h-screen flex flex-col p-6 pt-20">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-rizz flex items-center justify-center animate-pulse-glow mb-8">
            <S.icon className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl font-black neon-text mb-3">{S.title}</h2>
          <p className="text-muted-foreground max-w-xs">{S.text}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 justify-center mb-6">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-8 bg-gradient-rizz" : "w-1.5 bg-muted"}`} />
        ))}
      </div>
      <button onClick={next} className="bg-gradient-rizz text-primary-foreground font-bold rounded-2xl py-4 shadow-[var(--glow-soft)] flex items-center justify-center gap-2">
        {step === STEPS.length - 1 ? "let's go" : "next"} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
export default Onboarding;
