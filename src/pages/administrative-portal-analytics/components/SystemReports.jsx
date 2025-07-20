import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemReports = () => {
  const [selectedReportType, setSelectedReportType] = useState('usage');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const reportTypes = [
    {
      id: 'usage',
      name: 'Usage Analytics',
      description: 'Comprehensive booking and utilization statistics',
      icon: 'BarChart3',
      color: 'bg-blue-500'
    },
    {
      id: 'financial',
      name: 'Financial Summary',
      description: 'Revenue, fees, and financial performance metrics',
      icon: 'DollarSign',
      color: 'bg-green-500'
    },
    {
      id: 'user',
      name: 'User Activity',
      description: 'User engagement and behavior analysis',
      icon: 'Users',
      color: 'bg-purple-500'
    },
    {
      id: 'system',
      name: 'System Performance',
      description: 'Platform uptime, errors, and technical metrics',
      icon: 'Activity',
      color: 'bg-orange-500'
    },
    {
      id: 'compliance',
      name: 'Compliance Report',
      description: 'Regulatory compliance and audit documentation',
      icon: 'Shield',
      color: 'bg-red-500'
    },
    {
      id: 'maintenance',
      name: 'Maintenance Log',
      description: 'Room maintenance schedules and completion records',
      icon: 'Wrench',
      color: 'bg-teal-500'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: "Monthly Usage Report - December 2024",
      type: "Usage Analytics",
      generatedBy: "Dr. Lisa Thompson",
      generatedAt: "2025-01-02 09:30:00",
      format: "PDF",
      size: "2.4 MB",
      downloads: 23,
      status: "Completed"
    },
    {
      id: 2,
      name: "Financial Summary Q4 2024",
      type: "Financial Summary",
      generatedBy: "Sarah Johnson",
      generatedAt: "2025-01-05 14:15:00",
      format: "Excel",
      size: "1.8 MB",
      downloads: 15,
      status: "Completed"
    },
    {
      id: 3,
      name: "User Activity Report - Week 2",
      type: "User Activity",
      generatedBy: "Michael Chen",
      generatedAt: "2025-01-15 11:45:00",
      format: "PDF",
      size: "3.1 MB",
      downloads: 8,
      status: "Completed"
    },
    {
      id: 4,
      name: "System Performance January 2025",
      type: "System Performance",
      generatedBy: "System Auto",
      generatedAt: "2025-01-20 08:00:00",
      format: "PDF",
      size: "1.2 MB",
      downloads: 5,
      status: "Processing"
    },
    {
      id: 5,
      name: "Compliance Audit Report 2024",
      type: "Compliance Report",
      generatedBy: "Emily Rodriguez",
      generatedAt: "2025-01-18 16:30:00",
      format: "PDF",
      size: "4.7 MB",
      downloads: 12,
      status: "Completed"
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: "Weekly Usage Summary",
      type: "Usage Analytics",
      schedule: "Every Monday 9:00 AM",
      recipients: ["admin@uih.edu", "facilities@uih.edu"],
      format: "PDF",
      status: "Active"
    },
    {
      id: 2,
      name: "Monthly Financial Report",
      type: "Financial Summary",
      schedule: "1st of every month 8:00 AM",
      recipients: ["finance@uih.edu", "admin@uih.edu"],
      format: "Excel",
      status: "Active"
    },
    {
      id: 3,
      name: "Daily System Health Check",
      type: "System Performance",
      schedule: "Daily 6:00 AM",
      recipients: ["it@uih.edu"],
      format: "Email",
      status: "Active"
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'processing':
        return 'bg-warning/10 text-warning';
      case 'failed':
        return 'bg-error/10 text-error';
      case 'active':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleGenerateReport = () => {
    console.log(`Generating ${selectedReportType} report for ${selectedPeriod} in ${selectedFormat} format`);
  };

  const handleDownloadReport = (reportId) => {
    console.log(`Downloading report with ID: ${reportId}`);
  };

  const handleScheduleReport = () => {
    console.log('Opening schedule report dialog');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
              <Icon name="FileText" size={20} className="text-success" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">System Reports</h2>
              <p className="text-sm text-muted-foreground">Generate and manage comprehensive reports</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" iconName="Clock" iconPosition="left" onClick={handleScheduleReport}>
              Schedule Report
            </Button>
            <Button variant="default" iconName="FileText" iconPosition="left" onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </div>
        </div>

        {/* Report Generation Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Report Type</label>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="pdf">PDF Document</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV Data</option>
              <option value="json">JSON Data</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((type) => (
          <div
            key={type.id}
            className={`bg-card rounded-lg border border-border p-6 academic-shadow hover:academic-shadow-lg academic-transition cursor-pointer ${
              selectedReportType === type.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedReportType(type.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`flex items-center justify-center w-12 h-12 ${type.color}/10 rounded-lg`}>
                <Icon name={type.icon} size={24} className={`${type.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{type.name}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <div className="bg-card rounded-lg border border-border academic-shadow">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
              <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{report.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.type} • Generated by {report.generatedBy}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDateTime(report.generatedAt)} • {report.size} • {report.downloads} downloads
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    {report.status === 'Completed' && (
                      <button
                        onClick={() => handleDownloadReport(report.id)}
                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md academic-transition"
                        title="Download Report"
                      >
                        <Icon name="Download" size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="bg-card rounded-lg border border-border academic-shadow">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Scheduled Reports</h3>
              <Button variant="ghost" size="sm" iconName="Plus" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {scheduledReports.map((report) => (
                <div key={report.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-foreground">{report.name}</div>
                      <div className="text-sm text-muted-foreground">{report.type}</div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <Icon name="Clock" size={14} className="inline mr-1" />
                    {report.schedule}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    <Icon name="Mail" size={14} className="inline mr-1" />
                    {report.recipients.length} recipient(s)
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Format: {report.format}</span>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded academic-transition">
                        <Icon name="Edit" size={14} />
                      </button>
                      <button className="p-1 text-muted-foreground hover:text-error hover:bg-error/10 rounded academic-transition">
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report Statistics */}
      <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
        <h3 className="text-lg font-semibold text-foreground mb-4">Report Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">247</div>
            <div className="text-sm text-muted-foreground">Reports Generated</div>
            <div className="text-xs text-success">+12% this month</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success">1,456</div>
            <div className="text-sm text-muted-foreground">Total Downloads</div>
            <div className="text-xs text-success">+8% this month</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent">15</div>
            <div className="text-sm text-muted-foreground">Scheduled Reports</div>
            <div className="text-xs text-muted-foreground">All active</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-warning">2.3 GB</div>
            <div className="text-sm text-muted-foreground">Storage Used</div>
            <div className="text-xs text-muted-foreground">23% of quota</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemReports;