import { ScreenShell } from "@/components/Shell";
import { useState } from "react";

const PERSONAS = [
  { id: "genz", name: "Gen Z", emoji: "🎀", desc: "lowercase, slang-heavy, casual" },
  { id: "sigma", name: "Sigma", emoji: "🗿", desc: "minimal words, max impact" },
  { id: "savage", name: "Savage", emoji: "🔥", desc: "comebacks that hit different" },
  { id: "softboy", name: "Soft Boy", emoji: "🌸", desc: "vulnerable, emotional, gentle" },
  { id: "softgirl", name: "Soft Girl", emoji: "🦋", desc: "sweet, soft-spoken, dreamy" },
  { id: "mature", name: "Mature", emoji: "🍷", desc: "thoughtful, articulate, calm" },
  { id: "chill", name: "Chill", emoji: "🌊", desc: "relaxed, never trying too hard" },
  { id: "confident", name: "Confident", emoji: "💎", desc: "self-assured, magnetic" },
  { id: "toxic", name: "Toxic Funny", emoji: "💀", desc: "ironic, unhinged, terminally online" },
  { id: "romantic", name: "Romantic", emoji: "❤️‍🔥", desc: "warm, sincere, devoted" },
  { id: "introvert", name: "Introvert", emoji: "🌙", desc: "thoughtful, low-key, deep" },
  { id: "funny", name: "Funny", emoji: "🃏", desc: "sharp wit, perfect timing" },
  { id: "emotional", name: "Emotional", emoji: "🥹", desc: "feels everything fully" },
];

const Personality = () => {
  const [sel, setSel] = useState("genz");
  return (
    <ScreenShell title="Pick your voice" subtitle="how should the AI sound?">
      <div className="grid grid-cols-2 gap-3">
        {PERSONAS.map(p => (
          <button key={p.id} onClick={() => setSel(p.id)}
            className={`glass-card p-4 text-left transition-all ${sel === p.id ? "neon-border" : "hover:border-primary/30"}`}>
            <div className="text-3xl mb-1">{p.emoji}</div>
            <p className="font-bold text-sm">{p.name}</p>
            <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{p.desc}</p>
          </button>
        ))}
      </div>
    </ScreenShell>
  );
};
export default Personality;
