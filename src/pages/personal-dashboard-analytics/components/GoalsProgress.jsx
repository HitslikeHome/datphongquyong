import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GoalsProgress = ({ goals, achievements }) => {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const weeklyGoals = [
    {
      id: 1,
      title: 'Study Hours Target',
      current: 18,
      target: 25,
      unit: 'hours',
      icon: 'Clock',
      color: 'bg-primary',
      progress: 72,
      timeframe: 'This Week',
      description: 'Maintain consistent study schedule'
    },
    {
      id: 2,
      title: 'Room Exploration',
      current: 3,
      target: 5,
      unit: 'new rooms',
      icon: 'MapPin',
      color: 'bg-accent',
      progress: 60,
      timeframe: 'This Month',
      description: 'Discover optimal study environments'
    },
    {
      id: 3,
      title: 'Collaboration Sessions',
      current: 7,
      target: 10,
      unit: 'group bookings',
      icon: 'Users',
      color: 'bg-success',
      progress: 70,
      timeframe: 'This Month',
      description: 'Enhance teamwork and networking'
    },
    {
      id: 4,
      title: 'Booking Efficiency',
      current: 94,
      target: 95,
      unit: '% success rate',
      icon: 'Target',
      color: 'bg-secondary',
      progress: 99,
      timeframe: 'Overall',
      description: 'Minimize cancellations and no-shows'
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: 'Study Streak Champion',
      description: 'Booked study sessions for 15 consecutive days',
      icon: 'Award',
      date: '2025-07-18',
      rarity: 'rare',
      points: 150
    },
    {
      id: 2,
      title: 'Early Bird',
      description: 'Completed 10 morning study sessions',
      icon: 'Sunrise',
      date: '2025-07-15',
      rarity: 'common',
      points: 50
    },
    {
      id: 3,
      title: 'Space Explorer',
      description: 'Used 10 different room types',
      icon: 'Compass',
      date: '2025-07-12',
      rarity: 'uncommon',
      points: 100
    },
    {
      id: 4,
      title: 'Team Player',
      description: 'Organized 5 successful group bookings',
      icon: 'Users',
      date: '2025-07-10',
      rarity: 'uncommon',
      points: 100
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground bg-muted';
      case 'uncommon': return 'text-accent bg-accent/10';
      case 'rare': return 'text-warning bg-warning/10';
      case 'legendary': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
    setShowGoalModal(true);
  };

  const handleSetNewGoal = () => {
    console.log('Setting new goal');
    setShowGoalModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Goals Progress */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Goals & Progress</h2>
          <Button variant="outline" size="sm" onClick={() => setShowGoalModal(true)}>
            <Icon name="Plus" size={16} className="mr-2" />
            New Goal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeklyGoals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => handleGoalClick(goal)}
              className="p-4 rounded-lg border border-border hover:border-primary/50 academic-transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${goal.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={goal.icon} size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{goal.title}</h3>
                    <p className="text-xs text-muted-foreground">{goal.timeframe}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">
                    {goal.current}/{goal.target}
                  </div>
                  <div className="text-xs text-muted-foreground">{goal.unit}</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-foreground">{goal.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${goal.color} rounded-full transition-all duration-500`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Achievements</h2>
          <Button variant="outline" size="sm">
            <Icon name="Trophy" size={16} className="mr-2" />
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 rounded-lg border border-border hover:border-primary/50 academic-transition"
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning/70 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={achievement.icon} size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground">{achievement.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(achievement.date).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning" />
                      <span className="text-xs font-medium text-warning">{achievement.points} pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border border-border max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedGoal ? 'Goal Details' : 'Set New Goal'}
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setShowGoalModal(false);
                  setSelectedGoal(null);
                }}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            {selectedGoal ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${selectedGoal.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={selectedGoal.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{selectedGoal.title}</h4>
                    <p className="text-sm text-muted-foreground">{selectedGoal.timeframe}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold text-foreground">
                      {selectedGoal.current} / {selectedGoal.target}
                    </div>
                    <div className="text-sm text-muted-foreground">{selectedGoal.unit}</div>
                  </div>
                  <div className="w-full h-3 bg-background rounded-full overflow-hidden">
                    <div
                      className={`h-full ${selectedGoal.color} rounded-full`}
                      style={{ width: `${selectedGoal.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm font-medium text-foreground">{selectedGoal.progress}% Complete</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">{selectedGoal.description}</p>
                
                <div className="flex space-x-3">
                  <Button variant="outline" fullWidth>
                    Modify Goal
                  </Button>
                  <Button variant="default" fullWidth>
                    Track Progress
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Set a new goal to track your academic progress and stay motivated.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleSetNewGoal}>
                    <Icon name="Clock" size={16} className="mr-2" />
                    Study Hours
                  </Button>
                  <Button variant="outline" onClick={handleSetNewGoal}>
                    <Icon name="MapPin" size={16} className="mr-2" />
                    Room Exploration
                  </Button>
                  <Button variant="outline" onClick={handleSetNewGoal}>
                    <Icon name="Users" size={16} className="mr-2" />
                    Collaboration
                  </Button>
                  <Button variant="outline" onClick={handleSetNewGoal}>
                    <Icon name="Target" size={16} className="mr-2" />
                    Custom Goal
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Weekly Summary */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">This Week's Summary</h3>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">+12% vs last week</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">18</div>
            <div className="text-sm text-muted-foreground">Hours Studied</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="text-sm text-muted-foreground">Bookings Made</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground">New Rooms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">94%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsProgress;