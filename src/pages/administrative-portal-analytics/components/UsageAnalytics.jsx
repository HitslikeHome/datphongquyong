import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const UsageAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('bookings');

  const weeklyData = [
    { day: 'Mon', bookings: 145, utilization: 68, revenue: 2840 },
    { day: 'Tue', bookings: 167, utilization: 72, revenue: 3180 },
    { day: 'Wed', bookings: 189, utilization: 78, revenue: 3560 },
    { day: 'Thu', bookings: 201, utilization: 82, revenue: 3890 },
    { day: 'Fri', bookings: 178, utilization: 75, revenue: 3420 },
    { day: 'Sat', bookings: 89, utilization: 45, revenue: 1680 },
    { day: 'Sun', bookings: 67, utilization: 38, revenue: 1240 }
  ];

  const monthlyData = [
    { month: 'Jan', bookings: 3240, utilization: 65, revenue: 58400 },
    { month: 'Feb', bookings: 3680, utilization: 71, revenue: 64200 },
    { month: 'Mar', bookings: 4120, utilization: 78, revenue: 72800 },
    { month: 'Apr', bookings: 3890, utilization: 74, revenue: 68900 },
    { month: 'May', bookings: 4350, utilization: 82, revenue: 76500 },
    { month: 'Jun', bookings: 2890, utilization: 58, revenue: 51200 }
  ];

  const roomTypeData = [
    { name: 'Study Rooms', value: 35, color: '#3B82F6' },
    { name: 'Conference Rooms', value: 25, color: '#10B981' },
    { name: 'Lab Spaces', value: 20, color: '#F59E0B' },
    { name: 'Group Spaces', value: 12, color: '#8B5CF6' },
    { name: 'Event Spaces', value: 8, color: '#EF4444' }
  ];

  const peakHoursData = [
    { hour: '8AM', bookings: 23 },
    { hour: '9AM', bookings: 45 },
    { hour: '10AM', bookings: 67 },
    { hour: '11AM', bookings: 89 },
    { hour: '12PM', bookings: 95 },
    { hour: '1PM', bookings: 78 },
    { hour: '2PM', bookings: 92 },
    { hour: '3PM', bookings: 87 },
    { hour: '4PM', bookings: 76 },
    { hour: '5PM', bookings: 54 },
    { hour: '6PM', bookings: 32 },
    { hour: '7PM', bookings: 18 }
  ];

  const getCurrentData = () => {
    return selectedPeriod === 'week' ? weeklyData : monthlyData;
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'bookings':
        return 'Total Bookings';
      case 'utilization':
        return 'Utilization Rate (%)';
      case 'revenue':
        return 'Revenue ($)';
      default:
        return 'Bookings';
    }
  };

  const formatTooltipValue = (value, name) => {
    if (name === 'revenue') {
      return [`$${value.toLocaleString()}`, 'Revenue'];
    }
    if (name === 'utilization') {
      return [`${value}%`, 'Utilization'];
    }
    return [value.toLocaleString(), 'Bookings'];
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Icon name="BarChart3" size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Usage Analytics</h2>
              <p className="text-sm text-muted-foreground">Comprehensive booking and utilization insights</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-foreground">Period:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1.5 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="week">This Week</option>
              <option value="month">Last 6 Months</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-foreground">Metric:</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1.5 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="bookings">Bookings</option>
              <option value="utilization">Utilization</option>
              <option value="revenue">Revenue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
        <h3 className="text-lg font-semibold text-foreground mb-4">{getMetricLabel()} Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getCurrentData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey={selectedPeriod === 'week' ? 'day' : 'month'} 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                formatter={(value, name) => formatTooltipValue(value, selectedMetric)}
                labelStyle={{ color: '#1F2937' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey={selectedMetric} 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Type Distribution */}
        <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">Room Type Usage Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Usage']}
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {roomTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs text-muted-foreground">{item.name}</span>
                <span className="text-xs font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours Analysis */}
        <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">Peak Hours Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  formatter={(value) => [value, 'Bookings']}
                  labelStyle={{ color: '#1F2937' }}
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Peak Hour:</span>
              <span className="font-medium text-foreground">12:00 PM (95 bookings)</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Low Hour:</span>
              <span className="font-medium text-foreground">7:00 PM (18 bookings)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
        <h3 className="text-lg font-semibold text-foreground mb-4">Summary Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">1,036</div>
            <div className="text-sm text-muted-foreground">Total Bookings This Week</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success">68.5%</div>
            <div className="text-sm text-muted-foreground">Average Utilization</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent">$19,810</div>
            <div className="text-sm text-muted-foreground">Weekly Revenue</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-warning">4.7</div>
            <div className="text-sm text-muted-foreground">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalytics;