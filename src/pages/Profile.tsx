import { ScreenShell } from "@/components/Shell";
import { Sparkles } from "lucide-react";

const Profile = () => (
  <ScreenShell title="Profile" subtitle="your rizz stats.">
    <div className="glass-card p-6 text-center mb-4">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-rizz flex items-center justify-center animate-pulse-glow mb-3">
        <Sparkles className="w-10 h-10 text-primary-foreground" />
      </div>
      <p className="font-display text-2xl font-black neon-text">@you</p>
      <p className="text-xs text-muted-foreground mt-1">RizzAI member since 2026</p>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {[["Replies", "247"], ["Score", "84"], ["Wins", "12"]].map(([l, v]) => (
        <div key={l} className="glass-card p-4 text-center">
          <p className="font-display text-2xl font-black neon-text">{v}</p>
          <p className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mt-1">{l}</p>
        </div>
      ))}
    </div>
  </ScreenShell>
);
export default Profile;
