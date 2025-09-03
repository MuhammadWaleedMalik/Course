import React, { useEffect, useState } from 'react';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  progress?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ progress = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const loadingMessages = [
    "Loading your coding journey...",
    "Preparing amazing content...",
    "Almost there...",
    "This will be worth the wait!",
    "Crafting your experience..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentText = '';
    let i = 0;
    const message = loadingMessages[currentIndex];
    
    const typingInterval = setInterval(() => {
      if (i < message.length) {
        currentText += message.charAt(i);
        setDisplayText(currentText);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <div className="loading-spinner">
      <div className="spinner-container">
        <div className="logo-circle">
          <div className="logo-inner"></div>
        </div>
        <h2 className="loader-title">Code Nexus Crew</h2>
        <p className="typing-text">{displayText}<span className="cursor">|</span></p>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;