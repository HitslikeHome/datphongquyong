import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onViewToggle, currentView, resultsCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [quickFilters, setQuickFilters] = useState({
    availableNow: false,
    hasProjector: false,
    quietSpace: false,
    groupFriendly: false
  });

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery, quickFilters);
  };

  const handleQuickFilterToggle = (filter) => {
    const updatedFilters = {
      ...quickFilters,
      [filter]: !quickFilters[filter]
    };
    setQuickFilters(updatedFilters);
    onSearch(searchQuery, updatedFilters);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setQuickFilters({
      availableNow: false,
      hasProjector: false,
      quietSpace: false,
      groupFriendly: false
    });
    onSearch('', {});
  };

  const quickFilterOptions = [
    { key: 'availableNow', label: 'Available Now', icon: 'Clock', color: 'success' },
    { key: 'hasProjector', label: 'Has Projector', icon: 'Monitor', color: 'primary' },
    { key: 'quietSpace', label: 'Quiet Space', icon: 'Volume', color: 'accent' },
    { key: 'groupFriendly', label: 'Group Friendly', icon: 'Users', color: 'secondary' }
  ];

  const getActiveFiltersCount = () => {
    return Object.values(quickFilters).filter(Boolean).length;
  };

  return (
    <div className="bg-card rounded-lg border border-border academic-shadow">
      {/* Main Search Bar */}
      <form onSubmit={handleSearch} className="p-4">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Search rooms by name, building, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
          
          <Button
            type="submit"
            variant="default"
            iconName="Search"
            iconPosition="left"
          >
            Search
          </Button>
          
          <Button
            type="button"
            variant="outline"
            iconName="SlidersHorizontal"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          >
            Filters
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </Button>
        </div>
      </form>

      {/* Quick Filters */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          {quickFilterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => handleQuickFilterToggle(option.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium academic-transition ${
                quickFilters[option.key]
                  ? `bg-${option.color} text-${option.color}-foreground`
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon name={option.icon} size={14} />
              <span>{option.label}</span>
              {quickFilters[option.key] && (
                <Icon name="Check" size={12} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary & View Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{resultsCount}</span> rooms found
          </p>
          {(searchQuery || getActiveFiltersCount() > 0) && (
            <button
              onClick={clearSearch}
              className="text-sm text-primary hover:text-primary/80 academic-transition"
            >
              Clear all filters
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <div className="flex items-center bg-background rounded-lg p-1">
            <button
              onClick={() => onViewToggle('grid')}
              className={`p-2 rounded-md academic-transition ${
                currentView === 'grid' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewToggle('list')}
              className={`p-2 rounded-md academic-transition ${
                currentView === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
            <button
              onClick={() => onViewToggle('map')}
              className={`p-2 rounded-md academic-transition ${
                currentView === 'map' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Map" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Search (Expandable) */}
      {isAdvancedOpen && (
        <div className="border-t border-border p-4 bg-muted/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Building</label>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                <option value="">All Buildings</option>
                <option value="main">Main Academic Building</option>
                <option value="science">Science Complex</option>
                <option value="library">Library Building</option>
                <option value="student-center">Student Center</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Capacity</label>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                <option value="">Any Size</option>
                <option value="1-4">1-4 people</option>
                <option value="5-12">5-12 people</option>
                <option value="13-25">13-25 people</option>
                <option value="25+">25+ people</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Time</label>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                <option value="">Anytime</option>
                <option value="now">Available Now</option>
                <option value="next-hour">Next Hour</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsAdvancedOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" size="sm" iconName="Search" iconPosition="left">
              Apply Advanced Search
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;