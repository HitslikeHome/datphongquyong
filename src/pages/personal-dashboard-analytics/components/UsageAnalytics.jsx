import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UsageAnalytics = ({ analyticsData }) => {
  const [activeTab, setActiveTab] = useState('weekly');

  const tabs = [
    { id: 'weekly', label: 'This Week', icon: 'Calendar' },
    { id: 'monthly', label: 'This Month', icon: 'BarChart3' },
    { id: 'patterns', label: 'Patterns', icon: 'TrendingUp' }
  ];

  const weeklyData = [
    { day: 'Mon', hours: 3.5, bookings: 2 },
    { day: 'Tue', hours: 2.0, bookings: 1 },
    { day: 'Wed', hours: 4.5, bookings: 3 },
    { day: 'Thu', hours: 1.5, bookings: 1 },
    { day: 'Fri', hours: 5.0, bookings: 4 },
    { day: 'Sat', hours: 2.5, bookings: 2 },
    { day: 'Sun', hours: 1.0, bookings: 1 }
  ];

  const monthlyTrend = [
    { week: 'Week 1', hours: 18, efficiency: 85 },
    { week: 'Week 2', hours: 22, efficiency: 78 },
    { week: 'Week 3', hours: 25, efficiency: 92 },
    { week: 'Week 4', hours: 20, efficiency: 88 }
  ];

  const roomTypeData = [
    { name: 'Study Rooms', value: 45, color: '#3B82F6' },
    { name: 'Group Spaces', value: 30, color: '#10B981' },
    { name: 'Meeting Rooms', value: 15, color: '#F59E0B' },
    { name: 'Labs', value: 10, color: '#EF4444' }
  ];

  const insights = [
    {
      icon: 'Clock',
      title: 'Peak Productivity',
      value: '10:00 AM - 12:00 PM',
      description: 'Your most productive booking window',
      trend: '+15%'
    },
    {
      icon: 'MapPin',
      title: 'Favorite Location',
      value: 'Library Building',
      description: '68% of your bookings',
      trend: 'Consistent'
    },
    {
      icon: 'Users',
      title: 'Collaboration Rate',
      value: '35%',
      description: 'Group vs solo bookings',
      trend: '+8%'
    },
    {
      icon: 'Target',
      title: 'Booking Success',
      value: '94%',
      description: 'Successful check-ins',
      trend: '+2%'
    }
  ];

  const renderWeeklyView = () => (
    <div className="space-y-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="day" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={insight.icon} size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">{insight.title}</span>
            </div>
            <div className="text-lg font-semibold text-foreground mb-1">{insight.value}</div>
            <div className="text-xs text-muted-foreground">{insight.description}</div>
            <div className="text-xs text-success font-medium mt-1">{insight.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMonthlyView = () => (
    <div className="space-y-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="week" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="efficiency" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Total Hours Booked</span>
              <span className="font-semibold text-foreground">85 hours</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Average Session</span>
              <span className="font-semibold text-foreground">2.3 hours</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Most Active Day</span>
              <span className="font-semibold text-foreground">Friday</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Room Types</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatternsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Study Patterns</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Morning Sessions</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary rounded-full"></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Afternoon Sessions</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-secondary rounded-full"></div>
                </div>
                <span className="text-sm font-medium">50%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Evening Sessions</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-accent rounded-full"></div>
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-success/10 to-accent/10 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Achievements</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="Award" size={16} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Study Streak</div>
                <div className="text-xs text-muted-foreground">15 consecutive days</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Users" size={16} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Collaborator</div>
                <div className="text-xs text-muted-foreground">25+ group sessions</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                <Icon name="MapPin" size={16} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Explorer</div>
                <div className="text-xs text-muted-foreground">Used 12 different rooms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Usage Analytics</h2>
        <Button variant="outline" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Export Data
        </Button>
      </div>

      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium academic-transition ${
              activeTab === tab.id
                ? 'bg-card text-foreground academic-shadow'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'weekly' && renderWeeklyView()}
      {activeTab === 'monthly' && renderMonthlyView()}
      {activeTab === 'patterns' && renderPatternsView()}
    </div>
  );
};

export default UsageAnalytics;