import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PopularRoomsSection = ({ popularRooms, onRoomSelect, onQuickBook }) => {
  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const getPopularityBadge = (score) => {
    if (score >= 90) return { label: 'Most Popular', color: 'bg-error text-error-foreground' };
    if (score >= 80) return { label: 'Very Popular', color: 'bg-warning text-warning-foreground' };
    if (score >= 70) return { label: 'Popular', color: 'bg-accent text-accent-foreground' };
    return { label: 'Trending', color: 'bg-primary text-primary-foreground' };
  };

  return (
    <div className="bg-card rounded-lg border border-border academic-shadow">
      {/* Section Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Popular Rooms</h3>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            Top picks this week
          </span>
        </div>
        <Button variant="ghost" size="sm" iconName="ArrowRight">
          View All
        </Button>
      </div>

      {/* Popular Rooms Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularRooms.map((room, index) => {
            const badge = getPopularityBadge(room.popularityScore);
            
            return (
              <div
                key={room.id}
                className="relative bg-background rounded-lg border border-border hover:border-primary/50 academic-transition cursor-pointer group"
                onClick={() => onRoomSelect(room)}
              >
                {/* Rank Badge */}
                <div className="absolute top-2 left-2 z-10 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>

                {/* Popularity Badge */}
                <div className={`absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                  {badge.label}
                </div>

                {/* Room Image */}
                <div className="relative h-32 overflow-hidden rounded-t-lg">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 academic-transition"
                  />
                  
                  {/* Availability Indicator */}
                  <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      room.availability === 'available' ? 'bg-success availability-pulse' :
                      room.availability === 'busy' ? 'bg-warning' : 'bg-error'
                    }`}></div>
                    <span className="text-xs text-white font-medium bg-black/50 px-2 py-1 rounded-full">
                      {room.availability === 'available' ? 'Available' :
                       room.availability === 'busy' ? 'Busy' : 'Occupied'}
                    </span>
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{room.name}</h4>
                      <p className="text-xs text-muted-foreground">{room.building} • Floor {room.floor}</p>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {getRatingStars(room.rating)}
                      <span className="text-xs text-muted-foreground">({room.reviewCount})</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{room.capacity} people</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{room.averageBookingDuration}h avg</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="TrendingUp" size={12} />
                      <span>{room.popularityScore}% usage</span>
                    </div>
                  </div>

                  {/* Key Amenities */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {room.keyAmenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.keyAmenities.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{room.keyAmenities.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Next Available */}
                  <div className="bg-muted rounded-lg p-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Next available:</span>
                      <span className="font-medium text-foreground">{room.nextAvailable}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium text-success">{room.availableDuration}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRoomSelect(room);
                      }}
                      className="flex-1 text-xs"
                    >
                      Details
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Calendar"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickBook(room);
                      }}
                      disabled={room.availability === 'occupied'}
                      className="flex-1 text-xs"
                    >
                      {room.availability === 'available' ? 'Book' : 'Schedule'}
                    </Button>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 academic-transition rounded-lg pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Usage Insights */}
      <div className="px-4 pb-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="BarChart3" size={16} />
            <span>Usage Insights</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">87%</p>
              <p className="text-muted-foreground">Average utilization</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">2.4h</p>
              <p className="text-muted-foreground">Average session</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">94%</p>
              <p className="text-muted-foreground">Booking success rate</p>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              <Icon name="Info" size={12} className="inline mr-1" />
              Popular rooms are ranked by usage frequency, ratings, and booking success rates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularRoomsSection;