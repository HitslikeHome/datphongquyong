import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ totalSpaces, availableSpaces, popularSpaces, recentViews }) => {
  const occupancyRate = Math.round(((totalSpaces - availableSpaces) / totalSpaces) * 100);
  
  const stats = [
    {
      id: 'total',
      label: 'Total Spaces',
      value: totalSpaces,
      icon: 'Building',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Across all buildings'
    },
    {
      id: 'available',
      label: 'Available Now',
      value: availableSpaces,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Ready to book'
    },
    {
      id: 'occupancy',
      label: 'Campus Occupancy',
      value: `${occupancyRate}%`,
      icon: 'TrendingUp',
      color: occupancyRate > 70 ? 'text-error' : occupancyRate > 50 ? 'text-warning' : 'text-success',
      bgColor: occupancyRate > 70 ? 'bg-error/10' : occupancyRate > 50 ? 'bg-warning/10' : 'bg-success/10',
      description: 'Current usage'
    },
    {
      id: 'popular',
      label: 'Popular Today',
      value: popularSpaces,
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Trending spaces'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-card rounded-xl border border-border shadow-card p-4 hover:shadow-elevated transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            
            {stat.id === 'available' && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success font-medium">Live</span>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              {stat.id === 'occupancy' && (
                <Icon 
                  name={occupancyRate > 70 ? "TrendingUp" : "TrendingDown"} 
                  size={16} 
                  className={stat.color} 
                />
              )}
            </div>
            <p className="text-sm font-medium text-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </div>

          {/* Progress bar for occupancy */}
          {stat.id === 'occupancy' && (
            <div className="mt-3">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    occupancyRate > 70 ? 'bg-error' : 
                    occupancyRate > 50 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${occupancyRate}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Recent activity indicator */}
          {stat.id === 'available' && (
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Last updated</span>
              <span className="text-success font-medium">Just now</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuickStats;