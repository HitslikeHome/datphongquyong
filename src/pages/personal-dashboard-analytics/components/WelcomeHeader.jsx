import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeHeader = ({ userName, currentBookings, todayStats }) => {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  
  const getGreeting = () => {
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getProductivityTip = () => {
    const tips = [
      "You\'re most productive in morning bookings",
      "Study rooms with natural light boost your focus",
      "Group spaces enhance your collaboration skills",
      "Quiet zones improve your concentration by 40%"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-primary-foreground mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-primary-foreground/80 mb-4">
            {getProductivityTip()}
          </p>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={20} />
              <div>
                <div className="text-sm font-medium">{currentBookings} Active</div>
                <div className="text-xs text-primary-foreground/70">Current Bookings</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <div>
                <div className="text-sm font-medium">{todayStats.hoursBooked}h</div>
                <div className="text-xs text-primary-foreground/70">Today's Usage</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={20} />
              <div>
                <div className="text-sm font-medium">{todayStats.streak} days</div>
                <div className="text-xs text-primary-foreground/70">Booking Streak</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
            <Icon name="Plus" size={16} className="mr-2" />
            Quick Book
          </Button>
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
            <Icon name="Settings" size={16} className="mr-2" />
            Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;