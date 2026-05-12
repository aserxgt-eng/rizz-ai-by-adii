import { ScreenShell } from "@/components/Shell";
import { motion } from "framer-motion";
import { Heart, Flame, AlertTriangle, Activity } from "lucide-react";

const Insights = () => (
  <ScreenShell title="Relationship Insights" subtitle="patterns the AI noticed.">
    <div className="glass-card p-5 mb-4 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-pink/40 blur-3xl" />
      <p className="text-xs font-mono uppercase tracking-widest text-primary-glow relative">// chemistry</p>
      <p className="font-display text-5xl font-black neon-text my-2 relative">87<span className="text-2xl">%</span></p>
      <p className="text-sm text-muted-foreground relative">strong mutual interest detected</p>
    </div>

    {[
      { icon: Heart, title: "Reply timing", val: "avg 4 min", note: "synced — they care.", grad: "from-accent-pink to-primary" },
      { icon: Flame, title: "Flirt index", val: "rising", note: "+38% over last 7 days.", grad: "from-primary to-accent" },
      { icon: AlertTriangle, title: "Ghosting risk", val: "low", note: "no patterns of withdrawal.", grad: "from-accent to-primary" },
      { icon: Activity, title: "Convo balance", val: "52 / 48", note: "near-perfect equilibrium.", grad: "from-primary to-accent-pink" },
    ].map((m, i) => (
      <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
        className="glass-card p-4 mb-3 flex items-center gap-3">
        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${m.grad} flex items-center justify-center`}><m.icon className="w-5 h-5 text-primary-foreground" /></div>
        <div className="flex-1">
          <p className="font-bold text-sm">{m.title}</p>
          <p className="text-xs text-muted-foreground">{m.note}</p>
        </div>
        <p className="font-display text-base font-black neon-text">{m.val}</p>
      </motion.div>
    ))}
  </ScreenShell>
);
export default Insights;
