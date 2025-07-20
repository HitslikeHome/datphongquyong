import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [quickBookingData, setQuickBookingData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: '2',
    capacity: '1-4'
  });

  const availableSlots = [
    { time: '09:00', available: 12 },
    { time: '11:00', available: 8 },
    { time: '14:00', available: 15 },
    { time: '16:00', available: 6 }
  ];

  const handleQuickBook = () => {
    console.log('Quick booking:', quickBookingData);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-blue-900 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-accent">
                <div className="w-2 h-2 bg-accent rounded-full availability-pulse"></div>
                <span className="text-sm font-medium">247 rooms available now</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your Perfect
                <span className="block text-accent">Study Space,</span>
                <span className="block">Instantly Available</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-lg">
                Book university rooms in seconds with our intelligent platform. Find the perfect space for studying, meetings, or collaboration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/instant-booking-interface">
                <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" iconName="Zap" iconPosition="left">
                  Quick Book Now
                </Button>
              </Link>
              <Link to="/room-explorer-discovery">
                <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" iconName="Search" iconPosition="left">
                  Explore Rooms
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">2,847</div>
                <div className="text-sm text-primary-foreground/70">Bookings this month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">98.5%</div>
                <div className="text-sm text-primary-foreground/70">Success rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">&lt;30s</div>
                <div className="text-sm text-primary-foreground/70">Average booking time</div>
              </div>
            </div>
          </div>

          {/* Quick Booking Widget */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 academic-shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Quick Book</h3>
              <div className="flex items-center space-x-2 text-sm text-success">
                <div className="w-2 h-2 bg-success rounded-full availability-pulse"></div>
                <span>Live availability</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                  <input
                    type="date"
                    value={quickBookingData.date}
                    onChange={(e) => setQuickBookingData({...quickBookingData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                  <select
                    value={quickBookingData.duration}
                    onChange={(e) => setQuickBookingData({...quickBookingData, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Capacity</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1-4', '5-8', '9-15', '16+'].map((capacity) => (
                    <button
                      key={capacity}
                      onClick={() => setQuickBookingData({...quickBookingData, capacity})}
                      className={`px-3 py-2 text-sm rounded-lg border academic-transition ${
                        quickBookingData.capacity === capacity
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-foreground border-border hover:border-primary'
                      }`}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Available Times</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => setQuickBookingData({...quickBookingData, time: slot.time})}
                      className={`p-3 rounded-lg border academic-transition ${
                        quickBookingData.time === slot.time
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-foreground border-border hover:border-primary'
                      }`}
                    >
                      <div className="font-medium">{slot.time}</div>
                      <div className="text-xs opacity-70">{slot.available} available</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="default"
                size="lg"
                fullWidth
                onClick={handleQuickBook}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                iconName="Calendar"
                iconPosition="left"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;