import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_created': return 'UserPlus';
      case 'user_deleted': return 'UserMinus';
      case 'space_added': return 'Plus';
      case 'space_updated': return 'Edit';
      case 'booking_created': return 'Calendar';
      case 'booking_cancelled': return 'X';
      case 'system_update': return 'Settings';
      case 'maintenance': return 'Wrench';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user_created': case'space_added': case'booking_created': return 'text-success';
      case 'user_deleted': case'booking_cancelled': return 'text-error';
      case 'space_updated': case'system_update': return 'text-primary';
      case 'maintenance': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <Icon name="Activity" size={20} className="text-muted-foreground" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-muted ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                {activity.user && (
                  <div className="flex items-center space-x-1 mt-2">
                    <Icon name="User" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">by {activity.user}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {activities.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;