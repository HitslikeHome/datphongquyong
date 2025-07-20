import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoomFilters from './components/RoomFilters';
import RoomCard from './components/RoomCard';
import TimeSelector from './components/TimeSelector';
import BookingConfirmation from './components/BookingConfirmation';
import BookingSuccess from './components/BookingSuccess';
import ProgressIndicator from './components/ProgressIndicator';

const InstantBookingInterface = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState({
    searchQuery: '',
    capacity: '',
    building: '',
    roomType: '',
    amenities: [],
    timeFrom: '',
    timeTo: '',
    date: new Date().toISOString().split('T')[0]
  });

  const steps = [
    {
      id: 'select-room',
      title: 'Select Room',
      description: 'Choose your space',
      icon: 'Home'
    },
    {
      id: 'select-time',
      title: 'Choose Time',
      description: 'Pick date & duration',
      icon: 'Clock'
    },
    {
      id: 'confirm-booking',
      title: 'Confirm Details',
      description: 'Review & book',
      icon: 'CheckCircle'
    },
    {
      id: 'booking-success',
      title: 'Booking Complete',
      description: 'All set!',
      icon: 'Check'
    }
  ];

  // Mock room data
  const mockRooms = [
    {
      id: 'room-001',
      name: 'Innovation Lab A',
      location: 'Main Building, Floor 2',
      building: 'main',
      floor: '2nd Floor, Room 201',
      capacity: '8 people',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      availability: 'available',
      availableUntil: '6:00 PM',
      rating: '4.8',
      isPopular: true,
      amenities: ['whiteboard', 'projector', 'wifi', 'power', 'ac'],
      nextSlots: ['2:00 PM', '3:30 PM', '5:00 PM'],
      roomType: 'conference'
    },
    {
      id: 'room-002',
      name: 'Study Pod B12',
      location: 'Library Complex, Level 3',
      building: 'library',
      floor: '3rd Floor, Pod B12',
      capacity: '4 people',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      availability: 'limited',
      availableUntil: '8:00 PM',
      rating: '4.6',
      isPopular: false,
      amenities: ['whiteboard', 'wifi', 'power', 'computer'],
      nextSlots: ['4:00 PM', '6:30 PM'],
      roomType: 'study'
    },
    {
      id: 'room-003',
      name: 'Collaboration Hub',
      location: 'Engineering Wing, Ground Floor',
      building: 'engineering',
      floor: 'Ground Floor, Room G15',
      capacity: '12 people',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop',
      availability: 'available',
      availableUntil: '9:00 PM',
      rating: '4.9',
      isPopular: true,
      amenities: ['whiteboard', 'projector', 'wifi', 'power', 'ac', 'video'],
      nextSlots: ['1:30 PM', '3:00 PM', '4:30 PM'],
      roomType: 'group'
    },
    {
      id: 'room-004',
      name: 'Computer Lab C',
      location: 'Science Block, Floor 1',
      building: 'science',
      floor: '1st Floor, Lab C',
      capacity: '20 people',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
      availability: 'booked',
      availableUntil: '5:00 PM',
      rating: '4.4',
      isPopular: false,
      amenities: ['computer', 'wifi', 'power', 'ac', 'printer'],
      nextSlots: ['7:00 PM', '8:30 PM'],
      roomType: 'computer'
    },
    {
      id: 'room-005',
      name: 'Executive Meeting Room',
      location: 'Business School, Floor 4',
      building: 'business',
      floor: '4th Floor, Room 401',
      capacity: '15 people',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      availability: 'available',
      availableUntil: '7:00 PM',
      rating: '4.7',
      isPopular: true,
      amenities: ['whiteboard', 'projector', 'wifi', 'power', 'ac', 'video'],
      nextSlots: ['2:30 PM', '4:00 PM', '5:30 PM'],
      roomType: 'presentation'
    },
    {
      id: 'room-006',
      name: 'Quiet Study Room',
      location: 'Library Complex, Level 1',
      building: 'library',
      floor: '1st Floor, Room 105',
      capacity: '6 people',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      availability: 'limited',
      availableUntil: '10:00 PM',
      rating: '4.5',
      isPopular: false,
      amenities: ['wifi', 'power', 'ac'],
      nextSlots: ['5:00 PM', '7:30 PM'],
      roomType: 'study'
    }
  ];

  const [filteredRooms, setFilteredRooms] = useState(mockRooms);

  useEffect(() => {
    filterRooms();
  }, [filters]);

  const filterRooms = () => {
    let filtered = mockRooms;

    if (filters.searchQuery) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        room.location.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    if (filters.building) {
      filtered = filtered.filter(room => room.building === filters.building);
    }

    if (filters.roomType) {
      filtered = filtered.filter(room => room.roomType === filters.roomType);
    }

    if (filters.capacity) {
      filtered = filtered.filter(room => {
        const roomCapacity = parseInt(room.capacity);
        switch (filters.capacity) {
          case '1-5':
            return roomCapacity >= 1 && roomCapacity <= 5;
          case '6-10':
            return roomCapacity >= 6 && roomCapacity <= 10;
          case '11-20':
            return roomCapacity >= 11 && roomCapacity <= 20;
          case '21-50':
            return roomCapacity >= 21 && roomCapacity <= 50;
          case '50+':
            return roomCapacity > 50;
          default:
            return true;
        }
      });
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(room =>
        filters.amenities.every(amenity => room.amenities.includes(amenity))
      );
    }

    setFilteredRooms(filtered);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      capacity: '',
      building: '',
      roomType: '',
      amenities: [],
      timeFrom: '',
      timeTo: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    if (room.availability !== 'booked') {
      setCurrentStep(1);
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingConfirm = (data) => {
    setBookingData(data);
    setCurrentStep(3);
  };

  const handleNewBooking = () => {
    setCurrentStep(0);
    setSelectedRoom(null);
    setSelectedTime('');
    setSelectedDuration(60);
    setBookingData(null);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return selectedRoom && selectedRoom.availability !== 'booked';
      case 1:
        return selectedTime;
      case 2:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-16 lg:ml-64 pt-16">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Instant Booking</h1>
                  <p className="text-muted-foreground">
                    Book your perfect space in three simple steps
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-success rounded-full availability-pulse"></div>
                    <span>{filteredRooms.filter(r => r.availability === 'available').length} rooms available</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={handleNewBooking}
                  >
                    Start Over
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={steps.length}
              steps={steps}
            />

            {/* Step Content */}
            <div className="space-y-6">
              {/* Step 0: Room Selection */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <RoomFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={handleClearFilters}
                  />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-foreground">
                        Available Rooms ({filteredRooms.length})
                      </h2>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" iconName="Grid3X3" />
                        <Button variant="ghost" size="sm" iconName="List" />
                      </div>
                    </div>
                    
                    {filteredRooms.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No rooms found</h3>
                        <p className="text-muted-foreground mb-4">
                          Try adjusting your filters to see more options
                        </p>
                        <Button variant="outline" onClick={handleClearFilters}>
                          Clear Filters
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRooms.map((room) => (
                          <RoomCard
                            key={room.id}
                            room={room}
                            onSelect={handleRoomSelect}
                            isSelected={selectedRoom?.id === room.id}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 1: Time Selection */}
              {currentStep === 1 && (
                <div className="max-w-4xl mx-auto">
                  <TimeSelector
                    selectedRoom={selectedRoom}
                    selectedTime={selectedTime}
                    onTimeChange={handleTimeChange}
                    onDurationChange={handleDurationChange}
                  />
                </div>
              )}

              {/* Step 2: Booking Confirmation */}
              {currentStep === 2 && (
                <div className="max-w-4xl mx-auto">
                  <BookingConfirmation
                    selectedRoom={selectedRoom}
                    selectedTime={selectedTime}
                    duration={selectedDuration}
                    onConfirm={handleBookingConfirm}
                    onBack={handlePreviousStep}
                  />
                </div>
              )}

              {/* Step 3: Booking Success */}
              {currentStep === 3 && bookingData && (
                <BookingSuccess
                  bookingData={bookingData}
                  onNewBooking={handleNewBooking}
                />
              )}
            </div>

            {/* Navigation Controls */}
            {currentStep < 2 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-4">
                  {selectedRoom && (
                    <div className="text-sm text-muted-foreground">
                      Selected: {selectedRoom.name}
                      {selectedTime && ` at ${selectedTime}`}
                    </div>
                  )}
                  
                  <Button
                    variant="default"
                    onClick={handleNextStep}
                    disabled={!canProceedToNext()}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {currentStep === 1 ? 'Review Booking' : 'Continue'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstantBookingInterface;