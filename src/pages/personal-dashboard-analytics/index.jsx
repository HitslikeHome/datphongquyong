import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import WelcomeHeader from './components/WelcomeHeader';
import UpcomingBookings from './components/UpcomingBookings';
import UsageAnalytics from './components/UsageAnalytics';
import QuickActions from './components/QuickActions';
import RecommendationsPanel from './components/RecommendationsPanel';
import GoalsProgress from './components/GoalsProgress';

const PersonalDashboardAnalytics = () => {
  const [currentUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@uih.edu",
    studentId: "UIH2024001",
    major: "Computer Science",
    year: "Junior"
  });

  const [dashboardData, setDashboardData] = useState({
    currentBookings: 2,
    todayStats: {
      hoursBooked: 4.5,
      streak: 15
    }
  });

  const upcomingBookings = [
    {
      id: 1,
      roomName: "Study Room A-201",
      building: "Library Building",
      floor: "2nd Floor",
      time: "2:00 PM - 4:00 PM",
      dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      capacity: 4,
      status: "confirmed",
      hasReminder: true,
      notes: "Group study session for CS 301 final exam preparation"
    },
    {
      id: 2,
      roomName: "Group Space B-105",
      building: "Student Center",
      floor: "1st Floor",
      time: "6:30 PM - 8:30 PM",
      dateTime: new Date(Date.now() + 6.5 * 60 * 60 * 1000), // 6.5 hours from now
      capacity: 8,
      status: "confirmed",
      hasReminder: true,
      notes: "Team project meeting for Software Engineering course"
    },
    {
      id: 3,
      roomName: "Meeting Room C-301",
      building: "Engineering Building",
      floor: "3rd Floor",
      time: "Tomorrow 10:00 AM - 12:00 PM",
      dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      capacity: 6,
      status: "pending",
      hasReminder: false,
      notes: "Research discussion with advisor"
    },
    {
      id: 4,
      roomName: "Study Pod D-12",
      building: "Library Building",
      floor: "1st Floor",
      time: "Tomorrow 3:00 PM - 5:00 PM",
      dateTime: new Date(Date.now() + 27 * 60 * 60 * 1000), // Tomorrow afternoon
      capacity: 2,
      status: "checked-in",
      hasReminder: true,
      notes: "Individual study session"
    }
  ];

  const favoriteRooms = [
    {
      id: 1,
      name: "Study Room A-201",
      building: "Library Building - 2nd Floor",
      type: "study"
    },
    {
      id: 2,
      name: "Group Space B-105",
      building: "Student Center - 1st Floor",
      type: "group"
    },
    {
      id: 3,
      name: "Quiet Zone C-15",
      building: "Library Building - 3rd Floor",
      type: "study"
    },
    {
      id: 4,
      name: "Innovation Lab D-201",
      building: "Engineering Building - 2nd Floor",
      type: "group"
    }
  ];

  const recentBookings = [
    {
      id: 1,
      action: "Booked Study Room A-203",
      room: "Library Building",
      time: "2 hours ago"
    },
    {
      id: 2,
      action: "Extended Group Space B-107",
      room: "Student Center",
      time: "Yesterday"
    },
    {
      id: 3,
      action: "Cancelled Meeting Room C-305",
      room: "Engineering Building",
      time: "2 days ago"
    }
  ];

  const analyticsData = {
    weeklyHours: 18,
    monthlyHours: 85,
    averageSession: 2.3,
    successRate: 94,
    favoriteTimeSlot: "10:00 AM - 12:00 PM",
    mostUsedBuilding: "Library Building"
  };

  const recommendations = {
    optimalTimes: [
      "9:00 AM - 11:00 AM (Peak productivity)",
      "2:00 PM - 4:00 PM (Low competition)",
      "7:00 PM - 9:00 PM (Extended sessions)"
    ],
    suggestedRooms: [
      "Library Study Room 204 (Natural light)",
      "Science Building Group Space (Tech-equipped)",
      "Engineering Lab Meeting Room (Collaboration tools)"
    ]
  };

  const userPreferences = {
    preferredTimeSlots: ["morning", "afternoon"],
    roomFeatures: ["natural-light", "quiet-zone", "whiteboard"],
    notificationSettings: {
      reminders: true,
      recommendations: true,
      availability: false
    }
  };

  const goals = [
    {
      id: 1,
      title: "Weekly Study Hours",
      current: 18,
      target: 25,
      progress: 72
    },
    {
      id: 2,
      title: "Room Exploration",
      current: 3,
      target: 5,
      progress: 60
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Study Streak Champion",
      description: "15 consecutive days of bookings",
      date: "2025-07-18",
      rarity: "rare"
    },
    {
      id: 2,
      title: "Early Bird",
      description: "10 morning study sessions",
      date: "2025-07-15",
      rarity: "common"
    }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        todayStats: {
          ...prev.todayStats,
          hoursBooked: prev.todayStats.hoursBooked + 0.1
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Welcome Header */}
          <WelcomeHeader 
            userName={currentUser.name}
            currentBookings={dashboardData.currentBookings}
            todayStats={dashboardData.todayStats}
          />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Upcoming Bookings */}
              <UpcomingBookings bookings={upcomingBookings} />
              
              {/* Usage Analytics */}
              <UsageAnalytics analyticsData={analyticsData} />
              
              {/* Smart Recommendations */}
              <RecommendationsPanel 
                recommendations={recommendations}
                userPreferences={userPreferences}
              />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions 
                favoriteRooms={favoriteRooms}
                recentBookings={recentBookings}
              />
              
              {/* Goals & Progress */}
              <GoalsProgress 
                goals={goals}
                achievements={achievements}
              />
            </div>
          </div>

          {/* Bottom Section - Additional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">94%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">247</div>
                  <div className="text-sm text-muted-foreground">Rooms Available</div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">12</div>
                  <div className="text-sm text-muted-foreground">Rooms Explored</div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">850</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalDashboardAnalytics;