import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeSelector = ({ selectedRoom, selectedTime, onTimeChange, onDurationChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDuration, setSelectedDuration] = useState(60); // minutes

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30'
  ];

  const durationOptions = [
    { value: 30, label: '30 min' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
    { value: 180, label: '3 hours' },
    { value: 240, label: '4 hours' }
  ];

  const getSlotStatus = (time) => {
    // Mock availability logic
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 12 && hour <= 14) return 'booked'; // Lunch time busy
    if (hour >= 9 && hour <= 11) return 'limited'; // Morning popular
    return 'available';
  };

  const getSlotColor = (time, status) => {
    const isSelected = selectedTime === time;
    
    if (isSelected) {
      return 'bg-primary text-primary-foreground border-primary';
    }
    
    switch (status) {
      case 'available':
        return 'bg-success/10 text-success border-success/20 hover:bg-success/20';
      case 'limited':
        return 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20';
      case 'booked':
        return 'bg-error/10 text-error border-error/20 cursor-not-allowed opacity-50';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const handleTimeSelect = (time) => {
    const status = getSlotStatus(time);
    if (status !== 'booked') {
      onTimeChange(time);
    }
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
    onDurationChange(duration);
  };

  const getEndTime = (startTime, duration) => {
    if (!startTime) return '';
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMins = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg academic-shadow">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Select Time & Duration</h3>
            <p className="text-sm text-muted-foreground">
              {selectedRoom ? `Booking ${selectedRoom.name}` : 'Choose your preferred time slot'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} className="text-primary" />
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => navigateDate(-1)}
          />
          <div className="text-center">
            <h4 className="font-medium text-foreground">{formatDate(currentDate)}</h4>
            <p className="text-xs text-muted-foreground">
              {currentDate.toDateString() === new Date().toDateString() ? 'Today' : ''}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            onClick={() => navigateDate(1)}
          />
        </div>
      </div>

      {/* Duration Selection */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Duration</h4>
        <div className="flex flex-wrap gap-2">
          {durationOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleDurationChange(option.value)}
              className={`px-3 py-2 text-sm font-medium rounded-md border academic-transition ${
                selectedDuration === option.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-foreground">Available Time Slots</h4>
          {selectedTime && (
            <div className="text-sm text-muted-foreground">
              {selectedTime} - {getEndTime(selectedTime, selectedDuration)}
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {timeSlots.map((time) => {
            const status = getSlotStatus(time);
            return (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                disabled={status === 'booked'}
                className={`p-2 text-sm font-medium rounded-md border academic-transition ${getSlotColor(time, status)}`}
              >
                {time}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success/20 border border-success/40 rounded"></div>
            <span className="text-xs text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning/20 border border-warning/40 rounded"></div>
            <span className="text-xs text-muted-foreground">Limited</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error/20 border border-error/40 rounded"></div>
            <span className="text-xs text-muted-foreground">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary border border-primary rounded"></div>
            <span className="text-xs text-muted-foreground">Selected</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-muted/50 rounded-b-lg border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTimeSelect('09:00')}
            iconName="Sunrise"
            iconPosition="left"
          >
            Morning (9 AM)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTimeSelect('14:00')}
            iconName="Sun"
            iconPosition="left"
          >
            Afternoon (2 PM)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTimeSelect('18:00')}
            iconName="Sunset"
            iconPosition="left"
          >
            Evening (6 PM)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;