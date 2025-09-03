  import { useGSAP } from '@gsap/react';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { useRef } from 'react';
  import './Page2.scss';

  const Page2 = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
      gsap.registerPlugin(ScrollTrigger);

      const rotateTexts = gsap.utils.toArray('.rotateText', containerRef.current);
      const isMobile = window.innerWidth < 768;
      const animationSpeed = isMobile ? 1.5 : 2;
      const staggerDelay = isMobile ? 0.3 : 0.5;

      if (rotateTexts.length === 0 || !containerRef.current) return;

      // Set initial state
      gsap.set(rotateTexts, {
        opacity: 0.2,
        scale: 0.8,
        rotateX: -60,
        transformOrigin: 'center center',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? 'top 80%' : 'top 70%',
          end: isMobile ? 'bottom 20%' : 'bottom 10%',
          scrub: 1,
          markers: false,
          invalidateOnRefresh: true,
        },
      });

      tl.to(rotateTexts, {
        rotateX: 0,
        scale: 1,
        opacity: 1,
        duration: animationSpeed,
        stagger: staggerDelay,
        ease: 'power2.out',
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === containerRef.current) {
            trigger.kill();
          }
        });
      };
    }, { scope: containerRef });

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