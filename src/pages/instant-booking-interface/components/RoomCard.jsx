import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RoomCard = ({ room, onSelect, isSelected }) => {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'limited':
        return 'text-warning bg-warning/10';
      case 'booked':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available':
        return 'Available Now';
      case 'limited':
        return 'Limited Slots';
      case 'booked':
        return 'Fully Booked';
      default:
        return 'Unknown';
    }
  };

  const amenityIcons = {
    whiteboard: 'PenTool',
    projector: 'Projector',
    computer: 'Monitor',
    wifi: 'Wifi',
    power: 'Zap',
    ac: 'Wind',
    video: 'Video',
    printer: 'Printer'
  };

  return (
    <div
      className={`bg-card border rounded-lg academic-shadow academic-transition cursor-pointer hover:academic-shadow-lg ${
        isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
      }`}
      onClick={() => onSelect(room)}
    >
      {/* Room Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(room.availability)}`}>
            {getAvailabilityText(room.availability)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-medium bg-card/90 text-foreground rounded-full">
            {room.building}
          </span>
        </div>
        {room.isPopular && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full flex items-center space-x-1">
              <Icon name="TrendingUp" size={12} />
              <span>Popular</span>
            </span>
          </div>
        )}
      </div>

      {/* Room Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-foreground">{room.name}</h3>
            <p className="text-sm text-muted-foreground">{room.location}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Users" size={14} />
              <span>{room.capacity}</span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-3">
          {room.amenities.slice(0, 6).map((amenity) => (
            <div
              key={amenity}
              className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-md"
              title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
            >
              <Icon name={amenityIcons[amenity] || 'Check'} size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground capitalize">{amenity}</span>
            </div>
          ))}
          {room.amenities.length > 6 && (
            <div className="flex items-center px-2 py-1 bg-muted rounded-md">
              <span className="text-xs text-muted-foreground">+{room.amenities.length - 6} more</span>
            </div>
          )}
        </div>

        {/* Next Available Slots */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Next Available
          </h4>
          <div className="flex space-x-2">
            {room.nextSlots.map((slot, index) => (
              <div
                key={index}
                className="px-2 py-1 text-xs bg-success/10 text-success rounded border border-success/20"
              >
                {slot}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={isSelected ? "default" : "outline"}
            size="sm"
            fullWidth
            iconName={isSelected ? "Check" : "Calendar"}
            iconPosition="left"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(room);
            }}
          >
            {isSelected ? 'Selected' : 'Select Room'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={(e) => {
              e.stopPropagation();
              // Handle room preview
            }}
          />
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="px-4 py-2 bg-muted/50 rounded-b-lg border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>Available until {room.availableUntil}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{room.floor}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-warning" />
            <span>{room.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;