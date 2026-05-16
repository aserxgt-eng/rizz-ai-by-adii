import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/** Italic violet "Rizz" wordmark with sparkle — used in app headers. */
export const RizzWordmark = ({ size = 28 }: { size?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className="inline-flex items-center gap-1.5"
  >
    <span
      className="font-display font-bold italic accent-text leading-none"
      style={{ fontSize: size, letterSpacing: "-0.04em" }}
    >
      Rizz
    </span>
    <motion.span
      animate={{ scale: [1, 1.15, 1], rotate: [0, 12, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      className="text-primary-glow"
    >
      <Sparkles className="w-3.5 h-3.5" strokeWidth={2.4} />
    </motion.span>
  </motion.div>
);
