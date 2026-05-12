import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ParticleField } from "@/components/ParticleField";
import { BottomNav } from "@/components/BottomNav";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import ReplyGenerator from "./pages/ReplyGenerator";
import Analyzer from "./pages/Analyzer";
import RizzScore from "./pages/RizzScore";
import Coach from "./pages/Coach";
import Personality from "./pages/Personality";
import Insights from "./pages/Insights";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Premium from "./pages/Premium";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const HIDE_NAV = ["/", "/onboarding"];
const Layout = () => {
  const { pathname } = useLocation();
  const hide = HIDE_NAV.includes(pathname);
  return (
    <>
      <ParticleField />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reply" element={<ReplyGenerator />} />
        <Route path="/flirty" element={<ReplyGenerator defaultMode="flirty" title="Flirty Mode" subtitle="dangerous rizz, deployed." />} />
        <Route path="/grammar" element={<ReplyGenerator defaultMode="grammar" title="Smart Grammar" subtitle="fix it. keep the slang." />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/score" element={<RizzScore />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/personality" element={<Personality />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hide && <BottomNav />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster theme="dark" position="top-center" toastOptions={{ className: "glass-card !border-primary/30" }} />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
