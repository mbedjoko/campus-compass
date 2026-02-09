import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import CoursesPage from "./pages/CoursesPage";
import EnrollmentsPage from "./pages/EnrollmentsPage";
import AuditLogPage from "./pages/AuditLogPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/students" element={<AppLayout><StudentsPage /></AppLayout>} />
            <Route path="/departments" element={<AppLayout><DepartmentsPage /></AppLayout>} />
            <Route path="/courses" element={<AppLayout><CoursesPage /></AppLayout>} />
            <Route path="/enrollments" element={<AppLayout><EnrollmentsPage /></AppLayout>} />
            <Route path="/audit-log" element={<AppLayout><AuditLogPage /></AppLayout>} />
            <Route path="/profile" element={<AppLayout><StudentProfilePage /></AppLayout>} />
            <Route path="/my-courses" element={<AppLayout><StudentProfilePage /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
