import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      name: 'Dashboard', 
      path: '/homepage-university-booking-platform', 
      icon: 'Home',
      description: 'Overview & quick access'
    },
    { 
      name: 'Quick Book', 
      path: '/instant-booking-interface', 
      icon: 'Zap',
      description: 'Instant room booking'
    },
    { 
      name: 'Room Explorer', 
      path: '/room-explorer-discovery', 
      icon: 'Search',
      description: 'Discover perfect spaces'
    },
    { 
      name: 'My Analytics', 
      path: '/personal-dashboard-analytics', 
      icon: 'BarChart3',
      description: 'Usage insights & stats'
    },
    { 
      name: 'My Bookings', 
      path: '/booking-management-center', 
      icon: 'Calendar',
      description: 'Manage reservations'
    },
    { 
      name: 'Admin Portal', 
      path: '/administrative-portal-analytics', 
      icon: 'Settings',
      description: 'Administrative tools'
    },
  ];

  const quickActions = [
    { name: 'Book Study Room', icon: 'BookOpen', action: 'book-study' },
    { name: 'Find Group Space', icon: 'Users', action: 'find-group' },
    { name: 'Check Availability', icon: 'Clock', action: 'check-availability' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border academic-shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full availability-pulse"></div>
              <span className="text-sm font-medium text-foreground">Live Status</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium academic-transition group ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground academic-shadow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isCollapsed ? item.name : ''}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={`flex-shrink-0 ${
                    isActivePath(item.path) ? 'text-primary-foreground' : ''
                  }`}
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-xs ${
                      isActivePath(item.path) 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md academic-transition"
                >
                  <Icon name={action.icon} size={16} />
                  <span>{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed Quick Actions */}
        {isCollapsed && (
          <div className="p-2 border-t border-border">
            <div className="space-y-2">
              {quickActions.map((action) => (
                <button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center justify-center w-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md academic-transition"
                  title={action.name}
                >
                  <Icon name={action.icon} size={16} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Today's Bookings</span>
                <span className="font-medium text-success">12 active</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Available Rooms</span>
                <span className="font-medium text-accent">247 open</span>
              </div>
              <Button variant="outline" size="sm" fullWidth iconName="HelpCircle" iconPosition="left">
                Help & Support
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-6 h-1 bg-success rounded-full"></div>
              <div className="w-6 h-1 bg-accent rounded-full"></div>
              <Button variant="ghost" size="sm" iconName="HelpCircle" title="Help & Support" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;