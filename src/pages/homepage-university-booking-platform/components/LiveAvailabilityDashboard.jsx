import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveAvailabilityDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const roomCategories = [
    {
      id: 'study',
      name: 'Study Rooms',
      icon: 'BookOpen',
      total: 45,
      available: 28,
      color: 'bg-blue-500',
      rooms: [
        { id: 'S101', name: 'Quiet Study A', capacity: 4, available: true, nextSlot: '10:00 AM' },
        { id: 'S102', name: 'Quiet Study B', capacity: 2, available: true, nextSlot: '11:30 AM' },
        { id: 'S103', name: 'Group Study', capacity: 8, available: false, nextSlot: '2:00 PM' }
      ]
    },
    {
      id: 'meeting',
      name: 'Meeting Rooms',
      icon: 'Users',
      total: 18,
      available: 12,
      color: 'bg-green-500',
      rooms: [
        { id: 'M201', name: 'Conference A', capacity: 12, available: true, nextSlot: '9:30 AM' },
        { id: 'M202', name: 'Boardroom', capacity: 16, available: true, nextSlot: '1:00 PM' },
        { id: 'M203', name: 'Team Room', capacity: 6, available: false, nextSlot: '3:30 PM' }
      ]
    },
    {
      id: 'lab',
      name: 'Computer Labs',
      icon: 'Monitor',
      total: 12,
      available: 7,
      color: 'bg-purple-500',
      rooms: [
        { id: 'L301', name: 'Tech Lab A', capacity: 20, available: true, nextSlot: '10:30 AM' },
        { id: 'L302', name: 'Design Studio', capacity: 15, available: true, nextSlot: '12:00 PM' },
        { id: 'L303', name: 'Programming Lab', capacity: 25, available: false, nextSlot: '4:00 PM' }
      ]
    },
    {
      id: 'presentation',
      name: 'Presentation Halls',
      icon: 'Presentation',
      total: 8,
      available: 3,
      color: 'bg-orange-500',
      rooms: [
        { id: 'P401', name: 'Auditorium A', capacity: 50, available: true, nextSlot: '11:00 AM' },
        { id: 'P402', name: 'Lecture Hall', capacity: 30, available: false, nextSlot: '2:30 PM' },
        { id: 'P403', name: 'Seminar Room', capacity: 20, available: true, nextSlot: '4:30 PM' }
      ]
    }
  ];

  const recentActivity = [
    { user: 'Sarah Chen', room: 'Study Room A', action: 'booked', time: '2 min ago' },
    { user: 'Mike Rodriguez', room: 'Conference B', action: 'checked in', time: '5 min ago' },
    { user: 'Emma Wilson', room: 'Tech Lab', action: 'extended', time: '8 min ago' },
    { user: 'David Park', room: 'Group Study', action: 'cancelled', time: '12 min ago' }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-success rounded-full availability-pulse"></div>
            <span className="text-sm font-medium text-success">Live Updates</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Real-Time Availability Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what's available right now across campus. Updated every minute with live booking data.
          </p>
        </div>

        {/* Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roomCategories.map((category) => (
            <div key={category.id} className="bg-card rounded-xl p-6 academic-shadow hover:shadow-lg academic-transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={category.icon} size={24} className="text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{category.available}</div>
                  <div className="text-sm text-muted-foreground">of {category.total}</div>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
              <div className="w-full bg-muted rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full ${category.color}`}
                  style={{ width: `${(category.available / category.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-success font-medium">{Math.round((category.available / category.total) * 100)}% available</span>
                <Link to="/room-explorer-discovery" className="text-primary hover:text-primary/80 font-medium">
                  View all →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Room Status */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 academic-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Popular Rooms</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Updated {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="space-y-4">
                {roomCategories.slice(0, 2).map((category) => (
                  <div key={category.id}>
                    <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                      <Icon name={category.icon} size={18} />
                      <span>{category.name}</span>
                    </h4>
                    <div className="grid gap-3">
                      {category.rooms.map((room) => (
                        <div key={room.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${room.available ? 'bg-success' : 'bg-error'}`}></div>
                            <div>
                              <div className="font-medium text-foreground">{room.name}</div>
                              <div className="text-sm text-muted-foreground">Capacity: {room.capacity} people</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${room.available ? 'text-success' : 'text-error'}`}>
                              {room.available ? 'Available' : 'Occupied'}
                            </div>
                            <div className="text-xs text-muted-foreground">Next: {room.nextSlot}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Link to="/room-explorer-discovery">
                  <Button variant="outline" fullWidth iconName="Search" iconPosition="left">
                    Explore All Rooms
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-xl p-6 academic-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Live Activity</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full availability-pulse"></div>
                <span className="text-xs text-success font-medium">LIVE</span>
              </div>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="font-medium">{activity.room}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">12</div>
                <div className="text-sm text-muted-foreground">rooms booked in the last hour</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveAvailabilityDashboard;