import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QRScanner from './components/QRScanner';
import ManualCheckIn from './components/ManualCheckIn';
import CheckInSuccess from './components/CheckInSuccess';
import CheckInMethods from './components/CheckInMethods';

const QRCheckInPortal = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('methods'); // methods, qr-scan, manual, success
  const [checkInData, setCheckInData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for camera permissions on component mount
  useEffect(() => {
    if (currentStep === 'qr-scan') {
      checkCameraPermissions();
    }
  }, [currentStep]);

  const checkCameraPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Camera permission error:', error);
      setError('Camera access is required for QR scanning. Please enable camera permissions.');
    }
  };

  const handleMethodSelect = (method) => {
    setError(null);
    if (method === 'qr-scan') {
      setCurrentStep('qr-scan');
    } else if (method === 'manual') {
      setCurrentStep('manual');
    }
  };

  const handleQRScanSuccess = (qrData) => {
    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      const mockBookingData = {
        bookingId: qrData.bookingId,
        spaceId: qrData.spaceId || 'LIB-301',
        spaceName: 'Library Study Room 301',
        startTime: '14:00',
        endTime: '16:00',
        date: '2025-01-20',
        userId: qrData.userId || 'sarah.chen@usth.edu.vn'
      };
      
      setCheckInData(mockBookingData);
      setCurrentStep('success');
      setIsLoading(false);
    }, 2000);
  };

  const handleQRScanError = (error) => {
    setError(error);
  };

  const handleManualCheckInSuccess = (bookingData) => {
    setCheckInData(bookingData);
    setCurrentStep('success');
  };

  const handleBackToMethods = () => {
    setCurrentStep('methods');
    setError(null);
  };

  const handleNewCheckIn = () => {
    setCurrentStep('methods');
    setCheckInData(null);
    setError(null);
  };

  const handleViewBookings = () => {
    navigate('/my-reservations-dashboard');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'methods':
        return <CheckInMethods onSelectMethod={handleMethodSelect} />;
      
      case 'qr-scan':
        return (
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Scan QR Code</h2>
                <p className="text-sm text-muted-foreground">Position the QR code within the frame</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleBackToMethods}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
            </div>
            
            {error && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-error" />
                  <p className="text-sm text-error">{error}</p>
                </div>
              </div>
            )}
            
            <QRScanner
              onScanSuccess={handleQRScanSuccess}
              onScanError={handleQRScanError}
              isActive={currentStep === 'qr-scan'}
            />
            
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => setCurrentStep('manual')}>
                <Icon name="Keyboard" size={16} className="mr-2" />
                Enter Manually Instead
              </Button>
            </div>
          </div>
        );
      
      case 'manual':
        return (
          <ManualCheckIn
            onCheckInSuccess={handleManualCheckInSuccess}
            onBack={handleBackToMethods}
          />
        );
      
      case 'success':
        return (
          <CheckInSuccess
            bookingData={checkInData}
            onNewCheckIn={handleNewCheckIn}
            onViewBookings={handleViewBookings}
          />
        );
      
      default:
        return <CheckInMethods onSelectMethod={handleMethodSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card rounded-xl p-8 max-w-sm mx-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-subtle">
                  <Icon name="Loader2" size={24} className="text-primary animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Processing Check-In</h3>
                <p className="text-sm text-muted-foreground">
                  Verifying your booking and preparing space access...
                </p>
              </div>
            </div>
          )}

          {/* Breadcrumb */}
          {currentStep !== 'methods' && (
            <div className="mb-6">
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                <button
                  onClick={handleBackToMethods}
                  className="hover:text-foreground transition-colors"
                >
                  Check-In Portal
                </button>
                <Icon name="ChevronRight" size={14} />
                <span className="text-foreground capitalize">
                  {currentStep === 'qr-scan' ? 'QR Scanner' : 
                   currentStep === 'manual'? 'Manual Entry' : 'Check-In Complete'}
                </span>
              </nav>
            </div>
          )}

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            {renderCurrentStep()}
          </div>

          {/* Campus Status Footer */}
          {currentStep === 'methods' && (
            <div className="mt-12 max-w-6xl mx-auto">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Campus Status</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-success">All Systems Online</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">42</div>
                    <div className="text-xs text-muted-foreground">Spaces Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">156</div>
                    <div className="text-xs text-muted-foreground">Active Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">98.5%</div>
                    <div className="text-xs text-muted-foreground">System Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">2.1s</div>
                    <div className="text-xs text-muted-foreground">Avg Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QRCheckInPortal;