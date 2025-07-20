import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CampusMap = ({ onBuildingSelect, selectedBuilding }) => {
  const [mapView, setMapView] = useState('satellite'); // satellite, street, hybrid

  const buildings = [
    {
      id: 'main-building',
      name: 'Main Building (A)',
      coordinates: { lat: 21.0285, lng: 105.8542 },
      totalSpaces: 45,
      availableSpaces: 23,
      occupancyRate: 49,
      floors: 5,
      color: 'bg-primary'
    },
    {
      id: 'science-block',
      name: 'Science Block (B)',
      coordinates: { lat: 21.0290, lng: 105.8548 },
      totalSpaces: 32,
      availableSpaces: 18,
      occupancyRate: 44,
      floors: 4,
      color: 'bg-secondary'
    },
    {
      id: 'engineering-wing',
      name: 'Engineering Wing (C)',
      coordinates: { lat: 21.0280, lng: 105.8535 },
      totalSpaces: 28,
      availableSpaces: 12,
      occupancyRate: 57,
      floors: 3,
      color: 'bg-accent'
    },
    {
      id: 'library-complex',
      name: 'Library Complex (D)',
      coordinates: { lat: 21.0275, lng: 105.8545 },
      totalSpaces: 67,
      availableSpaces: 34,
      occupancyRate: 49,
      floors: 6,
      color: 'bg-success'
    },
    {
      id: 'research-center',
      name: 'Research Center (E)',
      coordinates: { lat: 21.0295, lng: 105.8540 },
      totalSpaces: 24,
      availableSpaces: 8,
      occupancyRate: 67,
      floors: 4,
      color: 'bg-warning'
    },
    {
      id: 'innovation-hub',
      name: 'Innovation Hub (F)',
      coordinates: { lat: 21.0285, lng: 105.8550 },
      totalSpaces: 19,
      availableSpaces: 15,
      occupancyRate: 21,
      floors: 2,
      color: 'bg-cta'
    }
  ];

  const getOccupancyColor = (rate) => {
    if (rate < 30) return 'text-success';
    if (rate < 70) return 'text-warning';
    return 'text-error';
  };

  const getOccupancyStatus = (rate) => {
    if (rate < 30) return 'Low';
    if (rate < 70) return 'Moderate';
    return 'High';
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Map" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">USTH Campus Map</h2>
              <p className="text-sm text-muted-foreground">Real-time space availability</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Live Data</span>
            </div>
            
            <div className="flex bg-muted rounded-lg p-1">
              {[
                { id: 'satellite', icon: 'Satellite', label: 'Satellite' },
                { id: 'street', icon: 'Map', label: 'Street' },
                { id: 'hybrid', icon: 'Layers', label: 'Hybrid' }
              ].map((view) => (
                <Button
                  key={view.id}
                  variant={mapView === view.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setMapView(view.id)}
                  className="px-2 py-1"
                >
                  <Icon name={view.icon} size={14} />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-muted">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="USTH Campus Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=21.0285,105.8542&z=17&output=embed"
          className="w-full h-full"
        />

        {/* Building Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {buildings.map((building, index) => (
            <div
              key={building.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${20 + (index % 3) * 30}%`,
                top: `${20 + Math.floor(index / 3) * 40}%`
              }}
            >
              <Button
                variant={selectedBuilding === building.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => onBuildingSelect(building)}
                className={`${building.color} ${
                  selectedBuilding === building.id 
                    ? 'text-white shadow-lg scale-110' 
                    : 'bg-card/90 backdrop-blur-sm hover:scale-105'
                } transition-all duration-200`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Building" size={16} />
                  <span className="font-medium">{building.name.split(' ')[0]}</span>
                </div>
              </Button>
              
              {/* Availability Indicator */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-card rounded-full border-2 border-background flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full ${
                  building.occupancyRate < 50 ? 'bg-success' : 
                  building.occupancyRate < 80 ? 'bg-warning' : 'bg-error'
                } ${building.occupancyRate < 50 ? 'animate-pulse' : ''}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="outline" size="sm" className="bg-card/90 backdrop-blur-sm">
            <Icon name="Plus" size={16} />
          </Button>
          <Button variant="outline" size="sm" className="bg-card/90 backdrop-blur-sm">
            <Icon name="Minus" size={16} />
          </Button>
          <Button variant="outline" size="sm" className="bg-card/90 backdrop-blur-sm">
            <Icon name="Locate" size={16} />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 border border-border">
          <h4 className="text-xs font-semibold text-foreground mb-2">Occupancy Status</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Low (&lt;30%)</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Moderate (30-70%)</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">High (&gt;70%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Building Stats */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {buildings.map((building) => (
            <div
              key={building.id}
              className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                selectedBuilding === building.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => onBuildingSelect(building)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-3 h-3 rounded-full ${building.color}`}></div>
                <span className={`text-xs font-medium ${getOccupancyColor(building.occupancyRate)}`}>
                  {getOccupancyStatus(building.occupancyRate)}
                </span>
              </div>
              
              <h4 className="font-medium text-sm text-foreground mb-1 truncate">
                {building.name}
              </h4>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-medium text-success">{building.availableSpaces}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium text-foreground">{building.totalSpaces}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div
                    className={`h-1.5 rounded-full ${
                      building.occupancyRate < 50 ? 'bg-success' :
                      building.occupancyRate < 80 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${building.occupancyRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusMap;