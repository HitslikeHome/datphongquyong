import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const roomTypes = [
    { id: 'silent-study', label: 'Silent Study', icon: 'Volume' },
    { id: 'collaborative', label: 'Collaborative Spaces', icon: 'Users' },
    { id: 'presentation', label: 'Presentation Rooms', icon: 'Presentation' },
    { id: 'computer-lab', label: 'Computer Labs', icon: 'Monitor' },
    { id: 'meeting', label: 'Meeting Rooms', icon: 'Calendar' },
    { id: 'workshop', label: 'Workshop Spaces', icon: 'Wrench' }
  ];

  const amenities = [
    { id: 'wifi', label: 'High-Speed WiFi', icon: 'Wifi' },
    { id: 'projector', label: 'Projector/Display', icon: 'Monitor' },
    { id: 'whiteboard', label: 'Whiteboard', icon: 'PenTool' },
    { id: 'outlets', label: 'Power Outlets', icon: 'Zap' },
    { id: 'ac', label: 'Air Conditioning', icon: 'Wind' },
    { id: 'natural-light', label: 'Natural Light', icon: 'Sun' }
  ];

  const accessibilityFeatures = [
    { id: 'wheelchair', label: 'Wheelchair Accessible', icon: 'Accessibility' },
    { id: 'elevator', label: 'Elevator Access', icon: 'ArrowUp' },
    { id: 'hearing-loop', label: 'Hearing Loop', icon: 'Ear' },
    { id: 'adjustable-desk', label: 'Adjustable Desks', icon: 'Settings' }
  ];

  const handleFilterChange = (category, value, checked) => {
    const updatedFilters = { ...filters };
    
    if (category === 'capacity' || category === 'duration') {
      updatedFilters[category] = value;
    } else {
      if (!updatedFilters[category]) {
        updatedFilters[category] = [];
      }
      
      if (checked) {
        updatedFilters[category] = [...updatedFilters[category], value];
      } else {
        updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
      }
    }
    
    onFiltersChange(updatedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    Object.keys(filters).forEach(key => {
      if (Array.isArray(filters[key])) {
        count += filters[key].length;
      } else if (filters[key]) {
        count += 1;
      }
    });
    return count;
  };

  return (
    <div className="bg-card rounded-lg border border-border academic-shadow">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={onClearFilters}
          >
            Clear
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Capacity Filter */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Capacity</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.capacity?.min || ''}
                onChange={(e) => handleFilterChange('capacity', { ...filters.capacity, min: e.target.value })}
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.capacity?.max || ''}
                onChange={(e) => handleFilterChange('capacity', { ...filters.capacity, max: e.target.value })}
                className="text-sm"
              />
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Booking Duration</span>
            </h4>
            <div className="space-y-2">
              {['30 min', '1 hour', '2 hours', '4 hours', '8 hours'].map((duration) => (
                <Checkbox
                  key={duration}
                  label={duration}
                  checked={filters.duration?.includes(duration) || false}
                  onChange={(e) => handleFilterChange('duration', duration, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Home" size={16} />
              <span>Room Types</span>
            </h4>
            <div className="space-y-2">
              {roomTypes.map((type) => (
                <Checkbox
                  key={type.id}
                  label={
                    <div className="flex items-center space-x-2">
                      <Icon name={type.icon} size={14} />
                      <span>{type.label}</span>
                    </div>
                  }
                  checked={filters.roomTypes?.includes(type.id) || false}
                  onChange={(e) => handleFilterChange('roomTypes', type.id, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Star" size={16} />
              <span>Amenities</span>
            </h4>
            <div className="space-y-2">
              {amenities.map((amenity) => (
                <Checkbox
                  key={amenity.id}
                  label={
                    <div className="flex items-center space-x-2">
                      <Icon name={amenity.icon} size={14} />
                      <span>{amenity.label}</span>
                    </div>
                  }
                  checked={filters.amenities?.includes(amenity.id) || false}
                  onChange={(e) => handleFilterChange('amenities', amenity.id, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Accessibility" size={16} />
              <span>Accessibility</span>
            </h4>
            <div className="space-y-2">
              {accessibilityFeatures.map((feature) => (
                <Checkbox
                  key={feature.id}
                  label={
                    <div className="flex items-center space-x-2">
                      <Icon name={feature.icon} size={14} />
                      <span>{feature.label}</span>
                    </div>
                  }
                  checked={filters.accessibility?.includes(feature.id) || false}
                  onChange={(e) => handleFilterChange('accessibility', feature.id, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="pt-4 border-t border-border">
            <Button variant="default" fullWidth iconName="Search" iconPosition="left">
              Apply Filters ({getActiveFiltersCount()})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;