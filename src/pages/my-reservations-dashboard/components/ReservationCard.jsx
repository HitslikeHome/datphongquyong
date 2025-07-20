import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReservationCard = ({ reservation, onModify, onCancel, onShare, onCheckIn }) => {
  const [showQR, setShowQR] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'pending':
        return 'bg-muted text-muted-foreground border-border';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTimeUntil = (dateTime) => {
    const now = new Date();
    const bookingTime = new Date(dateTime);
    const diffMs = bookingTime - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    if (diffMs > 0) return 'starting soon';
    return 'started';
  };

  const isUpcoming = () => {
    const now = new Date();
    const bookingTime = new Date(reservation.dateTime);
    return bookingTime > now;
  };

  const canCheckIn = () => {
    const now = new Date();
    const bookingTime = new Date(reservation.dateTime);
    const diffMs = bookingTime - now;
    const diffMinutes = diffMs / (1000 * 60);
    return diffMinutes <= 15 && diffMinutes >= -30; // 15 min before to 30 min after
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-elevated transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{reservation.spaceName}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(reservation.status)}`}>
              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{reservation.building} - {reservation.floor}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{reservation.attendees} people</span>
            </div>
          </div>
        </div>
        
        {reservation.isRecurring && (
          <div className="flex items-center space-x-1 text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
            <Icon name="Repeat" size={12} />
            <span>Recurring</span>
          </div>
        )}
      </div>

      {/* Date and Time */}
      <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="font-medium text-foreground">
              {new Date(reservation.dateTime).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="font-medium text-foreground">
              {new Date(reservation.dateTime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })} - {new Date(reservation.endTime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
        
        {isUpcoming() && (
          <div className="text-sm font-medium text-cta">
            {getTimeUntil(reservation.dateTime)}
          </div>
        )}
      </div>

      {/* Purpose and Notes */}
      {reservation.purpose && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="FileText" size={14} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Purpose</span>
          </div>
          <p className="text-sm text-foreground pl-5">{reservation.purpose}</p>
        </div>
      )}

      {/* QR Code Section */}
      {reservation.status === 'confirmed' && canCheckIn() && (
        <div className="mb-4 p-3 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="QrCode" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Ready for Check-in</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQR(!showQR)}
              className="text-success hover:bg-success/10"
            >
              {showQR ? 'Hide QR' : 'Show QR'}
            </Button>
          </div>
          
          {showQR && (
            <div className="mt-3 flex justify-center">
              <div className="w-32 h-32 bg-white border-2 border-success/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Icon name="QrCode" size={48} className="text-success mx-auto mb-2" />
                  <div className="text-xs text-success font-mono">#{reservation.id}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          {reservation.status === 'confirmed' && isUpcoming() && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onModify(reservation)}
                iconName="Edit"
                iconPosition="left"
              >
                Modify
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(reservation)}
                iconName="Share2"
                iconPosition="left"
              >
                Share
              </Button>
            </>
          )}
          
          {canCheckIn() && reservation.status === 'confirmed' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onCheckIn(reservation)}
              iconName="LogIn"
              iconPosition="left"
            >
              Check In
            </Button>
          )}
        </div>

        {reservation.status === 'confirmed' && isUpcoming() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancel(reservation)}
            className="text-error hover:text-error hover:bg-error/10"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;