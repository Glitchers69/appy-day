import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoveQuestionPage from "./pages/LoveQuestionPage";
import FakeLoadingPage from "./pages/FakeLoadingPage";
import ThingsILovePage from "./pages/ThingsILovePage";
import SillyQuizPage from "./pages/SillyQuizPage";
import BalloonGamePage from "./pages/BalloonGamePage";
import FinalLovePage from "./pages/FinalLovePage";
import VideoTimelinePage from "./pages/VideoTimelinePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/love-question" element={<LoveQuestionPage />} />
          <Route path="/fake-loading" element={<FakeLoadingPage />} />
          <Route path="/things-i-love" element={<ThingsILovePage />} />
          <Route path="/silly-quiz" element={<SillyQuizPage />} />
          <Route path="/balloon-game" element={<BalloonGamePage />} />
          <Route path="/video-timeline" element={<VideoTimelinePage />} />
          <Route path="/final-love" element={<FinalLovePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
