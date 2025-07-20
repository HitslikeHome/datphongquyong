import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SpaceTypeSelector = ({ selectedSpace, onSpaceSelect, onNext, onBack }) => {
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const spaceTypes = [
    {
      id: 'lecture-hall-a1',
      name: 'Lecture Hall A1',
      type: 'lecture',
      capacity: 120,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop',
      amenities: ['Projector', 'Microphone', 'Whiteboard', 'AC', 'WiFi'],
      availability: 'high',
      description: 'Large lecture hall perfect for presentations and seminars',
      floor: '1st Floor',
      building: 'Academic Block A',
      rating: 4.8,
      bookingCount: 156
    },
    {
      id: 'meeting-room-b2',
      name: 'Meeting Room B2',
      type: 'meeting',
      capacity: 12,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
      amenities: ['Smart TV', 'Conference Phone', 'Whiteboard', 'AC'],
      availability: 'medium',
      description: 'Intimate meeting space for team discussions',
      floor: '2nd Floor',
      building: 'Academic Block B',
      rating: 4.6,
      bookingCount: 89
    },
    {
      id: 'lab-c3',
      name: 'Computer Lab C3',
      type: 'lab',
      capacity: 30,
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop',
      amenities: ['Computers', 'Projector', 'AC', 'WiFi', 'Power Outlets'],
      availability: 'low',
      description: 'Fully equipped computer lab for practical sessions',
      floor: '3rd Floor',
      building: 'Academic Block C',
      rating: 4.7,
      bookingCount: 203
    },
    {
      id: 'study-room-d1',
      name: 'Study Room D1',
      type: 'study',
      capacity: 6,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      amenities: ['Whiteboard', 'Comfortable Seating', 'Natural Light'],
      availability: 'high',
      description: 'Quiet study space for small groups',
      floor: '1st Floor',
      building: 'Library Block',
      rating: 4.5,
      bookingCount: 67
    },
    {
      id: 'seminar-hall-e1',
      name: 'Seminar Hall E1',
      type: 'seminar',
      capacity: 80,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop',
      amenities: ['Projector', 'Sound System', 'Stage', 'AC', 'Recording'],
      availability: 'medium',
      description: 'Professional seminar hall with recording capabilities',
      floor: '2nd Floor',
      building: 'Conference Center',
      rating: 4.9,
      bookingCount: 124
    },
    {
      id: 'workshop-room-f2',
      name: 'Workshop Room F2',
      type: 'workshop',
      capacity: 25,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop',
      amenities: ['Flexible Seating', 'Movable Tables', 'Projector', 'Flipcharts'],
      availability: 'high',
      description: 'Flexible workshop space with movable furniture',
      floor: '2nd Floor',
      building: 'Innovation Hub',
      rating: 4.4,
      bookingCount: 91
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Spaces', icon: 'Grid3X3' },
    { value: 'lecture', label: 'Lecture Halls', icon: 'Users' },
    { value: 'meeting', label: 'Meeting Rooms', icon: 'MessageSquare' },
    { value: 'lab', label: 'Labs', icon: 'Monitor' },
    { value: 'study', label: 'Study Rooms', icon: 'Book' },
    { value: 'seminar', label: 'Seminar Halls', icon: 'Presentation' },
    { value: 'workshop', label: 'Workshop Rooms', icon: 'Wrench' }
  ];

  const filteredSpaces = filterType === 'all' 
    ? spaceTypes 
    : spaceTypes.filter(space => space.type === filterType);

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getAvailabilityLabel = (availability) => {
    switch (availability) {
      case 'high': return 'High Availability';
      case 'medium': return 'Limited Slots';
      case 'low': return 'Few Slots Left';
      default: return 'Check Availability';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Choose Your Space</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select the perfect room for your needs
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterType(option.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                filterType === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={option.icon} size={14} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Space Grid/List */}
      <div className={`grid gap-4 ${
        viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :'grid-cols-1'
      }`}>
        {filteredSpaces.map((space) => (
          <div
            key={space.id}
            onClick={() => onSpaceSelect(space)}
            className={`bg-card rounded-xl border transition-smooth cursor-pointer ${
              selectedSpace?.id === space.id
                ? 'border-primary shadow-elevated'
                : 'border-border hover:border-primary/50 hover:shadow-card'
            }`}
          >
            <div className="relative">
              <Image
                src={space.image}
                alt={space.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="absolute top-3 right-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium bg-background/90 backdrop-blur-sm ${
                  getAvailabilityColor(space.availability)
                }`}>
                  {getAvailabilityLabel(space.availability)}
                </div>
              </div>
              {selectedSpace?.id === space.id && (
                <div className="absolute top-3 left-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{space.name}</h3>
                  <p className="text-sm text-muted-foreground">{space.building} • {space.floor}</p>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span>{space.rating}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{space.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Users" size={14} />
                  <span>Up to {space.capacity} people</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {space.bookingCount} bookings
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {space.amenities.slice(0, 4).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
                  >
                    {amenity}
                  </span>
                ))}
                {space.amenities.length > 4 && (
                  <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md">
                    +{space.amenities.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Space Details */}
      {selectedSpace && (
        <div className="bg-accent/5 rounded-xl border border-accent/20 p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="CheckCircle" size={16} className="text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground text-sm">Selected: {selectedSpace.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Perfect choice! This space has been booked {selectedSpace.bookingCount} times with a {selectedSpace.rating} star rating.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSpace.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent/10 text-xs text-accent rounded-md"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedSpace}
          className="min-w-32"
        >
          Next Step
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SpaceTypeSelector;