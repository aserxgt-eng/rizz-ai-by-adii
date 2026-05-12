import { ScreenShell } from "@/components/Shell";
import { motion } from "framer-motion";
import { Brain, Clock, Eye, AlertTriangle, ThumbsUp } from "lucide-react";

const TIPS = [
  { icon: Clock, title: "wait 17 min", desc: "you're replying too fast — let them feel the gap.", tone: "from-accent to-primary" },
  { icon: Eye, title: "stop overexplaining", desc: "your last 3 texts > their entire convo. dial it back.", tone: "from-accent-pink to-primary" },
  { icon: ThumbsUp, title: "they're into it", desc: "double texts + emojis + questions = green flag city.", tone: "from-accent to-accent-pink" },
  { icon: AlertTriangle, title: "dry texting alert", desc: "3 single-word replies in a row. switch the topic or leave 'em on read.", tone: "from-destructive to-accent-pink" },
];

const Coach = () => (
  <ScreenShell title="Conversation Coach" subtitle="real-time strategy, no cap.">
    <div className="glass-card p-5 mb-4 flex items-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-gradient-rizz flex items-center justify-center animate-pulse-glow">
        <Brain className="w-6 h-6 text-primary-foreground" />
      </div>
      <div>
        <p className="font-display text-lg font-bold neon-text">live coaching: ON</p>
        <p className="text-xs text-muted-foreground">analyzing your last 12 messages…</p>
      </div>
    </div>

    <div className="space-y-3">
      {TIPS.map((t, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          className="glass-card p-4 flex gap-3">
          <div className={`w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-br ${t.tone} flex items-center justify-center shadow-[var(--glow-soft)]`}>
            <t.icon className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-bold text-sm">{t.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </ScreenShell>
);
export default Coach;
