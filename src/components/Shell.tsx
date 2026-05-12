import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ReactNode } from "react";

export const FloatingBubble = ({ onClick }: { onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    drag
    dragConstraints={{ left: -150, right: 150, top: -400, bottom: 0 }}
    dragElastic={0.2}
    whileTap={{ scale: 0.92 }}
    className="fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full bg-gradient-rizz animate-pulse-glow flex items-center justify-center cursor-grab active:cursor-grabbing"
  >
    <Sparkles className="w-6 h-6 text-primary-foreground" />
  </motion.button>
);

export const ScreenShell = ({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) => (
  <div className="min-h-screen pb-28 px-5 pt-8 animate-fade-in">
    <header className="mb-6">
      <h1 className="font-display text-3xl font-black neon-text leading-tight">{title}</h1>
      {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
    </header>
    {children}
  </div>
);
