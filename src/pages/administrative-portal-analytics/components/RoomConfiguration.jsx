import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RoomConfiguration = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddRoom, setShowAddRoom] = useState(false);

  const buildings = [
    { id: 'all', name: 'All Buildings' },
    { id: 'main', name: 'Main Academic Building' },
    { id: 'library', name: 'Central Library' },
    { id: 'science', name: 'Science Complex' },
    { id: 'engineering', name: 'Engineering Block' },
    { id: 'student', name: 'Student Center' }
  ];

  const rooms = [
    {
      id: 1,
      name: "Study Room A-101",
      building: "Main Academic Building",
      floor: 1,
      capacity: 8,
      type: "Study Room",
      status: "Available",
      amenities: ["Whiteboard", "Projector", "WiFi", "Power Outlets"],
      hourlyRate: 15,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
      lastMaintenance: "2025-01-15",
      totalBookings: 234,
      utilizationRate: 78
    },
    {
      id: 2,
      name: "Conference Room B-205",
      building: "Main Academic Building",
      floor: 2,
      capacity: 16,
      type: "Conference Room",
      status: "Maintenance",
      amenities: ["Video Conferencing", "Whiteboard", "Projector", "WiFi", "Coffee Machine"],
      hourlyRate: 35,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      lastMaintenance: "2025-01-18",
      totalBookings: 189,
      utilizationRate: 85
    },
    {
      id: 3,
      name: "Lab Space C-301",
      building: "Science Complex",
      floor: 3,
      capacity: 24,
      type: "Lab Space",
      status: "Available",
      amenities: ["Lab Equipment", "Safety Shower", "Fume Hood", "WiFi"],
      hourlyRate: 45,
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400",
      lastMaintenance: "2025-01-10",
      totalBookings: 156,
      utilizationRate: 92
    },
    {
      id: 4,
      name: "Group Study D-102",
      building: "Central Library",
      floor: 1,
      capacity: 12,
      type: "Group Space",
      status: "Available",
      amenities: ["Whiteboard", "WiFi", "Power Outlets", "Comfortable Seating"],
      hourlyRate: 20,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      lastMaintenance: "2025-01-12",
      totalBookings: 298,
      utilizationRate: 67
    },
    {
      id: 5,
      name: "Lecture Hall E-001",
      building: "Engineering Block",
      floor: 0,
      capacity: 120,
      type: "Lecture Hall",
      status: "Reserved",
      amenities: ["Audio System", "Projector", "Microphone", "WiFi", "Recording Equipment"],
      hourlyRate: 80,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400",
      lastMaintenance: "2025-01-08",
      totalBookings: 87,
      utilizationRate: 94
    },
    {
      id: 6,
      name: "Event Space F-200",
      building: "Student Center",
      floor: 2,
      capacity: 200,
      type: "Event Space",
      status: "Available",
      amenities: ["Stage", "Audio System", "Lighting", "WiFi", "Catering Setup"],
      hourlyRate: 120,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      lastMaintenance: "2025-01-05",
      totalBookings: 45,
      utilizationRate: 56
    }
  ];

  const amenityOptions = [
    "WiFi", "Projector", "Whiteboard", "Audio System", "Video Conferencing",
    "Power Outlets", "Air Conditioning", "Natural Light", "Coffee Machine",
    "Lab Equipment", "Safety Equipment", "Recording Equipment", "Stage",
    "Lighting", "Microphone", "Comfortable Seating", "Catering Setup"
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBuilding = selectedBuilding === 'all' || 
                           room.building === buildings.find(b => b.id === selectedBuilding)?.name;
    
    return matchesSearch && matchesBuilding;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-success/10 text-success';
      case 'maintenance':
        return 'bg-warning/10 text-warning';
      case 'reserved':
        return 'bg-primary/10 text-primary';
      case 'unavailable':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getUtilizationColor = (rate) => {
    if (rate >= 80) return 'text-success';
    if (rate >= 60) return 'text-warning';
    return 'text-error';
  };

  const handleRoomAction = (action, roomId) => {
    console.log(`${action} room with ID: ${roomId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Icon name="Settings" size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Room Configuration</h2>
              <p className="text-sm text-muted-foreground">Manage room settings and availability</p>
            </div>
          </div>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowAddRoom(true)}
          >
            Add Room
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <Input
              type="search"
              placeholder="Search rooms by name, building, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-card rounded-lg border border-border academic-shadow overflow-hidden">
            {/* Room Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                  {room.status}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                ${room.hourlyRate}/hour
              </div>
            </div>

            {/* Room Details */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">{room.building} • Floor {room.floor}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">Capacity: {room.capacity}</div>
                  <div className="text-xs text-muted-foreground">{room.type}</div>
                </div>
              </div>

              {/* Utilization Stats */}
              <div className="flex items-center justify-between mb-3 p-2 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground">{room.totalBookings}</div>
                  <div className="text-xs text-muted-foreground">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-medium ${getUtilizationColor(room.utilizationRate)}`}>
                    {room.utilizationRate}%
                  </div>
                  <div className="text-xs text-muted-foreground">Utilization</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground">{room.lastMaintenance}</div>
                  <div className="text-xs text-muted-foreground">Last Maintenance</div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">AMENITIES</h4>
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleRoomAction('view', room.id)}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md academic-transition"
                    title="View Details"
                  >
                    <Icon name="Eye" size={16} />
                  </button>
                  <button
                    onClick={() => handleRoomAction('edit', room.id)}
                    className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-md academic-transition"
                    title="Edit Room"
                  >
                    <Icon name="Edit" size={16} />
                  </button>
                  <button
                    onClick={() => handleRoomAction('schedule', room.id)}
                    className="p-2 text-muted-foreground hover:text-success hover:bg-success/10 rounded-md academic-transition"
                    title="Manage Schedule"
                  >
                    <Icon name="Calendar" size={16} />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Settings"
                    onClick={() => handleRoomAction('configure', room.id)}
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="bg-card rounded-lg border border-border p-12 text-center academic-shadow">
          <Icon name="Home" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No rooms found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters.</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Add New Room
          </Button>
        </div>
      )}

      {/* Summary */}
      <div className="bg-card rounded-lg border border-border p-4 academic-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-sm">
              <span className="text-muted-foreground">Showing: </span>
              <span className="font-medium text-foreground">{filteredRooms.length} rooms</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Total Capacity: </span>
              <span className="font-medium text-foreground">
                {filteredRooms.reduce((sum, room) => sum + room.capacity, 0)} people
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Avg. Utilization: </span>
              <span className="font-medium text-foreground">
                {Math.round(filteredRooms.reduce((sum, room) => sum + room.utilizationRate, 0) / filteredRooms.length)}%
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export Data
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
              Sync Rooms
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomConfiguration;