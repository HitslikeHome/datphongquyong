import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'Check';
    return step.icon;
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorColor = (stepIndex) => {
    return stepIndex < currentStep ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="bg-card border border-border rounded-lg academic-shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Booking Progress</h3>
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Desktop Progress */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 academic-transition ${getStepColor(status)}`}
                >
                  <Icon name={getStepIcon(step, status)} size={20} />
                </div>
                <div className="text-center">
                  <p className={`text-sm font-medium ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed' ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-border relative">
                    <div
                      className={`h-full academic-transition ${getConnectorColor(index)}`}
                      style={{
                        width: index < currentStep ? '100%' : '0%'
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center space-x-4 mb-4">
          <div
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStepColor(getStepStatus(currentStep))}`}
          >
            <Icon name={getStepIcon(steps[currentStep], getStepStatus(currentStep))} size={18} />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">{steps[currentStep].title}</p>
            <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full academic-transition"
            style={{
              width: `${((currentStep + 1) / totalSteps) * 100}%`
            }}
          ></div>
        </div>
      </div>

      {/* Step Navigation Hints */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Info" size={14} />
            <span>
              {currentStep === 0 && "Select your preferred room and check availability"}
              {currentStep === 1 && "Choose your booking time and duration"}
              {currentStep === 2 && "Review details and confirm your booking"}
              {currentStep === 3 && "Booking confirmed! Check your email for details"}
            </span>
          </div>
          
          {currentStep < totalSteps - 1 && (
            <div className="flex items-center space-x-1 text-primary">
              <span>Next: {steps[currentStep + 1].title}</span>
              <Icon name="ArrowRight" size={14} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;