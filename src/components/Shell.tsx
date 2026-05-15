import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ReactNode } from "react";

export const FloatingBubble = ({ onClick }: { onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    drag
    dragConstraints={{ left: -150, right: 150, top: -400, bottom: 0 }}
    dragElastic={0.18}
    whileTap={{ scale: 0.94 }}
    className="fixed bottom-24 right-5 z-50 w-13 h-13 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing"
    style={{ background: "var(--gradient-rizz)", boxShadow: "var(--glow-primary)", width: 52, height: 52 }}
  >
    <Sparkles className="w-5 h-5 text-primary-foreground" />
  </motion.button>
);

export const ScreenShell = ({
  title,
  subtitle,
  children,
  trailing,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  trailing?: ReactNode;
}) => (
  <div className="min-h-screen pb-28 px-5 pt-10 max-w-md mx-auto">
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mb-7 flex items-end justify-between gap-3"
    >
      <div className="min-w-0">
        <h1 className="font-display text-[28px] leading-[1.1] font-bold tracking-tight neon-text">{title}</h1>
        {subtitle && <p className="text-[13px] text-muted-foreground mt-1.5 leading-snug">{subtitle}</p>}
      </div>
      {trailing}
    </motion.header>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  </div>
);
