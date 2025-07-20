import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomepageUniversityBookingPlatform from "pages/homepage-university-booking-platform";
import PersonalDashboardAnalytics from "pages/personal-dashboard-analytics";
import InstantBookingInterface from "pages/instant-booking-interface";
import BookingManagementCenter from "pages/booking-management-center";
import AdministrativePortalAnalytics from "pages/administrative-portal-analytics";
import RoomExplorerDiscovery from "pages/room-explorer-discovery";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomepageUniversityBookingPlatform />} />
        <Route path="/homepage-university-booking-platform" element={<HomepageUniversityBookingPlatform />} />
        <Route path="/personal-dashboard-analytics" element={<PersonalDashboardAnalytics />} />
        <Route path="/instant-booking-interface" element={<InstantBookingInterface />} />
        <Route path="/booking-management-center" element={<BookingManagementCenter />} />
        <Route path="/administrative-portal-analytics" element={<AdministrativePortalAnalytics />} />
        <Route path="/room-explorer-discovery" element={<RoomExplorerDiscovery />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;