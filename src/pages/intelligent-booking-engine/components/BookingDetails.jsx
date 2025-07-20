import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingDetails = ({ bookingData, onDetailsChange, onNext, onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    attendees: '',
    email: 'sarah.chen@usth.edu.vn',
    phone: '+84 123 456 789',
    department: 'Computer Science',
    purpose: 'academic',
    setupRequired: false,
    cateringRequired: false,
    recordingRequired: false,
    accessibilityNeeds: false,
    recurringBooking: false,
    recurringPattern: 'weekly',
    recurringEnd: '',
    specialRequests: '',
    emergencyContact: '',
    budgetCode: '',
    approvalRequired: false
  });

  const [errors, setErrors] = useState({});

  const purposeOptions = [
    { value: 'academic', label: 'Academic Session', icon: 'GraduationCap' },
    { value: 'meeting', label: 'Department Meeting', icon: 'Users' },
    { value: 'seminar', label: 'Seminar/Workshop', icon: 'Presentation' },
    { value: 'research', label: 'Research Discussion', icon: 'Search' },
    { value: 'thesis', label: 'Thesis Defense', icon: 'Award' },
    { value: 'conference', label: 'Conference Call', icon: 'Video' },
    { value: 'training', label: 'Training Session', icon: 'BookOpen' },
    { value: 'other', label: 'Other', icon: 'MoreHorizontal' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    onDetailsChange({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Booking title is required';
    }
    
    if (!formData.attendees.trim()) {
      newErrors.attendees = 'Number of attendees is required';
    } else if (isNaN(formData.attendees) || parseInt(formData.attendees) < 1) {
      newErrors.attendees = 'Please enter a valid number of attendees';
    } else if (parseInt(formData.attendees) > bookingData.selectedSpace?.capacity) {
      newErrors.attendees = `Maximum capacity is ${bookingData.selectedSpace?.capacity} people`;
    }

    if (formData.recurringBooking && !formData.recurringEnd) {
      newErrors.recurringEnd = 'End date is required for recurring bookings';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const estimatedCost = () => {
    let baseCost = 0;
    if (bookingData.selectedSpace?.type === 'lecture') baseCost = 50;
    else if (bookingData.selectedSpace?.type === 'lab') baseCost = 75;
    else if (bookingData.selectedSpace?.type === 'seminar') baseCost = 100;
    else baseCost = 25;

    let additionalCost = 0;
    if (formData.setupRequired) additionalCost += 20;
    if (formData.cateringRequired) additionalCost += 15;
    if (formData.recordingRequired) additionalCost += 30;

    return baseCost + additionalCost;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">Booking Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provide additional information for your booking
        </p>
      </div>

      {/* Booking Summary */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="font-medium text-foreground mb-3">Booking Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium text-foreground">
              {bookingData.selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium text-foreground">{bookingData.selectedTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-muted-foreground">Space:</span>
            <span className="font-medium text-foreground">{bookingData.selectedSpace?.name}</span>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-medium text-foreground mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Booking Title"
            type="text"
            placeholder="e.g., CS Department Meeting"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={errors.title}
            required
          />
          <Input
            label="Expected Attendees"
            type="number"
            placeholder="Number of people"
            value={formData.attendees}
            onChange={(e) => handleInputChange('attendees', e.target.value)}
            error={errors.attendees}
            required
          />
        </div>
        
        <div className="mt-4">
          <Input
            label="Description"
            type="text"
            placeholder="Brief description of your event or meeting"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        {/* Purpose Selection */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-foreground mb-3">Purpose</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {purposeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleInputChange('purpose', option.value)}
                className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium transition-smooth border ${
                  formData.purpose === option.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={option.icon} size={14} />
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-medium text-foreground mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
          <Input
            label="Department"
            type="text"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
          />
          <Input
            label="Emergency Contact"
            type="text"
            placeholder="Name and phone number"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
          />
        </div>
      </div>

      {/* Additional Services */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-medium text-foreground mb-4">Additional Services</h3>
        <div className="space-y-3">
          <Checkbox
            label="Setup Assistance Required"
            description="Need help setting up equipment or furniture arrangement"
            checked={formData.setupRequired}
            onChange={(e) => handleInputChange('setupRequired', e.target.checked)}
          />
          <Checkbox
            label="Catering Services"
            description="Request refreshments or meals for your event"
            checked={formData.cateringRequired}
            onChange={(e) => handleInputChange('cateringRequired', e.target.checked)}
          />
          <Checkbox
            label="Recording Equipment"
            description="Need video/audio recording capabilities"
            checked={formData.recordingRequired}
            onChange={(e) => handleInputChange('recordingRequired', e.target.checked)}
          />
          <Checkbox
            label="Accessibility Accommodations"
            description="Special accessibility needs or accommodations"
            checked={formData.accessibilityNeeds}
            onChange={(e) => handleInputChange('accessibilityNeeds', e.target.checked)}
          />
        </div>
      </div>

      {/* Recurring Booking */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-medium text-foreground mb-4">Recurring Booking</h3>
        <Checkbox
          label="Make this a recurring booking"
          description="Book the same space at regular intervals"
          checked={formData.recurringBooking}
          onChange={(e) => handleInputChange('recurringBooking', e.target.checked)}
        />
        
        {formData.recurringBooking && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Repeat Pattern</label>
              <div className="flex space-x-2">
                {['weekly', 'biweekly', 'monthly'].map((pattern) => (
                  <button
                    key={pattern}
                    onClick={() => handleInputChange('recurringPattern', pattern)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth border ${
                      formData.recurringPattern === pattern
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted border-border'
                    }`}
                  >
                    {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="End Date"
              type="date"
              value={formData.recurringEnd}
              onChange={(e) => handleInputChange('recurringEnd', e.target.value)}
              error={errors.recurringEnd}
            />
          </div>
        )}
      </div>

      {/* Special Requests */}
      <div className="bg-card rounded-xl border border-border p-6">
        <Input
          label="Special Requests"
          type="text"
          placeholder="Any additional requirements or special requests"
          value={formData.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
        />
      </div>

      {/* Cost Estimate */}
      <div className="bg-success/5 rounded-xl border border-success/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={16} className="text-success" />
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">Estimated Cost</h4>
              <p className="text-sm text-muted-foreground">Based on selected services</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-success">${estimatedCost()}</div>
            <div className="text-xs text-muted-foreground">per session</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} className="min-w-32">
          Review Booking
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BookingDetails;