import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onBulkAction, selectedCount }) => {
  const navigate = useNavigate();

  const quickActionItems = [
    {
      icon: 'Plus',
      label: 'Book New Space',
      description: 'Reserve a room or workspace',
      action: () => navigate('/intelligent-booking-engine'),
      variant: 'default'
    },
    {
      icon: 'QrCode',
      label: 'Quick Check-in',
      description: 'Scan QR code to access',
      action: () => navigate('/qr-check-in-portal'),
      variant: 'outline'
    },
    {
      icon: 'Search',
      label: 'Discover Spaces',
      description: 'Explore available rooms',
      action: () => navigate('/space-discovery-center'),
      variant: 'ghost'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                {selectedCount} booking{selectedCount > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBulkAction('modify')}
                iconName="Edit"
                iconPosition="left"
              >
                Modify All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBulkAction('cancel')}
                className="text-error hover:text-error hover:bg-error/10"
                iconName="X"
                iconPosition="left"
              >
                Cancel All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActionItems.map((item, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth cursor-pointer group"
            onClick={item.action}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                item.variant === 'default' ?'bg-primary text-primary-foreground' 
                  : item.variant === 'outline' ?'bg-secondary/10 text-secondary' :'bg-muted text-muted-foreground'
              } group-hover:scale-110 transition-smooth`}>
                <Icon name={item.icon} size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                  {item.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </div>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;