
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Estacoes from "./pages/Estacoes";
import Enlaces from "./pages/Enlaces";
import NovoEnlace from "./pages/NovoEnlace";
import NovaEstacao from "./pages/NovaEstacao";
import EditarEstacao from "./pages/EditarEstacao";
import EditarEnlace from "./pages/EditarEnlace";
import Auth from "./pages/Auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/estacoes" element={<Estacoes />} />
            <Route path="/estacoes/nova" element={<NovaEstacao />} />
            <Route path="/estacoes/editar/:id" element={<EditarEstacao />} />
            <Route path="/enlaces" element={<Enlaces />} />
            <Route path="/enlaces/novo" element={<NovoEnlace />} />
            <Route path="/enlaces/editar/:id" element={<EditarEnlace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
