import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookingConfirmation = ({ bookingData, onConfirm, onBack }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    // Generate booking ID and QR code
    const id = `USTH-${Date.now().toString().slice(-6)}`;
    setBookingId(id);
    
    // Mock QR code URL (in real app, this would be generated server-side)
    const qrData = `https://seatsync.usth.edu.vn/checkin/${id}`;
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`);
  }, []);

  const handleConfirm = async () => {
    setIsConfirming(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConfirming(false);
    onConfirm({
      ...bookingData,
      bookingId,
      qrCode,
      status: 'confirmed',
      createdAt: new Date()
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateDuration = () => {
    // Assuming 1-hour duration for simplicity
    const startTime = bookingData.selectedTime;
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + 1;
    const endTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return `${startTime} - ${endTime}`;
  };

  const estimatedCost = () => {
    let baseCost = 0;
    if (bookingData.selectedSpace?.type === 'lecture') baseCost = 50;
    else if (bookingData.selectedSpace?.type === 'lab') baseCost = 75;
    else if (bookingData.selectedSpace?.type === 'seminar') baseCost = 100;
    else baseCost = 25;

    let additionalCost = 0;
    if (bookingData.details?.setupRequired) additionalCost += 20;
    if (bookingData.details?.cateringRequired) additionalCost += 15;
    if (bookingData.details?.recordingRequired) additionalCost += 30;

    return baseCost + additionalCost;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Review Your Booking</h2>
        <p className="text-muted-foreground mt-2">
          Please review all details before confirming your reservation
        </p>
      </div>

      {/* Booking Summary Card */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="relative">
          <Image
            src={bookingData.selectedSpace?.image}
            alt={bookingData.selectedSpace?.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold">{bookingData.selectedSpace?.name}</h3>
            <p className="text-sm opacity-90">
              {bookingData.selectedSpace?.building} • {bookingData.selectedSpace?.floor}
            </p>
          </div>
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-foreground">
              Booking ID: {bookingId}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">Date</div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(bookingData.selectedDate)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">Time</div>
                <div className="text-sm text-muted-foreground">
                  {calculateDuration()}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="border-t border-border pt-6">
            <h4 className="font-medium text-foreground mb-4">Booking Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Title:</span>
                <span className="ml-2 font-medium text-foreground">
                  {bookingData.details?.title || 'Untitled Booking'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Attendees:</span>
                <span className="ml-2 font-medium text-foreground">
                  {bookingData.details?.attendees || 1} people
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Purpose:</span>
                <span className="ml-2 font-medium text-foreground capitalize">
                  {bookingData.details?.purpose || 'General'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Department:</span>
                <span className="ml-2 font-medium text-foreground">
                  {bookingData.details?.department || 'Computer Science'}
                </span>
              </div>
            </div>
            
            {bookingData.details?.description && (
              <div className="mt-4">
                <span className="text-muted-foreground text-sm">Description:</span>
                <p className="mt-1 text-sm text-foreground">
                  {bookingData.details.description}
                </p>
              </div>
            )}
          </div>

          {/* Additional Services */}
          {(bookingData.details?.setupRequired || bookingData.details?.cateringRequired || bookingData.details?.recordingRequired) && (
            <div className="border-t border-border pt-6 mt-6">
              <h4 className="font-medium text-foreground mb-4">Additional Services</h4>
              <div className="space-y-2">
                {bookingData.details?.setupRequired && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Settings" size={16} className="text-success" />
                    <span className="text-foreground">Setup Assistance (+$20)</span>
                  </div>
                )}
                {bookingData.details?.cateringRequired && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Coffee" size={16} className="text-success" />
                    <span className="text-foreground">Catering Services (+$15)</span>
                  </div>
                )}
                {bookingData.details?.recordingRequired && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Video" size={16} className="text-success" />
                    <span className="text-foreground">Recording Equipment (+$30)</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          <div className="border-t border-border pt-6 mt-6">
            <h4 className="font-medium text-foreground mb-4">Available Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {bookingData.selectedSpace?.amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-success/10 text-success text-sm rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QR Code & Cost */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Code */}
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <h4 className="font-medium text-foreground mb-4">Your Check-in QR Code</h4>
          <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
            <Image
              src={qrCode}
              alt="Booking QR Code"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Use this QR code to check in on the day of your booking
          </p>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h4 className="font-medium text-foreground mb-4">Cost Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Rate</span>
              <span className="font-medium text-foreground">
                ${bookingData.selectedSpace?.type === 'lecture' ? 50 : 
                  bookingData.selectedSpace?.type === 'lab' ? 75 :
                  bookingData.selectedSpace?.type === 'seminar' ? 100 : 25}
              </span>
            </div>
            {bookingData.details?.setupRequired && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Setup Assistance</span>
                <span className="font-medium text-foreground">$20</span>
              </div>
            )}
            {bookingData.details?.cateringRequired && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Catering</span>
                <span className="font-medium text-foreground">$15</span>
              </div>
            )}
            {bookingData.details?.recordingRequired && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Recording</span>
                <span className="font-medium text-foreground">$30</span>
              </div>
            )}
            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-semibold text-lg text-success">${estimatedCost()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-warning/5 rounded-xl border border-warning/20 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">Important Notes</h4>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Please arrive 10 minutes before your scheduled time</li>
              <li>• Use the QR code to check in at the room entrance</li>
              <li>• Cancellations must be made at least 2 hours in advance</li>
              <li>• Additional charges may apply for overtime usage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isConfirming}>
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Back to Details
        </Button>
        <Button 
          onClick={handleConfirm} 
          loading={isConfirming}
          className="min-w-40"
        >
          {isConfirming ? 'Confirming...' : 'Confirm Booking'}
          {!isConfirming && <Icon name="Check" size={16} className="ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;