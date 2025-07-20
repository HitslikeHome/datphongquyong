import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRScanner = ({ onScanSuccess, onScanError, isActive }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      initializeCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isActive]);

  const initializeCamera = async () => {
    try {
      setScanError(null);
      setIsScanning(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;
      setHasPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Start QR code detection simulation
      startQRDetection();
    } catch (error) {
      console.error('Camera access error:', error);
      setHasPermission(false);
      setScanError('Camera access denied. Please enable camera permissions.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
    if (scannerRef.current) {
      clearInterval(scannerRef.current);
    }
  };

  const startQRDetection = () => {
    // Simulate QR code detection
    scannerRef.current = setInterval(() => {
      // Mock QR code detection - in real implementation, use a QR library
      const mockDetection = Math.random() > 0.95; // 5% chance per scan cycle
      
      if (mockDetection) {
        const mockQRData = {
          bookingId: 'BK-2025-001234',
          spaceId: 'LIB-301',
          userId: 'sarah.chen@usth.edu.vn',
          timestamp: new Date().toISOString()
        };
        
        clearInterval(scannerRef.current);
        onScanSuccess(mockQRData);
      }
    }, 500);
  };

  const toggleTorch = async () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      
      if (capabilities.torch) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: !torchEnabled }]
          });
          setTorchEnabled(!torchEnabled);
        } catch (error) {
          console.error('Torch toggle error:', error);
        }
      }
    }
  };

  const retryCamera = () => {
    setScanError(null);
    initializeCamera();
  };

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-muted rounded-xl p-8">
        <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
          <Icon name="CameraOff" size={32} className="text-error" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Camera Access Required</h3>
        <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
          Please enable camera permissions to scan QR codes for check-in.
        </p>
        <Button onClick={retryCamera} variant="outline">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  if (scanError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-muted rounded-xl p-8">
        <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mb-4">
          <Icon name="AlertTriangle" size={32} className="text-warning" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Scanner Error</h3>
        <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
          {scanError}
        </p>
        <Button onClick={retryCamera} variant="outline">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="relative bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-96 object-cover"
        playsInline
        muted
      />
      
      {/* Scanning Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Scanning Frame */}
          <div className="w-64 h-64 border-2 border-primary rounded-lg relative">
            {/* Corner Indicators */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
            
            {/* Scanning Line Animation */}
            {isScanning && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary animate-pulse">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
              </div>
            )}
          </div>
          
          {/* Instructions */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
              Position QR code within the frame
            </p>
          </div>
        </div>
      </div>

      {/* Camera Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTorch}
          className="bg-black/50 text-white hover:bg-black/70"
        >
          <Icon name={torchEnabled ? "FlashlightOff" : "Flashlight"} size={20} />
        </Button>
        
        <div className="flex items-center space-x-2 bg-black/50 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-white text-xs font-medium">Scanning...</span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="absolute top-4 right-4">
        <div className="bg-black/50 px-3 py-1.5 rounded-full flex items-center space-x-2">
          <Icon name="Camera" size={16} className="text-white" />
          <span className="text-white text-xs font-medium">Live</span>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;