import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import './CookiePolicy.scss';

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin);

const CookiePolicy: React.FC = () => {
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cookieRef = useRef<SVGSVGElement>(null);
  const crumbsRef = useRef<SVGGElement>(null);
  const faceRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const mouthRef = useRef<SVGGElement>(null);
  const blushRef = useRef<SVGGElement>(null);
  const particlesRef = useRef<SVGGElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const denyRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Create crumbs dynamically
  const createCrumbs = () => {
    if (!crumbsRef.current) return;
    
    const crumbs = [];
    const colors = ['#F9C846', '#E8B341', '#D79D3D', '#C68838'];
    
    for (let i = 0; i < 12; i++) {
      const size = Math.random() * 8 + 4;
      const x = Math.random() * 200 + 20;
      const y = Math.random() * 200 + 20;
      const rotation = Math.random() * 360;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      crumbs.push(
        <rect
          key={`crumb-${i}`}
          x={x}
          y={y}
          width={size}
          height={size}
          rx={size / 4}
          fill={color}
          opacity="0"
          transform={`rotate(${rotation} ${x + size/2} ${y + size/2})`}
        />
      );
    }
    
    return crumbs;
  };

  // Create particles dynamically
  const createParticles = () => {
    if (!particlesRef.current) return;
    
    const particles = [];
    const shapes = ['circle', 'path'];
    
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 6 + 2;
      const x = 120;
      const y = 120;
      const rotation = Math.random() * 360;
      const delay = Math.random() * 0.5;
      const duration = Math.random() * 1 + 0.5;
      const distance = Math.random() * 100 + 50;
      const angle = Math.random() * 360;
      
      if (shapes[Math.floor(Math.random() * shapes.length)] === 'circle') {
        particles.push(
          <circle
            key={`particle-circle-${i}`}
            cx={x}
            cy={y}
            r={size}
            fill="#F9C846"
            opacity="0"
          />
        );
      } else {
        particles.push(
          <path
            key={`particle-path-${i}`}
            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
            fill="#F9C846"
            opacity="0"
            transform={`scale(${size/12}) translate(${x}, ${y})`}
          />
        );
      }
    }
    
    return particles;
  };

  useEffect(() => {
    if (!containerRef.current || !cookieRef.current) return;

    // Initial setup
    gsap.set([buttonRef.current, denyRef.current], { opacity: 0, y: 20 });
    gsap.set([titleRef.current, textRef.current], { opacity: 0, y: 10 });
    gsap.set(cookieRef.current, { scale: 0.8, opacity: 0 });

    // Entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.to(cookieRef.current, { 
      duration: 0.8, 
      scale: 1, 
      opacity: 1,
      ease: "elastic.out(1, 0.5)"
    })
    .to(titleRef.current, { duration: 0.5, opacity: 1, y: 0 }, "-=0.4")
    .to(textRef.current, { duration: 0.5, opacity: 1, y: 0 }, "-=0.3")
    .to(buttonRef.current, { duration: 0.4, opacity: 1, y: 0 }, "-=0.2")
    .to(denyRef.current, { duration: 0.4, opacity: 1, y: 0 }, "-=0.1");

    // Cookie floating animation
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(cookieRef.current, {
      duration: 3,
      y: -10,
      ease: "sine.inOut"
    });

    // Eye follow animation
    if (eyesRef.current) {
      const pupils = eyesRef.current.querySelectorAll('circle');
      
      containerRef.current.addEventListener('mousemove', (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const angleX = (x - rect.width / 2) / 20;
        const angleY = (y - rect.height / 2) / 20;
        
        gsap.to(pupils, {
          duration: 0.3,
          x: angleX,
          y: angleY,
          ease: "power2.out"
        });
      });
    }

    // Mouth animation on hover
    if (mouthRef.current && buttonRef.current && denyRef.current) {
      const mouthPaths = mouthRef.current.querySelectorAll('path');
      const happyPath = mouthPaths[0];
      const neutralPath = mouthPaths[1];
      
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(blushRef.current, { duration: 0.3, opacity: 1 });
        gsap.to([neutralPath, happyPath], { duration: 0.3, opacity: 0 });
        gsap.to(happyPath, { duration: 0.3, opacity: 1, delay: 0.3 });
      });
      
      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(blushRef.current, { duration: 0.3, opacity: 0 });
        gsap.to([neutralPath, happyPath], { duration: 0.3, opacity: 0 });
        gsap.to(neutralPath, { duration: 0.3, opacity: 1, delay: 0.3 });
      });
      
      denyRef.current.addEventListener('mouseenter', () => {
        gsap.to([neutralPath, happyPath], { duration: 0.3, opacity: 0 });
      });
      
      denyRef.current.addEventListener('mouseleave', () => {
        gsap.to([neutralPath, happyPath], { duration: 0.3, opacity: 0 });
        gsap.to(neutralPath, { duration: 0.3, opacity: 1, delay: 0.3 });
      });
    }

    return () => {
      floatTl.kill();
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', () => {});
      }
    };
  }, []);

  const handleAccept = () => {
    if (accepted !== null || !cookieRef.current || !particlesRef.current || !crumbsRef.current) return;
    
    setAccepted(true);
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Hide buttons
    tl.to([buttonRef.current, denyRef.current], { 
      duration: 0.3, 
      opacity: 0, 
      y: 20 
    });
    
    // Happy cookie animation
    tl.to(cookieRef.current, {
      duration: 0.5,
      scale: 1.1,
      ease: "elastic.out(1, 0.5)"
    });
    
    // Crumbs animation
    const crumbs = Array.from(crumbsRef.current.children);
    crumbs.forEach((crumb, i) => {
      tl.to(crumb, {
        duration: 0.3,
        opacity: 1,
        delay: i * 0.02,
        onComplete: () => {
          gsap.to(crumb, {
            duration: 0.8,
            x: `+=${(Math.random() - 0.5) * 100}`,
            y: `+=${(Math.random() - 0.5) * 100}`,
            rotation: `+=${(Math.random() - 0.5) * 360}`,
            ease: "power1.out"
          });
        }
      }, "-=0.4");
    });
    
    // Particles explosion
    const particles = Array.from(particlesRef.current.children);
    particles.forEach((particle, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const duration = Math.random() * 1 + 0.5;
      
      tl.to(particle, {
        duration: 0.3,
        opacity: 1,
        delay: i * 0.02,
        onComplete: () => {
          gsap.to(particle, {
            duration,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            ease: "power1.out"
          });
        }
      }, "-=0.4");
    });
    
    // Final message
    tl.to(textRef.current, {
      duration: 0.5,
      text: "Yummy! Thanks for accepting! Now enjoy our delicious cookies... I mean website!",
      ease: "none"
    }, "+=0.5");
    
    // Cookie shrink and disappear
    tl.to(cookieRef.current, {
      duration: 1,
      scale: 0,
      opacity: 0,
      ease: "back.in(1.7)"
    }, "+=2");
    
    // Container shrink
    tl.to(containerRef.current, {
      duration: 0.8,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      margin: 0,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      }
    }, "+=1");
  };

  const handleDeny = () => {
    if (accepted !== null || !cookieRef.current || !eyesRef.current || !mouthRef.current) return;
    
    setAccepted(false);
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Hide buttons
    tl.to([buttonRef.current, denyRef.current], { 
      duration: 0.3, 
      opacity: 0, 
      y: 20 
    });
    
    // Sad face animation
    const mouthPaths = mouthRef.current.querySelectorAll('path');
    const sadPath = mouthPaths[2];
    
    tl.to(mouthPaths, { duration: 0.3, opacity: 0 })
      .to(sadPath, { duration: 0.3, opacity: 1 })
      .to(eyesRef.current, { duration: 0.3, y: 5 }, "-=0.2");
    
    // Cookie shake animation
    tl.to(cookieRef.current, {
      duration: 0.1,
      x: -10,
      repeat: 5,
      yoyo: true
    });
    
    // Cookie fall animation
    tl.to(cookieRef.current, {
      duration: 1,
      y: 300,
      rotation: 360,
      opacity: 0,
      ease: "back.in(1.7)"
    });
    
    // Final message
    tl.to(textRef.current, {
      duration: 0.5,
      text: "Aww... no cookies for you then. The website might not work properly without them.",
      ease: "none"
    }, "+=0.5");
    
    // Container shrink
    tl.to(containerRef.current, {
      duration: 0.8,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      margin: 0,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      }
    }, "+=2");
  };

  return (
    <div className="cookie-container" ref={containerRef}>
      <div className="cookie-content">
        <svg
          ref={cookieRef}
          className="cookie"
          viewBox="0 0 240 240"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cookie body */}
          <path
            d="M120,20c55.2,0,100,44.8,100,100s-44.8,100-100,100S20,175.2,20,120S64.8,20,120,20z"
            fill="#F9C846"
            stroke="#E8B341"
            strokeWidth="8"
          />
          
          {/* Chocolate chips */}
          <g>
            <circle cx="80" cy="80" r="8" fill="#6C3A1F" />
            <circle cx="160" cy="90" r="6" fill="#6C3A1F" />
            <circle cx="100" cy="150" r="7" fill="#6C3A1F" />
            <circle cx="150" cy="60" r="5" fill="#6C3A1F" />
            <circle cx="60" cy="130" r="6" fill="#6C3A1F" />
            <circle cx="130" cy="130" r="7" fill="#6C3A1F" />
            <circle cx="180" cy="150" r="6" fill="#6C3A1F" />
          </g>
          
          {/* Face */}
          <g ref={faceRef} transform="translate(120, 120)">
            {/* Eyes */}
            <g ref={eyesRef}>
              <circle cx="-30" cy="-20" r="15" fill="white" stroke="#6C3A1F" strokeWidth="2" />
              <circle cx="30" cy="-20" r="15" fill="white" stroke="#6C3A1F" strokeWidth="2" />
              <circle cx="-30" cy="-20" r="7" fill="#6C3A1F" />
              <circle cx="30" cy="-20" r="7" fill="#6C3A1F" />
            </g>
            
            {/* Mouth */}
            <g ref={mouthRef}>
              <path
                d="M-40,20 Q0,50 40,20"
                fill="none"
                stroke="#6C3A1F"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0"
              />
              <path
                d="M-30,20 Q0,30 30,20"
                fill="none"
                stroke="#6C3A1F"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="1"
              />
              <path
                d="M-30,30 Q0,20 30,30"
                fill="none"
                stroke="#6C3A1F"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0"
              />
            </g>
            
            {/* Blush (hidden by default) */}
            <g ref={blushRef} opacity="0">
              <circle cx="-50" cy="0" r="15" fill="#FFB6C1" opacity="0.6" />
              <circle cx="50" cy="0" r="15" fill="#FFB6C1" opacity="0.6" />
            </g>
          </g>
          
          {/* Crumbs (hidden by default) */}
          <g ref={crumbsRef}>
            {createCrumbs()}
          </g>
          
          {/* Particles (hidden by default) */}
          <g ref={particlesRef}>
            {createParticles()}
          </g>
        </svg>
        
        <h1 ref={titleRef}>We Value Your Privacy</h1>
        <p ref={textRef}>
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
          By clicking "Accept All", you consent to our use of cookies.
        </p>
        
        <div className="cookie-buttons">
          <button 
            ref={buttonRef} 
            className="accept-btn"
            onClick={handleAccept}
          >
            Accept All
          </button>
          <button 
            ref={denyRef} 
            className="deny-btn"
            onClick={handleDeny}
          >
            Reject All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;