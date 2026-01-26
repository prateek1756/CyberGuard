import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Features from "./pages/Features";
import Tips from "./pages/Tips";
import Alerts from "./pages/Alerts";
import PhishingScanner from "./pages/PhishingScanner";
import FraudDetection from "./pages/FraudDetection";
import ScamCallBlocking from "./pages/ScamCallBlocking";
import FakeProfileVerification from "./pages/FakeProfileVerification";
import DeepfakeDetection from "./pages/DeepfakeDetection";
import PageIntro from "@/components/motion/PageIntro";
import ScrollProgress from "@/components/motion/ScrollProgress";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="dark min-h-screen bg-background text-foreground">
        <BrowserRouter>
          <PageIntro />
          <ScrollProgress />
          <SiteHeader />
          <main className="min-h-[calc(100vh-8rem)]">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<Features />} />
              <Route path="/phishing-scanner" element={<PhishingScanner />} />
              <Route path="/fraud-detection" element={<FraudDetection />} />
              <Route path="/scam-call-blocking" element={<ScamCallBlocking />} />
              <Route path="/fake-profile-verification" element={<FakeProfileVerification />} />
              <Route path="/deepfake-detection" element={<DeepfakeDetection />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <SiteFooter />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
