import { NavLink } from "react-router-dom";
import { Home, Sparkles, Camera, Trophy, Settings as SettingsIcon } from "lucide-react";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/reply", icon: Sparkles, label: "Rizz" },
  { to: "/analyzer", icon: Camera, label: "Analyze" },
  { to: "/score", icon: Trophy, label: "Score" },
  { to: "/settings", icon: SettingsIcon, label: "More" },
];

export const BottomNav = () => (
  <nav className="fixed bottom-3 left-3 right-3 z-40 glass-card px-2 py-2 flex justify-between">
    {tabs.map(({ to, icon: Icon, label }) => (
      <NavLink
        key={to}
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition-all ${
            isActive
              ? "bg-gradient-rizz text-primary-foreground shadow-[var(--glow-soft)]"
              : "text-muted-foreground hover:text-foreground"
          }`
        }
      >
        <Icon className="w-4 h-4" />
        <span className="text-[10px] font-semibold tracking-wide">{label}</span>
      </NavLink>
    ))}
  </nav>
);
