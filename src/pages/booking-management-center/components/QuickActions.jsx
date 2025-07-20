import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickActions = ({ onQuickBook, onBulkAction, selectedBookings }) => {
  const [quickBookForm, setQuickBookForm] = useState({
    roomType: '',
    duration: '1',
    startTime: '',
    date: new Date().toISOString().split('T')[0]
  });

  const roomTypeOptions = [
    { value: 'study-room', label: 'Study Room' },
    { value: 'meeting-room', label: 'Meeting Room' },
    { value: 'conference-room', label: 'Conference Room' },
    { value: 'lab', label: 'Lab' },
    { value: 'classroom', label: 'Classroom' }
  ];

  const durationOptions = [
    { value: '0.5', label: '30 minutes' },
    { value: '1', label: '1 hour' },
    { value: '1.5', label: '1.5 hours' },
    { value: '2', label: '2 hours' },
    { value: '3', label: '3 hours' },
    { value: '4', label: '4 hours' }
  ];

  const bulkActions = [
    { id: 'cancel', label: 'Cancel Selected', icon: 'X', variant: 'destructive' },
    { id: 'modify', label: 'Modify Time', icon: 'Edit', variant: 'outline' },
    { id: 'extend', label: 'Extend Duration', icon: 'Plus', variant: 'outline' },
    { id: 'share', label: 'Share Bookings', icon: 'Share2', variant: 'outline' },
    { id: 'export', label: 'Export Details', icon: 'Download', variant: 'outline' }
  ];

  const handleQuickBookSubmit = (e) => {
    e.preventDefault();
    if (quickBookForm.roomType && quickBookForm.startTime) {
      onQuickBook(quickBookForm);
      setQuickBookForm({
        roomType: '',
        duration: '1',
        startTime: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleBulkAction = (actionId) => {
    if (selectedBookings.length > 0) {
      onBulkAction(actionId, selectedBookings);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Book Section */}
      <div className="bg-card border border-border rounded-lg p-4 academic-shadow">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Icon name="Zap" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Quick Book</h3>
        </div>
        
        <form onSubmit={handleQuickBookSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Room Type"
              options={roomTypeOptions}
              value={quickBookForm.roomType}
              onChange={(value) => setQuickBookForm(prev => ({ ...prev, roomType: value }))}
              placeholder="Select room type"
              required
            />
            
            <Select
              label="Duration"
              options={durationOptions}
              value={quickBookForm.duration}
              onChange={(value) => setQuickBookForm(prev => ({ ...prev, duration: value }))}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={quickBookForm.date}
              onChange={(e) => setQuickBookForm(prev => ({ ...prev, date: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            
            <Input
              label="Start Time"
              type="time"
              value={quickBookForm.startTime}
              onChange={(e) => setQuickBookForm(prev => ({ ...prev, startTime: e.target.value }))}
              required
            />
          </div>
          
          <Button
            type="submit"
            variant="default"
            iconName="Search"
            iconPosition="left"
            fullWidth
          >
            Find Available Rooms
          </Button>
        </form>
      </div>

      {/* Bulk Actions Section */}
      {selectedBookings.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 academic-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 text-accent rounded-lg">
                <Icon name="CheckSquare" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Bulk Actions ({selectedBookings.length} selected)
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => onBulkAction('clear', [])}
            >
              Clear Selection
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {bulkActions.map(action => (
              <Button
                key={action.id}
                variant={action.variant}
                size="sm"
                iconName={action.icon}
                iconPosition="left"
                onClick={() => handleBulkAction(action.id)}
                fullWidth
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-card border border-border rounded-lg p-4 academic-shadow">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-success/10 text-success rounded-lg">
            <Icon name="Activity" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">247</div>
            <div className="text-xs text-muted-foreground">Available Now</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">12</div>
            <div className="text-xs text-muted-foreground">Active Bookings</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent mb-1">8</div>
            <div className="text-xs text-muted-foreground">Upcoming Today</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-warning mb-1">3</div>
            <div className="text-xs text-muted-foreground">Need Check-in</div>
          </div>
        </div>
      </div>

      {/* Recent Templates */}
      <div className="bg-card border border-border rounded-lg p-4 academic-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-institutional/10 text-institutional rounded-lg">
              <Icon name="Bookmark" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Booking Templates</h3>
          </div>
          <Button variant="ghost" size="sm" iconName="Plus">
            Create Template
          </Button>
        </div>
        
        <div className="space-y-2">
          {[
            { name: 'Weekly Study Session', room: 'Study Room A-201', time: 'Mon 2:00 PM - 4:00 PM' },
            { name: 'Team Meeting', room: 'Conference Room B-105', time: 'Fri 10:00 AM - 11:00 AM' },
            { name: 'Lab Work', room: 'Computer Lab C-301', time: 'Wed 3:00 PM - 5:00 PM' }
          ].map((template, index) => (
            <button
              key={index}
              className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/30 academic-transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground text-sm">{template.name}</div>
                  <div className="text-xs text-muted-foreground">{template.room} • {template.time}</div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;