import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// Lazy load page components
const Page1 = lazy(() => import('./Page1/Page1'));
const Page2 = lazy(() => import('./Page2/Page2'));
const Page3 = lazy(() => import('./Page3/Page3'));
const Page4 = lazy(() => import('./Page4/Page4'));
const Page5 = lazy(() => import('./Page5/Page5'));
const Page6 = lazy(() => import('./Page6/Page6'));
const Page7 = lazy(() => import('./Page7/Page7'));
const Page8 = lazy(() => import('./Page8/Page8'));
const Page9 = lazy(() => import('./Page9/Page9'));
const Page10 = lazy(() => import('./Page10/Page10'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only preload the most critical assets
    const criticalAssets: string[] = [
      // Only essential assets for initial view
      "https://i.ibb.co/Q7t69BB3/4.png", // First image from Page1
    ];

    let loadedCount = 0;
    const totalAssets = criticalAssets.length;

    if (totalAssets === 0) {
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
      return;
    }

    // Load critical assets first
    criticalAssets.forEach((src) => {
      if (src.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = src;
        video.onloadeddata = () => {
          loadedCount++;
          const newProgress = Math.min((loadedCount / totalAssets) * 100, 100);
          setProgress(newProgress);
          if (loadedCount === totalAssets) {
            setTimeout(() => setLoading(false), 300);
          }
        };
        video.onerror = () => {
          loadedCount++;
          const newProgress = Math.min((loadedCount / totalAssets) * 100, 100);
          setProgress(newProgress);
          if (loadedCount === totalAssets) {
            setTimeout(() => setLoading(false), 300);
          }
        };
      } else {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          const newProgress = Math.min((loadedCount / totalAssets) * 100, 100);
          setProgress(newProgress);
          if (loadedCount === totalAssets) {
            setTimeout(() => setLoading(false), 300);
          }
        };
        img.onerror = () => {
          loadedCount++;
          const newProgress = Math.min((loadedCount / totalAssets) * 100, 100);
          setProgress(newProgress);
          if (loadedCount === totalAssets) {
            setTimeout(() => setLoading(false), 300);
          }
        };
      }
    });

    // Set timeout to ensure loading doesn't take too long
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timeout);
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
      {loading && <LoadingSpinner progress={progress} />}
      
      <div 
        ref={containerRef} 
        className="overflow-hidden" 
        style={{ 
          visibility: loading ? 'hidden' : 'visible',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease-in'
        }}
      >
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Page1 />
          <Page2 />
          <Page3 />
          <Page4 />
          <Page5 />
          <Page6 />
          <Page7 />
          <Page8 />
          <Page9 />
          <Page10 />
        </Suspense>
      </div>
    </>
  );
};

export default Home;