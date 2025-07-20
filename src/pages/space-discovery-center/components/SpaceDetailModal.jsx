import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SpaceDetailModal = ({ space, isOpen, onClose, onBookNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !space) return null;

  const images = [
    space.image,
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop"
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'amenities', label: 'Amenities', icon: 'Settings' },
    { id: 'photos', label: 'Photos', icon: 'Camera' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'booking', label: 'Booking Info', icon: 'Calendar' }
  ];

  const reviews = [
    {
      id: 1,
      user: "Dr. Sarah Chen",
      rating: 5,
      date: "2025-01-15",
      comment: "Excellent space for thesis defense presentations. The audio-visual equipment worked flawlessly and the room acoustics are perfect."
    },
    {
      id: 2,
      user: "Prof. Michael Rodriguez",
      rating: 4,
      date: "2025-01-10",
      comment: "Great collaborative space for research meetings. The whiteboard is large and the natural lighting is wonderful for long sessions."
    },
    {
      id: 3,
      user: "Dr. Emily Watson",
      rating: 5,
      date: "2025-01-08",
      comment: "Perfect for international video conferences. The internet connection is stable and the camera setup is professional quality."
    }
  ];

  const bookingPolicies = [
    "Maximum booking duration: 4 hours per session",
    "Advance booking required: Minimum 2 hours notice",
    "Cancellation policy: Free cancellation up to 1 hour before",
    "No-show policy: 3 no-shows result in 1-week booking restriction",
    "Equipment usage: Basic training required for AV equipment",
    "Food policy: Light refreshments allowed, no meals"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
      case 'busy': return 'Available from 3:00 PM';
      case 'occupied': return 'Occupied until 5:00 PM';
      default: return 'Status Unknown';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-modal max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-semibold text-foreground">{space.name}</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(space.availability)}`}>
                {getAvailabilityText(space.availability)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {space.has360Tour && (
              <Button variant="outline" size="sm">
                <Icon name="Camera" size={16} className="mr-2" />
                360° Tour
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-120px)]">
          {/* Left Panel - Image Gallery */}
          <div className="w-1/2 relative">
            <div className="relative h-full">
              <Image
                src={images[currentImageIndex]}
                alt={`${space.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </Button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Image Thumbnails */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {images.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Details */}
          <div className="w-1/2 flex flex-col">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{space.building} • {space.floor}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Users" size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Capacity</p>
                        <p className="font-medium">{space.capacity} people</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Tag" size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{space.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Star" size={20} className="text-warning" />
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-medium">{space.rating}/5.0</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {space.description || `This ${space.category.toLowerCase()} is perfect for academic activities requiring ${space.capacity} people. Located in ${space.building} on ${space.floor}, it offers a professional environment with modern amenities and excellent connectivity. The space is designed to facilitate productive meetings, presentations, and collaborative work sessions.`}
                    </p>
                  </div>

                  {/* Usage Statistics */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Usage Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Weekly Bookings</span>
                          <Icon name="TrendingUp" size={16} className="text-success" />
                        </div>
                        <p className="text-lg font-semibold text-foreground">{space.weeklyBookings}</p>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Avg. Duration</span>
                          <Icon name="Clock" size={16} className="text-primary" />
                        </div>
                        <p className="text-lg font-semibold text-foreground">{space.avgBookingDuration}h</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Available Amenities</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {space.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <Icon name={amenity.icon} size={20} className="text-primary" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{amenity.name}</p>
                          <p className="text-sm text-muted-foreground">{amenity.description}</p>
                        </div>
                        <Icon name="Check" size={16} className="text-success" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Photo Gallery</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className="aspect-video rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                      >
                        <Image src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">User Reviews</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={i < Math.floor(space.rating) ? "text-warning fill-current" : "text-muted"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <Icon name="User" size={16} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{review.user}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={14}
                                className={i < review.rating ? "text-warning fill-current" : "text-muted"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'booking' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Booking Information</h3>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">Booking Policies</h4>
                    <ul className="space-y-2">
                      {bookingPolicies.map((policy, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span>{policy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Info" size={16} className="text-primary" />
                      <h4 className="font-medium text-primary">Quick Booking Tips</h4>
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Book during off-peak hours (9-11 AM, 2-4 PM) for better availability</li>
                      <li>• Check equipment requirements before booking</li>
                      <li>• Arrive 5 minutes early for setup time</li>
                      <li>• Use QR code for quick check-in</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="border-t border-border p-6">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  variant="default"
                  onClick={() => onBookNow(space)}
                  className="flex-1"
                  disabled={space.availability === 'occupied'}
                >
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Book This Space
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetailModal;