import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import WelcomeHeader from './components/WelcomeHeader';
import QuickStats from './components/QuickStats';
import AvailabilityHeatmap from './components/AvailabilityHeatmap';
import QuickBookWidget from './components/QuickBookWidget';
import UpcomingBookings from './components/UpcomingBookings';
import SmartSuggestions from './components/SmartSuggestions';
import QuickActions from './components/QuickActions';
import CampusActivity from './components/CampusActivity';

const SmartDashboardHomepage = () => {
  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('seatSyncLanguage') || 'en';
    // In a real app, this would set the current language state
    console.log('Current language:', savedLanguage);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Smart Dashboard - SeatSync | Your Intelligent Workspace Command Center</title>
        <meta name="description" content="Personalized dashboard for USTH academic professionals. Real-time space availability, smart booking suggestions, and seamless reservation management." />
        <meta name="keywords" content="smart dashboard, seat booking, USTH, workspace management, academic spaces, real-time availability" />
      </Helmet>

      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <WelcomeHeader />
          
          {/* Quick Stats Overview */}
          <QuickStats />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Primary Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Availability Heatmap */}
              <AvailabilityHeatmap />
              
              {/* Quick Book Widget */}
              <QuickBookWidget />
              
              {/* Campus Activity */}
              <CampusActivity />
            </div>
            
            {/* Right Column - Secondary Content */}
            <div className="xl:col-span-1 space-y-6">
              {/* Upcoming Bookings */}
              <UpcomingBookings />
              
              {/* Smart Suggestions */}
              <SmartSuggestions />
            </div>
          </div>
          
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Footer Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} SeatSync - University of Science and Technology of Hanoi
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-success font-medium">System Status: Operational</span>
                </div>
                <div className="text-muted-foreground">
                  Last updated: {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Your space, your time, your way - Intelligent booking for intelligent people
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SmartDashboardHomepage;