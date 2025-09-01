import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useEffect, useState } from 'react';

const Page5 = () => {
  gsap.registerPlugin(ScrollTrigger);

  const imageDivRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const imageArray = [
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
  ];

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    
    imageArray.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageArray.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imageArray.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  useGSAP(() => {
    if (!imagesLoaded || !imageDivRef.current || !imageRef.current) return;

    console.log('Page5 GSAP hook running with loaded images');

    // Kill any existing ScrollTriggers to avoid duplicates
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const setupScrollTrigger = () => {
      ScrollTrigger.matchMedia({
        // Desktop (≥ 1024px)
        '(min-width: 1024px)': () => {
          gsap.to(imageDivRef.current, {
            scrollTrigger: {
              trigger: imageDivRef.current,
              start: 'top 38%',
              end: 'bottom 10%',
              pin: true,
              pinSpacing: true,
              pinReparent: true,
              pinType: 'transform',
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // markers: true, // Uncomment for debugging
              onUpdate: (self) => {
                const imageIndex = Math.min(
                  Math.floor(self.progress * imageArray.length),
                  imageArray.length - 1
                );
                console.log('Desktop - Progress:', self.progress, 'Image:', imageIndex);
                if (imageRef.current) {
                  imageRef.current.src = imageArray[imageIndex];
                }
              },
              onRefresh: () => {
                // Force update on refresh
                ScrollTrigger.getAll().forEach(trigger => {
                  if (trigger.trigger === imageDivRef.current) {
                    trigger.update();
                  }
                });
              }
            },
          });
        },
        // Mobile (< 1024px)
        '(max-width: 1023px)': () => {
          gsap.to(imageDivRef.current, {
            scrollTrigger: {
              trigger: imageDivRef.current,
              start: 'top 70%',
              end: 'bottom 0%',
              pin: true,
              pinSpacing: true,
              pinReparent: true,
              pinType: 'transform',
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // markers: true, // Uncomment for debugging
              onUpdate: (self) => {
                const imageIndex = Math.min(
                  Math.floor(self.progress * imageArray.length),
                  imageArray.length - 1
                );
                console.log('Mobile - Progress:', self.progress, 'Image:', imageIndex);
                if (imageRef.current) {
                  imageRef.current.src = imageArray[imageIndex];
                }
              },
              onRefresh: () => {
                // Force update on refresh
                ScrollTrigger.getAll().forEach(trigger => {
                  if (trigger.trigger === imageDivRef.current) {
                    trigger.update();
                  }
                });
              }
            },
          });
        },
      });
    };

    setupScrollTrigger();

    // Refresh ScrollTrigger after a short delay to ensure proper calculation
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Add resize listener to refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([imageDivRef.current, imageRef.current]);
    };
  }, { scope: imageDivRef, dependencies: [imagesLoaded] });

  // Additional effect to refresh ScrollTrigger after component mounts
  useEffect(() => {
    if (imagesLoaded) {
      // Refresh ScrollTrigger after images are loaded and component is mounted
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        console.log('ScrollTrigger refreshed after images loaded');
      }, 300);

      return () => clearTimeout(refreshTimer);
    }
  }, [imagesLoaded]);

  return (
    <div className="parent mb-40 overflow-hidden">
      <div id="page1" className="py-1 relative min-h-screen">
        <div
          ref={imageDivRef}
          className="absolute overflow-hidden lg:h-[40vw] h-[40vw] lg:rounded-3xl rounded-xl lg:w-[35vw] w-[25vw] lg:top-40 top-[-10rem] left-[3vw] z-10"
        >
          <img
            ref={imageRef}
            className="h-full w-full object-cover"
            src={imagesLoaded ? imageArray[0] : ''}
            alt="Team member"
          />
        </div>
        <div className="relative font-[font2] z-0">
          <div className="lg:mt-[55vh] mt-[30vh]">
            <h1 className="text-[16vw] text-center text-black uppercase leading-[18vw]">
              meet <br />
              ourteam
            </h1>
          </div>
          <div className="lg:pl-[40%] lg:mt-20 mt-4 p-3">
            <p className="lg:text-6xl text-xl leading-tight">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Ali, Waleed, and Abdullah—three visionaries igniting a transformation in web development! Our cutting-edge course isn’t just about coding; it’s about crafting your future as a fearless full-stack developer in just 6 months. Master HTML, CSS, JavaScript, React, Node.js, and more through hands-on projects that turn your ideas into digital reality.
               </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page5;