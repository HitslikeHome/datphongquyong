import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CampusActivity = () => {
  const [timeRange, setTimeRange] = useState('today');
  
  const activityData = {
    today: {
      totalBookings: 156,
      activeUsers: 89,
      peakHour: "2:00 PM",
      occupancyRate: 73,
      popularSpaces: [
        { name: "Main Library", bookings: 34, trend: "+12%" },
        { name: "CS Labs", bookings: 28, trend: "+8%" },
        { name: "Study Rooms", bookings: 22, trend: "+15%" }
      ]
    },
    week: {
      totalBookings: 1247,
      activeUsers: 342,
      peakHour: "Tuesday 2:00 PM",
      occupancyRate: 68,
      popularSpaces: [
        { name: "Main Library", bookings: 287, trend: "+18%" },
        { name: "CS Labs", bookings: 234, trend: "+12%" },
        { name: "Conference Rooms", bookings: 198, trend: "+25%" }
      ]
    },
    month: {
      totalBookings: 5432,
      activeUsers: 567,
      peakHour: "Weekdays 2-4 PM",
      occupancyRate: 71,
      popularSpaces: [
        { name: "Main Library", bookings: 1234, trend: "+22%" },
        { name: "CS Labs", bookings: 987, trend: "+15%" },
        { name: "Study Rooms", bookings: 876, trend: "+28%" }
      ]
    }
  };

  const currentData = activityData[timeRange];

  const recentActivity = [
    {
      id: 1,
      user: "Dr. Michael Chen",
      action: "booked",
      space: "Conference Room A",
      time: "2 minutes ago",
      icon: "Calendar",
      color: "text-success"
    },
    {
      id: 2,
      user: "Sarah Johnson",
      action: "checked in to",
      space: "Study Room B",
      time: "5 minutes ago",
      icon: "QrCode",
      color: "text-primary"
    },
    {
      id: 3,
      user: "Prof. David Kim",
      action: "modified booking for",
      space: "CS Lab 3",
      time: "8 minutes ago",
      icon: "Edit",
      color: "text-warning"
    },
    {
      id: 4,
      user: "Lisa Wang",
      action: "cancelled",
      space: "Meeting Room C",
      time: "12 minutes ago",
      icon: "X",
      color: "text-error"
    },
    {
      id: 5,
      user: "Dr. James Wilson",
      action: "completed session at",
      space: "Research Lab 1",
      time: "15 minutes ago",
      icon: "CheckCircle",
      color: "text-success"
    }
  ];

  const timeRanges = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Activity Overview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Campus Activity</h2>
            <p className="text-sm text-muted-foreground">Real-time usage statistics</p>
          </div>
          
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-smooth ${
                  timeRange === range.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{currentData.totalBookings}</div>
            <div className="text-xs text-muted-foreground">Total Bookings</div>
          </div>
          <div className="text-center p-3 bg-success/5 rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">{currentData.activeUsers}</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Campus Occupancy</span>
            <span className="text-sm font-bold text-foreground">{currentData.occupancyRate}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${currentData.occupancyRate}%` }}
            ></div>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-xs text-muted-foreground">Peak: {currentData.peakHour}</span>
          </div>
        </div>

        {/* Popular Spaces */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Popular Spaces</h3>
          <div className="space-y-2">
            {currentData.popularSpaces.map((space, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-smooth">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{space.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{space.bookings}</span>
                  <span className="text-xs text-success font-medium">{space.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">Live campus booking updates</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">Live</span>
          </div>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-smooth">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-muted ${activity.color}`}>
                <Icon name={activity.icon} size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-muted-foreground"> {activity.action} </span>
                  <span className="font-medium">{activity.space}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Summary */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-foreground">24</div>
              <div className="text-xs text-muted-foreground">Bookings/Hour</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">12</div>
              <div className="text-xs text-muted-foreground">Check-ins/Hour</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">3</div>
              <div className="text-xs text-muted-foreground">Modifications/Hour</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusActivity;