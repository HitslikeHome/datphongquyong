import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ selectedBuilding, onBuildingSelect, onRoomSelect, buildings }) => {
  const [mapZoom, setMapZoom] = useState(14);

  const handleBuildingClick = (building) => {
    onBuildingSelect(building);
  };

  const handleRoomClick = (room) => {
    onRoomSelect(room);
  };

  return (
    <div className="h-full bg-card rounded-lg border border-border academic-shadow">
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Map" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Campus Map</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ZoomIn"
            onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="ZoomOut"
            onClick={() => setMapZoom(prev => Math.max(prev - 1, 10))}
          />
          <Button variant="outline" size="sm" iconName="RotateCcw">
            Reset
          </Button>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="UIH Campus Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=40.7589,-73.9851&z=${mapZoom}&output=embed`}
          className="rounded-b-lg"
        />
        
        {/* Building Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {buildings.map((building) => (
            <div
              key={building.id}
              className={`absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                selectedBuilding?.id === building.id ? 'z-20' : 'z-10'
              }`}
              style={{
                left: `${building.mapPosition.x}%`,
                top: `${building.mapPosition.y}%`
              }}
              onClick={() => handleBuildingClick(building)}
            >
              <div className={`relative ${
                selectedBuilding?.id === building.id 
                  ? 'scale-110' :'hover:scale-105'
              } academic-transition`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  selectedBuilding?.id === building.id
                    ? 'bg-primary border-primary-foreground text-primary-foreground'
                    : 'bg-card border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                } academic-shadow`}>
                  <span className="text-xs font-bold">{building.code}</span>
                </div>
                
                {/* Room Count Badge */}
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  {building.availableRooms}
                </div>
                
                {/* Building Info Tooltip */}
                {selectedBuilding?.id === building.id && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-3 academic-shadow-lg min-w-48 z-30">
                    <h4 className="font-semibold text-foreground mb-1">{building.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{building.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Available Rooms</span>
                      <span className="font-medium text-success">{building.availableRooms}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Total Capacity</span>
                      <span className="font-medium text-foreground">{building.totalCapacity}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Legend */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground">Legend</h4>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full availability-pulse"></div>
            <span>Live Updates</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Selected Building</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Available Rooms</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-card border border-primary rounded-full"></div>
            <span className="text-muted-foreground">Other Buildings</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">High Demand</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;