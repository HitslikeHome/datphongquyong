import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSettings = ({ settings, onSettingsChange, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const reminderOptions = [
    { value: '5', label: '5 minutes before' },
    { value: '15', label: '15 minutes before' },
    { value: '30', label: '30 minutes before' },
    { value: '60', label: '1 hour before' },
    { value: '120', label: '2 hours before' },
    { value: '1440', label: '1 day before' }
  ];

  const handleSettingChange = (key, value) => {
    const updatedSettings = { ...localSettings, [key]: value };
    setLocalSettings(updatedSettings);
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Bell" size={16} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Notification Settings</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Email Notifications */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Email Notifications</h3>
            <div className="space-y-3">
              <Checkbox
                label="Booking confirmations"
                description="Receive email when booking is confirmed"
                checked={localSettings.emailConfirmations}
                onChange={(e) => handleSettingChange('emailConfirmations', e.target.checked)}
              />
              <Checkbox
                label="Booking reminders"
                description="Get reminded before your booking starts"
                checked={localSettings.emailReminders}
                onChange={(e) => handleSettingChange('emailReminders', e.target.checked)}
              />
              <Checkbox
                label="Booking changes"
                description="Notify when booking is modified or cancelled"
                checked={localSettings.emailChanges}
                onChange={(e) => handleSettingChange('emailChanges', e.target.checked)}
              />
            </div>
          </div>

          {/* Push Notifications */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Push Notifications</h3>
            <div className="space-y-3">
              <Checkbox
                label="Mobile notifications"
                description="Receive push notifications on your device"
                checked={localSettings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
              />
              <Checkbox
                label="Check-in reminders"
                description="Remind to check-in when booking starts"
                checked={localSettings.checkInReminders}
                onChange={(e) => handleSettingChange('checkInReminders', e.target.checked)}
              />
            </div>
          </div>

          {/* Reminder Timing */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Reminder Timing</h3>
            <Select
              label="Default reminder time"
              description="When to send booking reminders"
              options={reminderOptions}
              value={localSettings.reminderTime}
              onChange={(value) => handleSettingChange('reminderTime', value)}
            />
          </div>

          {/* Weekly Summary */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Weekly Summary</h3>
            <Checkbox
              label="Weekly booking summary"
              description="Receive weekly report of your bookings and usage"
              checked={localSettings.weeklySummary}
              onChange={(e) => handleSettingChange('weeklySummary', e.target.checked)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;