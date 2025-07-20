import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ReservationCard from './components/ReservationCard';
import FilterTabs from './components/FilterTabs';
import QuickActions from './components/QuickActions';
import BookingStats from './components/BookingStats';
import CalendarView from './components/CalendarView';
import NotificationSettings from './components/NotificationSettings';

const MyReservationsDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedReservations, setSelectedReservations] = useState([]);

  // Mock data for reservations
  const mockReservations = [
    {
      id: 'RES001',
      spaceName: 'Conference Room A',
      building: 'Main Building',
      floor: '3rd Floor',
      dateTime: '2025-01-21T10:00:00',
      endTime: '2025-01-21T12:00:00',
      attendees: 8,
      status: 'confirmed',
      purpose: 'Weekly team standup meeting to discuss project progress and upcoming deliverables',
      isRecurring: true,
      qrCode: 'QR_RES001_2025'
    },
    {
      id: 'RES002',
      spaceName: 'Study Pod 12',
      building: 'Library',
      floor: '2nd Floor',
      dateTime: '2025-01-21T14:30:00',
      endTime: '2025-01-21T16:30:00',
      attendees: 2,
      status: 'confirmed',
      purpose: 'Research collaboration session',
      isRecurring: false,
      qrCode: 'QR_RES002_2025'
    },
    {
      id: 'RES003',
      spaceName: 'Lecture Hall B',
      building: 'Academic Block',
      floor: '1st Floor',
      dateTime: '2025-01-22T09:00:00',
      endTime: '2025-01-22T11:00:00',
      attendees: 45,
      status: 'pending',
      purpose: 'Guest lecture on Machine Learning applications in healthcare',
      isRecurring: false,
      qrCode: 'QR_RES003_2025'
    },
    {
      id: 'RES004',
      spaceName: 'Innovation Lab',
      building: 'Tech Center',
      floor: '4th Floor',
      dateTime: '2025-01-23T13:00:00',
      endTime: '2025-01-23T17:00:00',
      attendees: 12,
      status: 'confirmed',
      purpose: 'Hackathon preparation workshop',
      isRecurring: false,
      qrCode: 'QR_RES004_2025'
    },
    {
      id: 'RES005',
      spaceName: 'Meeting Room C',
      building: 'Admin Block',
      floor: '2nd Floor',
      dateTime: '2025-01-18T15:00:00',
      endTime: '2025-01-18T16:00:00',
      attendees: 6,
      status: 'completed',
      purpose: 'Department budget review meeting',
      isRecurring: false,
      qrCode: 'QR_RES005_2025'
    },
    {
      id: 'RES006',
      spaceName: 'Seminar Room 1',
      building: 'Research Wing',
      floor: '3rd Floor',
      dateTime: '2025-01-25T11:00:00',
      endTime: '2025-01-25T12:30:00',
      attendees: 20,
      status: 'confirmed',
      purpose: 'PhD thesis defense presentation',
      isRecurring: true,
      qrCode: 'QR_RES006_2025'
    }
  ];

  // Mock booking statistics
  const mockStats = {
    totalBookings: 24,
    hoursBooked: 48,
    favoriteSpace: 'Conference Room A',
    favoriteSpaceUsage: 35,
    attendanceRate: 92
  };

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailConfirmations: true,
    emailReminders: true,
    emailChanges: true,
    pushNotifications: true,
    checkInReminders: true,
    reminderTime: '15',
    weeklySummary: true
  });

  // Filter reservations based on active filter and search query
  const getFilteredReservations = () => {
    let filtered = mockReservations;

    // Apply filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    switch (activeFilter) {
      case 'upcoming':
        filtered = filtered.filter(res => new Date(res.dateTime) > now);
        break;
      case 'today':
        filtered = filtered.filter(res => {
          const resDate = new Date(res.dateTime);
          return resDate >= today && resDate < tomorrow;
        });
        break;
      case 'past':
        filtered = filtered.filter(res => new Date(res.dateTime) < now);
        break;
      case 'recurring':
        filtered = filtered.filter(res => res.isRecurring);
        break;
      default:
        break;
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(res =>
        res.spaceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.purpose.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply date filter
    if (selectedDate) {
      filtered = filtered.filter(res => {
        const resDate = new Date(res.dateTime);
        return resDate.toDateString() === selectedDate.toDateString();
      });
    }

    return filtered;
  };

  // Get filter counts
  const getFilterCounts = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      all: mockReservations.length,
      upcoming: mockReservations.filter(res => new Date(res.dateTime) > now).length,
      today: mockReservations.filter(res => {
        const resDate = new Date(res.dateTime);
        return resDate >= today && resDate < tomorrow;
      }).length,
      past: mockReservations.filter(res => new Date(res.dateTime) < now).length,
      recurring: mockReservations.filter(res => res.isRecurring).length
    };
  };

  // Handle reservation actions
  const handleModifyReservation = (reservation) => {
    console.log('Modifying reservation:', reservation.id);
    // Navigate to booking engine with pre-filled data
    navigate('/intelligent-booking-engine', { state: { editReservation: reservation } });
  };

  const handleCancelReservation = (reservation) => {
    console.log('Cancelling reservation:', reservation.id);
    // Show confirmation dialog and handle cancellation
  };

  const handleShareReservation = (reservation) => {
    console.log('Sharing reservation:', reservation.id);
    // Open share dialog or copy link to clipboard
  };

  const handleCheckIn = (reservation) => {
    console.log('Checking in to reservation:', reservation.id);
    navigate('/qr-check-in-portal', { state: { reservation } });
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for reservations:`, selectedReservations);
    // Handle bulk actions
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const filteredReservations = getFilteredReservations();
  const filterCounts = getFilterCounts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Reservations</h1>
              <p className="text-muted-foreground mt-1">
                Manage your bookings and track your space usage
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCalendar(!showCalendar)}
                iconName="Calendar"
                iconPosition="left"
              >
                Calendar View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(true)}
                iconName="Bell"
                iconPosition="left"
              >
                Notifications
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/intelligent-booking-engine')}
                iconName="Plus"
                iconPosition="left"
              >
                New Booking
              </Button>
            </div>
          </div>

          {/* Booking Statistics */}
          <BookingStats stats={mockStats} />

          {/* Quick Actions */}
          <QuickActions 
            onBulkAction={handleBulkAction}
            selectedCount={selectedReservations.length}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reservations List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters and Search */}
              <div className="space-y-4">
                <FilterTabs
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  counts={filterCounts}
                />
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="flex-1">
                    <Input
                      type="search"
                      placeholder="Search reservations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  {selectedDate && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm">
                      <Icon name="Calendar" size={14} />
                      <span>{selectedDate.toLocaleDateString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDate(null)}
                        className="h-auto p-0 text-primary hover:text-primary"
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Reservations List */}
              <div className="space-y-4">
                {filteredReservations.length > 0 ? (
                  filteredReservations.map((reservation) => (
                    <ReservationCard
                      key={reservation.id}
                      reservation={reservation}
                      onModify={handleModifyReservation}
                      onCancel={handleCancelReservation}
                      onShare={handleShareReservation}
                      onCheckIn={handleCheckIn}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Calendar" size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No reservations found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery || selectedDate ? 'Try adjusting your filters' : 'You haven\'t made any bookings yet'}
                    </p>
                    <Button
                      variant="default"
                      onClick={() => navigate('/intelligent-booking-engine')}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Book Your First Space
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Calendar Sidebar */}
            <div className="space-y-6">
              {showCalendar && (
                <CalendarView
                  reservations={mockReservations}
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                />
              )}

              {/* Campus Status */}
              <div className="bg-card border border-border rounded-lg p-4 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Campus Status</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-success font-medium">Live</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Occupancy</span>
                    <span className="text-sm font-medium text-foreground">73%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">42</div>
                      <div className="text-xs text-muted-foreground">Available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">156</div>
                      <div className="text-xs text-muted-foreground">Total Spaces</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Etiquette */}
              <div className="bg-card border border-border rounded-lg p-4 shadow-card">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Info" size={16} className="text-primary" />
                  <h3 className="font-medium text-foreground">Booking Etiquette</h3>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={12} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Check-in within 15 minutes of your booking</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={12} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Cancel unused bookings to help others</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={12} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Keep spaces clean and organized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Notification Settings Modal */}
      {showNotifications && (
        <NotificationSettings
          settings={notificationSettings}
          onSettingsChange={setNotificationSettings}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default MyReservationsDashboard;