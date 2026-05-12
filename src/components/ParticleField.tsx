import { motion } from "framer-motion";

export const ParticleField = () => {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-primary/30 blur-[120px] animate-float-slow" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-accent-pink/25 blur-[140px] animate-float-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-accent/25 blur-[140px] animate-float-slow" style={{ animationDelay: "4s" }} />
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary-glow/70"
          initial={{
            x: Math.random() * 400,
            y: Math.random() * 800,
            opacity: 0,
          }}
          animate={{
            y: [Math.random() * 800, Math.random() * 800 - 200],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}
    </div>
  );
};
