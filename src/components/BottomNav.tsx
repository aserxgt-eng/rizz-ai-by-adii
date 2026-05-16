import { NavLink, useLocation } from "react-router-dom";
import { Home, MessageCircle, Sparkles, Flame, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/analyzer", icon: MessageCircle, label: "Chats" },
  { to: "/reply", icon: Sparkles, label: "Rizz", center: true },
  { to: "/score", icon: Flame, label: "Score" },
  { to: "/profile", icon: User, label: "Profile" },
];

export const BottomNav = () => {
  const { pathname } = useLocation();
  return (
    <motion.nav
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(420px,calc(100%-1.5rem))]"
    >
      <div
        className="relative flex items-stretch px-2 py-2 rounded-full"
        style={{
          background: "hsl(234 32% 9% / 0.78)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid hsl(247 50% 70% / 0.12)",
          boxShadow: "var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.04)",
        }}
      >
        {tabs.map(({ to, icon: Icon, label, center }) => {
          const active =
            pathname === to || (to === "/home" && pathname === "/");
          return (
            <NavLink
              key={to}
              to={to}
              aria-label={label}
              className="relative flex-1 flex items-center justify-center py-2.5 rounded-full"
            >
              {active && (
                <motion.span
                  layoutId="nav-pill-v2"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-1 rounded-full"
                  style={{
                    background: center
                      ? "var(--gradient-rizz)"
                      : "hsl(247 100% 70% / 0.14)",
                    border: center
                      ? "1px solid hsl(247 100% 80% / 0.4)"
                      : "1px solid hsl(247 100% 70% / 0.35)",
                    boxShadow: center ? "var(--glow-primary)" : "none",
                  }}
                />
              )}
              <motion.span
                whileTap={{ scale: 0.85 }}
                className={`relative flex items-center justify-center ${
                  active
                    ? center
                      ? "text-primary-foreground"
                      : "text-primary-glow"
                    : "text-muted-foreground"
                }`}
              >
                <Icon
                  className={center ? "w-[22px] h-[22px]" : "w-[20px] h-[20px]"}
                  strokeWidth={active ? 2.4 : 1.9}
                />
              </motion.span>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
};
