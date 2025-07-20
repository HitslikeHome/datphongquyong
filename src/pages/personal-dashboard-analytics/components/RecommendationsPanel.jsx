import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsPanel = ({ recommendations, userPreferences }) => {
  const [activeCategory, setActiveCategory] = useState('optimal-times');

  const categories = [
    { id: 'optimal-times', label: 'Optimal Times', icon: 'Clock' },
    { id: 'room-suggestions', label: 'Room Suggestions', icon: 'MapPin' },
    { id: 'study-patterns', label: 'Study Patterns', icon: 'TrendingUp' },
    { id: 'collaboration', label: 'Collaboration', icon: 'Users' }
  ];

  const optimalTimes = [
    {
      id: 1,
      time: '9:00 AM - 11:00 AM',
      reason: 'Peak productivity window based on your history',
      confidence: 92,
      availability: 'High',
      action: 'Book Now'
    },
    {
      id: 2,
      time: '2:00 PM - 4:00 PM',
      reason: 'Low competition, quiet environment',
      confidence: 87,
      availability: 'Medium',
      action: 'Set Reminder'
    },
    {
      id: 3,
      time: '7:00 PM - 9:00 PM',
      reason: 'Extended study sessions work best for you',
      confidence: 78,
      availability: 'High',
      action: 'Book Now'
    }
  ];

  const roomSuggestions = [
    {
      id: 1,
      name: 'Library Study Room 204',
      reason: 'Natural light, quiet zone - matches your preferences',
      features: ['Natural Light', 'Quiet Zone', 'Whiteboard'],
      distance: '2 min walk',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
    },
    {
      id: 2,
      name: 'Science Building Group Space',
      reason: 'Perfect for your upcoming group project',
      features: ['Large Table', 'Projector', 'Power Outlets'],
      distance: '5 min walk',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400'
    },
    {
      id: 3,
      name: 'Engineering Lab Meeting Room',
      reason: 'Tech-equipped space for your CS projects',
      features: ['Dual Monitors', 'High-speed WiFi', 'Collaboration Tools'],
      distance: '8 min walk',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'
    }
  ];

  const studyPatterns = [
    {
      pattern: 'Morning Focus Sessions',
      description: 'You achieve 40% better concentration in morning bookings',
      suggestion: 'Schedule important study sessions before 12 PM',
      impact: 'High'
    },
    {
      pattern: 'Break Intervals',
      description: 'Your optimal session length is 2.5 hours with 15-min breaks',
      suggestion: 'Book rooms in 2.5-hour blocks with buffer time',
      impact: 'Medium'
    },
    {
      pattern: 'Environment Preference',
      description: 'Rooms with natural light increase your session completion by 25%',
      suggestion: 'Prioritize rooms with windows when available',
      impact: 'High'
    }
  ];

  const collaborationTips = [
    {
      title: 'Study Group Formation',
      description: 'Based on your booking patterns, you work well with 2-3 people',
      action: 'Find study partners with similar schedules',
      users: ['Sarah M.', 'Alex K.', 'Jordan L.']
    },
    {
      title: 'Shared Booking Opportunities',
      description: 'Split costs and improve availability by sharing larger spaces',
      action: 'Join existing group bookings',
      savings: '40% cost reduction'
    },
    {
      title: 'Peer Recommendations',
      description: 'Students with similar majors recommend these spaces',
      action: 'Explore computer science student favorites',
      rooms: ['CS Lab 301', 'Tech Hub Room B', 'Innovation Space']
    }
  ];

  const handleRecommendationAction = (action, item) => {
    console.log(`${action} for:`, item);
  };

  const renderOptimalTimes = () => (
    <div className="space-y-4">
      {optimalTimes.map((time) => (
        <div key={time.id} className="p-4 rounded-lg border border-border hover:border-primary/50 academic-transition">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">{time.time}</h4>
              <p className="text-sm text-muted-foreground mb-2">{time.reason}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={14} className="text-success" />
                  <span className="text-xs text-success font-medium">{time.confidence}% confidence</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="text-accent" />
                  <span className="text-xs text-muted-foreground">{time.availability} availability</span>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleRecommendationAction(time.action.toLowerCase().replace(' ', '-'), time)}
            >
              {time.action}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRoomSuggestions = () => (
    <div className="space-y-4">
      {roomSuggestions.map((room) => (
        <div key={room.id} className="p-4 rounded-lg border border-border hover:border-primary/50 academic-transition">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={room.image} 
                alt={room.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground">{room.name}</h4>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm font-medium">{room.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{room.reason}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {room.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{room.distance}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRecommendationAction('book-room', room)}
                  >
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStudyPatterns = () => (
    <div className="space-y-4">
      {studyPatterns.map((pattern, index) => (
        <div key={index} className="p-4 rounded-lg border border-border">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-medium text-foreground">{pattern.pattern}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              pattern.impact === 'High' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
            }`}>
              {pattern.impact} Impact
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={14} className="text-accent" />
            <span className="text-sm text-foreground font-medium">{pattern.suggestion}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCollaboration = () => (
    <div className="space-y-4">
      {collaborationTips.map((tip, index) => (
        <div key={index} className="p-4 rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-2">{tip.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-accent font-medium">{tip.action}</div>
            {tip.users && (
              <div className="flex -space-x-2">
                {tip.users.slice(0, 3).map((user, userIndex) => (
                  <div key={userIndex} className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-medium border-2 border-card">
                    {user.charAt(0)}
                  </div>
                ))}
              </div>
            )}
            {tip.savings && (
              <span className="text-sm text-success font-medium">{tip.savings}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Smart Recommendations</h2>
        <Button variant="outline" size="sm">
          <Icon name="Settings" size={16} className="mr-2" />
          Customize
        </Button>
      </div>

      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium academic-transition whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-card text-foreground academic-shadow'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={category.icon} size={16} />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {activeCategory === 'optimal-times' && renderOptimalTimes()}
      {activeCategory === 'room-suggestions' && renderRoomSuggestions()}
      {activeCategory === 'study-patterns' && renderStudyPatterns()}
      {activeCategory === 'collaboration' && renderCollaboration()}
    </div>
  );
};

export default RecommendationsPanel;