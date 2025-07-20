import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardMetrics = () => {
  const metrics = [
    {
      id: 1,
      title: "Total Bookings Today",
      value: "247",
      change: "+12%",
      changeType: "positive",
      icon: "Calendar",
      description: "Active reservations across all spaces"
    },
    {
      id: 2,
      title: "Current Occupancy",
      value: "68%",
      change: "+5%",
      changeType: "positive",
      icon: "Users",
      description: "Real-time space utilization"
    },
    {
      id: 3,
      title: "Available Rooms",
      value: "156",
      change: "-8",
      changeType: "neutral",
      icon: "Home",
      description: "Immediately bookable spaces"
    },
    {
      id: 4,
      title: "System Uptime",
      value: "99.8%",
      change: "0%",
      changeType: "positive",
      icon: "Activity",
      description: "Platform reliability this month"
    },
    {
      id: 5,
      title: "User Satisfaction",
      value: "4.7/5",
      change: "+0.2",
      changeType: "positive",
      icon: "Star",
      description: "Average rating from user feedback"
    },
    {
      id: 6,
      title: "Revenue Today",
      value: "$2,840",
      change: "+18%",
      changeType: "positive",
      icon: "DollarSign",
      description: "Premium booking fees collected"
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-card rounded-lg border border-border p-6 academic-shadow hover:academic-shadow-lg academic-transition"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <Icon name={metric.icon} size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {metric.value}
                </p>
              </div>
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
              <Icon name={getChangeIcon(metric.changeType)} size={16} />
              <span className="text-sm font-medium">{metric.change}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {metric.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;