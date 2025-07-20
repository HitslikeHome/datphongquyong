import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingSuccess = ({ bookingData, onNewBooking }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, []);

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} minutes`;
    if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours}h ${mins}m`;
  };

  const getDirectionsUrl = () => {
    // Mock coordinates for the room
    const lat = 40.7128;
    const lng = -74.0060;
    return `https://www.google.com/maps?q=${lat},${lng}&z=18&output=embed`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Room Booking Confirmed',
        text: `I've booked ${bookingData.room.name} for ${formatDate()} at ${bookingData.time}`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      const shareText = `Room Booking Confirmed!\n${bookingData.room.name}\n${formatDate()} at ${bookingData.time} - ${bookingData.endTime}`;
      navigator.clipboard.writeText(shareText);
    }
  };

  const handleAddToCalendar = () => {
    const startDate = new Date();
    const [hours, minutes] = bookingData.time.split(':').map(Number);
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + bookingData.duration);
    
    const formatDateForCalendar = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Room Booking: ${bookingData.room.name}`)}&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}&details=${encodeURIComponent(`Booking ID: ${bookingData.bookingId}\nLocation: ${bookingData.room.location}\nPurpose: ${bookingData.details.purpose}`)}&location=${encodeURIComponent(bookingData.room.location)}`;
    
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Animation */}
      <div className={`text-center mb-8 ${showConfetti ? 'booking-success-bounce' : ''}`}>
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Check" size={40} className="text-success-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground">Your room has been successfully reserved</p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-card border border-border rounded-lg academic-shadow mb-6">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Booking Details</h3>
            <div className="flex items-center space-x-2 text-sm text-success">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Confirmed</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={bookingData.room.image}
                alt={bookingData.room.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{bookingData.room.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{bookingData.room.location}</p>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Booking ID:</span>
                  <span className="ml-2 font-mono text-foreground">{bookingData.bookingId}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="ml-2 font-medium text-foreground">{formatDate()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <span className="ml-2 font-medium text-foreground">
                    {bookingData.time} - {bookingData.endTime}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="ml-2 font-medium text-foreground">{formatDuration(bookingData.duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 border-b border-border">
          <h4 className="font-medium text-foreground mb-4">Quick Actions</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={handleAddToCalendar}
            >
              Add to Calendar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Share"
              iconPosition="left"
              onClick={handleShare}
            >
              Share Booking
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="MapPin"
              iconPosition="left"
            >
              Get Directions
            </Button>
          </div>
        </div>

        {/* Room Access Information */}
        <div className="p-6">
          <h4 className="font-medium text-foreground mb-4">Access Information</h4>
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Room access available from {bookingData.time} (5 minutes early access)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Key" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Use your student ID card to unlock the room
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                {bookingData.room.floor} - Follow signs from main entrance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-card border border-border rounded-lg academic-shadow mb-6">
        <div className="p-6">
          <h4 className="font-medium text-foreground mb-4">What's Next?</h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Check your email</p>
                <p className="text-xs text-muted-foreground">Booking confirmation sent to your university email</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Set up reminders</p>
                <p className="text-xs text-muted-foreground">
                  {bookingData.details.sendReminder ? 'Reminder notifications enabled' : 'Add to your calendar for reminders'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Arrive on time</p>
                <p className="text-xs text-muted-foreground">Room access starts 5 minutes before your booking time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={onNewBooking}
        >
          Book Another Room
        </Button>
        
        <Link to="/booking-management-center" className="flex-1">
          <Button
            variant="outline"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
          >
            View All Bookings
          </Button>
        </Link>
        
        <Link to="/homepage-university-booking-platform" className="flex-1">
          <Button
            variant="ghost"
            fullWidth
            iconName="Home"
            iconPosition="left"
          >
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Auto-redirect notice */}
      {countdown > 0 && (
        <div className="text-center mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Redirecting to dashboard in {countdown} seconds...
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingSuccess;