import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterTabs = ({ activeFilter, onFilterChange, counts }) => {
  const filters = [
    { 
      key: 'all', 
      label: 'All Bookings', 
      icon: 'Calendar',
      count: counts.all 
    },
    { 
      key: 'upcoming', 
      label: 'Upcoming', 
      icon: 'Clock',
      count: counts.upcoming 
    },
    { 
      key: 'today', 
      label: 'Today', 
      icon: 'CalendarDays',
      count: counts.today 
    },
    { 
      key: 'past', 
      label: 'Past', 
      icon: 'History',
      count: counts.past 
    },
    { 
      key: 'recurring', 
      label: 'Recurring', 
      icon: 'Repeat',
      count: counts.recurring 
    }
  ];

  return (
    <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth whitespace-nowrap ${
            activeFilter === filter.key
              ? 'bg-card text-foreground shadow-card'
              : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
          }`}
        >
          <Icon name={filter.icon} size={16} />
          <span>{filter.label}</span>
          {filter.count > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
              activeFilter === filter.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted-foreground/20 text-muted-foreground'
            }`}>
              {filter.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;