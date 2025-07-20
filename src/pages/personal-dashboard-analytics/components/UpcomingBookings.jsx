import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingBookings = ({ bookings }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'checked-in': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTimeUntil = (dateTime) => {
    const now = new Date();
    const bookingTime = new Date(dateTime);
    const diffMs = bookingTime - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) return `in ${diffHours}h ${diffMins}m`;
    if (diffMins > 0) return `in ${diffMins}m`;
    return 'Now';
  };

  const handleQuickAction = (action, bookingId) => {
    console.log(`${action} booking:`, bookingId);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Upcoming Bookings</h2>
        <Button variant="outline" size="sm">
          <Icon name="Calendar" size={16} className="mr-2" />
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className={`p-4 rounded-lg border academic-transition cursor-pointer ${
              selectedBooking === booking.id 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedBooking(selectedBooking === booking.id ? null : booking.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-foreground">{booking.roomName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{booking.building} - {booking.floor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{booking.capacity} people</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-accent">
                    {getTimeUntil(booking.dateTime)}
                  </div>
                  {booking.hasReminder && (
                    <Icon name="Bell" size={14} className="text-warning" />
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {booking.status === 'confirmed' && getTimeUntil(booking.dateTime) === 'Now' && (
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAction('checkin', booking.id);
                    }}
                  >
                    <Icon name="LogIn" size={14} className="mr-1" />
                    Check In
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBooking(selectedBooking === booking.id ? null : booking.id);
                  }}
                >
                  <Icon name={selectedBooking === booking.id ? "ChevronUp" : "ChevronDown"} size={16} />
                </Button>
              </div>
            </div>
            
            {selectedBooking === booking.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickAction('modify', booking.id)}
                  >
                    <Icon name="Edit" size={14} className="mr-1" />
                    Modify
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickAction('extend', booking.id)}
                  >
                    <Icon name="Clock" size={14} className="mr-1" />
                    Extend
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickAction('share', booking.id)}
                  >
                    <Icon name="Share" size={14} className="mr-1" />
                    Share
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleQuickAction('cancel', booking.id)}
                  >
                    <Icon name="X" size={14} className="mr-1" />
                    Cancel
                  </Button>
                </div>
                
                {booking.notes && (
                  <div className="mt-3 p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">
                      <Icon name="FileText" size={14} className="inline mr-1" />
                      {booking.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;