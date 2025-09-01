import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Page1 from './Page1/Page1';
import Page2 from './Page2/Page2';
import Page3 from './Page3/Page3';
import Page4 from './Page4/Page4';
import Page5 from './Page5/Page5';
import Page7 from './Page7/Page7';
import Page8 from './Page8/Page8';
import Page9 from './Page9/Page9';  
import './Home.scss';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const loaderRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Preload critical assets
  const preloadAssets = [
    // Page5 images
    'https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/HugoJoseph_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/ChantalG_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MyleneS_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/SophieA_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Claire_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Michele_480X640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MEL_480X640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/CAMILLE_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MAXIME_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MEGGIE_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/joel_480X640_3-480x640.jpg',
    // Page8 video
    'https://video.wixstatic.com/video/f1c650_988626917c6549d6bdc9ae641ad3c444/1080p/mp4/file.mp4',
  ];

  useEffect(() => {
    // Preload assets
    let loadedCount = 0;
    const totalAssets = preloadAssets.length;

    if (totalAssets === 0) {
      setProgress(100);
      setTimeout(() => setLoading(false), 1000);
      return;
    }

    preloadAssets.forEach((src) => {
      if (src.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = src;
        video.onloadeddata = () => {
          loadedCount++;
          setProgress(Math.min((loadedCount / totalAssets) * 100, 100));
          if (loadedCount === totalAssets) {
            setTimeout(() => setLoading(false), 600);
          }
        };
        video.onerror = () => {
          loadedCount++;
          setProgress(Math.min((loadedCount / totalAssets) * 100, 100));
          if (loadedCount === totalAssets) {
            setTimeout(() => setLoading(false), 600);
          }
        };
      } else {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.min((loadedCount / totalAssets) * 100, 100));
          if (loadedCount === totalAssets) {
            setTimeout(() => setLoading(false), 600);
          }
        };
        img.onerror = () => {
          loadedCount++;
          setProgress(Math.min((loadedCount / totalAssets) * 100, 100));
          if (loadedCount === totalAssets) {
            setTimeout(() => setLoading(false), 600);
          }
        };
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Initialize ScrollTrigger after loading is complete
  useEffect(() => {
    if (!loading) {
      // Refresh ScrollTrigger after a short delay to ensure DOM is fully rendered
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [loading]);

  return (
    <>
      {loading && (
        <div ref={loaderRef} className="initial-loader">
          <div className="loader-container">
            <div className="logo-container">
              <div className="logo-circle">
                <div className="logo-inner"></div>
              </div>
            </div>
            <h2 className="loader-title">Code Nexus Crew</h2>
            <p className="loader-subtitle">Crafting Your Coding Journey</p>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{Math.round(progress)}%</span>
            </div>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="overflow-hidden" 
        style={{ visibility: loading ? 'hidden' : 'visible' }}
      >
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
        <Page7 />
        <Page8 />
        <Page9 />
      </div>
    </>
  );
};

export default Home;