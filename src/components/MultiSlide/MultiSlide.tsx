import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ImageCarousel.scss';

const ImageCarousel: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  let xPos = 0;

  // Array to hold your custom image URLs
  const imageUrls = [
    'https://your-image-url-1.jpg',
    'https://your-image-url-2.jpg',
    'https://your-image-url-3.jpg',
    'https://your-image-url-4.jpg',
    'https://your-image-url-5.jpg',
    'https://your-image-url-6.jpg',
    'https://your-image-url-7.jpg',
    'https://your-image-url-8.jpg',
    'https://your-image-url-9.jpg',
    'https://your-image-url-10.jpg'
  ];

  useEffect(() => {
    // GSAP timeline setup
    gsap.timeline()
      .set(ringRef.current, { rotationY: 180, cursor: 'grab' })
      .set('.img', {
        rotateY: (i: number) => i * -36,
        transformOrigin: '50% 50% 500px',
        z: -500,
        backgroundImage: (i: number) => `url(${imageUrls[i]})`,
        backgroundPosition: (i: number) => getBgPos(i),
        backfaceVisibility: 'hidden'
      })
      .from('.img', {
        duration: 1.5,
        y: 200,
        opacity: 0,
        stagger: 0.1,
        ease: 'expo'
      })
      .add(() => {
        const images = document.querySelectorAll('.img');
        images.forEach((img) => {
          img.addEventListener('mouseenter', (e) => {
            gsap.to('.img', {
              opacity: (i: number, t: HTMLElement) => (t === e.currentTarget ? 1 : 0.5),
              ease: 'power3'
            });
          });
          img.addEventListener('mouseleave', () => {
            gsap.to('.img', { opacity: 1, ease: 'power2.inOut' });
          });
        });
      }, '-=0.5');

    // Event handlers for drag functionality
    const dragStart = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      xPos = Math.round(clientX);
      gsap.set(ringRef.current, { cursor: 'grabbing' });
      window.addEventListener('mousemove', drag);
      window.addEventListener('touchmove', drag);
    };

    const drag = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      gsap.to(ringRef.current, {
        rotationY: `-=${(Math.round(clientX) - xPos) % 360}`,
        onUpdate: () => {
          gsap.set('.img', { backgroundPosition: (i: number) => getBgPos(i) });
        }
      });
      xPos = Math.round(clientX);
    };

    const dragEnd = () => {
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('touchmove', drag);
      gsap.set(ringRef.current, { cursor: 'grab' });
    };

    window.addEventListener('mousedown', dragStart);
    window.addEventListener('touchstart', dragStart);
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchend', dragEnd);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('mousedown', dragStart);
      window.removeEventListener('touchstart', dragStart);
      window.removeEventListener('mouseup', dragEnd);
      window.removeEventListener('touchend', dragEnd);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('touchmove', drag);
    };
  }, []);

  const getBgPos = (i: number): string => {
    return `${100 - gsap.utils.wrap(0, 360, gsap.getProperty(ringRef.current, 'rotationY') - 180 - i * 36) / 360 * 500}px 0px`;
  };

  return (
    <div className="stage">
      <div className="container">
        <div className="ring" ref={ringRef}>
          {imageUrls.map((_, index) => (
            <div key={index} className="img"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;