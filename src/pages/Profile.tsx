import { ScreenShell } from "@/components/Shell";
import { Sparkles, RotateCcw } from "lucide-react";
import { useStats } from "@/hooks/useStats";
import { toast } from "sonner";

const Profile = () => {
  const { stats, reset } = useStats();
  return (
    <ScreenShell title="Profile" subtitle="your rizz stats.">
      <div className="glass-card p-6 text-center mb-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-rizz flex items-center justify-center animate-pulse-glow mb-3">
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </div>
        <p className="font-display text-2xl font-black neon-text">@you</p>
        <p className="text-xs text-muted-foreground mt-1">RizzAI member · fresh start</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[["Replies", stats.replies], ["Score", stats.score], ["Wins", stats.wins]].map(([l, v]) => (
          <div key={l as string} className="glass-card p-4 text-center">
            <p className="font-display text-2xl font-black neon-text">{v}</p>
            <p className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mt-1">{l}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => { reset(); toast.success("stats reset · fresh era 🔄"); }}
        className="mt-5 w-full glass-card py-3 text-xs font-bold flex items-center justify-center gap-2 text-muted-foreground hover:text-primary-glow"
      >
        <RotateCcw className="w-3.5 h-3.5" /> reset all stats
      </button>
    </ScreenShell>
  );
};
export default Profile;
