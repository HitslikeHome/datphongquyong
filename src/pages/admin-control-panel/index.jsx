import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AdminHeader from './components/AdminHeader';
import SystemMetrics from './components/SystemMetrics';
import QuickActions from './components/QuickActions';
import UserManagement from './components/UserManagement';
import SpaceManagement from './components/SpaceManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SystemSettings from './components/SystemSettings';
import RecentActivity from './components/RecentActivity';

const AdminControlPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentUser] = useState({
    id: 1,
    name: "Dr. Sarah Chen",
    email: "sarah.chen@usth.edu.vn",
    role: "System Administrator"
  });

  // Mock data for system metrics
  const [systemMetrics] = useState({
    totalUsers: 2847,
    activeBookings: 156,
    spaceUtilization: 73,
    systemUptime: 99.8
  });

  // Mock data for users
  const [users] = useState([
    {
      id: 1,
      name: "Dr. Michael Rodriguez",
      email: "michael.rodriguez@usth.edu.vn",
      role: "Faculty",
      status: "Active",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@usth.edu.vn",
      role: "Student",
      status: "Active",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Prof. David Kim",
      email: "david.kim@usth.edu.vn",
      role: "Faculty",
      status: "Active",
      lastActive: "3 hours ago"
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@usth.edu.vn",
      role: "Student",
      status: "Inactive",
      lastActive: "1 week ago"
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      email: "james.wilson@usth.edu.vn",
      role: "Admin",
      status: "Active",
      lastActive: "30 minutes ago"
    }
  ]);

  // Mock data for spaces
  const [spaces] = useState([
    {
      id: 1,
      name: "Conference Room A",
      building: "Main Building",
      floor: "2nd Floor",
      type: "Conference Room",
      capacity: 12,
      status: "Available",
      utilization: 85
    },
    {
      id: 2,
      name: "Lab A-201",
      building: "Science Building",
      floor: "2nd Floor",
      type: "Lab",
      capacity: 30,
      status: "Occupied",
      utilization: 92
    },
    {
      id: 3,
      name: "Study Room B-101",
      building: "Library",
      floor: "1st Floor",
      type: "Study Room",
      capacity: 6,
      status: "Available",
      utilization: 67
    },
    {
      id: 4,
      name: "Lecture Hall C",
      building: "Academic Building",
      floor: "Ground Floor",
      type: "Classroom",
      capacity: 100,
      status: "Reserved",
      utilization: 78
    },
    {
      id: 5,
      name: "Computer Lab D-301",
      building: "IT Building",
      floor: "3rd Floor",
      type: "Lab",
      capacity: 40,
      status: "Maintenance",
      utilization: 0
    }
  ]);

  // Mock analytics data
  const [analyticsData] = useState({
    dailyBookings: [
      { date: "Jan 15", bookings: 45 },
      { date: "Jan 16", bookings: 52 },
      { date: "Jan 17", bookings: 38 },
      { date: "Jan 18", bookings: 61 },
      { date: "Jan 19", bookings: 55 },
      { date: "Jan 20", bookings: 67 },
      { date: "Jan 21", bookings: 43 }
    ],
    spaceTypes: [
      { name: "Conference Rooms", value: 35 },
      { name: "Labs", value: 28 },
      { name: "Study Rooms", value: 22 },
      { name: "Classrooms", value: 15 }
    ],
    hourlyUsage: [
      { hour: "8 AM", bookings: 12 },
      { hour: "9 AM", bookings: 25 },
      { hour: "10 AM", bookings: 38 },
      { hour: "11 AM", bookings: 42 },
      { hour: "12 PM", bookings: 35 },
      { hour: "1 PM", bookings: 28 },
      { hour: "2 PM", bookings: 55 },
      { hour: "3 PM", bookings: 48 },
      { hour: "4 PM", bookings: 32 },
      { hour: "5 PM", bookings: 18 }
    ]
  });

  // Mock system settings
  const [systemSettings] = useState({
    general: {
      systemName: "SeatSync USTH",
      adminEmail: "admin@usth.edu.vn",
      supportPhone: "+84-24-3791-7327",
      timeZone: "Asia/Ho_Chi_Minh",
      maintenanceMode: false,
      allowRegistrations: true,
      debugMode: false
    },
    booking: {
      maxDuration: 4,
      advanceBookingDays: 14,
      cancellationHours: 2,
      noShowPenalty: 24,
      requireCheckin: true,
      allowRecurring: true,
      autoRelease: true
    },
    notifications: {
      bookingConfirmations: true,
      reminders: true,
      cancellations: true,
      maintenanceAlerts: true,
      reminderHours: 1,
      followupHours: 2
    },
    security: {
      requireTwoFactor: false,
      ipRestrictions: false,
      auditLogging: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5
    },
    integrations: {
      googleCalendar: true,
      outlookIntegration: false,
      ldapAuth: true,
      apiRateLimit: 1000,
      webhooks: true
    }
  });

  // Mock recent activities
  const [recentActivities] = useState([
    {
      id: 1,
      type: "user_created",
      title: "New user registered",
      description: "Emily Chen joined as a student",
      user: "System",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: "space_updated",
      title: "Space information updated",
      description: "Conference Room A capacity changed to 12",
      user: "Dr. Sarah Chen",
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 3,
      type: "booking_created",
      title: "New booking created",
      description: "Lab A-201 booked for tomorrow 2:00 PM",
      user: "Prof. David Kim",
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 4,
      type: "maintenance",
      title: "Maintenance scheduled",
      description: "Computer Lab D-301 scheduled for maintenance",
      user: "System",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 5,
      type: "system_update",
      title: "System settings updated",
      description: "Booking policies modified",
      user: "Dr. Sarah Chen",
      timestamp: new Date(Date.now() - 7200000)
    }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'LayoutDashboard' },
    { id: 'users', name: 'Users', icon: 'Users' },
    { id: 'spaces', name: 'Spaces', icon: 'MapPin' },
    { id: 'analytics', name: 'Analytics', icon: 'BarChart3' },
    { id: 'settings', name: 'Settings', icon: 'Settings' }
  ];

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'add-user': setActiveTab('users');
        break;
      case 'add-space': setActiveTab('spaces');
        break;
      case 'system-maintenance': setActiveTab('settings');
        break;
      case 'generate-report': setActiveTab('analytics');
        break;
      case 'bulk-import': console.log('Opening bulk import dialog...');
        break;
      case 'system-backup': console.log('Starting system backup...');
        break;
      default:
        break;
    }
  };

  const handleUserAction = (action, userId) => {
    console.log(`User action: ${action}`, userId);
  };

  const handleSpaceAction = (action, spaceId) => {
    console.log(`Space action: ${action}`, spaceId);
  };

  const handleSettingsUpdate = (newSettings) => {
    console.log('Settings updated:', newSettings);
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  useEffect(() => {
    document.title = 'Admin Control Panel - SeatSync';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="lg:ml-64 pt-16">
        <AdminHeader 
          currentUser={currentUser}
          onNotificationClick={handleNotificationClick}
          onProfileClick={handleProfileClick}
        />
        
        <div className="p-6">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <SystemMetrics metrics={systemMetrics} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <QuickActions onActionClick={handleQuickAction} />
                </div>
                <div>
                  <RecentActivity activities={recentActivities} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <UserManagement 
              users={users}
              onUserAction={handleUserAction}
            />
          )}

          {activeTab === 'spaces' && (
            <SpaceManagement 
              spaces={spaces}
              onSpaceAction={handleSpaceAction}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard analyticsData={analyticsData} />
          )}

          {activeTab === 'settings' && (
            <SystemSettings 
              settings={systemSettings}
              onSettingsUpdate={handleSettingsUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminControlPanel;