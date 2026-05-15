/**
 * Ambient background — calm, layered indigo glow.
 * Replaces the old neon grid + particle storm with two
 * slow-moving orbs and a faint noise vignette.
 */
export const ParticleField = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div
      className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full animate-float-slow"
      style={{ background: "radial-gradient(closest-side, hsl(247 100% 65% / 0.22), transparent 70%)" }}
    />
    <div
      className="absolute top-1/2 -right-40 w-[560px] h-[560px] rounded-full animate-float-slow"
      style={{ background: "radial-gradient(closest-side, hsl(265 80% 60% / 0.18), transparent 70%)", animationDelay: "5s" }}
    />
    <div
      className="absolute bottom-[-20%] left-1/4 w-[480px] h-[480px] rounded-full animate-float-slow"
      style={{ background: "radial-gradient(closest-side, hsl(200 70% 55% / 0.10), transparent 70%)", animationDelay: "9s" }}
    />
    {/* Subtle vignette */}
    <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 100%, hsl(240 50% 3% / 0.6), transparent 60%)" }} />
  </div>
);
