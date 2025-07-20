import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingSteps = ({ currentStep, onStepClick }) => {
  const steps = [
    { id: 1, name: 'Date & Time', icon: 'Calendar', description: 'Select when' },
    { id: 2, name: 'Space Type', icon: 'Building', description: 'Choose room' },
    { id: 3, name: 'Details', icon: 'Settings', description: 'Configure' },
    { id: 4, name: 'Confirm', icon: 'CheckCircle', description: 'Finalize' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={`flex items-center space-x-3 cursor-pointer transition-smooth ${
                currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => onStepClick(step.id)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                currentStep > step.id 
                  ? 'bg-success text-success-foreground' 
                  : currentStep === step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {currentStep > step.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <div className="hidden sm:block">
                <div className="font-medium text-sm">{step.name}</div>
                <div className="text-xs opacity-75">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 transition-smooth ${
                currentStep > step.id ? 'bg-success' : 'bg-border'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;