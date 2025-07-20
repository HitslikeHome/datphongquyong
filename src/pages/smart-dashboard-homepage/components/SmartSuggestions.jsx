import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartSuggestions = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  
  const suggestions = {
    recommended: [
      {
        id: 1,
        type: "space",
        title: "CS Lab 3 - Perfect for Your Next Lecture",
        description: "Based on your booking history, this lab matches your usual requirements for 30+ students with projector setup.",
        confidence: 95,
        reason: "Similar to your last 5 bookings",
        action: "Book for Tomorrow 2:00 PM",
        icon: "Target",
        color: "text-primary bg-primary/10"
      },
      {
        id: 2,
        type: "time",
        title: "Optimal Booking Time: 1:00 PM - 3:00 PM",
        description: "Campus data shows 85% availability during this window. Your students typically prefer afternoon sessions.",
        confidence: 88,
        reason: "Based on campus patterns",
        action: "View Available Spaces",
        icon: "Clock",
        color: "text-success bg-success/10"
      },
      {
        id: 3,
        type: "feature",
        title: "Try Recurring Bookings",
        description: "Save time by setting up weekly reservations for your regular lectures. 73% of faculty find this helpful.",
        confidence: 82,
        reason: "Feature recommendation",
        action: "Set Up Recurring",
        icon: "Repeat",
        color: "text-accent bg-accent/10"
      }
    ],
    trending: [
      {
        id: 4,
        type: "popular",
        title: "Study Room C - Most Booked This Week",
        description: "High demand space with excellent natural lighting and collaborative setup. Book early to secure.",
        confidence: 91,
        reason: "Popular among faculty",
        action: "Check Availability",
        icon: "TrendingUp",
        color: "text-warning bg-warning/10"
      },
      {
        id: 5,
        type: "new",
        title: "New: Engineering Lab 5 Now Available",
        description: "Recently renovated with latest equipment. Perfect for hands-on demonstrations and group projects.",
        confidence: 85,
        reason: "New space alert",
        action: "Explore Space",
        icon: "Sparkles",
        color: "text-secondary bg-secondary/10"
      }
    ],
    insights: [
      {
        id: 6,
        type: "pattern",
        title: "Your Peak Booking Times",
        description: "You typically book spaces on Tuesdays and Thursdays between 2-4 PM. Consider Monday slots for better availability.",
        confidence: 94,
        reason: "Personal usage analysis",
        action: "View Calendar",
        icon: "BarChart3",
        color: "text-primary bg-primary/10"
      },
      {
        id: 7,
        type: "efficiency",
        title: "Reduce No-Shows by 40%",
        description: "Enable automatic reminders 30 minutes before your bookings. This has helped similar users significantly.",
        confidence: 87,
        reason: "Efficiency improvement",
        action: "Enable Reminders",
        icon: "Bell",
        color: "text-success bg-success/10"
      }
    ]
  };

  const tabs = [
    { id: 'recommended', label: 'Recommended', icon: 'Star' },
    { id: 'trending', label: 'Trending', icon: 'TrendingUp' },
    { id: 'insights', label: 'Insights', icon: 'Brain' }
  ];

  const handleSuggestionAction = (suggestion) => {
    // In a real app, this would handle different action types
    console.log('Acting on suggestion:', suggestion);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Smart Suggestions</h2>
          <p className="text-sm text-muted-foreground">AI-powered recommendations based on your patterns</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">AI Powered</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Suggestions Content */}
      <div className="space-y-4">
        {suggestions[activeTab].map((suggestion) => (
          <div key={suggestion.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${suggestion.color}`}>
                <Icon name={suggestion.icon} size={20} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{suggestion.title}</h3>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Zap" size={12} />
                    <span>{suggestion.confidence}% match</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Info" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{suggestion.reason}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionAction(suggestion)}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Learning Notice */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Brain" size={14} />
          <span>Suggestions improve as you use SeatSync. Your data is processed securely and never shared.</span>
        </div>
      </div>
    </div>
  );
};

export default SmartSuggestions;