import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ManualCheckIn = ({ onCheckInSuccess, onBack }) => {
  const [bookingId, setBookingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Mock booking data
  const mockBookings = [
    {
      id: 'BK-2025-001234',
      spaceId: 'LIB-301',
      spaceName: 'Library Study Room 301',
      startTime: '14:00',
      endTime: '16:00',
      date: '2025-01-20',
      status: 'confirmed'
    },
    {
      id: 'BK-2025-001235',
      spaceId: 'LAB-205',
      spaceName: 'Computer Lab 205',
      startTime: '15:30',
      endTime: '17:30',
      date: '2025-01-20',
      status: 'confirmed'
    },
    {
      id: 'BK-2025-001236',
      spaceId: 'CONF-101',
      spaceName: 'Conference Room 101',
      startTime: '13:00',
      endTime: '14:30',
      date: '2025-01-20',
      status: 'confirmed'
    }
  ];

  const handleBookingIdSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId.trim()) {
      setError('Please enter a booking ID');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const booking = mockBookings.find(b => 
        b.id.toLowerCase().includes(bookingId.toLowerCase())
      );

      if (booking) {
        onCheckInSuccess({
          bookingId: booking.id,
          spaceId: booking.spaceId,
          spaceName: booking.spaceName,
          startTime: booking.startTime,
          endTime: booking.endTime,
          date: booking.date
        });
      } else {
        setError('Booking not found. Please check your booking ID.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSearch = (value) => {
    setBookingId(value);
    setError('');
    
    if (value.length >= 2) {
      const results = mockBookings.filter(booking =>
        booking.id.toLowerCase().includes(value.toLowerCase()) ||
        booking.spaceName.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const selectBooking = (booking) => {
    setBookingId(booking.id);
    setSearchResults([]);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-card rounded-xl p-6 shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Manual Check-In</h2>
            <p className="text-sm text-muted-foreground">Enter your booking details</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleBookingIdSubmit} className="space-y-4">
          <div className="relative">
            <Input
              label="Booking ID or Space Name"
              type="text"
              placeholder="e.g., BK-2025-001234 or Library Study Room"
              value={bookingId}
              onChange={(e) => handleSearch(e.target.value)}
              error={error}
              required
              className="pr-12"
            />
            <div className="absolute right-3 top-9 text-muted-foreground">
              <Icon name="Search" size={16} />
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="bg-muted rounded-lg p-2 space-y-1">
              <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                Suggestions:
              </p>
              {searchResults.map((booking) => (
                <button
                  key={booking.id}
                  type="button"
                  onClick={() => selectBooking(booking)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-background transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{booking.id}</p>
                      <p className="text-xs text-muted-foreground">{booking.spaceName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-foreground">
                        {booking.startTime} - {booking.endTime}
                      </p>
                      <p className="text-xs text-muted-foreground">{booking.date}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            loading={isLoading}
            disabled={!bookingId.trim()}
          >
            <Icon name="LogIn" size={16} className="mr-2" />
            Check In
          </Button>
        </form>

        {/* Help Section */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="HelpCircle" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Need Help?</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Your booking ID can be found in your confirmation email or reservation dashboard.
              </p>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  • Format: BK-YYYY-XXXXXX
                </p>
                <p className="text-xs text-muted-foreground">
                  • Check your email for confirmation
                </p>
                <p className="text-xs text-muted-foreground">
                  • Visit "My Reservations" for booking details
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="BookOpen" size={14} className="mr-2" />
            My Bookings
          </Button>
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="Mail" size={14} className="mr-2" />
            Resend Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManualCheckIn;