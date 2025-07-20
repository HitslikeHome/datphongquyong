import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CampusMapIntegration = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('library');
  const [mapView, setMapView] = useState('availability');

  const buildings = [
    {
      id: 'library',
      name: 'Library Building',
      totalRooms: 45,
      availableRooms: 28,
      coordinates: { x: 35, y: 25 },
      color: 'bg-blue-500',
      rooms: [
        { id: 'L101', name: 'Quiet Study A', capacity: 4, available: true, floor: 1 },
        { id: 'L201', name: 'Group Study B', capacity: 8, available: false, floor: 2 },
        { id: 'L301', name: 'Research Room', capacity: 6, available: true, floor: 3 }
      ]
    },
    {
      id: 'student-center',
      name: 'Student Center',
      totalRooms: 32,
      availableRooms: 19,
      coordinates: { x: 60, y: 40 },
      color: 'bg-green-500',
      rooms: [
        { id: 'SC101', name: 'Meeting Room A', capacity: 12, available: true, floor: 1 },
        { id: 'SC201', name: 'Event Space', capacity: 50, available: false, floor: 2 },
        { id: 'SC301', name: 'Study Lounge', capacity: 20, available: true, floor: 3 }
      ]
    },
    {
      id: 'engineering',
      name: 'Engineering Building',
      totalRooms: 28,
      availableRooms: 15,
      coordinates: { x: 20, y: 60 },
      color: 'bg-purple-500',
      rooms: [
        { id: 'E101', name: 'Tech Lab A', capacity: 25, available: true, floor: 1 },
        { id: 'E201', name: 'Design Studio', capacity: 15, available: true, floor: 2 },
        { id: 'E301', name: 'Innovation Lab', capacity: 30, available: false, floor: 3 }
      ]
    },
    {
      id: 'business',
      name: 'Business School',
      totalRooms: 22,
      availableRooms: 8,
      coordinates: { x: 75, y: 65 },
      color: 'bg-orange-500',
      rooms: [
        { id: 'B101', name: 'Boardroom', capacity: 16, available: false, floor: 1 },
        { id: 'B201', name: 'Case Study Room', capacity: 12, available: true, floor: 2 },
        { id: 'B301', name: 'Presentation Hall', capacity: 40, available: true, floor: 3 }
      ]
    }
  ];

  const mapViewOptions = [
    { id: 'availability', name: 'Availability', icon: 'Circle' },
    { id: 'capacity', name: 'Capacity', icon: 'Users' },
    { id: 'amenities', name: 'Amenities', icon: 'Settings' }
  ];

  const selectedBuildingData = buildings.find(b => b.id === selectedBuilding);

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage >= 70) return 'bg-success';
    if (percentage >= 40) return 'bg-warning';
    return 'bg-error';
  };

  const handleRoomSelect = (roomId) => {
    console.log('Selected room:', roomId);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Map" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">Interactive Campus Map</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Space
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore room availability across campus with our interactive map. See real-time status, capacity, and amenities at a glance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map View */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 academic-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Campus Overview</h3>
                <div className="flex items-center space-x-2">
                  {mapViewOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setMapView(option.id)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm academic-transition ${
                        mapView === option.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={option.icon} size={14} />
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Map */}
              <div className="relative bg-muted/30 rounded-lg h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                  {/* Campus paths */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M10,50 Q30,30 50,50 Q70,70 90,50"
                      stroke="#94A3B8"
                      strokeWidth="0.5"
                      fill="none"
                      strokeDasharray="2,2"
                    />
                    <path
                      d="M50,10 Q50,30 30,50 Q50,70 50,90"
                      stroke="#94A3B8"
                      strokeWidth="0.5"
                      fill="none"
                      strokeDasharray="2,2"
                    />
                  </svg>

                  {/* Building markers */}
                  {buildings.map((building) => (
                    <button
                      key={building.id}
                      onClick={() => setSelectedBuilding(building.id)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 academic-transition ${
                        selectedBuilding === building.id ? 'scale-110' : 'hover:scale-105'
                      }`}
                      style={{
                        left: `${building.coordinates.x}%`,
                        top: `${building.coordinates.y}%`
                      }}
                    >
                      <div className={`w-12 h-12 ${building.color} rounded-lg flex items-center justify-center academic-shadow-lg ${
                        selectedBuilding === building.id ? 'ring-4 ring-primary/30' : ''
                      }`}>
                        <Icon name="Building" size={20} className="text-white" />
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card px-2 py-1 rounded text-xs font-medium text-foreground academic-shadow whitespace-nowrap">
                        {building.name}
                      </div>
                      {/* Availability indicator */}
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        getAvailabilityColor(building.availableRooms, building.totalRooms)
                      }`}>
                        {building.availableRooms}
                      </div>
                    </button>
                  ))}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 academic-shadow">
                    <div className="text-xs font-medium text-foreground mb-2">Availability</div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <span className="text-muted-foreground">High (70%+)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <span className="text-muted-foreground">Medium (40-70%)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-3 h-3 bg-error rounded-full"></div>
                        <span className="text-muted-foreground">Low (&lt;40%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>4 buildings</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Circle" size={16} className="text-success" />
                    <span>70 rooms available</span>
                  </div>
                </div>
                <Link to="/room-explorer-discovery">
                  <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
                    Full Map View
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Building Details */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 academic-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 ${selectedBuildingData.color} rounded-lg flex items-center justify-center`}>
                  <Icon name="Building" size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedBuildingData.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedBuildingData.availableRooms} of {selectedBuildingData.totalRooms} available
                  </p>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full ${getAvailabilityColor(selectedBuildingData.availableRooms, selectedBuildingData.totalRooms)}`}
                  style={{ width: `${(selectedBuildingData.availableRooms / selectedBuildingData.totalRooms) * 100}%` }}
                ></div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Featured Rooms</h4>
                {selectedBuildingData.rooms.map((room) => (
                  <div key={room.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${room.available ? 'bg-success' : 'bg-error'}`}></div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{room.name}</div>
                        <div className="text-xs text-muted-foreground">Floor {room.floor} • {room.capacity} people</div>
                      </div>
                    </div>
                    <Button
                      variant={room.available ? "default" : "outline"}
                      size="xs"
                      disabled={!room.available}
                      onClick={() => handleRoomSelect(room.id)}
                    >
                      {room.available ? 'Book' : 'Occupied'}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Link to="/room-explorer-discovery">
                  <Button variant="outline" fullWidth iconName="Search" iconPosition="left">
                    View All Rooms
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card rounded-xl p-6 academic-shadow">
              <h3 className="font-semibold text-foreground mb-4">Campus Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Rooms</span>
                  <span className="font-medium text-foreground">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Available Now</span>
                  <span className="font-medium text-success">70</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Peak Hours</span>
                  <span className="font-medium text-foreground">2-4 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Booking</span>
                  <span className="font-medium text-foreground">2.5 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusMapIntegration;