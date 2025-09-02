
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Layouts
import { AdminLayout } from './components/layout/AdminLayout';

// Auth context provider
import { AuthProvider } from './components/context/AuthContext';

// Public pages
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { ServicesPage } from './components/ServicesPage';

// Admin pages
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminServicesPage } from './components/admin/AdminServicesPage';
import { AdminAppointmentsPage } from './components/admin/AdminAppointmentsPage';
import { AdminInventoryPage } from './components/admin/AdminInventoryPage';
import { AdminAnalyticsPage } from './components/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './components/admin/AdminSettingsPage';
import { ImageDiagnosticPage } from './components/admin/ImageDiagnosticPage';
import { StaffClientsPage } from './components/staff/StaffClientsPage';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/services" element={<ServicesPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="clients" element={<StaffClientsPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="appointments" element={<AdminAppointmentsPage />} />
            <Route path="inventory" element={<AdminInventoryPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="diagnostics" element={<ImageDiagnosticPage />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
