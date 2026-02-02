import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/i18n/I18nProvider";
import Index from "./pages/Index";
import Estudo from "./pages/Estudo";
import CultosAoVivo from "./pages/CultosAoVivo";
import Cantina from "./pages/Cantina";
import Ministerios from "./pages/Ministerios";
import MinisterioDetalhe from "./pages/MinisterioDetalhe";
import Missoes from "./pages/Missoes";
import NotFound from "./pages/NotFound";
import KidsPlatform from "./pages/KidsPlatform";
import MinisterioJovens from "./pages/MinisterioJovens";
import Login from "./pages/auth/Login";
import AdminSetup from "./pages/auth/AdminSetup";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AuthCallback from "./pages/auth/AuthCallback";
import TemplateDashboardLayout from "./pages/template/TemplateDashboardLayout";
import TemplateDashboardHome from "./pages/template/TemplateDashboardHome";
import TemplateKidsDashboardLayout from "./pages/template/TemplateKidsDashboardLayout";
import TemplateKidsDashboardHome from "./pages/template/TemplateKidsDashboardHome";
import TemplatePlaceholderPage from "./pages/template/TemplatePlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/estudo" element={<Estudo />} />
            <Route path="/cultos-ao-vivo" element={<CultosAoVivo />} />
            <Route path="/cantina" element={<Cantina />} />
            <Route path="/missoes" element={<Missoes />} />
            <Route path="/ministerios" element={<Ministerios />} />
            <Route path="/ministerios/:slug" element={<MinisterioDetalhe />} />
            <Route path="/ministerio-dos-jovens" element={<MinisterioJovens />} />

            {/* Kids platform */}
            <Route path="/kids" element={<KidsPlatform />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/setup-admin" element={<AdminSetup />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Site dashboard */}
            <Route path="/dashboard" element={<TemplateDashboardLayout />}>
              <Route index element={<TemplateDashboardHome />} />
              <Route path="assistant" element={<TemplatePlaceholderPage title="Assistente (demo)" />} />
              <Route path="membros" element={<TemplatePlaceholderPage title="Membros (demo)" />} />
              <Route path="aluno" element={<TemplatePlaceholderPage title="Área do Aluno (demo)" />} />
              <Route path="kids" element={<TemplateKidsDashboardLayout basePath="/dashboard/kids" />}>
                <Route index element={<TemplateKidsDashboardHome />} />
                <Route path="criancas" element={<TemplatePlaceholderPage title="Crianças & Famílias (demo)" />} />
                <Route path="eventos" element={<TemplatePlaceholderPage title="Eventos (demo)" />} />
                <Route path="checkin" element={<TemplatePlaceholderPage title="Check-in / Check-out (demo)" />} />
                <Route path="leads" element={<TemplatePlaceholderPage title="Leads (demo)" />} />
              </Route>
            </Route>

            {/* Rota antiga do Kids Dashboard (mantida como demo) */}
            <Route path="/kids/dashboard" element={<TemplateKidsDashboardLayout />}>
              <Route index element={<TemplateKidsDashboardHome />} />
              <Route path="criancas" element={<TemplatePlaceholderPage title="Crianças & Famílias (demo)" />} />
              <Route path="eventos" element={<TemplatePlaceholderPage title="Eventos (demo)" />} />
              <Route path="checkin" element={<TemplatePlaceholderPage title="Check-in / Check-out (demo)" />} />
              <Route path="leads" element={<TemplatePlaceholderPage title="Leads (demo)" />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
