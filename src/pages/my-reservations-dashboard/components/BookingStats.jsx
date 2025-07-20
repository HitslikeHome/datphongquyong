import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingStats = ({ stats }) => {
  const statItems = [
    {
      icon: 'Calendar',
      label: 'Total Bookings',
      value: stats.totalBookings,
      change: '+12%',
      changeType: 'positive',
      description: 'This month'
    },
    {
      icon: 'Clock',
      label: 'Hours Booked',
      value: `${stats.hoursBooked}h`,
      change: '+8%',
      changeType: 'positive',
      description: 'This month'
    },
    {
      icon: 'MapPin',
      label: 'Favorite Space',
      value: stats.favoriteSpace,
      change: `${stats.favoriteSpaceUsage}%`,
      changeType: 'neutral',
      description: 'Usage rate'
    },
    {
      icon: 'TrendingUp',
      label: 'Attendance Rate',
      value: `${stats.attendanceRate}%`,
      change: '+5%',
      changeType: 'positive',
      description: 'Check-in rate'
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              index === 0 ? 'bg-primary/10 text-primary' :
              index === 1 ? 'bg-secondary/10 text-secondary' :
              index === 2 ? 'bg-accent/10 text-accent': 'bg-success/10 text-success'
            }`}>
              <Icon name={item.icon} size={18} />
            </div>
            <div className={`flex items-center space-x-1 text-xs font-medium ${getChangeColor(item.changeType)}`}>
              <Icon 
                name={item.changeType === 'positive' ? 'TrendingUp' : item.changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
                size={12} 
              />
              <span>{item.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{item.value}</div>
            <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
            <div className="text-xs text-muted-foreground">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingStats;