import { NavLink, useLocation } from "react-router-dom";
import { Home, Sparkles, Camera, Trophy, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/reply", icon: Sparkles, label: "Rizz" },
  { to: "/analyzer", icon: Camera, label: "Analyze" },
  { to: "/score", icon: Trophy, label: "Score" },
  { to: "/settings", icon: SettingsIcon, label: "More" },
];

export const BottomNav = () => {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(420px,calc(100%-1.5rem))]">
      <div
        className="relative flex items-stretch px-1.5 py-1.5 rounded-full"
        style={{
          background: "hsl(234 32% 9% / 0.85)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid hsl(247 50% 70% / 0.10)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {tabs.map(({ to, icon: Icon, label }) => {
          const active = pathname === to || (to === "/home" && pathname === "/");
          return (
            <NavLink
              key={to}
              to={to}
              className="relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2 rounded-full transition-colors"
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--gradient-rizz)", boxShadow: "var(--glow-soft)" }}
                />
              )}
              <span className={`relative flex flex-col items-center gap-0.5 ${active ? "text-primary-foreground" : "text-muted-foreground"}`}>
                <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2.4 : 2} />
                <span className="text-[10px] font-medium tracking-tight">{label}</span>
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
