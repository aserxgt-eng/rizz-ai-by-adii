import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Heart, Camera, Trophy, MessageCircle, Wand2, Flame, Brain, Zap, Bell, Crown } from "lucide-react";
import { ScreenShell, FloatingBubble } from "@/components/Shell";

const features = [
  { to: "/reply", icon: Sparkles, title: "AI Replies", sub: "Smart context-aware texts", grad: "from-primary to-accent-pink" },
  { to: "/flirty", icon: Heart, title: "Flirty Mode", sub: "Dangerous rizz unlocked", grad: "from-accent-pink to-primary" },
  { to: "/analyzer", icon: Camera, title: "Screenshot Scanner", sub: "Decode any chat", grad: "from-accent to-primary" },
  { to: "/score", icon: Trophy, title: "Rizz Score", sub: "Rate your game", grad: "from-primary to-accent" },
  { to: "/coach", icon: Brain, title: "Conversation Coach", sub: "Real-time advice", grad: "from-accent-pink to-accent" },
  { to: "/grammar", icon: Wand2, title: "Smart Grammar", sub: "Fix without losing slang", grad: "from-accent to-accent-pink" },
  { to: "/personality", icon: Flame, title: "Personalities", sub: "Sigma, soft, savage…", grad: "from-primary to-accent-pink" },
  { to: "/insights", icon: Zap, title: "Relationship Insights", sub: "Detect green/red flags", grad: "from-accent to-primary" },
  { to: "/notifications", icon: Bell, title: "Notif Summary", sub: "Catch up in 5s", grad: "from-accent-pink to-primary" },
  { to: "/premium", icon: Crown, title: "Go Premium", sub: "Unlock everything", grad: "from-primary to-accent" },
];

const Home = () => {
  const nav = useNavigate();
  return (
    <>
      <ScreenShell title="RizzAI" subtitle="Never overthink a text again.">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 mb-5 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-rizz blur-3xl opacity-40" />
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow font-mono mb-2">// today</p>
          <h2 className="font-display text-2xl font-bold mb-1">your rizz is up <span className="neon-text">+24%</span></h2>
          <p className="text-sm text-muted-foreground mb-4">3 chats analyzed · 12 replies generated · 1 W secured</p>
          <button onClick={() => nav("/reply")} className="bg-gradient-rizz text-primary-foreground font-bold rounded-2xl px-5 py-3 text-sm shadow-[var(--glow-soft)] hover:scale-[1.02] transition-transform">
            <MessageCircle className="w-4 h-4 inline mr-2" />generate reply
          </button>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <motion.button
              key={f.to}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => nav(f.to)}
              className="glass-card p-4 text-left hover:border-primary/40 transition-all group"
            >
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-[var(--glow-soft)]`}>
                <f.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-sm mb-0.5">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-snug">{f.sub}</p>
            </motion.button>
          ))}
        </div>
      </ScreenShell>
      <FloatingBubble onClick={() => nav("/reply")} />
    </>
  );
};

export default Home;
