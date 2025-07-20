import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const BookingFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  viewMode, 
  onViewModeChange 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const buildingOptions = [
    { value: 'all', label: 'All Buildings' },
    { value: 'main-library', label: 'Main Library' },
    { value: 'science-center', label: 'Science Center' },
    { value: 'student-union', label: 'Student Union' },
    { value: 'engineering-hall', label: 'Engineering Hall' },
    { value: 'business-school', label: 'Business School' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'study-room', label: 'Study Rooms' },
    { value: 'meeting-room', label: 'Meeting Rooms' },
    { value: 'conference-room', label: 'Conference Rooms' },
    { value: 'lab', label: 'Labs' },
    { value: 'classroom', label: 'Classrooms' }
  ];

  const viewModes = [
    { id: 'list', icon: 'List', label: 'List View' },
    { id: 'calendar', icon: 'Calendar', label: 'Calendar View' },
    { id: 'timeline', icon: 'Clock', label: 'Timeline View' }
  ];

  const hasActiveFilters = filters.status !== 'all' || 
                          filters.building !== 'all' || 
                          filters.type !== 'all' || 
                          filters.search !== '';

  return (
    <div className="bg-card border border-border rounded-lg p-4 academic-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="flex-1 min-w-0">
            <Input
              type="search"
              placeholder="Search bookings, rooms, or purposes..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              options={statusOptions}
              value={filters.status}
              onChange={(value) => onFilterChange('status', value)}
              placeholder="Status"
              className="w-32"
            />
            
            <Select
              options={buildingOptions}
              value={filters.building}
              onChange={(value) => onFilterChange('building', value)}
              placeholder="Building"
              className="w-36"
            />
            
            <Select
              options={typeOptions}
              value={filters.type}
              onChange={(value) => onFilterChange('type', value)}
              placeholder="Type"
              className="w-32"
            />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted rounded-lg p-1">
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onViewModeChange(mode.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium academic-transition ${
                  viewMode === mode.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={mode.label}
              >
                <Icon name={mode.icon} size={16} />
                <span className="hidden sm:inline">{mode.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={onClearFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs font-medium text-muted-foreground">Active filters:</span>
          
          {filters.status !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
              Status: {statusOptions.find(opt => opt.value === filters.status)?.label}
              <button
                onClick={() => onFilterChange('status', 'all')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {filters.building !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent/10 text-accent">
              Building: {buildingOptions.find(opt => opt.value === filters.building)?.label}
              <button
                onClick={() => onFilterChange('building', 'all')}
                className="ml-1 hover:text-accent/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {filters.type !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
              Type: {typeOptions.find(opt => opt.value === filters.type)?.label}
              <button
                onClick={() => onFilterChange('type', 'all')}
                className="ml-1 hover:text-secondary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {filters.search && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-warning/10 text-warning">
              Search: "{filters.search}"
              <button
                onClick={() => onFilterChange('search', '')}
                className="ml-1 hover:text-warning/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingFilters;