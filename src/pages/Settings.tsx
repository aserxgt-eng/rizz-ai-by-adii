import { ScreenShell } from "@/components/Shell";
import { ChevronRight, Bell, Lock, Sparkles, User, Info, Crown, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/personality", icon: Sparkles, label: "Default Personality" },
  { to: "/insights", icon: Layers, label: "Relationship Insights" },
  { to: "/notifications", icon: Bell, label: "Notification Summary" },
  { to: "/premium", icon: Crown, label: "Premium" },
  { to: "/about", icon: Info, label: "About RizzAI" },
];

const Settings = () => {
  const nav = useNavigate();
  return (
    <ScreenShell title="Settings" subtitle="tune your AI.">
      <div className="glass-card p-2 mb-4">
        {ITEMS.map(it => (
          <button key={it.to} onClick={() => nav(it.to)} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary/40 transition">
            <div className="w-9 h-9 rounded-xl bg-gradient-rizz flex items-center justify-center"><it.icon className="w-4 h-4 text-primary-foreground" /></div>
            <span className="flex-1 text-left text-sm font-semibold">{it.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-2"><Lock className="w-4 h-4 text-primary-glow" /><p className="font-bold text-sm">Privacy</p></div>
        <p className="text-xs text-muted-foreground leading-relaxed">No messages stored by default. Local-first processing where possible. Encrypted requests. Google Play compliant.</p>
      </div>
    </ScreenShell>
  );
};
export default Settings;
