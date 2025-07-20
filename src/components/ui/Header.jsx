import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/smart-dashboard-homepage', icon: 'LayoutDashboard' },
    { name: 'Book Space', path: '/intelligent-booking-engine', icon: 'Calendar' },
    { name: 'Discover', path: '/space-discovery-center', icon: 'Search' },
    { name: 'My Bookings', path: '/my-reservations-dashboard', icon: 'BookOpen' },
    { name: 'Check-In', path: '/qr-check-in-portal', icon: 'QrCode' },
    { name: 'Admin', path: '/admin-control-panel', icon: 'Settings' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/smart-dashboard-homepage" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={18} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-subtle"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground tracking-tight">SeatSync</span>
              <span className="text-xs text-muted-foreground font-mono -mt-1">Intelligent Spaces</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground shadow-card'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 text-success rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Campus Online</span>
          </div>
          
          <Button variant="ghost" size="sm" className="relative">
            <Icon name="Bell" size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-cta rounded-full"></span>
          </Button>

          <div className="w-px h-6 bg-border"></div>

          <Button variant="outline" size="sm">
            <Icon name="User" size={16} className="mr-2" />
            Profile
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="relative"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-card'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="pt-3 mt-3 border-t border-border">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-success">Campus Online</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Bell" size={16} />
                </Button>
              </div>
              
              <Button variant="outline" size="sm" fullWidth className="mt-2">
                <Icon name="User" size={16} className="mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;