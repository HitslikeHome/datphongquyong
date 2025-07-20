import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SpaceCard = ({ space, onViewDetails, onBookNow, onToggleFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getCapacityIcon = (capacity) => {
    if (capacity <= 4) return 'Users';
    if (capacity <= 12) return 'Users2';
    return 'Building';
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'text-success bg-success/10';
      case 'busy': return 'text-warning bg-warning/10';
      case 'occupied': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available': return 'Available Now';
      case 'busy': return 'Busy Until 3:00 PM';
      case 'occupied': return 'Occupied';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-card hover:shadow-elevated transition-all duration-300 group overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={space.image}
          alt={space.name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-shimmer"></div>
        )}

        {/* Overlay Elements */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(space.availability)}`}>
            {getAvailabilityText(space.availability)}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(space.id)}
            className="bg-card/80 backdrop-blur-sm hover:bg-card"
          >
            <Icon 
              name={space.isFavorite ? "Heart" : "Heart"} 
              size={16} 
              className={space.isFavorite ? "text-error fill-current" : "text-muted-foreground"} 
            />
          </Button>
        </div>

        {/* Popular Badge */}
        {space.isPopular && (
          <div className="absolute bottom-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="TrendingUp" size={12} />
            <span>Popular</span>
          </div>
        )}

        {/* 360° Tour Badge */}
        {space.has360Tour && (
          <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="Camera" size={12} />
            <span>360° Tour</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-lg truncate">{space.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center mt-1">
              <Icon name="MapPin" size={14} className="mr-1" />
              {space.building} • {space.floor}
            </p>
          </div>
          <div className="flex items-center space-x-1 text-warning ml-2">
            <Icon name="Star" size={14} className="fill-current" />
            <span className="text-sm font-medium">{space.rating}</span>
          </div>
        </div>

        {/* Category & Capacity */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium">
            {space.category}
          </span>
          <div className="flex items-center text-muted-foreground text-sm">
            <Icon name={getCapacityIcon(space.capacity)} size={16} className="mr-1" />
            <span>{space.capacity} people</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {space.amenities.slice(0, 3).map((amenity, index) => (
            <div key={index} className="flex items-center text-xs text-muted-foreground">
              <Icon name={amenity.icon} size={12} className="mr-1" />
              <span>{amenity.name}</span>
            </div>
          ))}
          {space.amenities.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{space.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Usage Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center">
            <Icon name="Clock" size={12} className="mr-1" />
            <span>Avg. {space.avgBookingDuration}h sessions</span>
          </div>
          <div className="flex items-center">
            <Icon name="Users" size={12} className="mr-1" />
            <span>{space.weeklyBookings} bookings/week</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(space)}
            className="flex-1"
          >
            <Icon name="Eye" size={16} className="mr-2" />
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onBookNow(space)}
            className="flex-1"
            disabled={space.availability === 'occupied'}
          >
            <Icon name="Calendar" size={16} className="mr-2" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;