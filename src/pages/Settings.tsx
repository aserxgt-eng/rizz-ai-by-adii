import { ScreenShell } from "@/components/Shell";
import { ChevronRight, Bell, Lock, Sparkles, User, Info, Crown, Layers, Globe, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { findLang } from "@/lib/languages";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";

const ITEMS = [
  { to: "/profile", icon: User, label: "Profile", sub: "Your account & avatar" },
  { to: "/personality", icon: Sparkles, label: "Default personality", sub: "Sigma · Soft · Savage…" },
  { to: "/insights", icon: Layers, label: "Relationship insights", sub: "Detect green / red flags" },
  { to: "/notifications", icon: Bell, label: "Notification summary", sub: "Catch up in seconds" },
  { to: "/premium", icon: Crown, label: "Go Premium", sub: "Unlock everything" },
  { to: "/about", icon: Info, label: "About RizzAI", sub: "v2.0 · made with care" },
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
    toast.success(next ? "Bubble hidden" : "Bubble enabled — refresh to see");
  };

  return (
    <ScreenShell title="Settings" subtitle="Tune your AI.">
      {/* Language row */}
      <Section label="Preferences">
        <Row
          icon={Globe}
          label="Language"
          sub={`${findLang(lang).native} · ${findLang(lang).name}`}
          trailing={<LanguageSelector />}
        />
        <Divider />
        <button onClick={toggleBubble} className="w-full">
          <Row
            icon={Eye}
            label="Floating bubble"
            sub={bubbleHidden ? "Hidden — tap to enable" : "Visible across screens"}
            trailing={
              <div
                className="w-11 h-6 rounded-full p-0.5 transition-colors"
                style={{ background: bubbleHidden ? "hsl(var(--surface-3))" : "var(--gradient-rizz)" }}
              >
                <div
                  className="w-5 h-5 rounded-full bg-white transition-transform"
                  style={{ transform: bubbleHidden ? "translateX(0)" : "translateX(20px)", boxShadow: "var(--shadow-xs)" }}
                />
              </div>
            }
          />
        </button>
      </Section>

      <Section label="Features">
        {ITEMS.map((it, i) => (
          <div key={it.to}>
            <button onClick={() => nav(it.to)} className="w-full">
              <Row
                icon={it.icon}
                label={it.label}
                sub={it.sub}
                trailing={<ChevronRight className="w-4 h-4 text-muted-foreground" />}
              />
            </button>
            {i < ITEMS.length - 1 && <Divider />}
          </div>
        ))}
      </Section>

      <Section label="Privacy">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-3.5 h-3.5 text-primary-glow" />
            <p className="font-display font-semibold text-[14px]">Local-first</p>
          </div>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            No messages stored by default. Encrypted requests. Google Play compliant.
          </p>
        </div>
      </Section>
    </ScreenShell>
  );
};

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70 font-medium mb-2 px-1">
      {label}
    </p>
    <div className="surface overflow-hidden">{children}</div>
  </div>
);

const Row = ({
  icon: Icon, label, sub, trailing,
}: { icon: any; label: string; sub?: string; trailing?: React.ReactNode }) => (
  <div className="flex items-center gap-3 px-4 py-3.5">
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}
    >
      <Icon className="w-[16px] h-[16px] text-primary-glow" strokeWidth={2.2} />
    </div>
    <div className="flex-1 text-left min-w-0">
      <p className="text-[14px] font-medium leading-tight">{label}</p>
      {sub && <p className="text-[11.5px] text-muted-foreground mt-0.5 truncate">{sub}</p>}
    </div>
    {trailing}
  </div>
);

const Divider = () => <div className="h-px bg-border mx-4" />;

export default Settings;
