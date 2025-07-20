import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SocialProofSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [liveStats, setLiveStats] = useState({
    activeBookings: 12,
    todayBookings: 156,
    monthlyBookings: 2847
  });

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      year: 'Junior',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: `UIH BookSpace completely transformed my study routine. I used to waste 20-30 minutes every day just looking for available study spaces. Now I can book the perfect room in under 30 seconds, and the AI recommendations actually understand my study patterns. My GPA improved by 0.4 points this semester!`,
      rating: 5,
      bookings: 47,
      timeUsing: '8 months'
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      role: 'Associate Professor',
      department: 'Business Administration',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: `As faculty, I need reliable booking for my office hours and team meetings. The recurring booking feature and calendar integration have saved me countless hours of administrative work. The analytics dashboard helps me optimize my space usage and better serve my students.`,
      rating: 5,
      bookings: 89,
      timeUsing: '1 year'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'Graduate Student',
      department: 'Research Assistant',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: `The collaborative booking feature is a game-changer for our research group. We can coordinate complex schedules across multiple team members and book specialized lab equipment rooms. The conflict prevention system has eliminated double-bookings entirely.`,
      rating: 5,
      bookings: 134,
      timeUsing: '6 months'
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Student Organization President',
      department: 'Engineering Society',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: `Managing event spaces for our 200+ member organization used to be a nightmare. UIH BookSpace's group booking features and approval workflows have streamlined everything. We've increased our event frequency by 40% while reducing planning time.`,
      rating: 5,
      bookings: 78,
      timeUsing: '10 months'
    }
  ];

  const achievements = [
    {
      icon: 'Award',
      title: 'Student Choice Award',
      description: 'Best Campus Technology 2024',
      year: '2024'
    },
    {
      icon: 'TrendingUp',
      title: '98.5% Success Rate',
      description: 'Booking completion rate',
      year: 'Current'
    },
    {
      icon: 'Users',
      title: '15,000+ Active Users',
      description: 'Students and faculty',
      year: 'Growing'
    },
    {
      icon: 'Clock',
      title: '2.3M Hours Saved',
      description: 'Time saved in booking process',
      year: 'Lifetime'
    }
  ];

  const liveActivity = [
    { user: 'Alex Thompson', action: 'booked Study Room A', time: '2 min ago', type: 'booking' },
    { user: 'Maria Garcia', action: 'extended Tech Lab session', time: '4 min ago', type: 'extension' },
    { user: 'Prof. Johnson', action: 'scheduled recurring meetings', time: '7 min ago', type: 'recurring' },
    { user: 'Study Group Delta', action: 'reserved Conference Room B', time: '9 min ago', type: 'group' },
    { user: 'James Liu', action: 'checked into Presentation Hall', time: '12 min ago', type: 'checkin' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const statsTimer = setInterval(() => {
      setLiveStats(prev => ({
        activeBookings: prev.activeBookings + Math.floor(Math.random() * 3) - 1,
        todayBookings: prev.todayBookings + Math.floor(Math.random() * 2),
        monthlyBookings: prev.monthlyBookings + Math.floor(Math.random() * 2)
      }));
    }, 30000);
    return () => clearInterval(statsTimer);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking': return 'Calendar';
      case 'extension': return 'Clock';
      case 'recurring': return 'Repeat';
      case 'group': return 'Users';
      case 'checkin': return 'CheckCircle';
      default: return 'Activity';
    }
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Heart" size={20} className="text-error fill-current" />
            <span className="text-sm font-medium text-error">Loved by Students & Faculty</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Join 15,000+ Happy Users
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See why UIH BookSpace is the most trusted room booking platform on campus, with real stories from real users.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Testimonial */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-8 academic-shadow-lg">
              <div className="flex items-start space-x-4 mb-6">
                <div className="relative">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-success-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role}
                    {testimonials[currentTestimonial].department && ` • ${testimonials[currentTestimonial].department}`}
                    {testimonials[currentTestimonial].year && ` • ${testimonials[currentTestimonial].year}`}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <span>{testimonials[currentTestimonial].bookings} bookings</span>
                    <span>Using for {testimonials[currentTestimonial].timeUsing}</span>
                  </div>
                </div>
              </div>

              <blockquote className="text-lg text-foreground leading-relaxed mb-6">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full academic-transition ${
                        index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Quote" size={16} />
                  <span>Verified user</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Stats & Activity */}
          <div className="space-y-6">
            {/* Live Statistics */}
            <div className="bg-card rounded-xl p-6 academic-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Live Statistics</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full availability-pulse"></div>
                  <span className="text-xs text-success font-medium">LIVE</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Activity" size={16} className="text-accent" />
                    <span className="text-sm text-muted-foreground">Active Bookings</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">{liveStats.activeBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Today's Bookings</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">{liveStats.todayBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span className="text-sm text-muted-foreground">This Month</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">{liveStats.monthlyBookings.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-xl p-6 academic-shadow">
              <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {liveActivity.slice(0, 4).map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={getActivityIcon(activity.type)} size={12} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-card rounded-xl p-6 text-center academic-shadow hover:shadow-lg academic-transition">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={achievement.icon} size={24} className="text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{achievement.description}</p>
              <span className="text-xs text-accent font-medium">{achievement.year}</span>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-primary-foreground">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Campus Experience?</h3>
          <p className="text-lg text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Join thousands of students and faculty who have already discovered the power of intelligent room booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/instant-booking-interface">
              <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" iconName="Zap" iconPosition="left">
                Start Booking Now
              </Button>
            </Link>
            <Link to="/personal-dashboard-analytics">
              <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" iconName="BarChart3" iconPosition="left">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;