import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingConfirmation = ({ selectedRoom, selectedTime, duration, onConfirm, onBack }) => {
  const [bookingDetails, setBookingDetails] = useState({
    purpose: '',
    attendees: 1,
    notes: '',
    addToCalendar: true,
    sendReminder: true,
    shareWithGroup: false,
    groupEmails: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getEndTime = (startTime, durationMinutes) => {
    if (!startTime) return '';
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const endHours = Math.floor(totalMinutes / 60);
    const endMins = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (field, value) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const bookingData = {
        room: selectedRoom,
        time: selectedTime,
        endTime: getEndTime(selectedTime, duration),
        duration,
        details: bookingDetails,
        bookingId: `BK${Date.now()}`,
        status: 'confirmed'
      };
      
      onConfirm(bookingData);
      setIsSubmitting(false);
    }, 2000);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} minutes`;
    if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours}h ${mins}m`;
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!selectedRoom || !selectedTime) {
    return (
      <div className="bg-card border border-border rounded-lg academic-shadow p-8 text-center">
        <Icon name="AlertCircle" size={48} className="text-warning mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Incomplete Selection</h3>
        <p className="text-muted-foreground mb-4">Please select both a room and time slot to continue.</p>
        <Button variant="outline" onClick={onBack} iconName="ArrowLeft" iconPosition="left">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg academic-shadow">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Confirm Your Booking</h3>
            <p className="text-muted-foreground">Review details and complete your reservation</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="p-6 border-b border-border">
        <h4 className="font-semibold text-foreground mb-4">Booking Summary</h4>
        
        <div className="flex space-x-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h5 className="font-medium text-foreground">{selectedRoom.name}</h5>
            <p className="text-sm text-muted-foreground mb-2">{selectedRoom.location}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-2 font-medium text-foreground">{getCurrentDate()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Time:</span>
                <span className="ml-2 font-medium text-foreground">
                  {selectedTime} - {getEndTime(selectedTime, duration)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <span className="ml-2 font-medium text-foreground">{formatDuration(duration)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Capacity:</span>
                <span className="ml-2 font-medium text-foreground">{selectedRoom.capacity} people</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-4">
          <h6 className="text-sm font-medium text-foreground mb-2">Included Amenities</h6>
          <div className="flex flex-wrap gap-2">
            {selectedRoom.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-1 text-xs bg-success/10 text-success rounded-md border border-success/20"
              >
                {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Details Form */}
      <div className="p-6 border-b border-border space-y-4">
        <h4 className="font-semibold text-foreground">Booking Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Purpose of Booking"
            placeholder="e.g., Team meeting, Study session"
            value={bookingDetails.purpose}
            onChange={(e) => handleInputChange('purpose', e.target.value)}
            required
          />
          
          <Input
            label="Number of Attendees"
            type="number"
            min="1"
            max={selectedRoom.capacity}
            value={bookingDetails.attendees}
            onChange={(e) => handleInputChange('attendees', parseInt(e.target.value))}
            required
          />
        </div>
        
        <Input
          label="Additional Notes"
          placeholder="Any special requirements or notes..."
          value={bookingDetails.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
        />
      </div>

      {/* Options */}
      <div className="p-6 border-b border-border space-y-4">
        <h4 className="font-semibold text-foreground">Booking Options</h4>
        
        <div className="space-y-3">
          <Checkbox
            label="Add to my calendar"
            description="Automatically add this booking to your calendar"
            checked={bookingDetails.addToCalendar}
            onChange={(e) => handleInputChange('addToCalendar', e.target.checked)}
          />
          
          <Checkbox
            label="Send reminder notifications"
            description="Get notified 15 minutes before your booking"
            checked={bookingDetails.sendReminder}
            onChange={(e) => handleInputChange('sendReminder', e.target.checked)}
          />
          
          <Checkbox
            label="Share with group members"
            description="Send booking details to other attendees"
            checked={bookingDetails.shareWithGroup}
            onChange={(e) => handleInputChange('shareWithGroup', e.target.checked)}
          />
        </div>
        
        {bookingDetails.shareWithGroup && (
          <Input
            label="Group Member Emails"
            placeholder="Enter email addresses separated by commas"
            value={bookingDetails.groupEmails}
            onChange={(e) => handleInputChange('groupEmails', e.target.value)}
            description="We'll send booking details to these email addresses"
          />
        )}
      </div>

      {/* Important Information */}
      <div className="p-6 border-b border-border">
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-medium text-warning mb-2">Important Information</h5>
              <ul className="text-sm text-warning/80 space-y-1">
                <li>• Please arrive on time. Late arrivals may result in booking cancellation.</li>
                <li>• Room access will be available 5 minutes before your booking time.</li>
                <li>• Cancellations must be made at least 30 minutes in advance.</li>
                <li>• Keep the room clean and report any issues to facilities.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6">
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
            disabled={isSubmitting}
          >
            Back to Selection
          </Button>
          
          <Button
            variant="default"
            onClick={handleConfirmBooking}
            loading={isSubmitting}
            iconName="Check"
            iconPosition="left"
            fullWidth
          >
            {isSubmitting ? 'Confirming Booking...' : 'Confirm Booking'}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3 text-center">
          By confirming this booking, you agree to our room usage policies and terms of service.
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;