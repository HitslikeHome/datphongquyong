import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage-university-booking-platform', icon: 'Home' },
    { name: 'Quick Book', path: '/instant-booking-interface', icon: 'Zap' },
    { name: 'Explore Rooms', path: '/room-explorer-discovery', icon: 'Search' },
    { name: 'My Dashboard', path: '/personal-dashboard-analytics', icon: 'BarChart3' },
    { name: 'My Bookings', path: '/booking-management-center', icon: 'Calendar' },
    { name: 'Admin Portal', path: '/administrative-portal-analytics', icon: 'Settings' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border academic-shadow">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Link to="/homepage-university-booking-platform" className="flex items-center space-x-3">
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
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-foreground">UIH BookSpace</h1>
              <p className="text-xs text-muted-foreground font-accent">Academic Excellence</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium academic-transition ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
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
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full availability-pulse"></div>
            <span>247 rooms available</span>
          </div>
          <Button variant="outline" size="sm" iconName="Bell" iconPosition="left">
            Notifications
          </Button>
          <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
            Quick Book
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 bg-success rounded-full availability-pulse"></div>
            <span className="hidden sm:inline">247 available</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border academic-shadow-lg">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium academic-transition ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Actions */}
          <div className="px-4 py-3 border-t border-border space-y-2">
            <Button variant="outline" size="sm" fullWidth iconName="Bell" iconPosition="left">
              Notifications
            </Button>
            <Button variant="default" size="sm" fullWidth iconName="Plus" iconPosition="left">
              Quick Book Room
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;