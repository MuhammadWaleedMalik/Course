import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';
import './Page2.scss'; // Ensure correct path to styles

const Page2: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Cache selectors and responsive calculations
      const rotateTexts = gsap.utils.toArray('.rotateText', containerRef.current) as HTMLElement[];
      const isMobile = window.innerWidth < 768;
      const animationSpeed = isMobile ? 1.5 : 2;
      const staggerDelay = isMobile ? 0.3 : 0.5;

      // Debug: Log initialization
      console.log('Page2 GSAP hook running, containerRef:', containerRef.current, 'rotateTexts:', rotateTexts);

      if (rotateTexts.length === 0 || !containerRef.current) {
        console.error('Page2 refs or rotateTexts not initialized:', { containerRef: containerRef.current, rotateTexts });
        return;
      }

      // Set initial state
      gsap.set(rotateTexts, {
        opacity: 0.2,
        scale: 0.8,
        rotateX: -60,
        transformOrigin: 'center center',
      });

      // Delay ScrollTrigger setup to ensure DOM and Stairs are ready
      const timer = setTimeout(() => {
        ScrollTrigger.refresh(); // Force refresh
        console.log('Page2 ScrollTrigger refreshed');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: isMobile ? 'top 80%' : 'top 70%',
            end: isMobile ? 'bottom 20%' : 'bottom 10%',
            scrub: 1,
            markers: false, // Set to true for debugging
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              if (self.progress && self.animation) {
                self.animation.progress(self.progress);
              }
            },
          },
        });

        tl.to(rotateTexts, {
          rotateX: 0,
          scale: 1,
          opacity: 1,
          duration: animationSpeed,
          stagger: staggerDelay,
          ease: 'power2.out',
          overwrite: 'auto',
          clearProps: 'filter,transform',
        });
      }, 300); // Delay to account for Stairs animation

      // Cleanup
      return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        gsap.killTweensOf(rotateTexts);
        console.log('Page2 ScrollTrigger cleanup executed');
      };
    },
    { scope: containerRef }
  );

  // Debug: Log mount
  useEffect(() => {
    console.log('Page2 mounted, containerRef:', containerRef.current);
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div className="page2text rotatetextparent bg-[var(--background-light)] text-center pt-[10vh] pb-[15vh] px-5 md:pt-[15vh] md:pb-[20vh] md:px-20">
        <h3 className="text-[var(--text-secondary)] mb-8 md:mb-1 text-2xl md:text-4xl font-[var(--font-text)]">
          Atlas Nexus Corps {new Date().getFullYear()} | Code Your Thoughts
        </h3>
        <div className="flex flex-col items-center mb-0 gap-1 md:gap-2">
          {[
            'Be The',
            'best',
            'Full',
            'Stack',
            'Developer',
            'In',
            'Just',
            '6-Months',
          ].map((text, idx) => (
            <h1
              key={idx}
              className="text-[18vw] md:text-[24vw] rotateText font-bold text-black uppercase leading-[1.1]"
            >
              {text}
            </h1>
          ))}
        </div>
      </div>
      <div className="h-[2px] w-2/3 mt-0 md:w-1/3 bg-[var(--primary-color-3)] mx-auto"></div>
    </div>
  );
};

export default Page2;