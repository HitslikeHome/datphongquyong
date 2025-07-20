import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RoomCard = ({ room, onRoomSelect, onFavoriteToggle, onQuickBook }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < Math.floor(rating) ? "Star" : "Star"}
        size={14}
        className={i < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const getCapacityIcon = (capacity) => {
    if (capacity <= 4) return "User";
    if (capacity <= 12) return "Users";
    return "Building";
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'busy': return 'text-warning';
      case 'occupied': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border academic-shadow hover:academic-shadow-lg academic-transition booking-card-hover">
      {/* Image Gallery */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={room.images[currentImageIndex]}
          alt={`${room.name} - View ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Image Navigation */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 academic-transition"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 academic-transition"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {room.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {room.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => onFavoriteToggle(room.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 academic-transition"
        >
          <Icon 
            name={room.isFavorite ? "Heart" : "Heart"} 
            size={16} 
            className={room.isFavorite ? "fill-current text-error" : ""} 
          />
        </button>

        {/* Virtual Tour Badge */}
        {room.hasVirtualTour && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="Camera" size={12} />
            <span>360° Tour</span>
          </div>
        )}

        {/* Availability Status */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            room.availability === 'available' ? 'bg-success availability-pulse' :
            room.availability === 'busy' ? 'bg-warning' : 'bg-error'
          }`}></div>
          <span className={`text-xs font-medium ${getAvailabilityColor(room.availability)}`}>
            {room.availability === 'available' ? 'Available Now' :
             room.availability === 'busy' ? 'Busy' : 'Occupied'}
          </span>
        </div>
      </div>

      {/* Room Details */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-foreground text-lg">{room.name}</h3>
            <p className="text-sm text-muted-foreground">{room.building} • Floor {room.floor}</p>
          </div>
          <div className="flex items-center space-x-1">
            {getRatingStars(room.rating)}
            <span className="text-sm text-muted-foreground ml-1">({room.reviewCount})</span>
          </div>
        </div>

        {/* Room Type & Capacity */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name={getCapacityIcon(room.capacity)} size={14} />
            <span>{room.capacity} people</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Tag" size={14} />
            <span>{room.type}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {room.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Usage Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={12} />
            <span>Popular: {room.popularityScore}% usage</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>Avg: {room.averageBookingDuration}h sessions</span>
          </div>
        </div>

        {/* Next Available */}
        <div className="bg-muted rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Next Available</p>
              <p className="text-xs text-muted-foreground">{room.nextAvailable}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-success">{room.availableDuration}</p>
              <p className="text-xs text-muted-foreground">duration</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={() => onRoomSelect(room)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Calendar"
            onClick={() => onQuickBook(room)}
            disabled={room.availability === 'occupied'}
            className="flex-1"
          >
            {room.availability === 'available' ? 'Book Now' : 'Schedule'}
          </Button>
        </div>

        {/* Virtual Tour Button */}
        {room.hasVirtualTour && (
          <Button
            variant="ghost"
            size="sm"
            iconName="Camera"
            iconPosition="left"
            onClick={() => setShowVirtualTour(true)}
            className="w-full mt-2"
          >
            Take Virtual Tour
          </Button>
        )}
      </div>

      {/* Recent Review */}
      {room.recentReview && (
        <div className="px-4 pb-4 border-t border-border pt-3">
          <div className="flex items-start space-x-2">
            <Image
              src={room.recentReview.avatar}
              alt={room.recentReview.author}
              className="w-6 h-6 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">{room.recentReview.author}</span> • {room.recentReview.date}
              </p>
              <p className="text-sm text-foreground mt-1 line-clamp-2">
                "{room.recentReview.comment}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCard;