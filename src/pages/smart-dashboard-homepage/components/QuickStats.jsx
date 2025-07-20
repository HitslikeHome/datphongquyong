import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = () => {
  const stats = [
    {
      id: 1,
      title: "Active Bookings",
      value: "3",
      subtitle: "Next: CS Lab 2 at 2:00 PM",
      icon: "Calendar",
      color: "bg-primary",
      trend: "+1 from yesterday"
    },
    {
      id: 2,
      title: "Available Spaces",
      value: "42",
      subtitle: "Across 8 buildings",
      icon: "MapPin",
      color: "bg-success",
      trend: "12 high-demand"
    },
    {
      id: 3,
      title: "Campus Occupancy",
      value: "73%",
      subtitle: "Peak hours: 10-12 AM",
      icon: "TrendingUp",
      color: "bg-warning",
      trend: "Above average"
    },
    {
      id: 4,
      title: "Quick Actions",
      value: "4",
      subtitle: "Ready to use",
      icon: "Zap",
      color: "bg-accent",
      trend: "All systems online"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-card rounded-lg p-4 border border-border hover:shadow-elevated transition-smooth">
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} color="white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.trend}</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">{stat.title}</h3>
            <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;