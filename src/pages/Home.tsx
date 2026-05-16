import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, Heart, Camera, Trophy, MessageCircle, Wand2, Flame, Brain, Zap, Bell, Crown, ArrowUpRight,
} from "lucide-react";
import { ScreenShell } from "@/components/Shell";
import { useStats } from "@/hooks/useStats";

/* Mixed-size feature grid — varied to feel human-curated */
const features = [
  { to: "/reply", icon: Sparkles, title: "AI Replies", sub: "Context-aware responses", span: 2, accent: "primary" },
  { to: "/flirty", icon: Heart, title: "Flirty Mode", sub: "Dialed-in charm", span: 1, accent: "pink" },
  { to: "/analyzer", icon: Camera, title: "Screenshot Scanner", sub: "Decode any chat", span: 1, accent: "primary" },
  { to: "/coach", icon: Brain, title: "Coach", sub: "Live advice", span: 1, accent: "primary" },
  { to: "/grammar", icon: Wand2, title: "Smart Grammar", sub: "Fix without losing slang", span: 1, accent: "accent" },
  { to: "/personality", icon: Flame, title: "Personalities", sub: "Sigma · Soft · Savage", span: 2, accent: "pink" },
  { to: "/insights", icon: Zap, title: "Insights", sub: "Green & red flags", span: 1, accent: "primary" },
  { to: "/notifications", icon: Bell, title: "Notif Summary", sub: "Catch up in 5s", span: 1, accent: "accent" },
  { to: "/score", icon: Trophy, title: "Rizz Score", sub: "Rate your game", span: 2, accent: "primary" },
] as const;

const accentBg = (a: string) =>
  a === "pink"
    ? "linear-gradient(135deg, hsl(330 80% 70%), hsl(285 70% 65%))"
    : a === "accent"
    ? "linear-gradient(135deg, hsl(200 80% 65%), hsl(180 70% 60%))"
    : "linear-gradient(135deg, hsl(247 100% 72%), hsl(265 75% 60%))";

const Home = () => {
  const nav = useNavigate();
  const { stats } = useStats();
  const isNew = stats.replies === 0 && stats.analyzed === 0;

  return (
    <ScreenShell
      title="Hey 👋"
      subtitle={isNew ? "Let's set up your first reply." : "Pick up where you left off."}
      trailing={
        <button
          onClick={() => nav("/profile")}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "var(--gradient-rizz)", boxShadow: "var(--shadow-sm)" }}
          aria-label="Profile"
        >
          <span className="text-sm font-bold text-primary-foreground">Y</span>
        </button>
      }
    >
      {/* Hero card — generous, calm, one CTA */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="surface-elevated p-5 mb-5 relative overflow-hidden"
      >
        <div
          className="absolute -top-16 -right-12 w-48 h-48 rounded-full opacity-50"
          style={{ background: "radial-gradient(closest-side, hsl(247 100% 65% / 0.5), transparent 70%)" }}
        />
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary-glow font-medium mb-2">
          {isNew ? "Welcome" : "Today"}
        </p>
        {isNew ? (
          <>
            <h2 className="font-display text-[26px] leading-tight font-bold mb-1.5">
              Your AI texting copilot.
            </h2>
            <p className="text-[14px] text-muted-foreground mb-5 max-w-xs">
              Drop a screenshot or paste a chat. We&rsquo;ll handle the rest.
            </p>
          </>
        ) : (
          <>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="font-display text-[40px] leading-none font-bold accent-text">
                {stats.score || "—"}
              </span>
              <span className="text-[13px] text-muted-foreground">rizz score</span>
            </div>
            <p className="text-[13px] text-muted-foreground mb-5">
              {stats.replies} replies · {stats.analyzed} chats · {stats.wins} W
            </p>
          </>
        )}
        <button
          onClick={() => nav("/reply")}
          className="btn-primary py-3 px-5 inline-flex items-center gap-2 text-[14px]"
        >
          <MessageCircle className="w-4 h-4" />
          Generate a reply
        </button>
      </motion.section>

      {/* Quick stats row — only when not new */}
      {!isNew && (
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {[
            { l: "Replies", v: stats.replies },
            { l: "Analyzed", v: stats.analyzed },
            { l: "Wins", v: stats.wins },
          ].map((s) => (
            <div key={s.l} className="surface px-3 py-3">
              <p className="font-display text-[20px] font-bold leading-none">{s.v}</p>
              <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground mt-1.5 font-medium">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-display text-[18px] font-semibold">Tools</h3>
        <button onClick={() => nav("/premium")} className="text-[12px] text-primary-glow font-medium inline-flex items-center gap-1">
          <Crown className="w-3 h-3" /> Premium
        </button>
      </div>

      {/* Bento grid — varied sizes feel handcrafted */}
      <div className="grid grid-cols-2 gap-2.5">
        {features.map((f, i) => (
          <motion.button
            key={f.to}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.035, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.98 }}
            onClick={() => nav(f.to)}
            className={`surface text-left p-4 group relative overflow-hidden ${
              f.span === 2 ? "col-span-2" : ""
            }`}
            style={{ minHeight: f.span === 2 ? 110 : 130 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: accentBg(f.accent), boxShadow: "var(--shadow-sm)" }}
              >
                <f.icon className="w-[18px] h-[18px] text-primary-foreground" strokeWidth={2.2} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
            </div>
            <h4 className="font-display font-semibold text-[14.5px] leading-tight">{f.title}</h4>
            <p className="text-[12px] text-muted-foreground leading-snug mt-0.5">{f.sub}</p>
          </motion.button>
        ))}
      </div>
    </ScreenShell>
  );
};

export default Home;
