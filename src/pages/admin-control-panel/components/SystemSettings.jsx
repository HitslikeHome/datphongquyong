import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemSettings = ({ settings, onSettingsUpdate }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(settings);

  const tabs = [
    { id: 'general', name: 'General', icon: 'Settings' },
    { id: 'booking', name: 'Booking Rules', icon: 'Calendar' },
    { id: 'notifications', name: 'Notifications', icon: 'Bell' },
    { id: 'security', name: 'Security', icon: 'Shield' },
    { id: 'integrations', name: 'Integrations', icon: 'Link' }
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSettingsUpdate(formData);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="System Name"
            value={formData.general.systemName}
            onChange={(e) => handleInputChange('general', 'systemName', e.target.value)}
          />
          <Input
            label="Admin Email"
            type="email"
            value={formData.general.adminEmail}
            onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)}
          />
          <Input
            label="Support Phone"
            value={formData.general.supportPhone}
            onChange={(e) => handleInputChange('general', 'supportPhone', e.target.value)}
          />
          <Input
            label="Time Zone"
            value={formData.general.timeZone}
            onChange={(e) => handleInputChange('general', 'timeZone', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">System Status</h3>
        <div className="space-y-3">
          <Checkbox
            label="Maintenance Mode"
            checked={formData.general.maintenanceMode}
            onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
          />
          <Checkbox
            label="Allow New Registrations"
            checked={formData.general.allowRegistrations}
            onChange={(e) => handleInputChange('general', 'allowRegistrations', e.target.checked)}
          />
          <Checkbox
            label="Enable Debug Mode"
            checked={formData.general.debugMode}
            onChange={(e) => handleInputChange('general', 'debugMode', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderBookingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Booking Policies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Max Booking Duration (hours)"
            type="number"
            value={formData.booking.maxDuration}
            onChange={(e) => handleInputChange('booking', 'maxDuration', e.target.value)}
          />
          <Input
            label="Advance Booking Days"
            type="number"
            value={formData.booking.advanceBookingDays}
            onChange={(e) => handleInputChange('booking', 'advanceBookingDays', e.target.value)}
          />
          <Input
            label="Cancellation Hours"
            type="number"
            value={formData.booking.cancellationHours}
            onChange={(e) => handleInputChange('booking', 'cancellationHours', e.target.value)}
          />
          <Input
            label="No-Show Penalty (hours)"
            type="number"
            value={formData.booking.noShowPenalty}
            onChange={(e) => handleInputChange('booking', 'noShowPenalty', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Booking Rules</h3>
        <div className="space-y-3">
          <Checkbox
            label="Require Check-in"
            checked={formData.booking.requireCheckin}
            onChange={(e) => handleInputChange('booking', 'requireCheckin', e.target.checked)}
          />
          <Checkbox
            label="Allow Recurring Bookings"
            checked={formData.booking.allowRecurring}
            onChange={(e) => handleInputChange('booking', 'allowRecurring', e.target.checked)}
          />
          <Checkbox
            label="Auto-release No-shows"
            checked={formData.booking.autoRelease}
            onChange={(e) => handleInputChange('booking', 'autoRelease', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Email Notifications</h3>
        <div className="space-y-3">
          <Checkbox
            label="Booking Confirmations"
            checked={formData.notifications.bookingConfirmations}
            onChange={(e) => handleInputChange('notifications', 'bookingConfirmations', e.target.checked)}
          />
          <Checkbox
            label="Reminder Notifications"
            checked={formData.notifications.reminders}
            onChange={(e) => handleInputChange('notifications', 'reminders', e.target.checked)}
          />
          <Checkbox
            label="Cancellation Notifications"
            checked={formData.notifications.cancellations}
            onChange={(e) => handleInputChange('notifications', 'cancellations', e.target.checked)}
          />
          <Checkbox
            label="System Maintenance Alerts"
            checked={formData.notifications.maintenanceAlerts}
            onChange={(e) => handleInputChange('notifications', 'maintenanceAlerts', e.target.checked)}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Notification Timing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Reminder Hours Before"
            type="number"
            value={formData.notifications.reminderHours}
            onChange={(e) => handleInputChange('notifications', 'reminderHours', e.target.value)}
          />
          <Input
            label="Follow-up Hours After"
            type="number"
            value={formData.notifications.followupHours}
            onChange={(e) => handleInputChange('notifications', 'followupHours', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Access Control</h3>
        <div className="space-y-3">
          <Checkbox
            label="Require Two-Factor Authentication"
            checked={formData.security.requireTwoFactor}
            onChange={(e) => handleInputChange('security', 'requireTwoFactor', e.target.checked)}
          />
          <Checkbox
            label="Enable IP Restrictions"
            checked={formData.security.ipRestrictions}
            onChange={(e) => handleInputChange('security', 'ipRestrictions', e.target.checked)}
          />
          <Checkbox
            label="Log All Admin Actions"
            checked={formData.security.auditLogging}
            onChange={(e) => handleInputChange('security', 'auditLogging', e.target.checked)}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Session Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={formData.security.sessionTimeout}
            onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
          />
          <Input
            label="Max Login Attempts"
            type="number"
            value={formData.security.maxLoginAttempts}
            onChange={(e) => handleInputChange('security', 'maxLoginAttempts', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">External Services</h3>
        <div className="space-y-3">
          <Checkbox
            label="Google Calendar Sync"
            checked={formData.integrations.googleCalendar}
            onChange={(e) => handleInputChange('integrations', 'googleCalendar', e.target.checked)}
          />
          <Checkbox
            label="Microsoft Outlook Integration"
            checked={formData.integrations.outlookIntegration}
            onChange={(e) => handleInputChange('integrations', 'outlookIntegration', e.target.checked)}
          />
          <Checkbox
            label="LDAP Authentication"
            checked={formData.integrations.ldapAuth}
            onChange={(e) => handleInputChange('integrations', 'ldapAuth', e.target.checked)}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">API Configuration</h3>
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="API Rate Limit (requests/hour)"
            type="number"
            value={formData.integrations.apiRateLimit}
            onChange={(e) => handleInputChange('integrations', 'apiRateLimit', e.target.value)}
          />
          <Checkbox
            label="Enable Webhook Notifications"
            checked={formData.integrations.webhooks}
            onChange={(e) => handleInputChange('integrations', 'webhooks', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'booking': return renderBookingSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'integrations': return renderIntegrationSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">System Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure system behavior and policies</p>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Tabs */}
        <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-border">
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6">
          {renderTabContent()}
          
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-border">
            <Button variant="outline">
              Reset to Defaults
            </Button>
            <Button variant="default" onClick={handleSave}>
              <Icon name="Save" size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;