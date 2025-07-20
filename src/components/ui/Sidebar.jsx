import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      name: 'Smart Dashboard', 
      path: '/smart-dashboard-homepage', 
      icon: 'LayoutDashboard',
      description: 'Overview & insights'
    },
    { 
      name: 'Book Space', 
      path: '/intelligent-booking-engine', 
      icon: 'Calendar',
      description: 'Reserve your space'
    },
    { 
      name: 'Discover Spaces', 
      path: '/space-discovery-center', 
      icon: 'Search',
      description: 'Explore available areas'
    },
    { 
      name: 'My Reservations', 
      path: '/my-reservations-dashboard', 
      icon: 'BookOpen',
      description: 'Manage bookings'
    },
    { 
      name: 'QR Check-In', 
      path: '/qr-check-in-portal', 
      icon: 'QrCode',
      description: 'Quick space access'
    },
    { 
      name: 'Admin Panel', 
      path: '/admin-control-panel', 
      icon: 'Settings',
      description: 'System management'
    },
  ];

  const quickActions = [
    { name: 'Quick Book', icon: 'Zap', action: 'book' },
    { name: 'Scan QR', icon: 'ScanLine', action: 'scan' },
    { name: 'Find Space', icon: 'MapPin', action: 'find' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'book':
        // Navigate to booking engine
        break;
      case 'scan':
        // Open QR scanner
        break;
      case 'find':
        // Navigate to space discovery
        break;
      default:
        break;
    }
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-success">Live Campus Data</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="ml-auto"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-smooth ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground shadow-card'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={isCollapsed ? item.name : ''}
            >
              <Icon name={item.icon} size={18} />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs opacity-75 truncate">{item.description}</div>
                </div>
              )}
              {!isCollapsed && isActivePath(item.path) && (
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-subtle"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border">
          {!isCollapsed && (
            <div className="mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </h3>
            </div>
          )}
          <div className={`space-y-2 ${isCollapsed ? 'space-y-3' : ''}`}>
            {quickActions.map((action) => (
              <Button
                key={action.action}
                variant="ghost"
                size="sm"
                onClick={() => handleQuickAction(action.action)}
                className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-3'}`}
                title={isCollapsed ? action.name : ''}
              >
                <Icon name={action.icon} size={16} />
                {!isCollapsed && <span className="ml-2">{action.name}</span>}
              </Button>
            ))}
          </div>
        </div>

        {/* Campus Status */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Campus Activity</span>
                <Icon name="TrendingUp" size={12} className="text-success" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Occupancy</span>
                  <span className="font-medium text-foreground">73%</span>
                </div>
                <div className="w-full bg-background rounded-full h-1.5">
                  <div className="bg-success h-1.5 rounded-full" style={{ width: '73%' }}></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-medium text-success">42 spaces</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={16} className="text-success" />
              </div>
              <div className="text-xs font-bold text-success">73%</div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">Dr. Sarah Chen</div>
                <div className="text-xs text-muted-foreground">Faculty Member</div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;