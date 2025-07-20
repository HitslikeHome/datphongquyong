import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateTimeSelector = ({ selectedDate, selectedTime, onDateChange, onTimeChange, onNext }) => {
  const [viewMode, setViewMode] = useState('calendar'); // calendar or list

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isAvailable = Math.random() > 0.3; // Mock availability
        const popularity = Math.random();
        slots.push({ time, isAvailable, popularity });
      }
    }
    return slots;
  };

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getPopularityLabel = (popularity) => {
    if (popularity > 0.8) return 'High demand';
    if (popularity > 0.5) return 'Popular';
    return 'Available';
  };

  const getPopularityColor = (popularity) => {
    if (popularity > 0.8) return 'text-error';
    if (popularity > 0.5) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Select Date & Time</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose your preferred booking slot
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            <Icon name="Calendar" size={16} className="mr-2" />
            Calendar
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <Icon name="List" size={16} className="mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-medium text-foreground mb-4">Select Date</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => onDateChange(date)}
              className={`p-3 rounded-lg text-center transition-smooth border ${
                selectedDate && selectedDate.toDateString() === date.toDateString()
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background hover:bg-muted border-border'
              }`}
            >
              <div className="text-xs text-muted-foreground mb-1">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="font-medium">
                {date.getDate()}
              </div>
              {isToday(date) && (
                <div className="text-xs text-primary mt-1">Today</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">
              Available Times for {formatDate(selectedDate)}
            </h3>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-muted-foreground">Popular</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-muted-foreground">High demand</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 max-h-64 overflow-y-auto">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => slot.isAvailable && onTimeChange(slot.time)}
                disabled={!slot.isAvailable}
                className={`p-3 rounded-lg text-center transition-smooth border ${
                  selectedTime === slot.time
                    ? 'bg-primary text-primary-foreground border-primary'
                    : slot.isAvailable
                      ? 'bg-background hover:bg-muted border-border' :'bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50'
                }`}
              >
                <div className="font-medium text-sm">{slot.time}</div>
                {slot.isAvailable && (
                  <div className={`text-xs mt-1 ${getPopularityColor(slot.popularity)}`}>
                    {getPopularityLabel(slot.popularity)}
                  </div>
                )}
                {!slot.isAvailable && (
                  <div className="text-xs mt-1 text-muted-foreground">Booked</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Smart Suggestions */}
      {selectedDate && selectedTime && (
        <div className="bg-accent/5 rounded-xl border border-accent/20 p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Lightbulb" size={16} className="text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">Smart Suggestion</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your booking pattern, you typically prefer rooms with projectors for this time slot. 
                We'll prioritize these in the next step.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className="min-w-32"
        >
          Next Step
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DateTimeSelector;