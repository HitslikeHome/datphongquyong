import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  
  const getGreeting = () => {
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Ready to make today productive?",
      "Your perfect workspace awaits!",
      "Let\'s find your ideal study spot.",
      "Time to book your success space!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="User" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {getGreeting()}, Dr. Sarah Chen
              </h1>
              <p className="text-white/80 text-sm">Faculty Member • Computer Science</p>
            </div>
          </div>
          <p className="text-white/90 text-lg font-medium">
            {getMotivationalMessage()}
          </p>
        </div>
        
        <div className="hidden md:flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
            <Icon name="Calendar" size={16} color="white" />
            <span className="text-sm font-medium">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
            <Icon name="Clock" size={16} color="white" />
            <span className="text-sm font-medium">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;