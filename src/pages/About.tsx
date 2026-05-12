import { ScreenShell } from "@/components/Shell";
import { Instagram, Sparkles } from "lucide-react";

const About = () => (
  <ScreenShell title="About" subtitle="the brains behind RizzAI.">
    <div className="glass-card p-6 text-center">
      <div className="w-20 h-20 mx-auto rounded-[1.5rem] bg-gradient-rizz flex items-center justify-center animate-pulse-glow mb-4">
        <Sparkles className="w-10 h-10 text-primary-foreground" />
      </div>
      <h2 className="font-display text-2xl font-black neon-text">RizzAI</h2>
      <p className="text-xs text-muted-foreground font-mono mt-1">v1.0.0 · build 2026</p>
      <p className="text-sm mt-4 text-muted-foreground leading-relaxed">Never overthink a text again. Floating AI texting copilot for the chronically online generation.</p>
    </div>

    <div className="glass-card p-5 mt-4">
      <p className="text-xs uppercase tracking-widest font-mono text-primary-glow mb-3">// founders</p>
      {[
        { handle: "aadi.devx", url: "https://www.instagram.com/aadi.devx/?utm_source=chatgpt.com" },
        { handle: "_whois._.adii", url: "https://www.instagram.com/_whois._.adii/?utm_source=chatgpt.com" },
      ].map(c => (
        <a key={c.handle} href={c.url} target="_blank" rel="noreferrer"
          className="flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary/40 transition">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-pink to-primary flex items-center justify-center">
            <Instagram className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold text-sm">@{c.handle}</p>
            <p className="text-xs text-muted-foreground">tap to follow</p>
          </div>
        </a>
      ))}
    </div>

    <p className="text-center text-xs font-mono text-muted-foreground/70 mt-8">Built by Aadi ⚡</p>
  </ScreenShell>
);
export default About;
