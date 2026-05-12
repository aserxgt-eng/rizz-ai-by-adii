import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect } from "react";

const Splash = () => {
  const nav = useNavigate();
  useEffect(() => { const t = setTimeout(() => nav("/home"), 2400); return () => clearTimeout(t); }, [nav]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
      <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", duration: 1 }}
        className="w-28 h-28 rounded-[2rem] bg-gradient-rizz flex items-center justify-center animate-pulse-glow mb-8">
        <Sparkles className="w-14 h-14 text-primary-foreground" />
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="font-display text-6xl font-black neon-text tracking-tight">RizzAI</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="text-muted-foreground mt-3 text-base">Never overthink a text again.</motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-10 text-xs font-mono text-muted-foreground/70">
        Built by <a href="https://www.instagram.com/aadi.devx/" target="_blank" rel="noreferrer" className="neon-text font-bold">Aadi ⚡</a>
      </motion.div>
    </div>
  );
};
export default Splash;
