import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import SmartDashboardHomepage from "pages/smart-dashboard-homepage";
import QrCheckInPortal from "pages/qr-check-in-portal";
import MyReservationsDashboard from "pages/my-reservations-dashboard";
import AdminControlPanel from "pages/admin-control-panel";
import IntelligentBookingEngine from "pages/intelligent-booking-engine";
import SpaceDiscoveryCenter from "pages/space-discovery-center";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<SmartDashboardHomepage />} />
        <Route path="/smart-dashboard-homepage" element={<SmartDashboardHomepage />} />
        <Route path="/qr-check-in-portal" element={<QrCheckInPortal />} />
        <Route path="/my-reservations-dashboard" element={<MyReservationsDashboard />} />
        <Route path="/admin-control-panel" element={<AdminControlPanel />} />
        <Route path="/intelligent-booking-engine" element={<IntelligentBookingEngine />} />
        <Route path="/space-discovery-center" element={<SpaceDiscoveryCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;