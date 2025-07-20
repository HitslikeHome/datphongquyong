import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsDashboard = ({ analyticsData }) => {
  const COLORS = ['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Analytics Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-success" />
            <span className="text-sm text-muted-foreground">Last 30 days</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Trends */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-4">Daily Booking Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.dailyBookings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Space Utilization */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-4">Space Type Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.spaceTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.spaceTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Usage Pattern */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-6">Peak Usage Hours</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData.hourlyUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="hour" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="bookings" 
                fill="var(--color-accent)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">Peak Hour</h3>
              <p className="text-2xl font-bold text-success">2:00 PM</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Highest booking activity occurs during afternoon hours</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">Most Popular</h3>
              <p className="text-2xl font-bold text-primary">Lab A-201</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Computer lab with highest utilization rate</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">No-Show Rate</h3>
              <p className="text-2xl font-bold text-warning">8.5%</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Percentage of bookings not checked in</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;