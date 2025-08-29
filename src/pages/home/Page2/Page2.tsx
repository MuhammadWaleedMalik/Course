import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import "./Page2.scss"; // Ensure you have the correct path to your styles


const Page2: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Cache selectors and responsive calculations
        const rotateTexts = gsap.utils.toArray(".rotateText");
        const isMobile = window.innerWidth < 768;
        const animationSpeed = isMobile ? 1.8 : 2.5;
        const staggerDelay = isMobile ? 0.6 : 1;

        // Clear any initial blur/opacity issues
        gsap.set(rotateTexts, {
            opacity: 1,
            filter: "blur(0)",
            rotateX: -80 // Start position for animation
        });

        // Create timeline for better control
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom top",
                scrub: 1.5,
                markers: false,
                invalidateOnRefresh: true,
                onRefresh: self => {
                    if (self.progress && self.animation) {
                        self.animation.progress(self.progress);
                    }
                }
            }
        });

        // Add animations with proper clearProps to avoid blur issues
        tl.to(rotateTexts, {
            rotateX: 0,
            opacity: 1,
            duration: animationSpeed,
            stagger: staggerDelay,
            ease: "back.out(1.2)",
            overwrite: "auto",
            clearProps: "filter" // Ensures no blur remains after animation
        });

        // Responsive handling
        const onResize = () => {
            tl.scrollTrigger?.refresh();
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            tl.scrollTrigger?.kill();
        };

    }, { scope: containerRef });
    
    return (
        <div ref={containerRef} className="overflow-hidden">
            <div   className='page2text rotatetextparent bg-[var(--background-light)] text-center pt-[10vh] pb-[15vh] px-5 md:pt-[15vh] md:pb-[20vh] md:px-20'>
                <h3 className='text-[var(--text-secondary)]  mb-8 md:mb-1 text-2xl md:text-4xl font-[var(--font-text)]'>
                    Atlas Nexus Corps {new Date().getFullYear()} | Code Your Thoughts
                </h3>

                <div 
                    className="flex flex-col items-center mb-0 gap-1 md:gap-2"

                >
                    <h1 className='text-[18vw] md:text-[24vw] rotateText font-bold  text-[var(--primary-color-3)] uppercase leading-[1.1]'>
                        Be The 
                    </h1>

                    <h1 className='text-[18vw] md:text-[24vw] rotateText font-bold  text-[var(--primary-color-3)] uppercase leading-[1.1]'>
                        best
                    </h1>

                    <h1 className='text-[18vw] md:text-[24vw] rotateText font-bold  text-[var(--primary-color-3)] uppercase leading-[1.1]'>
                        Full
                    </h1>

                    <h1 className='text-[18vw] md:text-[24vw] rotateText font-bold  text-[var(--primary-color-3)] uppercase leading-[1.1]'>
                        Stack
                    </h1>

                    <h1 className='text-[18vw] md:text-[24vw] rotateText font-bold  text-[var(--primary-color-3)] uppercase leading-[1.1]'>
                        Developer
                    </h1>

                    <h1 className='text-[18vw] md:text-[24vw] rotateText font-bold  text-[var(--primary-color-3)] uppercase leading-[1.1]'>
                        In  
                    </h1>
                    
                    <h1 className='text-[18vw] md:text-[24vw] rotateText font-bold text-[var(--primary-color-3)] uppercase leading-[1.1]'>
                        Just 
                    </h1>
                    <h1
        
                        className='text-[18vw] md:text-[24vw] rotateText font-bold text-[var(--primary-color-4)] uppercase leading-[1.1]'>
                        6-Months 
                    </h1>
                </div>
            </div>
  
            <div className="h-[2px] w-2/3 mt-0 md:w-1/3 bg-[var(--primary-color-3)] mx-auto "></div>
        </div>
    );
};

export default Page2;