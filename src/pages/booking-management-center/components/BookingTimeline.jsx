import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingTimeline = ({ bookings, onBookingClick, onQuickAction }) => {
  const groupBookingsByDate = (bookings) => {
    const groups = {};
    bookings.forEach(booking => {
      const dateKey = new Date(booking.startTime).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(booking);
    });
    
    // Sort bookings within each date by start time
    Object.keys(groups).forEach(date => {
      groups[date].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    });
    
    return groups;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'border-success bg-success/5';
      case 'upcoming': return 'border-accent bg-accent/5';
      case 'completed': return 'border-muted bg-muted/5';
      case 'cancelled': return 'border-error bg-error/5';
      default: return 'border-muted bg-muted/5';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'upcoming': return 'Clock';
      case 'completed': return 'Check';
      case 'cancelled': return 'X';
      default: return 'Circle';
    }
  };

  const getTimeUntil = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = start - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffMs < 0) return null;
    if (diffHours > 0) return `${diffHours}h ${diffMins}m`;
    return `${diffMins}m`;
  };

  const groupedBookings = groupBookingsByDate(bookings);
  const sortedDates = Object.keys(groupedBookings).sort((a, b) => new Date(a) - new Date(b));

  if (sortedDates.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center academic-shadow">
        <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
        <p className="text-muted-foreground mb-4">
          You don't have any bookings matching the current filters.
        </p>
        <Button variant="default" iconName="Plus" iconPosition="left">
          Create New Booking
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map(dateString => (
        <div key={dateString} className="bg-card border border-border rounded-lg academic-shadow">
          {/* Date Header */}
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {formatDate(dateString)}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Calendar" size={16} />
                <span>{groupedBookings[dateString].length} bookings</span>
              </div>
            </div>
          </div>

          {/* Timeline Items */}
          <div className="p-4">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-4">
                {groupedBookings[dateString].map((booking, index) => {
                  const timeUntil = getTimeUntil(booking.startTime);
                  
                  return (
                    <div key={booking.id} className="relative flex items-start space-x-4">
                      {/* Timeline Dot */}
                      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStatusColor(booking.status)}`}>
                        <Icon 
                          name={getStatusIcon(booking.status)} 
                          size={20} 
                          className={`${
                            booking.status === 'active' ? 'text-success' :
                            booking.status === 'upcoming' ? 'text-accent' :
                            booking.status === 'completed' ? 'text-muted-foreground' :
                            booking.status === 'cancelled'? 'text-error' : 'text-muted-foreground'
                          }`}
                        />
                      </div>

                      {/* Booking Content */}
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => onBookingClick(booking)}
                          className={`w-full text-left p-4 rounded-lg border academic-transition hover:academic-shadow-lg ${getStatusColor(booking.status)}`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                <Image
                                  src={booking.room.image}
                                  alt={booking.room.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground mb-1">
                                  {booking.room.name}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {booking.room.building} • Floor {booking.room.floor}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Clock" size={14} />
                                    <span>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Users" size={14} />
                                    <span>{booking.attendees} attendees</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'active' ? 'text-success bg-success/10' :
                                booking.status === 'upcoming' ? 'text-accent bg-accent/10' :
                                booking.status === 'completed' ? 'text-muted-foreground bg-muted' :
                                booking.status === 'cancelled'? 'text-error bg-error/10' : 'text-muted-foreground bg-muted'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </div>
                              {timeUntil && (
                                <div className="text-xs text-accent font-medium mt-1">
                                  Starts in {timeUntil}
                                </div>
                              )}
                            </div>
                          </div>

                          {booking.purpose && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {booking.purpose}
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {booking.isRecurring && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-institutional bg-institutional/10">
                                  <Icon name="Repeat" size={12} className="mr-1" />
                                  Recurring
                                </span>
                              )}
                              {booking.equipment && booking.equipment.length > 0 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-secondary bg-secondary/10">
                                  <Icon name="Monitor" size={12} className="mr-1" />
                                  {booking.equipment.length} items
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              {booking.status === 'upcoming' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  iconName="MapPin"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onQuickAction('checkin', booking.id);
                                  }}
                                  title="Check in"
                                />
                              )}
                              {booking.status === 'active' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  iconName="Plus"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onQuickAction('extend', booking.id);
                                  }}
                                  title="Extend booking"
                                />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                iconName="Share2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onQuickAction('share', booking.id);
                                }}
                                title="Share booking"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                iconName="Edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onQuickAction('modify', booking.id);
                                }}
                                title="Modify booking"
                              />
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingTimeline;