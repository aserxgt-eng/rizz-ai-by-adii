import { ScreenShell } from "@/components/Shell";
import { Sparkles, RotateCcw, Crown } from "lucide-react";
import { useStats } from "@/hooks/useStats";
import { toast } from "sonner";

const Profile = () => {
  const { stats, reset } = useStats();
  return (
    <ScreenShell title="Profile" subtitle="Your rizz at a glance.">
      {/* Identity card */}
      <section className="surface-elevated p-5 mb-4 flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(160deg, hsl(247 100% 75%), hsl(265 75% 55%))",
            boxShadow: "var(--shadow-md), inset 0 1px 0 hsl(0 0% 100% / 0.2)",
          }}
        >
          <Sparkles className="w-7 h-7 text-primary-foreground" strokeWidth={2.2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-[20px] font-bold leading-tight">@you</p>
          <p className="text-[12.5px] text-muted-foreground mt-0.5">RizzAI member · fresh start</p>
        </div>
        <button
          className="btn-ghost px-3 py-1.5 text-[12px] inline-flex items-center gap-1.5"
        >
          <Crown className="w-3.5 h-3.5 text-primary-glow" /> Free
        </button>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          ["Replies", stats.replies],
          ["Score", stats.score],
          ["Wins", stats.wins],
        ].map(([l, v]) => (
          <div key={l as string} className="surface p-4 text-center">
            <p className="font-display text-[24px] font-bold leading-none accent-text">{v}</p>
            <p className="text-[10.5px] uppercase tracking-widest text-muted-foreground mt-2 font-medium">
              {l}
            </p>
          </div>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          reset();
          toast.success("Stats reset · fresh era 🔄");
        }}
        className="mt-5 w-full surface py-3.5 text-[12.5px] font-medium inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Reset all stats
      </button>
    </ScreenShell>
  );
};

export default Profile;
