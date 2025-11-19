// client/src/App.tsx

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import ScrollToTopButton from "@/components/ScrollToTopButton";

import Home from "@/pages/home";
import About from "@/pages/about";
import Projects from "@/pages/projects";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import ProgramDetail from "./pages/program-detail";
import AdminDashboard from "@/pages/admin-dashboard"; // 👈 NEW

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />

        <Route path="/programs/:id">
          {(params) => <ProgramDetail id={params.id} />}
        </Route>

        {/* 👇 Admin Dashboard route */}
        <Route path="/admin" component={AdminDashboard} />

        {/* 404 fallback */}
        <Route component={NotFound} />
      </Switch>

      {/* Global scroll-to-top FAB */}
      <ScrollToTopButton />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
