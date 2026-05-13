import { ScreenShell } from "@/components/Shell";
import { ChevronRight, Bell, Lock, Sparkles, User, Info, Crown, Layers, Globe, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { findLang } from "@/lib/languages";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";

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
  const { lang } = useLanguage();
  const [bubbleHidden, setBubbleHidden] = useState(false);

  useEffect(() => {
    setBubbleHidden(localStorage.getItem("rizz.bubble.hidden") === "1");
  }, []);

  const toggleBubble = () => {
    const next = !bubbleHidden;
    localStorage.setItem("rizz.bubble.hidden", next ? "1" : "0");
    setBubbleHidden(next);
    toast.success(next ? "bubble hidden" : "bubble enabled — refresh to see");
  };

  return (
    <ScreenShell title="Settings" subtitle="tune your AI.">
      <div className="glass-card p-3 mb-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-rizz flex items-center justify-center">
          <Globe className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Language</p>
          <p className="text-[10px] text-muted-foreground font-mono">{findLang(lang).native} · {findLang(lang).name}</p>
        </div>
        <LanguageSelector />
      </div>

      <button onClick={toggleBubble} className="w-full glass-card p-3 mb-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-rizz flex items-center justify-center">
          <Eye className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold">Floating Bubble</p>
          <p className="text-[10px] text-muted-foreground font-mono">{bubbleHidden ? "hidden — tap to show" : "visible — tap to hide"}</p>
        </div>
        <div className={`w-10 h-6 rounded-full p-0.5 transition ${bubbleHidden ? "bg-muted" : "bg-gradient-rizz"}`}>
          <div className={`w-5 h-5 rounded-full bg-background transition-transform ${bubbleHidden ? "" : "translate-x-4"}`} />
        </div>
      </button>

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
