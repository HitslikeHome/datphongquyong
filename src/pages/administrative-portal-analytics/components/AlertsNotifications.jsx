import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsNotifications = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const alerts = [
    {
      id: 1,
      title: "High System Load Detected",
      message: "Server CPU usage has exceeded 85% for the past 15 minutes. Consider scaling resources.",
      category: "System",
      priority: "High",
      timestamp: "2025-01-20 13:45:00",
      status: "Active",
      icon: "AlertTriangle",
      color: "text-error"
    },
    {
      id: 2,
      title: "Room A-101 Maintenance Required",
      message: "Projector malfunction reported by multiple users. Maintenance team has been notified.",
      category: "Maintenance",
      priority: "Medium",
      timestamp: "2025-01-20 12:30:00",
      status: "In Progress",
      icon: "Wrench",
      color: "text-warning"
    },
    {
      id: 3,
      title: "Unusual Booking Pattern Detected",
      message: "User john.doe@uih.edu has made 15 bookings in the last hour. Possible system abuse.",
      category: "Security",
      priority: "High",
      timestamp: "2025-01-20 11:15:00",
      status: "Active",
      icon: "Shield",
      color: "text-error"
    },
    {
      id: 4,
      title: "Database Backup Completed",
      message: "Daily database backup completed successfully. All data is secure and up to date.",
      category: "System",
      priority: "Low",
      timestamp: "2025-01-20 06:00:00",
      status: "Resolved",
      icon: "Database",
      color: "text-success"
    },
    {
      id: 5,
      title: "Peak Usage Alert",
      message: "Current occupancy rate is 92%. Consider promoting off-peak booking incentives.",
      category: "Usage",
      priority: "Medium",
      timestamp: "2025-01-20 10:45:00",
      status: "Active",
      icon: "TrendingUp",
      color: "text-warning"
    },
    {
      id: 6,
      title: "New User Registration Spike",
      message: "50+ new user registrations in the past hour. Monitoring for potential spam accounts.",
      category: "User",
      priority: "Medium",
      timestamp: "2025-01-20 09:30:00",
      status: "Monitoring",
      icon: "Users",
      color: "text-primary"
    }
  ];

  const notificationSettings = [
    {
      id: 1,
      category: "System Alerts",
      description: "Critical system issues and performance warnings",
      email: true,
      push: true,
      sms: false,
      icon: "Server"
    },
    {
      id: 2,
      category: "Maintenance Alerts",
      description: "Room maintenance requests and completion updates",
      email: true,
      push: true,
      sms: false,
      icon: "Wrench"
    },
    {
      id: 3,
      category: "Security Alerts",
      description: "Suspicious activities and security incidents",
      email: true,
      push: true,
      sms: true,
      icon: "Shield"
    },
    {
      id: 4,
      category: "Usage Alerts",
      description: "High occupancy rates and usage pattern changes",
      email: false,
      push: true,
      sms: false,
      icon: "BarChart3"
    },
    {
      id: 5,
      category: "User Alerts",
      description: "User registration and account-related notifications",
      email: true,
      push: false,
      sms: false,
      icon: "Users"
    }
  ];

  const alertStats = [
    { label: "Active Alerts", count: 4, color: "text-error" },
    { label: "In Progress", count: 1, color: "text-warning" },
    { label: "Monitoring", count: 1, color: "text-primary" },
    { label: "Resolved Today", count: 8, color: "text-success" }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesCategory = selectedCategory === 'all' || alert.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPriority = selectedPriority === 'all' || alert.priority.toLowerCase() === selectedPriority.toLowerCase();
    return matchesCategory && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-error/10 text-error';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-error/10 text-error';
      case 'in progress':
        return 'bg-warning/10 text-warning';
      case 'monitoring':
        return 'bg-primary/10 text-primary';
      case 'resolved':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const handleAlertAction = (action, alertId) => {
    console.log(`${action} alert with ID: ${alertId}`);
  };

  const handleNotificationToggle = (settingId, type) => {
    console.log(`Toggle ${type} notification for setting ID: ${settingId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
              <Icon name="Bell" size={20} className="text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Alerts & Notifications</h2>
              <p className="text-sm text-muted-foreground">Monitor system alerts and manage notifications</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" iconName="Settings" iconPosition="left">
              Settings
            </Button>
            <Button variant="default" iconName="Plus" iconPosition="left">
              Create Alert
            </Button>
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {alertStats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.count}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Categories</option>
            <option value="system">System</option>
            <option value="maintenance">Maintenance</option>
            <option value="security">Security</option>
            <option value="usage">Usage</option>
            <option value="user">User</option>
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Alerts */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border academic-shadow">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Active Alerts</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 academic-transition">
                  <div className="flex items-start space-x-4">
                    <div className={`flex items-center justify-center w-10 h-10 ${alert.color.replace('text-', 'bg-')}/10 rounded-lg`}>
                      <Icon name={alert.icon} size={20} className={alert.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                            {alert.priority}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{alert.category}</span>
                          <span>{formatTimestamp(alert.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAlertAction('acknowledge', alert.id)}
                            className="p-1.5 text-muted-foreground hover:text-success hover:bg-success/10 rounded-md academic-transition"
                            title="Acknowledge"
                          >
                            <Icon name="Check" size={16} />
                          </button>
                          <button
                            onClick={() => handleAlertAction('dismiss', alert.id)}
                            className="p-1.5 text-muted-foreground hover:text-error hover:bg-error/10 rounded-md academic-transition"
                            title="Dismiss"
                          >
                            <Icon name="X" size={16} />
                          </button>
                          <button
                            onClick={() => handleAlertAction('view', alert.id)}
                            className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md academic-transition"
                            title="View Details"
                          >
                            <Icon name="ExternalLink" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-8">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No alerts found</h3>
                <p className="text-muted-foreground">All systems are running smoothly.</p>
              </div>
            )}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-lg border border-border academic-shadow">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {notificationSettings.map((setting) => (
                <div key={setting.id} className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                      <Icon name={setting.icon} size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{setting.category}</h4>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                  <div className="ml-11 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Email</span>
                      <button
                        onClick={() => handleNotificationToggle(setting.id, 'email')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          setting.email ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            setting.email ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Push</span>
                      <button
                        onClick={() => handleNotificationToggle(setting.id, 'push')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          setting.push ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            setting.push ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">SMS</span>
                      <button
                        onClick={() => handleNotificationToggle(setting.id, 'sms')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          setting.sms ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            setting.sms ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-4 academic-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {filteredAlerts.filter(a => a.status === 'Active').length} active alerts requiring attention
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="CheckCircle" iconPosition="left">
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" iconName="Archive" iconPosition="left">
              Archive Resolved
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
              Refresh Alerts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsNotifications;