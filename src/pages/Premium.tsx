import { ScreenShell } from "@/components/Shell";
import { Crown, Check, Download } from "lucide-react";
import { useLatestApk } from "@/hooks/useLatestApk";

const PERKS = [
  "Unlimited AI replies",
  "All 13 personalities (Sigma, Toxic Funny, Soft Boy…)",
  "Screenshot Analyzer + OCR",
  "Relationship insights",
  "Voice replies",
  "Priority AI model (smarter rizz)",
  "No ads, no limits",
];

const Premium = () => {
  const { latest, loading } = useLatestApk();
  return (
  <ScreenShell title="RizzAI Premium" subtitle="unlock the full arsenal.">
    {latest && (
      <a
        href={latest.url}
        download
        className="block mb-4 rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "var(--gradient-rizz)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-white/70">Latest APK</p>
            <p className="font-display font-semibold text-white truncate">Download Rizz for Android</p>
          </div>
          <span className="text-[11px] text-white/80 font-mono shrink-0">{(latest.size/1024/1024).toFixed(1)}MB</span>
        </div>
      </a>
    )}
    {!latest && !loading && (
      <div className="mb-4 surface p-4 text-[12px] text-muted-foreground text-center">
        No APK uploaded yet. Admin can upload one from <span className="text-primary-glow">/admin</span>.
      </div>
    )}
    <div className="glass-card p-6 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-rizz blur-3xl opacity-50" />
      <Crown className="w-10 h-10 text-primary-glow mb-3 relative" />
      <p className="font-display text-4xl font-black neon-text relative">$9.99<span className="text-base text-muted-foreground font-sans">/mo</span></p>
      <p className="text-xs text-muted-foreground mt-1 relative">cancel anytime · 7-day free trial</p>

      <ul className="mt-5 space-y-2.5 relative">
        {PERKS.map(p => (
          <li key={p} className="flex items-center gap-3 text-sm">
            <span className="w-5 h-5 rounded-full bg-gradient-rizz flex items-center justify-center"><Check className="w-3 h-3 text-primary-foreground" /></span>
            {p}
          </li>
        ))}
      </ul>

      <button className="w-full mt-6 bg-gradient-rizz text-primary-foreground font-bold rounded-2xl py-4 shadow-[var(--glow-soft)] relative">
        start free trial
      </button>
    </div>
  </ScreenShell>
  );
};
export default Premium;
