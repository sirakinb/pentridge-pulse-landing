import React from 'react';
import Header from './components/Header';
import Description from './components/Description';
import HowItWorks from './components/HowItWorks';
import WhatWeDoBest from './components/WhatWeDoBest';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <Header />
      <Description />
      <HowItWorks />
      <WhatWeDoBest />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
