import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookingCard from './components/BookingCard';
import BookingFilters from './components/BookingFilters';
import BookingCalendar from './components/BookingCalendar';
import BookingTimeline from './components/BookingTimeline';
import BookingStats from './components/BookingStats';
import QuickActions from './components/QuickActions';

const BookingManagementCenter = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    building: 'all',
    type: 'all'
  });

  // Mock booking data
  const mockBookings = [
    {
      id: 1,
      room: {
        name: "Study Room A-201",
        building: "Main Library",
        floor: 2,
        capacity: 6,
        type: "study-room",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
      },
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      duration: "2 hours",
      attendees: 4,
      status: "upcoming",
      purpose: "Group study session for Advanced Mathematics",
      equipment: ["Whiteboard", "Projector"],
      isRecurring: true,
      attendeesList: [
        { name: "Sarah Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { name: "Mike Chen", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
        { name: "Alex Rodriguez", avatar: "https://randomuser.me/api/portraits/men/4.jpg" }
      ]
    },
    {
      id: 2,
      room: {
        name: "Conference Room B-105",
        building: "Science Center",
        floor: 1,
        capacity: 12,
        type: "conference-room",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
      },
      startTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
      duration: "2 hours",
      attendees: 8,
      status: "active",
      purpose: "Research presentation and discussion",
      equipment: ["Video Conference", "Smart Board", "Audio System"],
      isRecurring: false,
      attendeesList: [
        { name: "Dr. Smith", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
        { name: "Lisa Wang", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
        { name: "John Miller", avatar: "https://randomuser.me/api/portraits/men/7.jpg" }
      ]
    },
    {
      id: 3,
      room: {
        name: "Lab C-301",
        building: "Engineering Hall",
        floor: 3,
        capacity: 20,
        type: "lab",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop"
      },
      startTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      duration: "2 hours",
      attendees: 15,
      status: "completed",
      purpose: "Computer Programming Lab Session",
      equipment: ["Computers", "Network Access", "Development Tools"],
      isRecurring: true,
      attendeesList: []
    },
    {
      id: 4,
      room: {
        name: "Meeting Room D-202",
        building: "Student Union",
        floor: 2,
        capacity: 8,
        type: "meeting-room",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
      },
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
      duration: "1 hour",
      attendees: 6,
      status: "upcoming",
      purpose: "Student Council Meeting",
      equipment: ["Projector", "Conference Phone"],
      isRecurring: true,
      attendeesList: [
        { name: "Jessica Brown", avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
        { name: "David Wilson", avatar: "https://randomuser.me/api/portraits/men/9.jpg" }
      ]
    },
    {
      id: 5,
      room: {
        name: "Classroom E-101",
        building: "Business School",
        floor: 1,
        capacity: 30,
        type: "classroom",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop"
      },
      startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
      duration: "2 hours",
      attendees: 25,
      status: "cancelled",
      purpose: "Business Strategy Workshop",
      equipment: ["Projector", "Sound System", "Microphone"],
      isRecurring: false,
      attendeesList: []
    }
  ];

  const [bookings, setBookings] = useState(mockBookings);

  // Filter bookings based on current filters
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = !filters.search || 
      booking.room.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      booking.purpose?.toLowerCase().includes(filters.search.toLowerCase()) ||
      booking.room.building.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || booking.status === filters.status;
    const matchesBuilding = filters.building === 'all' || booking.room.building.toLowerCase().includes(filters.building.toLowerCase());
    const matchesType = filters.type === 'all' || booking.room.type === filters.type;
    
    return matchesSearch && matchesStatus && matchesBuilding && matchesType;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      building: 'all',
      type: 'all'
    });
  };

  const handleBookingAction = (action, bookingId) => {
    console.log(`${action} booking:`, bookingId);
    // Handle booking actions (modify, cancel, extend, share, check-in)
  };

  const handleBulkAction = (action, bookingIds) => {
    console.log(`Bulk ${action}:`, bookingIds);
    if (action === 'clear') {
      setSelectedBookings([]);
    }
  };

  const handleQuickBook = (formData) => {
    console.log('Quick book:', formData);
    // Handle quick booking
  };

  const handleBookingSelection = (bookingId, isSelected) => {
    if (isSelected) {
      setSelectedBookings(prev => [...prev, bookingId]);
    } else {
      setSelectedBookings(prev => prev.filter(id => id !== bookingId));
    }
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map(b => b.id));
    }
  };

  return (
    <>
      <Helmet>
        <title>Booking Management Center - UIH BookSpace</title>
        <meta name="description" content="Manage your room bookings with comprehensive control over current and future reservations. Modify, share, and coordinate your academic space bookings." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="lg:ml-64 pt-16">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Booking Management Center
                </h1>
                <p className="text-muted-foreground">
                  Manage your reservations with comprehensive control and coordination tools
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export
                </Button>
                <Button variant="default" iconName="Plus" iconPosition="left">
                  New Booking
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <BookingStats bookings={filteredBookings} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Left Column - Bookings */}
              <div className="xl:col-span-3 space-y-6">
                {/* Filters */}
                <BookingFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />

                {/* Bulk Selection Controls */}
                {filteredBookings.length > 0 && (
                  <div className="bg-card border border-border rounded-lg p-4 academic-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                            onChange={handleSelectAll}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                          />
                          <span className="text-sm font-medium text-foreground">
                            Select All ({filteredBookings.length})
                          </span>
                        </label>
                        {selectedBookings.length > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {selectedBookings.length} selected
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Filter" size={16} />
                        <span>{filteredBookings.length} bookings</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bookings Display */}
                {viewMode === 'list' && (
                  <div className="space-y-4">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map(booking => (
                        <div key={booking.id} className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedBookings.includes(booking.id)}
                            onChange={(e) => handleBookingSelection(booking.id, e.target.checked)}
                            className="mt-4 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                          />
                          <div className="flex-1">
                            <BookingCard
                              booking={booking}
                              onModify={(id) => handleBookingAction('modify', id)}
                              onCancel={(id) => handleBookingAction('cancel', id)}
                              onExtend={(id) => handleBookingAction('extend', id)}
                              onShare={(id) => handleBookingAction('share', id)}
                              onCheckIn={(id) => handleBookingAction('checkin', id)}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-card border border-border rounded-lg p-8 text-center academic-shadow">
                        <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
                        <p className="text-muted-foreground mb-4">
                          No bookings match your current filters. Try adjusting your search criteria.
                        </p>
                        <Button variant="default" iconName="Plus" iconPosition="left">
                          Create New Booking
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {viewMode === 'calendar' && (
                  <BookingCalendar
                    bookings={filteredBookings}
                    onBookingClick={(booking) => console.log('Calendar booking clicked:', booking)}
                    onDateChange={setCurrentDate}
                    currentDate={currentDate}
                  />
                )}

                {viewMode === 'timeline' && (
                  <BookingTimeline
                    bookings={filteredBookings}
                    onBookingClick={(booking) => console.log('Timeline booking clicked:', booking)}
                    onQuickAction={handleBookingAction}
                  />
                )}
              </div>

              {/* Right Column - Quick Actions */}
              <div className="xl:col-span-1">
                <QuickActions
                  onQuickBook={handleQuickBook}
                  onBulkAction={handleBulkAction}
                  selectedBookings={selectedBookings}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BookingManagementCenter;