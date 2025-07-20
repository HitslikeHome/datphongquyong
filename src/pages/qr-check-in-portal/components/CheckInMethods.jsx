import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CheckInMethods = ({ onSelectMethod }) => {
  const methods = [
    {
      id: 'qr-scan',
      title: 'Scan QR Code',
      description: 'Use your camera to scan the QR code from your booking confirmation',
      icon: 'QrCode',
      primary: true,
      features: ['Instant recognition', 'Auto-focus camera', 'Works in low light']
    },
    {
      id: 'manual',
      title: 'Manual Entry',
      description: 'Enter your booking ID or search by space name',
      icon: 'Keyboard',
      primary: false,
      features: ['Type booking ID', 'Search by space', 'Backup option']
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="LogIn" size={32} color="white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Check Into Your Space</h1>
        <p className="text-muted-foreground">
          Choose your preferred check-in method to access your reserved space
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {methods.map((method) => (
          <div
            key={method.id}
            className={`relative bg-card rounded-xl p-6 shadow-card border-2 transition-all duration-200 hover:shadow-elevated cursor-pointer ${
              method.primary ? 'border-primary/20 bg-primary/5' : 'border-border hover:border-primary/30'
            }`}
            onClick={() => onSelectMethod(method.id)}
          >
            {method.primary && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Recommended
                </div>
              </div>
            )}

            <div className="text-center mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                method.primary ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={method.icon} size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{method.title}</h3>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </div>

            <div className="space-y-2 mb-6">
              {method.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-xs text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              variant={method.primary ? 'default' : 'outline'}
              fullWidth
              onClick={() => onSelectMethod(method.id)}
            >
              <Icon name={method.icon} size={16} className="mr-2" />
              {method.primary ? 'Start Scanning' : 'Enter Manually'}
            </Button>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-muted rounded-xl p-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground mb-1">2.3s</div>
            <div className="text-xs text-muted-foreground">Avg. Check-in Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground mb-1">99.8%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground mb-1">24/7</div>
            <div className="text-xs text-muted-foreground">Available</div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="HelpCircle" size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Need Help?</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>• QR codes are found in your booking confirmation email</p>
              <p>• Booking IDs follow the format: BK-YYYY-XXXXXX</p>
              <p>• Check-in is available 15 minutes before your booking time</p>
              <p>• Contact support if you experience any issues</p>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <Button variant="ghost" size="sm">
                <Icon name="Mail" size={14} className="mr-1" />
                Email Support
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Phone" size={14} className="mr-1" />
                Call Help Desk
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInMethods;