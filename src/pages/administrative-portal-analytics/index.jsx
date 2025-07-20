import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import DashboardMetrics from './components/DashboardMetrics';
import RealTimeOccupancy from './components/RealTimeOccupancy';
import UsageAnalytics from './components/UsageAnalytics';
import UserManagement from './components/UserManagement';
import RoomConfiguration from './components/RoomConfiguration';
import SystemReports from './components/SystemReports';
import AlertsNotifications from './components/AlertsNotifications';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdministrativePortalAnalytics = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: 'BarChart3' },
    { id: 'occupancy', name: 'Real-Time Occupancy', icon: 'Activity' },
    { id: 'analytics', name: 'Usage Analytics', icon: 'TrendingUp' },
    { id: 'users', name: 'User Management', icon: 'Users' },
    { id: 'rooms', name: 'Room Configuration', icon: 'Settings' },
    { id: 'reports', name: 'System Reports', icon: 'FileText' },
    { id: 'alerts', name: 'Alerts & Notifications', icon: 'Bell' }
  ];

  const quickStats = [
    { label: 'Active Users', value: '3,247', change: '+12%', icon: 'Users', color: 'text-primary' },
    { label: 'Total Rooms', value: '485', change: '+3', icon: 'Home', color: 'text-success' },
    { label: 'Today\'s Bookings', value: '247', change: '+18%', icon: 'Calendar', color: 'text-accent' },
    { label: 'System Uptime', value: '99.8%', change: '0%', icon: 'Activity', color: 'text-warning' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardMetrics />;
      case 'occupancy':
        return <RealTimeOccupancy />;
      case 'analytics':
        return <UsageAnalytics />;
      case 'users':
        return <UserManagement />;
      case 'rooms':
        return <RoomConfiguration />;
      case 'reports':
        return <SystemReports />;
      case 'alerts':
        return <AlertsNotifications />;
      default:
        return <DashboardMetrics />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className={`pt-16 academic-transition ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Administrative Portal</h1>
                <p className="text-muted-foreground">
                  Comprehensive oversight and management tools for university space optimization
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full availability-pulse"></div>
                  <span>System Status: Operational</span>
                </div>
                <Button variant="outline" iconName="RefreshCw" iconPosition="left">
                  Refresh Data
                </Button>
                <Button variant="default" iconName="Download" iconPosition="left">
                  Export Report
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-card rounded-lg border border-border p-4 academic-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className={`text-xs ${stat.change.startsWith('+') ? 'text-success' : stat.change === '0%' ? 'text-muted-foreground' : 'text-error'}`}>
                        {stat.change} from last period
                      </p>
                    </div>
                    <div className={`flex items-center justify-center w-12 h-12 ${stat.color.replace('text-', 'bg-')}/10 rounded-lg`}>
                      <Icon name={stat.icon} size={24} className={stat.color} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Tabs */}
            <div className="bg-card rounded-lg border border-border p-2 academic-shadow">
              <div className="flex flex-wrap gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium academic-transition ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span className="hidden sm:inline">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>Last updated: {new Date().toLocaleString()}</span>
                <span>•</span>
                <span>Data refresh interval: 5 minutes</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>© {new Date().getFullYear()} UIH BookSpace</span>
                <span>•</span>
                <span>Administrative Portal v2.1.0</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdministrativePortalAnalytics;