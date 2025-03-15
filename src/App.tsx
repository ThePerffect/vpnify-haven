
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import InfoPage from "./pages/Info";
import NotFound from "./pages/NotFound";
import ServerStatus from "./pages/ServerStatus";
import Pricing from "./pages/Pricing";
import Account from "./pages/Account";
import Admin from "./pages/Admin";

// Lazy loaded pages
const About = lazy(() => import("./pages/About"));

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/info" replace />;
  }
  
  return <>{children}</>;
};

// Admin route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  
  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/info" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={isLoggedIn ? <Dashboard /> : <Navigate to="/info" replace />} />
        <Route path="info" element={<InfoPage />} />
        <Route path="servers" element={<ServerStatus />} />
        <Route path="pricing" element={<Pricing />} />
        <Route 
          path="account" 
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="admin" 
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } 
        />
        <Route 
          path="about" 
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Загрузка...</div>}>
              <About />
            </Suspense>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
