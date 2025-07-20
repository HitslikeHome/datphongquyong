import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SpaceCard from './components/SpaceCard';
import FilterPanel from './components/FilterPanel';
import CampusMap from './components/CampusMap';
import SpaceDetailModal from './components/SpaceDetailModal';
import QuickStats from './components/QuickStats';

const SpaceDiscoveryCenter = () => {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    amenities: [],
    buildings: [],
    capacity: '',
    availability: 'all',
    rating: 0,
    hasVirtualTour: false,
    isPopular: false
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, map
  const [sortBy, setSortBy] = useState('name'); // name, rating, capacity, availability
  const [favorites, setFavorites] = useState(new Set());
  const [recentViews, setRecentViews] = useState([]);

  // Mock data for spaces
  const mockSpaces = [
    {
      id: 'conf-001',
      name: 'Innovation Conference Room',
      building: 'Main Building (A)',
      floor: 'Floor 3, Room A301',
      category: 'Conference Room',
      capacity: 12,
      rating: 4.8,
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      amenities: [
        { name: 'Projector', icon: 'Projector', description: '4K Ultra HD projector with wireless connectivity' },
        { name: 'Whiteboard', icon: 'PenTool', description: 'Large interactive whiteboard' },
        { name: 'Video Conferencing', icon: 'Video', description: 'Professional video conferencing setup' },
        { name: 'Air Conditioning', icon: 'Wind', description: 'Climate controlled environment' },
        { name: 'High-Speed WiFi', icon: 'Wifi', description: 'Dedicated high-speed internet connection' }
      ],
      weeklyBookings: 24,
      avgBookingDuration: 2.5,
      isPopular: true,
      has360Tour: true,
      isFavorite: false
    },
    {
      id: 'study-002',
      name: 'Quiet Study Pod Alpha',
      building: 'Library Complex (D)',
      floor: 'Floor 2, Room D205',
      category: 'Study Room',
      capacity: 4,
      rating: 4.6,
      availability: 'busy',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
      amenities: [
        { name: 'Power Outlets', icon: 'Zap', description: 'Multiple power outlets for devices' },
        { name: 'Whiteboard', icon: 'PenTool', description: 'Small whiteboard for brainstorming' },
        { name: 'Quiet Zone', icon: 'Volume', description: 'Soundproofed for focused study' },
        { name: 'Natural Light', icon: 'Sun', description: 'Large windows with natural lighting' }
      ],
      weeklyBookings: 18,
      avgBookingDuration: 3.2,
      isPopular: false,
      has360Tour: false,
      isFavorite: false
    },
    {
      id: 'lab-003',
      name: 'Advanced Computing Lab',
      building: 'Engineering Wing (C)',
      floor: 'Floor 1, Room C102',
      category: 'Computer Lab',
      capacity: 30,
      rating: 4.9,
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
      amenities: [
        { name: 'High-End Computers', icon: 'Monitor', description: '30 workstations with latest hardware' },
        { name: 'Software Suite', icon: 'Code', description: 'Complete development and design software' },
        { name: 'Projector', icon: 'Projector', description: 'Large projection screen for presentations' },
        { name: 'Air Conditioning', icon: 'Wind', description: 'Optimal temperature for equipment' },
        { name: 'Network Access', icon: 'Wifi', description: 'High-speed network and internet access' }
      ],
      weeklyBookings: 32,
      avgBookingDuration: 2.8,
      isPopular: true,
      has360Tour: true,
      isFavorite: false
    },
    {
      id: 'collab-004',
      name: 'Creative Collaboration Hub',
      building: 'Innovation Hub (F)',
      floor: 'Floor 1, Room F105',
      category: 'Collaborative Zone',
      capacity: 8,
      rating: 4.7,
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=800&h=600&fit=crop',
      amenities: [
        { name: 'Flexible Furniture', icon: 'Move', description: 'Modular furniture for different setups' },
        { name: 'Digital Whiteboard', icon: 'PenTool', description: 'Interactive digital whiteboard' },
        { name: 'Wireless Display', icon: 'Cast', description: 'Wireless screen sharing capabilities' },
        { name: 'Coffee Station', icon: 'Coffee', description: 'Built-in coffee and refreshment area' },
        { name: 'Natural Light', icon: 'Sun', description: 'Floor-to-ceiling windows' }
      ],
      weeklyBookings: 21,
      avgBookingDuration: 2.1,
      isPopular: false,
      has360Tour: false,
      isFavorite: false
    },
    {
      id: 'present-005',
      name: 'Grand Presentation Hall',
      building: 'Main Building (A)',
      floor: 'Floor 1, Hall A101',
      category: 'Presentation Hall',
      capacity: 150,
      rating: 4.9,
      availability: 'occupied',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
      amenities: [
        { name: 'Professional AV System', icon: 'Volume2', description: 'State-of-the-art audio-visual system' },
        { name: 'Stage Lighting', icon: 'Lightbulb', description: 'Professional stage lighting setup' },
        { name: 'Live Streaming', icon: 'Radio', description: 'Built-in live streaming capabilities' },
        { name: 'Tiered Seating', icon: 'Users', description: 'Comfortable tiered seating arrangement' },
        { name: 'Accessibility', icon: 'Accessibility', description: 'Full wheelchair accessibility' }
      ],
      weeklyBookings: 8,
      avgBookingDuration: 4.5,
      isPopular: true,
      has360Tour: true,
      isFavorite: false
    },
    {
      id: 'research-006',
      name: 'Biotech Research Suite',
      building: 'Research Center (E)',
      floor: 'Floor 3, Suite E301',
      category: 'Research Facility',
      capacity: 6,
      rating: 4.8,
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
      amenities: [
        { name: 'Lab Equipment', icon: 'Microscope', description: 'Advanced research equipment available' },
        { name: 'Fume Hood', icon: 'Wind', description: 'Safety fume hood for chemical work' },
        { name: 'Data Analysis Station', icon: 'BarChart', description: 'High-performance computing for analysis' },
        { name: 'Storage Facilities', icon: 'Archive', description: 'Secure storage for research materials' },
        { name: 'Emergency Systems', icon: 'Shield', description: 'Complete safety and emergency systems' }
      ],
      weeklyBookings: 15,
      avgBookingDuration: 4.8,
      isPopular: false,
      has360Tour: false,
      isFavorite: false
    }
  ];

  useEffect(() => {
    // Initialize spaces data
    setSpaces(mockSpaces);
    setFilteredSpaces(mockSpaces);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...spaces];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(space =>
        space.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        space.building.toLowerCase().includes(filters.search.toLowerCase()) ||
        space.category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(space =>
        filters.categories.some(cat => space.category.toLowerCase().includes(cat.replace('-', ' ')))
      );
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(space =>
        filters.amenities.every(amenity =>
          space.amenities.some(spaceAmenity => spaceAmenity.name.toLowerCase().includes(amenity))
        )
      );
    }

    // Building filter
    if (filters.buildings.length > 0) {
      filtered = filtered.filter(space =>
        filters.buildings.includes(space.building)
      );
    }

    // Capacity filter
    if (filters.capacity) {
      const [min, max] = filters.capacity === '50+' ? [51, 999] : filters.capacity.split('-').map(Number);
      filtered = filtered.filter(space =>
        space.capacity >= min && space.capacity <= (max || 999)
      );
    }

    // Availability filter
    if (filters.availability !== 'all') {
      filtered = filtered.filter(space => space.availability === filters.availability);
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(space => space.rating >= filters.rating);
    }

    // Special features filters
    if (filters.hasVirtualTour) {
      filtered = filtered.filter(space => space.has360Tour);
    }

    if (filters.isPopular) {
      filtered = filtered.filter(space => space.isPopular);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'capacity':
          return b.capacity - a.capacity;
        case 'availability':
          const availabilityOrder = { available: 0, busy: 1, occupied: 2 };
          return availabilityOrder[a.availability] - availabilityOrder[b.availability];
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredSpaces(filtered);
  }, [spaces, filters, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      categories: [],
      amenities: [],
      buildings: [],
      capacity: '',
      availability: 'all',
      rating: 0,
      hasVirtualTour: false,
      isPopular: false
    };
    setFilters(clearedFilters);
  };

  const handleViewDetails = (space) => {
    setSelectedSpace(space);
    setIsDetailModalOpen(true);
    
    // Add to recent views
    setRecentViews(prev => {
      const filtered = prev.filter(id => id !== space.id);
      return [space.id, ...filtered].slice(0, 5);
    });
  };

  const handleBookNow = (space) => {
    navigate('/intelligent-booking-engine', { state: { selectedSpace: space } });
  };

  const handleToggleFavorite = (spaceId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(spaceId)) {
        newFavorites.delete(spaceId);
      } else {
        newFavorites.add(spaceId);
      }
      return newFavorites;
    });

    // Update spaces data
    setSpaces(prev => prev.map(space => ({
      ...space,
      isFavorite: space.id === spaceId ? !space.isFavorite : space.isFavorite
    })));
  };

  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building.id === selectedBuilding ? null : building.id);
    if (building.id !== selectedBuilding) {
      setFilters(prev => ({
        ...prev,
        buildings: [building.name]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        buildings: []
      }));
    }
  };

  const totalSpaces = spaces.length;
  const availableSpaces = spaces.filter(s => s.availability === 'available').length;
  const popularSpaces = spaces.filter(s => s.isPopular).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Space Discovery Center</h1>
                <p className="text-muted-foreground">
                  Explore USTH's diverse academic spaces and find the perfect environment for your needs
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className="flex items-center space-x-2"
                >
                  <Icon name="Filter" size={16} />
                  <span>Filters</span>
                  {Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v && v !== 'all' && v !== 0) && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full ml-2">
                      Active
                    </span>
                  )}
                </Button>
                
                <div className="flex bg-muted rounded-lg p-1">
                  {[
                    { id: 'grid', icon: 'Grid3X3', label: 'Grid' },
                    { id: 'list', icon: 'List', label: 'List' },
                    { id: 'map', icon: 'Map', label: 'Map' }
                  ].map((view) => (
                    <Button
                      key={view.id}
                      variant={viewMode === view.id ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode(view.id)}
                      className="px-3"
                    >
                      <Icon name={view.icon} size={16} />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <QuickStats
              totalSpaces={totalSpaces}
              availableSpaces={availableSpaces}
              popularSpaces={popularSpaces}
              recentViews={recentViews.length}
            />
          </div>

          <div className="flex gap-6">
            {/* Filter Panel */}
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isOpen={isFilterPanelOpen}
              onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Sort Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Input
                      type="search"
                      placeholder="Search spaces, buildings, or amenities..."
                      value={filters.search}
                      onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                      className="pl-10"
                    />
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="name">Name</option>
                      <option value="rating">Rating</option>
                      <option value="capacity">Capacity</option>
                      <option value="availability">Availability</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{filteredSpaces.length} of {totalSpaces} spaces</span>
                </div>
              </div>

              {/* Campus Map View */}
              {viewMode === 'map' && (
                <div className="mb-6">
                  <CampusMap
                    onBuildingSelect={handleBuildingSelect}
                    selectedBuilding={selectedBuilding}
                  />
                </div>
              )}

              {/* Spaces Grid/List */}
              {viewMode !== 'map' && (
                <div className={
                  viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
                }>
                  {filteredSpaces.map((space) => (
                    <SpaceCard
                      key={space.id}
                      space={{
                        ...space,
                        isFavorite: favorites.has(space.id)
                      }}
                      onViewDetails={handleViewDetails}
                      onBookNow={handleBookNow}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredSpaces.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No spaces found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms to find more spaces.
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Space Detail Modal */}
      <SpaceDetailModal
        space={selectedSpace}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onBookNow={handleBookNow}
      />
    </div>
  );
};

export default SpaceDiscoveryCenter;