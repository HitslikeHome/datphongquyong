import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AvailabilityHeatmap = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  
  const buildings = [
    { id: 'all', name: 'All Buildings', spaces: 156 },
    { id: 'library', name: 'Main Library', spaces: 45 },
    { id: 'science', name: 'Science Block', spaces: 38 },
    { id: 'engineering', name: 'Engineering Wing', spaces: 42 },
    { id: 'admin', name: 'Admin Building', spaces: 31 }
  ];

  const timeSlots = [
    { time: '8:00 AM', availability: 85, status: 'high' },
    { time: '9:00 AM', availability: 72, status: 'medium' },
    { time: '10:00 AM', availability: 45, status: 'low' },
    { time: '11:00 AM', availability: 38, status: 'low' },
    { time: '12:00 PM', availability: 62, status: 'medium' },
    { time: '1:00 PM', availability: 78, status: 'high' },
    { time: '2:00 PM', availability: 55, status: 'medium' },
    { time: '3:00 PM', availability: 41, status: 'low' },
    { time: '4:00 PM', availability: 67, status: 'medium' },
    { time: '5:00 PM', availability: 89, status: 'high' }
  ];

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'high': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'high': return 'High Availability';
      case 'medium': return 'Moderate Availability';
      case 'low': return 'Limited Availability';
      default: return 'No Data';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Real-Time Availability</h2>
          <p className="text-sm text-muted-foreground">Live campus space availability heatmap</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={16} className="text-success animate-pulse" />
          <span className="text-sm font-medium text-success">Live Data</span>
        </div>
      </div>

      {/* Building Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {buildings.map((building) => (
          <button
            key={building.id}
            onClick={() => setSelectedBuilding(building.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
              selectedBuilding === building.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {building.name}
            <span className="ml-2 text-xs opacity-75">({building.spaces})</span>
          </button>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground mb-2">
          <div>Time</div>
          <div>Available</div>
          <div>Status</div>
          <div>Trend</div>
          <div>Action</div>
        </div>
        
        {timeSlots.map((slot, index) => (
          <div key={index} className="grid grid-cols-5 gap-2 items-center py-2 hover:bg-muted/50 rounded-lg px-2 transition-smooth">
            <div className="font-medium text-foreground">{slot.time}</div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(slot.status)}`}></div>
              <span className="text-sm font-medium">{slot.availability}%</span>
            </div>
            <div className="text-sm text-muted-foreground">{getAvailabilityText(slot.status)}</div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={slot.availability > 60 ? "TrendingUp" : "TrendingDown"} 
                size={14} 
                className={slot.availability > 60 ? "text-success" : "text-error"} 
              />
              <span className="text-xs text-muted-foreground">
                {slot.availability > 60 ? '+5%' : '-3%'}
              </span>
            </div>
            <button className="text-xs text-primary hover:text-primary/80 font-medium">
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-xs text-muted-foreground">High (&gt;70%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded-full"></div>
          <span className="text-xs text-muted-foreground">Moderate (40-70%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded-full"></div>
          <span className="text-xs text-muted-foreground">Limited (&lt;40%)</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityHeatmap;