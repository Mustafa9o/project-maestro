import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Employees from "./pages/Employees";
import CalendarPage from "./pages/CalendarPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/project/:id" element={<Tasks />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/files" element={<Index />} />
            <Route path="/todo" element={<Index />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/meetings" element={<Index />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/help" element={<Index />} />
            <Route path="/more" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
