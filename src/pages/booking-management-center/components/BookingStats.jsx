import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingStats = ({ bookings }) => {
  const calculateStats = () => {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    const stats = {
      total: bookings.length,
      active: bookings.filter(b => b.status === 'active').length,
      upcoming: bookings.filter(b => b.status === 'upcoming').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      thisMonth: bookings.filter(b => new Date(b.startTime) >= thisMonth).length,
      lastMonth: bookings.filter(b => {
        const bookingDate = new Date(b.startTime);
        return bookingDate >= lastMonth && bookingDate < thisMonth;
      }).length,
      totalHours: bookings.reduce((sum, booking) => {
        const start = new Date(booking.startTime);
        const end = new Date(booking.endTime);
        return sum + (end - start) / (1000 * 60 * 60);
      }, 0),
      averageDuration: 0,
      mostUsedBuilding: '',
      mostUsedRoomType: ''
    };

    // Calculate average duration
    if (stats.total > 0) {
      stats.averageDuration = stats.totalHours / stats.total;
    }

    // Find most used building
    const buildingCounts = {};
    bookings.forEach(booking => {
      const building = booking.room.building;
      buildingCounts[building] = (buildingCounts[building] || 0) + 1;
    });
    stats.mostUsedBuilding = Object.keys(buildingCounts).reduce((a, b) => 
      buildingCounts[a] > buildingCounts[b] ? a : b, ''
    );

    // Find most used room type
    const typeCounts = {};
    bookings.forEach(booking => {
      const type = booking.room.type;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    stats.mostUsedRoomType = Object.keys(typeCounts).reduce((a, b) => 
      typeCounts[a] > typeCounts[b] ? a : b, ''
    );

    return stats;
  };

  const stats = calculateStats();
  
  const getChangePercentage = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const monthlyChange = getChangePercentage(stats.thisMonth, stats.lastMonth);

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.total,
      icon: 'Calendar',
      color: 'text-primary bg-primary/10',
      change: null
    },
    {
      title: 'Active Now',
      value: stats.active,
      icon: 'Play',
      color: 'text-success bg-success/10',
      change: null
    },
    {
      title: 'Upcoming',
      value: stats.upcoming,
      icon: 'Clock',
      color: 'text-accent bg-accent/10',
      change: null
    },
    {
      title: 'This Month',
      value: stats.thisMonth,
      icon: 'TrendingUp',
      color: 'text-institutional bg-institutional/10',
      change: monthlyChange
    },
    {
      title: 'Total Hours',
      value: Math.round(stats.totalHours),
      icon: 'Timer',
      color: 'text-secondary bg-secondary/10',
      suffix: 'hrs',
      change: null
    },
    {
      title: 'Avg Duration',
      value: stats.averageDuration.toFixed(1),
      icon: 'BarChart3',
      color: 'text-warning bg-warning/10',
      suffix: 'hrs',
      change: null
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 academic-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon name={stat.icon} size={20} />
              </div>
              {stat.change !== null && (
                <div className={`flex items-center text-xs font-medium ${
                  stat.change > 0 ? 'text-success' : stat.change < 0 ? 'text-error' : 'text-muted-foreground'
                }`}>
                  <Icon 
                    name={stat.change > 0 ? 'TrendingUp' : stat.change < 0 ? 'TrendingDown' : 'Minus'} 
                    size={12} 
                    className="mr-1" 
                  />
                  {Math.abs(stat.change)}%
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                {stat.suffix && (
                  <span className="text-sm text-muted-foreground">{stat.suffix}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-card border border-border rounded-lg p-4 academic-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">Booking Status</h3>
          <div className="space-y-3">
            {[
              { status: 'completed', label: 'Completed', count: stats.completed, color: 'bg-muted' },
              { status: 'upcoming', label: 'Upcoming', count: stats.upcoming, color: 'bg-accent' },
              { status: 'active', label: 'Active', count: stats.active, color: 'bg-success' },
              { status: 'cancelled', label: 'Cancelled', count: stats.cancelled, color: 'bg-error' }
            ].map(item => {
              const percentage = stats.total > 0 ? (item.count / stats.total) * 100 : 0;
              return (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Usage Insights */}
        <div className="bg-card border border-border rounded-lg p-4 academic-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">Usage Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Icon name="Building" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Most Used Building</p>
                  <p className="text-xs text-muted-foreground">Your preferred location</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {stats.mostUsedBuilding || 'N/A'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 text-accent rounded-lg">
                  <Icon name="Home" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Preferred Room Type</p>
                  <p className="text-xs text-muted-foreground">Most booked category</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {stats.mostUsedRoomType || 'N/A'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 text-success rounded-lg">
                  <Icon name="Target" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Completion Rate</p>
                  <p className="text-xs text-muted-foreground">Bookings attended</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {stats.total > 0 ? Math.round(((stats.completed + stats.active) / stats.total) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStats;