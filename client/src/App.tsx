// client/src/App.tsx

import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import ScrollToTopButton from "@/components/ScrollToTopButton";

// Public pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Projects from "@/pages/projects";
import ProgramsPage from "@/pages/programs";
import ProgramDetail from "@/pages/program-detail";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

// Admin pages
import AdminDashboard from "@/pages/admin-dashboard";
import AdminPrograms from "@/pages/admin-programs";
import AdminBlog from "@/pages/admin-blog";
import AdminContacts from "@/pages/admin-contacts";
import AdminLogin from "@/pages/admin-login";

// Auth
import { AuthProvider } from "@/lib/auth";
import { RequireAuth } from "@/components/RequireAuth";

// Scroll to top on route change
function ScrollToTopOnRouteChange() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTopOnRouteChange />

      <Switch>
        {/* Public Routes */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />

        {/* Programs list & detail */}
        <Route path="/programs" component={ProgramsPage} />
        <Route path="/programs/:id">
          {(params) => <ProgramDetail id={params.id} />}
        </Route>

        {/* Admin Login (Public) */}
        <Route path="/admin/login" component={AdminLogin} />

        {/* Protected Admin Routes */}
        <Route path="/admin">
          {() => (
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          )}
        </Route>

        <Route path="/admin/programs">
          {() => (
            <RequireAuth>
              <AdminPrograms />
            </RequireAuth>
          )}
        </Route>

        <Route path="/admin/blog">
          {() => (
            <RequireAuth>
              <AdminBlog />
            </RequireAuth>
          )}
        </Route>

        <Route path="/admin/contacts">
          {() => (
            <RequireAuth>
              <AdminContacts />
            </RequireAuth>
          )}
        </Route>

        {/* 404 Page */}
        <Route component={NotFound} />
      </Switch>

      <ScrollToTopButton />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
