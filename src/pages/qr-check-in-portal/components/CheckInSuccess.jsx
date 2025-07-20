import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CheckInSuccess = ({ bookingData, onNewCheckIn, onViewBookings }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showWifiDetails, setShowWifiDetails] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock space details
  const spaceDetails = {
    'LIB-301': {
      name: 'Library Study Room 301',
      floor: '3rd Floor',
      capacity: '6 people',
      amenities: ['Whiteboard', 'Projector', 'WiFi', 'Power Outlets'],
      wifi: { network: 'USTH-StudyRooms', password: 'Study2025!' },
      equipment: [
        'Projector remote on the table',
        'Whiteboard markers in drawer',
        'HDMI cable available'
      ],
      emergency: '+84 24 3791 7301'
    },
    'LAB-205': {
      name: 'Computer Lab 205',
      floor: '2nd Floor',
      capacity: '24 workstations',
      amenities: ['Computers', 'Printer', 'WiFi', 'Air Conditioning'],
      wifi: { network: 'USTH-Labs', password: 'Lab2025Secure!' },
      equipment: [
        'Login with your USTH credentials',
        'Printer code: LAB205',
        'Software list on desktop'
      ],
      emergency: '+84 24 3791 7302'
    },
    'CONF-101': {
      name: 'Conference Room 101',
      floor: '1st Floor',
      capacity: '12 people',
      amenities: ['Video Conferencing', 'Projector', 'WiFi', 'Coffee Machine'],
      wifi: { network: 'USTH-Conference', password: 'Conf2025!' },
      equipment: [
        'Video system remote on podium',
        'Coffee pods in cabinet',
        'Presentation clicker available'
      ],
      emergency: '+84 24 3791 7300'
    }
  };

  const space = spaceDetails[bookingData.spaceId] || spaceDetails['LIB-301'];
  const checkInTime = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-success to-success/80 rounded-xl p-6 text-white">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse-subtle">
            <Icon name="CheckCircle" size={32} color="white" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Check-In Successful!</h1>
          <p className="text-success-foreground/90">
            Welcome to {space.name}
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>Checked in at {checkInTime}</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>{space.floor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Booking Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Booking ID</p>
              <p className="text-sm font-mono text-foreground">{bookingData.bookingId}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Space</p>
              <p className="text-sm font-medium text-foreground">{space.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Capacity</p>
              <p className="text-sm text-foreground">{space.capacity}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</p>
              <p className="text-sm text-foreground">{bookingData.date}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</p>
              <p className="text-sm text-foreground">{bookingData.startTime} - {bookingData.endTime}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Space Information */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Space Information</h2>
        
        {/* Amenities */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Available Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {space.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                <Icon name="Check" size={14} className="text-success" />
                <span className="text-xs text-foreground">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WiFi Information */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">WiFi Access</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWifiDetails(!showWifiDetails)}
            >
              <Icon name={showWifiDetails ? "EyeOff" : "Eye"} size={14} className="mr-1" />
              {showWifiDetails ? 'Hide' : 'Show'}
            </Button>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Network</p>
                <p className="text-sm font-mono text-foreground">{space.wifi.network}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Password</p>
                <p className="text-sm font-mono text-foreground">
                  {showWifiDetails ? space.wifi.password : '••••••••••'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Guide */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Equipment Guide</h3>
          <div className="space-y-2">
            {space.equipment.map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon name="Info" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-error/5 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Phone" size={16} className="text-error" />
            <h3 className="text-sm font-medium text-error">Emergency Contact</h3>
          </div>
          <p className="text-sm font-mono text-foreground">{space.emergency}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Available 24/7 for technical support and emergencies
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" onClick={onViewBookings} fullWidth>
          <Icon name="BookOpen" size={16} className="mr-2" />
          My Bookings
        </Button>
        <Button variant="outline" onClick={onNewCheckIn} fullWidth>
          <Icon name="QrCode" size={16} className="mr-2" />
          New Check-In
        </Button>
        <Button variant="default" fullWidth>
          <Icon name="MessageSquare" size={16} className="mr-2" />
          Get Support
        </Button>
      </div>

      {/* Session Timer */}
      <div className="bg-muted rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Timer" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Session Active</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono text-foreground">{checkInTime}</p>
            <p className="text-xs text-muted-foreground">Until {bookingData.endTime}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-background rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: '25%' }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Remember to check out when leaving
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckInSuccess;