import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: "Total Users",
      value: metrics.totalUsers,
      change: "+12%",
      changeType: "positive",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Active Bookings",
      value: metrics.activeBookings,
      change: "+8%",
      changeType: "positive",
      icon: "Calendar",
      color: "success"
    },
    {
      title: "Space Utilization",
      value: `${metrics.spaceUtilization}%`,
      change: "+5%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "accent"
    },
    {
      title: "System Uptime",
      value: `${metrics.systemUptime}%`,
      change: "0%",
      changeType: "neutral",
      icon: "Activity",
      color: "cta"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-elevated transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 bg-${metric.color}/10 rounded-lg flex items-center justify-center`}>
              <Icon name={metric.icon} size={20} className={`text-${metric.color}`} />
            </div>
            <div className={`flex items-center space-x-1 text-xs font-medium ${
              metric.changeType === 'positive' ? 'text-success' : 
              metric.changeType === 'negative' ? 'text-error' : 'text-muted-foreground'
            }`}>
              {metric.changeType === 'positive' && <Icon name="TrendingUp" size={12} />}
              {metric.changeType === 'negative' && <Icon name="TrendingDown" size={12} />}
              <span>{metric.change}</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
            <p className="text-sm text-muted-foreground">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemMetrics;