import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import BookingSteps from './components/BookingSteps';
import DateTimeSelector from './components/DateTimeSelector';
import SpaceTypeSelector from './components/SpaceTypeSelector';
import BookingDetails from './components/BookingDetails';
import BookingConfirmation from './components/BookingConfirmation';
import BookingSuccess from './components/BookingSuccess';

const IntelligentBookingEngine = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    selectedDate: null,
    selectedTime: null,
    selectedSpace: null,
    details: null
  });
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleDateTimeNext = () => {
    setCurrentStep(2);
  };

  const handleDateChange = (date) => {
    setBookingData(prev => ({ ...prev, selectedDate: date }));
  };

  const handleTimeChange = (time) => {
    setBookingData(prev => ({ ...prev, selectedTime: time }));
  };

  const handleSpaceSelect = (space) => {
    setBookingData(prev => ({ ...prev, selectedSpace: space }));
  };

  const handleSpaceNext = () => {
    setCurrentStep(3);
  };

  const handleSpaceBack = () => {
    setCurrentStep(1);
  };

  const handleDetailsChange = (details) => {
    setBookingData(prev => ({ ...prev, details }));
  };

  const handleDetailsNext = () => {
    setCurrentStep(4);
  };

  const handleDetailsBack = () => {
    setCurrentStep(2);
  };

  const handleConfirmationBack = () => {
    setCurrentStep(3);
  };

  const handleBookingConfirm = (confirmedData) => {
    setConfirmedBooking(confirmedData);
    setIsBookingComplete(true);
  };

  // If booking is complete, show success page
  if (isBookingComplete && confirmedBooking) {
    return <BookingSuccess bookingData={confirmedBooking} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Intelligent Booking Engine
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reserve your perfect space with our smart booking system that learns from your preferences 
              and prevents conflicts in real-time.
            </p>
          </div>

          {/* Booking Steps */}
          <BookingSteps 
            currentStep={currentStep} 
            onStepClick={handleStepClick} 
          />

          {/* Step Content */}
          <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
            {currentStep === 1 && (
              <DateTimeSelector
                selectedDate={bookingData.selectedDate}
                selectedTime={bookingData.selectedTime}
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
                onNext={handleDateTimeNext}
              />
            )}

            {currentStep === 2 && (
              <SpaceTypeSelector
                selectedSpace={bookingData.selectedSpace}
                onSpaceSelect={handleSpaceSelect}
                onNext={handleSpaceNext}
                onBack={handleSpaceBack}
              />
            )}

            {currentStep === 3 && (
              <BookingDetails
                bookingData={bookingData}
                onDetailsChange={handleDetailsChange}
                onNext={handleDetailsNext}
                onBack={handleDetailsBack}
              />
            )}

            {currentStep === 4 && (
              <BookingConfirmation
                bookingData={bookingData}
                onConfirm={handleBookingConfirm}
                onBack={handleConfirmationBack}
              />
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <div className="bg-muted/50 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our intelligent booking system is designed to be intuitive, but we're here if you need assistance.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="text-muted-foreground">📞 Support: +84 123 456 789</span>
                <span className="text-muted-foreground">✉️ help@usth.edu.vn</span>
                <span className="text-muted-foreground">💬 Live Chat Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligentBookingEngine;