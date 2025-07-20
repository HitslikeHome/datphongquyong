import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickBookWidget = () => {
  const [selectedSpace, setSelectedSpace] = useState(null);
  
  const quickBookOptions = [
    {
      id: 1,
      name: "CS Lab 2",
      type: "Computer Lab",
      building: "Science Block",
      capacity: 30,
      available: true,
      nextSlot: "2:00 PM - 4:00 PM",
      amenities: ["Projector", "Whiteboard", "AC"],
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      name: "Study Room A",
      type: "Group Study",
      building: "Main Library",
      capacity: 8,
      available: true,
      nextSlot: "1:30 PM - 3:30 PM",
      amenities: ["Whiteboard", "Power Outlets"],
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      name: "Conference Room B",
      type: "Meeting Room",
      building: "Admin Building",
      capacity: 12,
      available: false,
      nextSlot: "4:00 PM - 6:00 PM",
      amenities: ["Video Conf", "Projector", "AC"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop"
    }
  ];

  const handleQuickBook = (space) => {
    setSelectedSpace(space);
    // In a real app, this would trigger the booking flow
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Quick Book</h2>
          <p className="text-sm text-muted-foreground">Popular spaces available now</p>
        </div>
        <Link 
          to="/intelligent-booking-engine"
          className="text-sm text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
        >
          <span>View All</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickBookOptions.map((space) => (
          <div key={space.id} className="border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth">
            <div className="relative h-32 overflow-hidden">
              <img 
                src={space.image} 
                alt={space.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  space.available 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-error text-error-foreground'
                }`}>
                  {space.available ? 'Available' : 'Busy'}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{space.name}</h3>
                  <p className="text-sm text-muted-foreground">{space.type}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Users" size={12} />
                    <span>{space.capacity}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="MapPin" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{space.building}</span>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{space.nextSlot}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {space.amenities.slice(0, 2).map((amenity, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    {amenity}
                  </span>
                ))}
                {space.amenities.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    +{space.amenities.length - 2} more
                  </span>
                )}
              </div>
              
              <Button
                variant={space.available ? "default" : "outline"}
                size="sm"
                fullWidth
                disabled={!space.available}
                onClick={() => handleQuickBook(space)}
                iconName={space.available ? "Calendar" : "Clock"}
                iconPosition="left"
              >
                {space.available ? 'Book Now' : 'Join Waitlist'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedSpace && (
        <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">
              Quick booking initiated for {selectedSpace.name}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Redirecting to booking confirmation...
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickBookWidget;