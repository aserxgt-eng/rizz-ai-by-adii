import { ScreenShell } from "@/components/Shell";

const NOTIFS = [
  { app: "Instagram", from: "@maya.x", text: "she sent 2 voice notes — sounds excited.", time: "2m" },
  { app: "WhatsApp", from: "Liam", text: "long apology. seems sincere. respond when ready.", time: "18m" },
  { app: "Tinder", from: "Zoe", text: "asked about your weekend plans — green flag.", time: "1h" },
  { app: "Snapchat", from: "@drew", text: "left you on opened. low priority.", time: "3h" },
];

const Notifications = () => (
  <ScreenShell title="Notif Summary" subtitle="catch up on everything in 5 seconds.">
    {NOTIFS.map((n, i) => (
      <div key={i} className="glass-card p-4 mb-3">
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs font-mono uppercase tracking-wider text-primary-glow">{n.app} · {n.from}</p>
          <p className="text-[10px] text-muted-foreground">{n.time}</p>
        </div>
        <p className="text-sm">{n.text}</p>
      </div>
    ))}
  </ScreenShell>
);
export default Notifications;
