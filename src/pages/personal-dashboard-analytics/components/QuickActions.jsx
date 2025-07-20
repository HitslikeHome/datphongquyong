import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ favoriteRooms, recentBookings }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const quickActionItems = [
    {
      id: 'book-favorite',
      title: 'Book Favorite Room',
      description: 'Quick access to your preferred spaces',
      icon: 'Heart',
      color: 'bg-primary',
      action: () => setShowFavorites(true)
    },
    {
      id: 'extend-current',
      title: 'Extend Current Session',
      description: 'Add more time to active booking',
      icon: 'Clock',
      color: 'bg-accent',
      action: () => console.log('Extend session')
    },
    {
      id: 'find-nearby',
      title: 'Find Nearby Rooms',
      description: 'Available spaces near your location',
      icon: 'MapPin',
      color: 'bg-secondary',
      action: () => console.log('Find nearby')
    },
    {
      id: 'group-booking',
      title: 'Create Group Booking',
      description: 'Coordinate with study partners',
      icon: 'Users',
      color: 'bg-success',
      action: () => console.log('Group booking')
    }
  ];

  const upcomingSlots = [
    { time: '2:00 PM', room: 'Study Room A-201', available: true },
    { time: '3:30 PM', room: 'Group Space B-105', available: true },
    { time: '5:00 PM', room: 'Meeting Room C-301', available: false },
    { time: '6:30 PM', room: 'Study Room A-203', available: true }
  ];

  const handleQuickBook = (room) => {
    console.log('Quick booking:', room);
    setShowFavorites(false);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActionItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="p-4 rounded-lg border border-border hover:border-primary/50 academic-transition group text-left"
            >
              <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 academic-transition`}>
                <Icon name={item.icon} size={20} className="text-white" />
              </div>
              <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Favorite Rooms Modal */}
      {showFavorites && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border border-border max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Favorite Rooms</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowFavorites(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-3">
              {favoriteRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 academic-transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={room.type === 'study' ? 'BookOpen' : 'Users'} size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{room.name}</div>
                      <div className="text-sm text-muted-foreground">{room.building}</div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickBook(room)}
                  >
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Available Time Slots */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Available Today</h3>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {upcomingSlots.map((slot, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                slot.available 
                  ? 'border-success/30 bg-success/5' :'border-muted bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{slot.time}</div>
                  <div className="text-sm text-muted-foreground">{slot.room}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    slot.available ? 'bg-success' : 'bg-muted-foreground'
                  }`}></div>
                  <span className={`text-xs font-medium ${
                    slot.available ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {slot.available ? 'Available' : 'Booked'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          {recentBookings.slice(0, 3).map((booking) => (
            <div key={booking.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Calendar" size={14} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{booking.action}</div>
                <div className="text-xs text-muted-foreground">{booking.room} • {booking.time}</div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="RotateCcw" size={14} className="mr-1" />
                Repeat
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;