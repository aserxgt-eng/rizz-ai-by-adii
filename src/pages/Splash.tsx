import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect } from "react";

const Splash = () => {
  const nav = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => nav("/home"), 1900);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-9"
      >
        <div
          className="absolute inset-0 rounded-[28px] blur-2xl opacity-60"
          style={{ background: "var(--gradient-rizz)" }}
        />
        <div
          className="relative w-24 h-24 rounded-[28px] flex items-center justify-center animate-breathe"
          style={{
            background: "linear-gradient(160deg, hsl(247 100% 75%), hsl(265 80% 55%))",
            boxShadow: "var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.25)",
          }}
        >
          <Sparkles className="w-11 h-11 text-primary-foreground" strokeWidth={2.4} />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="font-display text-[44px] font-bold tracking-tight neon-text"
      >
        RizzAI
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-muted-foreground mt-2 text-[15px]"
      >
        Never overthink a text again.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-10 text-[11px] font-mono text-muted-foreground/60"
      >
        Crafted by{" "}
        <a href="https://www.instagram.com/aadi.devx/" target="_blank" rel="noreferrer" className="accent-text font-semibold">
          Aadi
        </a>
      </motion.div>
    </div>
  );
};
export default Splash;
