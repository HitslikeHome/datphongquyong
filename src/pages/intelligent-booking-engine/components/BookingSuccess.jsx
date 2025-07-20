import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookingSuccess = ({ bookingData }) => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateDuration = () => {
    const startTime = bookingData.selectedTime;
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + 1;
    const endTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return `${startTime} - ${endTime}`;
  };

  const handleDownloadQR = () => {
    // Create a temporary link to download the QR code
    const link = document.createElement('a');
    link.href = bookingData.qrCode;
    link.download = `booking-qr-${bookingData.bookingId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(bookingData.selectedDate);
    const [hours, minutes] = bookingData.selectedTime.split(':').map(Number);
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(hours + 1, minutes, 0, 0);

    const formatDateForCalendar = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(bookingData.details?.title || 'Room Booking')}&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}&details=${encodeURIComponent(`Room: ${bookingData.selectedSpace?.name}\nBooking ID: ${bookingData.bookingId}\nLocation: ${bookingData.selectedSpace?.building}`)}&location=${encodeURIComponent(bookingData.selectedSpace?.name)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const shareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Room Booking Confirmation',
        text: `I've booked ${bookingData.selectedSpace?.name} for ${formatDate(bookingData.selectedDate)} at ${bookingData.selectedTime}`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      const shareText = `Room Booking Confirmed!\n\nRoom: ${bookingData.selectedSpace?.name}\nDate: ${formatDate(bookingData.selectedDate)}\nTime: ${calculateDuration()}\nBooking ID: ${bookingData.bookingId}`;
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" size={40} className="text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Your space has been successfully reserved
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Clock" size={16} />
            <span>Confirmed at {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-elevated mb-8">
          <div className="relative">
            <Image
              src={bookingData.selectedSpace?.image}
              alt={bookingData.selectedSpace?.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold mb-1">{bookingData.selectedSpace?.name}</h2>
              <p className="text-white/90 flex items-center">
                <Icon name="MapPin" size={16} className="mr-2" />
                {bookingData.selectedSpace?.building} • {bookingData.selectedSpace?.floor}
              </p>
            </div>
            <div className="absolute top-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-foreground">ID: {bookingData.bookingId}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Calendar" size={24} className="text-primary" />
                </div>
                <div className="font-semibold text-foreground">{formatDate(bookingData.selectedDate)}</div>
                <div className="text-sm text-muted-foreground">Date</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Clock" size={24} className="text-primary" />
                </div>
                <div className="font-semibold text-foreground">{calculateDuration()}</div>
                <div className="text-sm text-muted-foreground">Time</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
                <div className="font-semibold text-foreground">{bookingData.details?.attendees || 1} People</div>
                <div className="text-sm text-muted-foreground">Attendees</div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-muted/50 rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-white rounded-xl p-4 shadow-card">
                    <Image
                      src={bookingData.qrCode}
                      alt="Check-in QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Your Check-in QR Code</h3>
                  <p className="text-muted-foreground mb-4">
                    Scan this QR code at the room entrance to check in. Save it to your phone or print it out.
                  </p>
                  <Button variant="outline" size="sm" onClick={handleDownloadQR}>
                    <Icon name="Download" size={16} className="mr-2" />
                    Download QR Code
                  </Button>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Booking Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title:</span>
                    <span className="font-medium text-foreground">{bookingData.details?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purpose:</span>
                    <span className="font-medium text-foreground capitalize">{bookingData.details?.purpose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium text-foreground">{bookingData.details?.department}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{bookingData.details?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium text-foreground">{bookingData.details?.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button onClick={handleAddToCalendar} className="w-full">
            <Icon name="Calendar" size={16} className="mr-2" />
            Add to Calendar
          </Button>
          <Button variant="outline" onClick={shareBooking} className="w-full">
            <Icon name="Share2" size={16} className="mr-2" />
            Share Booking
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/my-reservations-dashboard">
              <Icon name="BookOpen" size={16} className="mr-2" />
              My Bookings
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/qr-check-in-portal">
              <Icon name="QrCode" size={16} className="mr-2" />
              Check-In Portal
            </Link>
          </Button>
        </div>

        {/* Next Steps */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Bell" size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">Email Confirmation</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Check your email for detailed booking confirmation and instructions.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" size={16} className="text-warning" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">Arrive Early</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Please arrive 10 minutes before your scheduled time for setup.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="QrCode" size={16} className="text-success" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">Check-In</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Use your QR code to check in at the room entrance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-4">Need Something Else?</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/intelligent-booking-engine">
                <Icon name="Plus" size={16} className="mr-2" />
                Book Another Space
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/space-discovery-center">
                <Icon name="Search" size={16} className="mr-2" />
                Explore Spaces
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/smart-dashboard-homepage">
                <Icon name="Home" size={16} className="mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;