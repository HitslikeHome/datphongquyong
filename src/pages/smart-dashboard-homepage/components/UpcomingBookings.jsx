import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      spaceName: "CS Lab 2",
      spaceType: "Computer Lab", 
      building: "Science Block",
      date: "Today",
      time: "2:00 PM - 4:00 PM",
      status: "confirmed",
      attendees: 25,
      purpose: "Advanced Algorithms Lecture",
      qrCode: "QR_CS_LAB_2_20250720_1400",
      canModify: true,
      checkInStatus: "pending"
    },
    {
      id: 2,
      spaceName: "Study Room A",
      spaceType: "Group Study",
      building: "Main Library",
      date: "Tomorrow", 
      time: "10:00 AM - 12:00 PM",
      status: "confirmed",
      attendees: 6,
      purpose: "Research Team Meeting",
      qrCode: "QR_STUDY_A_20250721_1000",
      canModify: true,
      checkInStatus: "pending"
    },
    {
      id: 3,
      spaceName: "Conference Room B",
      spaceType: "Meeting Room",
      building: "Admin Building",
      date: "Jul 22",
      time: "3:00 PM - 5:00 PM",
      status: "pending",
      attendees: 8,
      purpose: "Department Review",
      qrCode: "QR_CONF_B_20250722_1500",
      canModify: true,
      checkInStatus: "pending"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'cancelled': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'cancelled': return 'XCircle';
      default: return 'Circle';
    }
  };

  const handleModifyBooking = (bookingId) => {
    // In a real app, this would open a modification modal
    console.log('Modifying booking:', bookingId);
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
  };

  const handleCheckIn = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, checkInStatus: 'checked-in' }
        : booking
    ));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Upcoming Bookings</h2>
          <p className="text-sm text-muted-foreground">Your scheduled reservations</p>
        </div>
        <Link 
          to="/my-reservations-dashboard"
          className="text-sm text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
        >
          <span>View All</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-foreground">{booking.spaceName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
                    <Icon name={getStatusIcon(booking.status)} size={12} />
                    <span className="capitalize">{booking.status}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{booking.building}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{booking.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Users" size={14} />
                    <span>{booking.attendees} attendees</span>
                  </div>
                  <div className="text-foreground font-medium">{booking.purpose}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {booking.date === 'Today' && booking.status === 'confirmed' && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleCheckIn(booking.id)}
                    iconName="QrCode"
                    iconPosition="left"
                  >
                    Check In
                  </Button>
                )}
                
                {booking.canModify && booking.status !== 'cancelled' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleModifyBooking(booking.id)}
                    iconName="Edit"
                    iconPosition="left"
                  >
                    Modify
                  </Button>
                )}
                
                {booking.status !== 'cancelled' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCancelBooking(booking.id)}
                    iconName="X"
                  >
                  </Button>
                )}
              </div>
            </div>
            
            {booking.date === 'Today' && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Smartphone" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">QR Code: {booking.qrCode}</span>
                  </div>
                  <Link 
                    to="/qr-check-in-portal"
                    className="text-sm text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
                  >
                    <span>Open Scanner</span>
                    <Icon name="ExternalLink" size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No upcoming bookings</h3>
          <p className="text-muted-foreground mb-4">Ready to reserve your perfect space?</p>
          <Link to="/intelligent-booking-engine">
            <Button variant="default" iconName="Plus" iconPosition="left">
              Book a Space
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingBookings;