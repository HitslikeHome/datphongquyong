import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, onModify, onCancel, onExtend, onShare, onCheckIn }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'upcoming': return 'text-accent bg-accent/10';
      case 'completed': return 'text-muted-foreground bg-muted';
      case 'cancelled': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTimeUntil = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = start - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffMs < 0) return 'Started';
    if (diffHours > 0) return `${diffHours}h ${diffMins}m`;
    return `${diffMins}m`;
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg academic-shadow hover:academic-shadow-lg academic-transition">
      <div className="p-4">
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
              <h3 className="font-semibold text-foreground text-sm mb-1">
                {booking.room.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                {booking.room.building} • Floor {booking.room.floor} • Capacity {booking.room.capacity}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                {booking.isRecurring && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-institutional bg-institutional/10">
                    <Icon name="Repeat" size={12} className="mr-1" />
                    Recurring
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(booking.startTime)}
            </div>
            {booking.status === 'upcoming' && (
              <div className="text-xs text-accent font-medium mt-1">
                Starts in {getTimeUntil(booking.startTime)}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{booking.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{booking.attendees} attendees</span>
            </div>
            {booking.equipment && booking.equipment.length > 0 && (
              <div className="flex items-center space-x-1">
                <Icon name="Monitor" size={12} />
                <span>{booking.equipment.length} items</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            {booking.purpose && (
              <div>
                <h4 className="text-xs font-medium text-foreground mb-1">Purpose</h4>
                <p className="text-xs text-muted-foreground">{booking.purpose}</p>
              </div>
            )}
            
            {booking.equipment && booking.equipment.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-foreground mb-1">Equipment</h4>
                <div className="flex flex-wrap gap-1">
                  {booking.equipment.map((item, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {booking.attendeesList && booking.attendeesList.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-foreground mb-1">Attendees</h4>
                <div className="flex -space-x-2">
                  {booking.attendeesList.slice(0, 5).map((attendee, index) => (
                    <div key={index} className="w-6 h-6 rounded-full border-2 border-card overflow-hidden">
                      <Image
                        src={attendee.avatar}
                        alt={attendee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {booking.attendeesList.length > 5 && (
                    <div className="w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium text-muted-foreground">
                        +{booking.attendeesList.length - 5}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-4 py-3 bg-muted/30 border-t border-border rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {booking.status === 'upcoming' && (
              <Button
                variant="default"
                size="sm"
                iconName="MapPin"
                iconPosition="left"
                onClick={() => onCheckIn(booking.id)}
              >
                Check In
              </Button>
            )}
            {booking.status === 'active' && (
              <Button
                variant="success"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={() => onExtend(booking.id)}
              >
                Extend
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="Share2"
              onClick={() => onShare(booking.id)}
              title="Share booking"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              onClick={() => onModify(booking.id)}
              title="Modify booking"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={() => onCancel(booking.id)}
              title="Cancel booking"
              className="text-error hover:text-error"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;