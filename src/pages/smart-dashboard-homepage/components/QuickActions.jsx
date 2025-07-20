import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Book a Space",
      description: "Find and reserve your perfect workspace",
      icon: "Calendar",
      color: "bg-primary text-primary-foreground",
      route: "/intelligent-booking-engine",
      shortcut: "Ctrl + B"
    },
    {
      id: 2,
      title: "QR Check-In",
      description: "Scan to access your reserved space",
      icon: "QrCode",
      color: "bg-success text-success-foreground",
      route: "/qr-check-in-portal",
      shortcut: "Ctrl + Q"
    },
    {
      id: 3,
      title: "Discover Spaces",
      description: "Explore available rooms and facilities",
      icon: "Search",
      color: "bg-secondary text-secondary-foreground",
      route: "/space-discovery-center",
      shortcut: "Ctrl + D"
    },
    {
      id: 4,
      title: "My Reservations",
      description: "Manage your current bookings",
      icon: "BookOpen",
      color: "bg-accent text-accent-foreground",
      route: "/my-reservations-dashboard",
      shortcut: "Ctrl + R"
    }
  ];

  const systemActions = [
    {
      id: 5,
      title: "Emergency Booking",
      description: "Need a space right now?",
      icon: "Zap",
      action: "emergency",
      urgent: true
    },
    {
      id: 6,
      title: "Report Issue",
      description: "Space or system problem?",
      icon: "AlertTriangle",
      action: "report",
      urgent: false
    },
    {
      id: 7,
      title: "Help & Support",
      description: "Get assistance or tutorials",
      icon: "HelpCircle",
      action: "help",
      urgent: false
    }
  ];

  const handleSystemAction = (action) => {
    switch (action) {
      case 'emergency':
        // In a real app, this would open emergency booking modal
        console.log('Opening emergency booking...');
        break;
      case 'report':
        // In a real app, this would open issue reporting form
        console.log('Opening issue report...');
        break;
      case 'help':
        // In a real app, this would open help center
        console.log('Opening help center...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Primary Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Zap" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Link key={action.id} to={action.route}>
              <div className="group relative overflow-hidden rounded-lg p-4 hover:shadow-elevated transition-smooth cursor-pointer">
                <div className={`absolute inset-0 ${action.color} opacity-10 group-hover:opacity-15 transition-smooth`}></div>
                
                <div className="relative">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon name={action.icon} size={20} />
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">{action.shortcut}</span>
                    <Icon name="ArrowRight" size={14} className="text-muted-foreground group-hover:text-foreground transition-smooth" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* System Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Settings" size={20} className="text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">System Actions</h2>
        </div>
        
        <div className="space-y-3">
          {systemActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleSystemAction(action.action)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-smooth text-left"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                action.urgent 
                  ? 'bg-error/10 text-error' :'bg-muted text-muted-foreground'
              }`}>
                <Icon name={action.icon} size={16} />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{action.title}</h3>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
              
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Campus Status */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Campus Status</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-success font-medium">All Systems Online</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Response Time</span>
              <div className="font-medium text-foreground">&lt; 200ms</div>
            </div>
            <div>
              <span className="text-muted-foreground">Uptime</span>
              <div className="font-medium text-foreground">99.9%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;