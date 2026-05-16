import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Flame, Search, ChevronRight, Activity } from "lucide-react";
import { useStats } from "@/hooks/useStats";
import { RizzWordmark } from "@/components/RizzWordmark";

/* ============================================================
   Home — mirrors the marketing screenshot:
   - Rizz wordmark + avatar
   - Hero: massive Rizz Score with animated orbital planet
   - Replies card with sine-wave SVG
   - Wins card with bar chart SVG
   - Analyzed card with orbital avatars
   ============================================================ */

const easeOut = [0.22, 1, 0.36, 1] as const;

const Orb = () => (
  <div className="relative w-[180px] h-[180px] shrink-0">
    {/* Dotted halo */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 rounded-full opacity-30"
      style={{
        background:
          "radial-gradient(circle at center, transparent 64%, hsl(247 100% 70% / 0.4) 64.5%, transparent 66%)",
      }}
    />
    {/* The planet */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-3 rounded-full overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, hsl(265 90% 75%) 0%, hsl(255 80% 55%) 35%, hsl(245 70% 28%) 75%, hsl(240 60% 15%) 100%)",
        boxShadow:
          "inset -20px -30px 50px hsl(240 70% 10% / 0.85), 0 0 60px hsl(247 100% 60% / 0.45)",
      }}
    >
      {/* Topographic rings */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen">
        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy={50 + i * 1.5}
            rx={40 - i * 3.5}
            ry={(40 - i * 3.5) * 0.45}
            fill="none"
            stroke="hsl(255 90% 85%)"
            strokeWidth="0.3"
          />
        ))}
      </svg>
    </motion.div>
    {/* Tiny stars */}
    {[
      { x: 12, y: 22, s: 1.5 },
      { x: 92, y: 8, s: 1 },
      { x: 78, y: 88, s: 1.2 },
      { x: 4, y: 70, s: 1 },
    ].map((p, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s * 2, height: p.s * 2 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.4 }}
      />
    ))}
  </div>
);

const WaveChart = () => (
  <svg viewBox="0 0 120 50" className="w-full h-12 opacity-70">
    <defs>
      <linearGradient id="wgrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(247 100% 70%)" stopOpacity="0.8" />
        <stop offset="100%" stopColor="hsl(247 100% 70%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.6, ease: easeOut }}
      d="M0,35 C12,32 18,18 28,20 C40,22 46,8 58,12 C72,16 78,30 90,25 C100,21 108,10 120,14"
      fill="none"
      stroke="hsl(247 100% 75%)"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M0,35 C12,32 18,18 28,20 C40,22 46,8 58,12 C72,16 78,30 90,25 C100,21 108,10 120,14 L120,50 L0,50 Z"
      fill="url(#wgrad)"
    />
  </svg>
);

const BarChart = () => {
  const bars = [40, 70, 35, 90, 55, 100, 75];
  return (
    <div className="flex items-end gap-1 h-12">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: easeOut }}
          className="flex-1 rounded-sm origin-bottom"
          style={{
            height: `${h}%`,
            background:
              "linear-gradient(180deg, hsl(247 100% 75%), hsl(247 100% 50%))",
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const nav = useNavigate();
  const { stats } = useStats();
  const score = stats.score || 0;
  const pct = Math.min(100, score);

  return (
    <div className="min-h-screen pb-28 px-5 pt-10 max-w-md mx-auto">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        className="flex items-center justify-between mb-6"
      >
        <RizzWordmark size={32} />
        <button
          onClick={() => nav("/profile")}
          className="relative w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: "var(--gradient-rizz)",
            border: "2px solid hsl(247 100% 75% / 0.4)",
            boxShadow: "var(--shadow-md)",
          }}
          aria-label="Profile"
        >
          <span className="text-sm font-bold text-primary-foreground">Y</span>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />
        </button>
      </motion.header>

      {/* Hero — Rizz Score */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easeOut }}
        onClick={() => nav("/score")}
        className="surface-elevated p-5 mb-3 relative overflow-hidden cursor-pointer"
        style={{ minHeight: 240 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <p className="text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
            Rizz Score
          </p>
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "hsl(247 100% 70% / 0.15)", border: "1px solid hsl(247 100% 70% / 0.3)" }}
          >
            <Activity className="w-3 h-3 text-primary-glow" />
          </span>
        </div>

        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <motion.h2
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: easeOut }}
              className="font-display font-bold accent-text leading-none"
              style={{ fontSize: 96, letterSpacing: "-0.05em" }}
            >
              {score || "—"}
            </motion.h2>
            <p className="text-primary-glow font-semibold text-[16px] mt-3">
              Top {Math.max(1, 100 - score)}%
            </p>
            <p className="text-[12.5px] text-muted-foreground mt-0.5">
              {score > 50 ? "You're above most rizzlers 😏" : "Start cooking to climb 🚀"}
            </p>
          </div>
          <Orb />
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--surface-3))" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 0.3, duration: 1.1, ease: easeOut }}
              className="h-full rounded-full"
              style={{ background: "var(--gradient-rizz)" }}
            />
          </div>
          <p className="text-right text-[11px] text-muted-foreground mt-1.5 font-mono">
            {score} / 100
          </p>
        </div>
      </motion.section>

      {/* Stat row */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45, ease: easeOut }}
          whileTap={{ scale: 0.97 }}
          onClick={() => nav("/reply")}
          className="surface-elevated p-4 text-left relative overflow-hidden"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "hsl(247 100% 70% / 0.15)", border: "1px solid hsl(247 100% 70% / 0.3)" }}
          >
            <MessageCircle className="w-4 h-4 text-primary-glow" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1">
            Replies
          </p>
          <p className="font-display text-[28px] font-bold leading-none">{stats.replies}</p>
          <p className="text-[11px] text-muted-foreground mt-1.5">Total replies generated</p>
          <div className="absolute right-1 bottom-2 w-1/2 pointer-events-none">
            <WaveChart />
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.45, ease: easeOut }}
          whileTap={{ scale: 0.97 }}
          onClick={() => nav("/score")}
          className="surface-elevated p-4 text-left relative overflow-hidden"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "hsl(247 100% 70% / 0.15)", border: "1px solid hsl(247 100% 70% / 0.3)" }}
          >
            <Flame className="w-4 h-4 text-primary-glow" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1">
            Wins
          </p>
          <p className="font-display text-[28px] font-bold leading-none">{stats.wins}</p>
          <p className="text-[11px] text-muted-foreground mt-1.5">Conversations won</p>
          <div className="absolute right-2 bottom-2 w-[55%] pointer-events-none">
            <BarChart />
          </div>
        </motion.button>
      </div>

      {/* Analyzed card with orbital avatars */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.45, ease: easeOut }}
        whileTap={{ scale: 0.98 }}
        onClick={() => nav("/analyzer")}
        className="surface-elevated p-4 w-full text-left relative overflow-hidden flex items-center"
        style={{ minHeight: 130 }}
      >
        <div className="flex-1 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "hsl(247 100% 70% / 0.15)", border: "1px solid hsl(247 100% 70% / 0.3)" }}
          >
            <Search className="w-4 h-4 text-primary-glow" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
            Analyzed
          </p>
          <p className="font-display text-[28px] font-bold leading-none mt-1">{stats.analyzed}</p>
          <p className="text-[11px] text-muted-foreground mt-1.5">Conversations analyzed</p>
        </div>

        {/* Orbital decoration */}
        <div className="relative w-[140px] h-[110px] shrink-0">
          {[60, 42, 26].map((r, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: r * 2,
                height: r * 2,
                border: "1px dashed hsl(247 50% 60% / 0.25)",
              }}
            />
          ))}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{ background: "hsl(247 100% 70%)", boxShadow: "0 0 12px hsl(247 100% 70%)" }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {[
              { a: 0, r: 56, c: "hsl(330 80% 70%)" },
              { a: 120, r: 56, c: "hsl(200 80% 65%)" },
              { a: 240, r: 40, c: "hsl(265 80% 75%)" },
            ].map((p, i) => {
              const x = 70 + Math.cos((p.a * Math.PI) / 180) * p.r;
              const y = 55 + Math.sin((p.a * Math.PI) / 180) * p.r;
              return (
                <div
                  key={i}
                  className="absolute w-6 h-6 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: x,
                    top: y,
                    background: p.c,
                    border: "2px solid hsl(var(--background))",
                    boxShadow: "0 4px 12px hsl(0 0% 0% / 0.5)",
                  }}
                />
              );
            })}
          </motion.div>
        </div>
        <ChevronRight className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
      </motion.button>
    </div>
  );
};

export default Home;
