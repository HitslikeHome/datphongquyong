import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const BookingCalendar = ({ bookings, onBookingClick, onDateChange, currentDate }) => {
  const [viewType, setViewType] = useState('month'); // month, week, day

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getBookingsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toDateString();
    return bookings.filter(booking => 
      new Date(booking.startTime).toDateString() === dateStr
    );
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    onDateChange(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    onDateChange(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    onDateChange(newDate);
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'upcoming': return 'bg-accent text-accent-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      case 'cancelled': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day, index) => {
          const dayBookings = day ? getBookingsForDate(day) : [];
          const isToday = day && day.toDateString() === new Date().toDateString();
          const isCurrentMonth = day && day.getMonth() === currentDate.getMonth();
          
          return (
            <div
              key={index}
              className={`min-h-[80px] p-1 border border-border rounded-md ${
                isCurrentMonth ? 'bg-card' : 'bg-muted/30'
              } ${isToday ? 'ring-2 ring-primary' : ''}`}
            >
              {day && (
                <>
                  <div className={`text-xs font-medium mb-1 ${
                    isToday ? 'text-primary' : 'text-foreground'
                  }`}>
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayBookings.slice(0, 2).map(booking => (
                      <button
                        key={booking.id}
                        onClick={() => onBookingClick(booking)}
                        className={`w-full text-left p-1 rounded text-xs truncate academic-transition hover:opacity-80 ${getStatusColor(booking.status)}`}
                      >
                        {formatTime(booking.startTime)} {booking.room.name}
                      </button>
                    ))}
                    {dayBookings.length > 2 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{dayBookings.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="grid grid-cols-8 gap-1">
        {/* Time column header */}
        <div className="p-2 text-center text-xs font-medium text-muted-foreground">
          Time
        </div>
        
        {/* Day headers */}
        {weekDays.map(day => (
          <div key={day.toISOString()} className="p-2 text-center">
            <div className="text-xs font-medium text-muted-foreground">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className={`text-sm font-semibold ${
              day.toDateString() === new Date().toDateString() ? 'text-primary' : 'text-foreground'
            }`}>
              {day.getDate()}
            </div>
          </div>
        ))}
        
        {/* Time slots */}
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <div className="p-2 text-xs text-muted-foreground text-right border-r border-border">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
            {weekDays.map(day => {
              const dayBookings = getBookingsForDate(day).filter(booking => {
                const bookingHour = new Date(booking.startTime).getHours();
                return bookingHour === hour;
              });
              
              return (
                <div key={`${day.toISOString()}-${hour}`} className="min-h-[40px] p-1 border-b border-border">
                  {dayBookings.map(booking => (
                    <button
                      key={booking.id}
                      onClick={() => onBookingClick(booking)}
                      className={`w-full text-left p-1 rounded text-xs truncate mb-1 academic-transition hover:opacity-80 ${getStatusColor(booking.status)}`}
                    >
                      {booking.room.name}
                    </button>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayBookings = getBookingsForDate(currentDate);

    return (
      <div className="space-y-1">
        {hours.map(hour => {
          const hourBookings = dayBookings.filter(booking => {
            const bookingHour = new Date(booking.startTime).getHours();
            return bookingHour === hour;
          });

          return (
            <div key={hour} className="flex items-start space-x-4 min-h-[60px] p-3 border border-border rounded-lg">
              <div className="w-16 text-sm font-medium text-muted-foreground text-right">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              <div className="flex-1 space-y-2">
                {hourBookings.map(booking => (
                  <button
                    key={booking.id}
                    onClick={() => onBookingClick(booking)}
                    className={`w-full text-left p-3 rounded-lg academic-transition hover:opacity-80 ${getStatusColor(booking.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{booking.room.name}</div>
                        <div className="text-sm opacity-80">
                          {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                        </div>
                      </div>
                      <div className="text-sm opacity-80">
                        {booking.attendees} attendees
                      </div>
                    </div>
                  </button>
                ))}
                {hourBookings.length === 0 && (
                  <div className="text-sm text-muted-foreground italic">No bookings</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg academic-shadow">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-foreground">
            {viewType === 'month' && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            {viewType === 'week' && `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
            {viewType === 'day' && currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => {
                if (viewType === 'month') navigateMonth(-1);
                else if (viewType === 'week') navigateWeek(-1);
                else navigateDay(-1);
              }}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDateChange(new Date())}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronRight"
              onClick={() => {
                if (viewType === 'month') navigateMonth(1);
                else if (viewType === 'week') navigateWeek(1);
                else navigateDay(1);
              }}
            />
          </div>
        </div>

        {/* View Type Toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          {['month', 'week', 'day'].map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium academic-transition capitalize ${
                viewType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Content */}
      <div className="p-4">
        {viewType === 'month' && renderMonthView()}
        {viewType === 'week' && renderWeekView()}
        {viewType === 'day' && renderDayView()}
      </div>
    </div>
  );
};

export default BookingCalendar;