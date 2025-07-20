import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeOccupancy = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('all');

  const buildings = [
    { id: 'all', name: 'All Buildings', totalRooms: 485, occupied: 329 },
    { id: 'main', name: 'Main Academic Building', totalRooms: 120, occupied: 89 },
    { id: 'library', name: 'Central Library', totalRooms: 85, occupied: 72 },
    { id: 'science', name: 'Science Complex', totalRooms: 95, occupied: 61 },
    { id: 'engineering', name: 'Engineering Block', totalRooms: 110, occupied: 78 },
    { id: 'student', name: 'Student Center', totalRooms: 75, occupied: 29 }
  ];

  const roomTypes = [
    {
      id: 1,
      type: "Study Rooms",
      total: 145,
      occupied: 98,
      available: 47,
      icon: "BookOpen",
      color: "bg-blue-500"
    },
    {
      id: 2,
      type: "Conference Rooms",
      total: 68,
      occupied: 45,
      available: 23,
      icon: "Users",
      color: "bg-green-500"
    },
    {
      id: 3,
      type: "Lecture Halls",
      total: 32,
      occupied: 28,
      available: 4,
      icon: "Presentation",
      color: "bg-purple-500"
    },
    {
      id: 4,
      type: "Lab Spaces",
      total: 89,
      occupied: 56,
      available: 33,
      icon: "Flask",
      color: "bg-orange-500"
    },
    {
      id: 5,
      type: "Group Spaces",
      total: 95,
      occupied: 67,
      available: 28,
      icon: "Users2",
      color: "bg-teal-500"
    },
    {
      id: 6,
      type: "Event Spaces",
      total: 56,
      occupied: 35,
      available: 21,
      icon: "Calendar",
      color: "bg-red-500"
    }
  ];

  const getOccupancyPercentage = (occupied, total) => {
    return Math.round((occupied / total) * 100);
  };

  const getOccupancyStatus = (percentage) => {
    if (percentage >= 90) return { label: 'High', color: 'text-error' };
    if (percentage >= 70) return { label: 'Moderate', color: 'text-warning' };
    return { label: 'Low', color: 'text-success' };
  };

  const selectedBuildingData = buildings.find(b => b.id === selectedBuilding);

  return (
    <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Activity" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Real-Time Occupancy</h2>
            <p className="text-sm text-muted-foreground">Live space utilization across campus</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full availability-pulse"></div>
          <span className="text-sm text-muted-foreground">Live Data</span>
        </div>
      </div>

      {/* Building Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Select Building
        </label>
        <select
          value={selectedBuilding}
          onChange={(e) => setSelectedBuilding(e.target.value)}
          className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {buildings.map((building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
        </select>
      </div>

      {/* Building Overview */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-foreground">{selectedBuildingData.name}</h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Occupied: </span>
              <span className="font-medium text-foreground">{selectedBuildingData.occupied}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Available: </span>
              <span className="font-medium text-foreground">
                {selectedBuildingData.totalRooms - selectedBuildingData.occupied}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full academic-transition"
            style={{
              width: `${getOccupancyPercentage(selectedBuildingData.occupied, selectedBuildingData.totalRooms)}%`
            }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {getOccupancyPercentage(selectedBuildingData.occupied, selectedBuildingData.totalRooms)}% Occupied
          </span>
          <span className={`text-xs font-medium ${getOccupancyStatus(getOccupancyPercentage(selectedBuildingData.occupied, selectedBuildingData.totalRooms)).color}`}>
            {getOccupancyStatus(getOccupancyPercentage(selectedBuildingData.occupied, selectedBuildingData.totalRooms)).label} Usage
          </span>
        </div>
      </div>

      {/* Room Types Breakdown */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground mb-3">Room Type Breakdown</h3>
        {roomTypes.map((roomType) => {
          const percentage = getOccupancyPercentage(roomType.occupied, roomType.total);
          const status = getOccupancyStatus(percentage);
          
          return (
            <div key={roomType.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
              <div className={`flex items-center justify-center w-10 h-10 ${roomType.color}/10 rounded-lg`}>
                <Icon name={roomType.icon} size={18} className={`${roomType.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{roomType.type}</span>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>Occupied: {roomType.occupied}</span>
                    <span>Available: {roomType.available}</span>
                    <span className={`font-medium ${status.color}`}>{percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-border rounded-full h-1.5">
                  <div
                    className={`${roomType.color} h-1.5 rounded-full academic-transition`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last updated: 2 minutes ago</span>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-primary/10 text-primary rounded-md hover:bg-primary/20 academic-transition">
              <Icon name="RefreshCw" size={14} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted text-muted-foreground rounded-md hover:bg-muted/80 academic-transition">
              <Icon name="Download" size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeOccupancy;