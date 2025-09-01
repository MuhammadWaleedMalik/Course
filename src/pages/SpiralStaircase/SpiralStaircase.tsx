import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SpiralShowcase.css';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

interface Website {
  url: string;
  name: string;
}

interface SpiralShowcaseProps {
  websites: Website[];
}

const SpiralShowcase: React.FC<SpiralShowcaseProps> = ({ websites }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const poleRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);
  const [activeSite, setActiveSite] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !poleRef.current || !spiralRef.current) return;

    // Set up the spiral animation
    const spiralItems = spiralRef.current.querySelectorAll('.website-item');
    const totalRotation = 1080; // Total rotation in degrees (3 full rotations)
    const totalScroll = 4000; // Total scroll distance in pixels

    // Create the spiral animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress * spiralItems.length;
          setActiveSite(Math.floor(progress));
        }
      }
    });

    // Animate pole rotation
    tl.to(poleRef.current, {
      rotation: totalRotation,
      transformOrigin: 'center center',
      ease: 'none'
    }, 0);

    // Animate each website item in the spiral
    spiralItems.forEach((item, i) => {
      const yPos = -i * 80; // Vertical spacing
      const rotation = (i / spiralItems.length) * totalRotation;
      const zPos = Math.sin((i / spiralItems.length) * Math.PI * 4) * 200; // DNA-like movement
      
      tl.to(item, {
        y: yPos,
        rotationY: rotation,
        z: zPos,
        opacity: 1,
        duration: 1,
        ease: 'power1.out'
      }, i * 0.1);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [websites.length]);

  const handleWebsiteClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="spiral-showcase" ref={containerRef}>
      <div className="central-pole" ref={poleRef}></div>
      
      <div className="spiral-container" ref={spiralRef}>
        {websites.map((website, index) => (
          <div
            key={index}
            className={`website-item ${index === activeSite ? 'active' : ''}`}
            onClick={() => handleWebsiteClick(website.url)}
          >
            <div className="website-content">
              <span className="website-url">{website.url}</span>
              <span className="website-name">{website.name}</span>
            </div>
            <div className="connector"></div>
          </div>
        ))}
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <p>Scroll to navigate the spiral</p>
      </div>

      <div className="active-indicator">
        <div className="active-text">Viewing: {websites[activeSite]?.name}</div>
      </div>
    </div>
  );
};

export default SpiralShowcase;