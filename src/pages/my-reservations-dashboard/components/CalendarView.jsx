import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const CalendarView = ({ reservations, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getBookingsForDate = (date) => {
    const dateStr = date.toDateString();
    return reservations.filter(reservation => 
      new Date(reservation.dateTime).toDateString() === dateStr
    );
  };

  const isToday = (date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const bookings = getBookingsForDate(date);
      const hasBookings = bookings.length > 0;

      days.push(
        <div
          key={day}
          onClick={() => onDateSelect(date)}
          className={`h-12 p-1 cursor-pointer rounded-lg transition-smooth relative ${
            isSelected(date)
              ? 'bg-primary text-primary-foreground'
              : isToday(date)
              ? 'bg-accent/10 text-accent border border-accent/20'
              : hasBookings
              ? 'bg-success/5 hover:bg-success/10' :'hover:bg-muted'
          }`}
        >
          <div className="text-sm font-medium">{day}</div>
          {hasBookings && (
            <div className="absolute bottom-1 left-1 right-1">
              <div className="flex space-x-0.5">
                {bookings.slice(0, 3).map((booking, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full ${
                      booking.status === 'confirmed' ? 'bg-primary' :
                      booking.status === 'pending'? 'bg-warning' : 'bg-muted-foreground'
                    }`}
                  ></div>
                ))}
                {bookings.length > 3 && (
                  <div className="text-xs text-muted-foreground">+{bookings.length - 3}</div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(-1)}
            iconName="ChevronLeft"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(1)}
            iconName="ChevronRight"
          />
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-2">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-1 bg-primary rounded-full"></div>
          <span className="text-muted-foreground">Confirmed</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-1 bg-warning rounded-full"></div>
          <span className="text-muted-foreground">Pending</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-1 bg-accent rounded-full"></div>
          <span className="text-muted-foreground">Today</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;