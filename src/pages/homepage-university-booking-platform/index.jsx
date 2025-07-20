import React from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import HeroSection from './components/HeroSection';
import LiveAvailabilityDashboard from './components/LiveAvailabilityDashboard';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import CampusMapIntegration from './components/CampusMapIntegration';
import SocialProofSection from './components/SocialProofSection';
import Icon from '../../components/AppIcon';

const HomepageUniversityBookingPlatform = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Live Availability Dashboard */}
        <LiveAvailabilityDashboard />

        {/* Personalized Recommendations */}
        <PersonalizedRecommendations />

        {/* Campus Map Integration */}
        <CampusMapIntegration />

        {/* Social Proof Section */}
        <SocialProofSection />

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-primary-foreground"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">UIH BookSpace</h3>
                    <p className="text-sm text-muted-foreground font-accent">Academic Excellence</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Transforming university room booking with intelligent technology and seamless user experience.
                </p>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground academic-transition cursor-pointer">
                    <Icon name="Twitter" size={16} />
                  </div>
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground academic-transition cursor-pointer">
                    <Icon name="Facebook" size={16} />
                  </div>
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground academic-transition cursor-pointer">
                    <Icon name="Instagram" size={16} />
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/instant-booking-interface" className="text-muted-foreground hover:text-foreground academic-transition">Quick Book</a></li>
                  <li><a href="/room-explorer-discovery" className="text-muted-foreground hover:text-foreground academic-transition">Explore Rooms</a></li>
                  <li><a href="/personal-dashboard-analytics" className="text-muted-foreground hover:text-foreground academic-transition">Dashboard</a></li>
                  <li><a href="/booking-management-center" className="text-muted-foreground hover:text-foreground academic-transition">My Bookings</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground academic-transition">Help Center</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground academic-transition">Contact Us</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground academic-transition">System Status</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground academic-transition">Feedback</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Contact</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">support@uihbookspace.edu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">University Campus, Building A</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {currentYear} UIH BookSpace. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground academic-transition">Privacy Policy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground academic-transition">Terms of Service</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground academic-transition">Accessibility</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomepageUniversityBookingPlatform;