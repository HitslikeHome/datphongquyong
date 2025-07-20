import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdminHeader = ({ currentUser, onNotificationClick, onProfileClick }) => {
  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Icon name="Shield" size={24} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Control Panel</h1>
            <p className="text-muted-foreground">System management and oversight dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 text-success rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={onNotificationClick} className="relative">
            <Icon name="Bell" size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-cta rounded-full"></span>
          </Button>
          
          <div className="w-px h-6 bg-border"></div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">{currentUser.name}</div>
              <div className="text-xs text-muted-foreground">{currentUser.role}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={onProfileClick}>
              <Icon name="ChevronDown" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;