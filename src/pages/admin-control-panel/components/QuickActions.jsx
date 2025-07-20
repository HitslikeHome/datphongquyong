import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      id: 'add-user',
      title: 'Add New User',
      description: 'Create user account',
      icon: 'UserPlus',
      color: 'primary'
    },
    {
      id: 'add-space',
      title: 'Add Space',
      description: 'Register new room',
      icon: 'Plus',
      color: 'success'
    },
    {
      id: 'system-maintenance',
      title: 'Maintenance Mode',
      description: 'Schedule downtime',
      icon: 'Settings',
      color: 'warning'
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Export analytics',
      icon: 'FileText',
      color: 'accent'
    },
    {
      id: 'bulk-import',
      title: 'Bulk Import',
      description: 'Import user data',
      icon: 'Upload',
      color: 'secondary'
    },
    {
      id: 'system-backup',
      title: 'System Backup',
      description: 'Create backup',
      icon: 'Database',
      color: 'cta'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        <Icon name="Zap" size={20} className="text-accent" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            onClick={() => onActionClick(action.id)}
            className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-muted transition-smooth"
          >
            <div className={`w-8 h-8 bg-${action.color}/10 rounded-lg flex items-center justify-center mb-2`}>
              <Icon name={action.icon} size={16} className={`text-${action.color}`} />
            </div>
            <div className="text-left">
              <div className="font-medium text-foreground text-sm">{action.title}</div>
              <div className="text-xs text-muted-foreground">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;