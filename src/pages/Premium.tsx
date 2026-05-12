import { ScreenShell } from "@/components/Shell";
import { Crown, Check } from "lucide-react";

const PERKS = [
  "Unlimited AI replies",
  "All 13 personalities (Sigma, Toxic Funny, Soft Boy…)",
  "Screenshot Analyzer + OCR",
  "Relationship insights",
  "Voice replies",
  "Priority AI model (smarter rizz)",
  "No ads, no limits",
];

const Premium = () => (
  <ScreenShell title="RizzAI Premium" subtitle="unlock the full arsenal.">
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
export default Premium;
