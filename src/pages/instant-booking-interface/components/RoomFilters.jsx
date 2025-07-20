import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoomFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const capacityOptions = [
    { value: '1-5', label: '1-5 people' },
    { value: '6-10', label: '6-10 people' },
    { value: '11-20', label: '11-20 people' },
    { value: '21-50', label: '21-50 people' },
    { value: '50+', label: '50+ people' }
  ];

  const buildingOptions = [
    { value: 'main', label: 'Main Building' },
    { value: 'library', label: 'Library Complex' },
    { value: 'science', label: 'Science Block' },
    { value: 'engineering', label: 'Engineering Wing' },
    { value: 'business', label: 'Business School' }
  ];

  const roomTypeOptions = [
    { value: 'study', label: 'Study Rooms' },
    { value: 'conference', label: 'Conference Rooms' },
    { value: 'computer', label: 'Computer Labs' },
    { value: 'presentation', label: 'Presentation Halls' },
    { value: 'group', label: 'Group Study Areas' }
  ];

  const amenityOptions = [
    { id: 'whiteboard', label: 'Whiteboard' },
    { id: 'projector', label: 'Projector' },
    { id: 'computer', label: 'Computers' },
    { id: 'wifi', label: 'High-Speed WiFi' },
    { id: 'power', label: 'Power Outlets' },
    { id: 'ac', label: 'Air Conditioning' },
    { id: 'video', label: 'Video Conferencing' },
    { id: 'printer', label: 'Printer Access' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleAmenityChange = (amenityId, checked) => {
    const updatedAmenities = checked
      ? [...filters.amenities, amenityId]
      : filters.amenities.filter(id => id !== amenityId);
    
    handleFilterChange('amenities', updatedAmenities);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.capacity) count++;
    if (filters.building) count++;
    if (filters.roomType) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.searchQuery) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg academic-shadow">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Smart Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {getActiveFiltersCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search rooms..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="w-full"
          />
          
          <Select
            placeholder="Capacity"
            options={capacityOptions}
            value={filters.capacity}
            onChange={(value) => handleFilterChange('capacity', value)}
          />
          
          <Select
            placeholder="Building"
            options={buildingOptions}
            value={filters.building}
            onChange={(value) => handleFilterChange('building', value)}
          />
          
          <Select
            placeholder="Room Type"
            options={roomTypeOptions}
            value={filters.roomType}
            onChange={(value) => handleFilterChange('roomType', value)}
          />
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="pt-4 border-t border-border space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Required Amenities</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenityOptions.map((amenity) => (
                  <Checkbox
                    key={amenity.id}
                    label={amenity.label}
                    checked={filters.amenities.includes(amenity.id)}
                    onChange={(e) => handleAmenityChange(amenity.id, e.target.checked)}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Available From
                </label>
                <Input
                  type="time"
                  value={filters.timeFrom}
                  onChange={(e) => handleFilterChange('timeFrom', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Available Until
                </label>
                <Input
                  type="time"
                  value={filters.timeTo}
                  onChange={(e) => handleFilterChange('timeTo', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date
                </label>
                <Input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('roomType', 'study')}
            iconName="BookOpen"
            iconPosition="left"
          >
            Study Rooms
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('capacity', '6-10')}
            iconName="Users"
            iconPosition="left"
          >
            Small Groups
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('amenities', ['projector', 'whiteboard'])}
            iconName="Presentation"
            iconPosition="left"
          >
            Presentation Ready
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('building', 'library')}
            iconName="MapPin"
            iconPosition="left"
          >
            Library Area
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomFilters;