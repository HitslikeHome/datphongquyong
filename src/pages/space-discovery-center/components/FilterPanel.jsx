import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { id: 'study-room', label: 'Study Rooms', icon: 'BookOpen' },
    { id: 'conference', label: 'Conference Rooms', icon: 'Users' },
    { id: 'presentation', label: 'Presentation Halls', icon: 'Presentation' },
    { id: 'collaborative', label: 'Collaborative Zones', icon: 'Users2' },
    { id: 'research', label: 'Research Facilities', icon: 'Microscope' },
    { id: 'lab', label: 'Computer Labs', icon: 'Monitor' }
  ];

  const amenities = [
    { id: 'projector', label: 'Projector', icon: 'Projector' },
    { id: 'whiteboard', label: 'Whiteboard', icon: 'PenTool' },
    { id: 'wifi', label: 'High-Speed WiFi', icon: 'Wifi' },
    { id: 'ac', label: 'Air Conditioning', icon: 'Wind' },
    { id: 'power', label: 'Power Outlets', icon: 'Zap' },
    { id: 'audio', label: 'Audio System', icon: 'Volume2' },
    { id: 'video', label: 'Video Conferencing', icon: 'Video' },
    { id: 'accessible', label: 'Wheelchair Accessible', icon: 'Accessibility' }
  ];

  const buildings = [
    'Main Building (A)',
    'Science Block (B)',
    'Engineering Wing (C)',
    'Library Complex (D)',
    'Research Center (E)',
    'Innovation Hub (F)'
  ];

  const capacityRanges = [
    { id: '1-4', label: '1-4 people', min: 1, max: 4 },
    { id: '5-12', label: '5-12 people', min: 5, max: 12 },
    { id: '13-25', label: '13-25 people', min: 13, max: 25 },
    { id: '26-50', label: '26-50 people', min: 26, max: 50 },
    { id: '50+', label: '50+ people', min: 51, max: 999 }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleArrayFilterChange = (key, itemId, checked) => {
    const currentArray = localFilters[key] || [];
    const updatedArray = checked
      ? [...currentArray, itemId]
      : currentArray.filter(id => id !== itemId);
    
    handleFilterChange(key, updatedArray);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      categories: [],
      amenities: [],
      buildings: [],
      capacity: '',
      availability: 'all',
      rating: 0,
      hasVirtualTour: false,
      isPopular: false
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.search) count++;
    if (localFilters.categories?.length > 0) count++;
    if (localFilters.amenities?.length > 0) count++;
    if (localFilters.buildings?.length > 0) count++;
    if (localFilters.capacity) count++;
    if (localFilters.availability !== 'all') count++;
    if (localFilters.rating > 0) count++;
    if (localFilters.hasVirtualTour) count++;
    if (localFilters.isPopular) count++;
    return count;
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${
      isOpen ? 'w-80' : 'w-0'
    } overflow-hidden`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} className="text-primary" />
              <h2 className="font-semibold text-foreground">Filters</h2>
              {getActiveFilterCount() > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                disabled={getActiveFilterCount() === 0}
              >
                Clear All
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search spaces..."
              value={localFilters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Availability</h3>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Spaces', icon: 'Globe' },
                { value: 'available', label: 'Available Now', icon: 'CheckCircle' },
                { value: 'busy', label: 'Available Later', icon: 'Clock' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value={option.value}
                    checked={localFilters.availability === option.value}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <Icon name={option.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Space Type</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Checkbox
                  key={category.id}
                  label={
                    <div className="flex items-center space-x-2">
                      <Icon name={category.icon} size={16} className="text-muted-foreground" />
                      <span>{category.label}</span>
                    </div>
                  }
                  checked={localFilters.categories?.includes(category.id) || false}
                  onChange={(e) => handleArrayFilterChange('categories', category.id, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Capacity */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Capacity</h3>
            <div className="space-y-2">
              {capacityRanges.map((range) => (
                <label key={range.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="capacity"
                    value={range.id}
                    checked={localFilters.capacity === range.id}
                    onChange={(e) => handleFilterChange('capacity', e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-foreground">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buildings */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Building</h3>
            <div className="space-y-2">
              {buildings.map((building) => (
                <Checkbox
                  key={building}
                  label={building}
                  checked={localFilters.buildings?.includes(building) || false}
                  onChange={(e) => handleArrayFilterChange('buildings', building, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Amenities</h3>
            <div className="space-y-2">
              {amenities.map((amenity) => (
                <Checkbox
                  key={amenity.id}
                  label={
                    <div className="flex items-center space-x-2">
                      <Icon name={amenity.icon} size={16} className="text-muted-foreground" />
                      <span>{amenity.label}</span>
                    </div>
                  }
                  checked={localFilters.amenities?.includes(amenity.id) || false}
                  onChange={(e) => handleArrayFilterChange('amenities', amenity.id, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={localFilters.rating === rating}
                    onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                    className="w-4 h-4 text-primary"
                  />
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < rating ? "text-warning fill-current" : "text-muted"}
                      />
                    ))}
                    <span className="text-sm text-foreground ml-1">& up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Special Features */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Special Features</h3>
            <div className="space-y-2">
              <Checkbox
                label={
                  <div className="flex items-center space-x-2">
                    <Icon name="Camera" size={16} className="text-muted-foreground" />
                    <span>360° Virtual Tour</span>
                  </div>
                }
                checked={localFilters.hasVirtualTour || false}
                onChange={(e) => handleFilterChange('hasVirtualTour', e.target.checked)}
              />
              <Checkbox
                label={
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                    <span>Popular Spaces</span>
                  </div>
                }
                checked={localFilters.isPopular || false}
                onChange={(e) => handleFilterChange('isPopular', e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;