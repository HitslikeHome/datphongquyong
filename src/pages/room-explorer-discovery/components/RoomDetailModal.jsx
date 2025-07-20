import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RoomDetailModal = ({ room, isOpen, onClose, onBook, onFavoriteToggle }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !room) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'amenities', label: 'Amenities', icon: 'Star' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'availability', label: 'Availability', icon: 'Calendar' }
  ];

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
        name="Star"
        size={16}
        className={i < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Room Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted rounded-lg">
          <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{room.capacity}</p>
          <p className="text-sm text-muted-foreground">Capacity</p>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <Icon name="Star" size={24} className="text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{room.rating}</p>
          <p className="text-sm text-muted-foreground">Rating</p>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <Icon name="TrendingUp" size={24} className="text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{room.popularityScore}%</p>
          <p className="text-sm text-muted-foreground">Usage</p>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <Icon name="Clock" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{room.averageBookingDuration}h</p>
          <p className="text-sm text-muted-foreground">Avg Session</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">About This Room</h3>
        <p className="text-muted-foreground leading-relaxed">{room.description}</p>
      </div>

      {/* Location Info */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Location & Access</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-foreground">{room.building}, Floor {room.floor}, Room {room.roomNumber}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Navigation" size={16} className="text-primary" />
            <span className="text-muted-foreground">2 min walk from main entrance</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Accessibility" size={16} className="text-primary" />
            <span className="text-muted-foreground">Wheelchair accessible via elevator</span>
          </div>
        </div>
      </div>

      {/* Peak Hours */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Usage Patterns</h3>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Peak Hours</span>
            <span className="text-sm font-medium text-foreground">10 AM - 2 PM</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Quietest Time</span>
            <span className="text-sm font-medium text-foreground">7 AM - 9 AM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Booking Success Rate</span>
            <span className="text-sm font-medium text-success">94%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAmenities = () => (
    <div className="space-y-6">
      {/* Technology */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Monitor" size={20} />
          <span>Technology</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {room.detailedAmenities.technology.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Icon name={item.icon} size={16} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Furniture */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Armchair" size={20} />
          <span>Furniture & Layout</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {room.detailedAmenities.furniture.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Icon name={item.icon} size={16} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Sun" size={20} />
          <span>Environment</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {room.detailedAmenities.environment.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Icon name={item.icon} size={16} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-muted rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground">{room.rating}</p>
            <div className="flex items-center justify-center space-x-1 mt-2">
              {getRatingStars(room.rating)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{room.reviewCount} reviews</p>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-muted-foreground w-8">{stars}★</span>
                <div className="flex-1 bg-border rounded-full h-2">
                  <div 
                    className="bg-warning h-2 rounded-full" 
                    style={{ width: `${room.ratingDistribution[stars]}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground w-8">{room.ratingDistribution[stars]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {room.reviews.map((review) => (
          <div key={review.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Image
                src={review.avatar}
                alt={review.author}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{review.author}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getRatingStars(review.rating)}
                  </div>
                </div>
                <p className="text-foreground mb-2">{review.comment}</p>
                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 mt-3">
                    {review.images.map((img, index) => (
                      <Image
                        key={index}
                        src={img}
                        alt={`Review image ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                  <button className="flex items-center space-x-1 hover:text-foreground">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review.helpfulCount})</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-foreground">
                    <Icon name="MessageSquare" size={14} />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAvailability = () => (
    <div className="space-y-6">
      {/* Today's Schedule */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Today's Schedule</h3>
        <div className="space-y-2">
          {room.todaySchedule.map((slot, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
              slot.status === 'available' ? 'bg-success/10 border border-success/20' :
              slot.status === 'booked'? 'bg-error/10 border border-error/20' : 'bg-warning/10 border border-warning/20'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  slot.status === 'available' ? 'bg-success' :
                  slot.status === 'booked' ? 'bg-error' : 'bg-warning'
                }`}></div>
                <span className="font-medium text-foreground">{slot.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${
                  slot.status === 'available' ? 'text-success' :
                  slot.status === 'booked' ? 'text-error' : 'text-warning'
                }`}>
                  {slot.status === 'available' ? 'Available' :
                   slot.status === 'booked' ? `Booked by ${slot.bookedBy}` : 'Maintenance'}
                </span>
                {slot.status === 'available' && (
                  <Button variant="outline" size="sm" onClick={() => onBook(room, slot.time)}>
                    Book
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Pattern */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Usage Pattern</h3>
        <div className="bg-muted rounded-lg p-4">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {room.weeklyPattern.map((usage, index) => (
              <div key={index} className="text-center">
                <div className={`h-16 rounded-lg flex items-end justify-center ${
                  usage > 80 ? 'bg-error' :
                  usage > 60 ? 'bg-warning' :
                  usage > 40 ? 'bg-accent' : 'bg-success'
                }`}>
                  <div 
                    className="w-full bg-white/20 rounded-t-lg"
                    style={{ height: `${usage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{usage}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg border border-border academic-shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{room.name}</h2>
              <p className="text-muted-foreground">{room.building} • Floor {room.floor}</p>
            </div>
            <div className="flex items-center space-x-2">
              {getRatingStars(room.rating)}
              <span className="text-sm text-muted-foreground">({room.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName={room.isFavorite ? "Heart" : "Heart"}
              onClick={() => onFavoriteToggle(room.id)}
              className={room.isFavorite ? "text-error" : ""}
            >
              {room.isFavorite ? "Favorited" : "Add to Favorites"}
            </Button>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={room.images[currentImageIndex]}
            alt={`${room.name} - View ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {room.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 academic-transition"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 academic-transition"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm academic-transition ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'amenities' && renderAmenities()}
          {activeTab === 'reviews' && renderReviews()}
          {activeTab === 'availability' && renderAvailability()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${
              room.availability === 'available' ? 'text-success' :
              room.availability === 'busy' ? 'text-warning' : 'text-error'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                room.availability === 'available' ? 'bg-success availability-pulse' :
                room.availability === 'busy' ? 'bg-warning' : 'bg-error'
              }`}></div>
              <span className="font-medium">
                {room.availability === 'available' ? 'Available Now' :
                 room.availability === 'busy' ? 'Busy' : 'Occupied'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Next available: {room.nextAvailable}
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="default" 
              iconName="Calendar" 
              iconPosition="left"
              onClick={() => onBook(room)}
              disabled={room.availability === 'occupied'}
            >
              {room.availability === 'available' ? 'Book Now' : 'Schedule Booking'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;