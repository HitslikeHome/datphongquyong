import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PersonalizedRecommendations = () => {
  const [activeTab, setActiveTab] = useState('for-you');

  const recommendationTabs = [
    { id: 'for-you', name: 'For You', icon: 'User' },
    { id: 'trending', name: 'Trending', icon: 'TrendingUp' },
    { id: 'nearby', name: 'Nearby', icon: 'MapPin' }
  ];

  const forYouRecommendations = [
    {
      id: 'rec1',
      title: 'Quiet Study Pod A',
      location: 'Library Building, Floor 2',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      reason: 'Based on your study patterns',
      features: ['Silent zone', 'Individual desk', 'Power outlets'],
      availability: 'Available now',
      rating: 4.8,
      bookings: 156,
      distance: '2 min walk',
      nextAvailable: '9:30 AM'
    },
    {
      id: 'rec2',
      title: 'Collaborative Workspace',
      location: 'Student Center, Floor 3',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
      reason: 'Perfect for group projects',
      features: ['Whiteboard', 'Video conferencing', 'Flexible seating'],
      availability: 'Available in 30 min',
      rating: 4.6,
      bookings: 89,
      distance: '5 min walk',
      nextAvailable: '10:00 AM'
    },
    {
      id: 'rec3',
      title: 'Tech Innovation Lab',
      location: 'Engineering Building, Floor 1',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      reason: 'Matches your CS courses',
      features: ['High-end computers', '3D printers', 'VR equipment'],
      availability: 'Available now',
      rating: 4.9,
      bookings: 234,
      distance: '8 min walk',
      nextAvailable: '11:00 AM'
    }
  ];

  const trendingRecommendations = [
    {
      id: 'trend1',
      title: 'Rooftop Study Lounge',
      location: 'Main Building, Floor 5',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=250&fit=crop',
      reason: 'Most booked this week',
      features: ['Natural light', 'City view', 'Comfortable seating'],
      availability: 'Available now',
      rating: 4.7,
      bookings: 312,
      distance: '3 min walk',
      nextAvailable: '9:45 AM'
    },
    {
      id: 'trend2',
      title: 'Meditation & Focus Room',
      location: 'Wellness Center, Floor 1',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      reason: 'Rising popularity',
      features: ['Soundproof', 'Aromatherapy', 'Meditation cushions'],
      availability: 'Available in 1 hour',
      rating: 4.9,
      bookings: 78,
      distance: '6 min walk',
      nextAvailable: '11:30 AM'
    }
  ];

  const nearbyRecommendations = [
    {
      id: 'nearby1',
      title: 'Quick Study Booth',
      location: 'Library Building, Floor 1',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=250&fit=crop',
      reason: 'Closest to your location',
      features: ['Individual booth', 'USB charging', 'Task lighting'],
      availability: 'Available now',
      rating: 4.5,
      bookings: 145,
      distance: '1 min walk',
      nextAvailable: '9:15 AM'
    }
  ];

  const getCurrentRecommendations = () => {
    switch (activeTab) {
      case 'trending':
        return trendingRecommendations;
      case 'nearby':
        return nearbyRecommendations;
      default:
        return forYouRecommendations;
    }
  };

  const handleBookRoom = (roomId) => {
    console.log('Booking room:', roomId);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Sparkles" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Personalized Recommendations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover spaces tailored to your study habits, location, and academic needs with our intelligent recommendation engine.
          </p>
        </div>

        {/* Recommendation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-card rounded-lg p-1 academic-shadow">
            {recommendationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium academic-transition ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentRecommendations().map((room) => (
            <div key={room.id} className="bg-card rounded-xl overflow-hidden academic-shadow hover:shadow-lg academic-transition booking-card-hover">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    room.availability.includes('now') 
                      ? 'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
                  }`}>
                    {room.availability}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className="flex items-center space-x-1 text-white text-xs">
                    <Icon name="MapPin" size={12} />
                    <span>{room.distance}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{room.title}</h3>
                    <p className="text-sm text-muted-foreground">{room.location}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                    <span className="font-medium text-foreground">{room.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Lightbulb" size={14} className="text-accent" />
                    <span className="text-sm text-accent font-medium">{room.reason}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {room.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{room.bookings} bookings</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>Next: {room.nextAvailable}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleBookRoom(room.id)}
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Link to="/room-explorer-discovery">
            <Button variant="outline" size="lg" iconName="ArrowRight" iconPosition="right">
              Explore All Recommendations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedRecommendations;