import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PropsWithChildren } from 'react';

const Stairs = ({ children }: PropsWithChildren<{}>) => {
  const currentPath = useLocation().pathname;
  const stairParentRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Validate refs
      if (!stairParentRef.current || !pageRef.current) {
        console.error('Stairs refs not initialized:', {
          stairParentRef: stairParentRef.current,
          pageRef: pageRef.current,
        });
        return;
      }

      // Scope selectors to stairParentRef to avoid affecting other components
      const stairs = stairParentRef.current.querySelectorAll('.stair');

      // Set initial state
      gsap.set(stairParentRef.current, { display: 'block', opacity: 1, pointerEvents: 'auto' });
      gsap.set(stairs, { height: 0, y: 0, opacity: 1 });
      gsap.set(pageRef.current, { opacity: 0 });

      // Create timeline for staircase effect
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(stairParentRef.current, { display: 'none', pointerEvents: 'none' }); // Hide and disable interactions
        },
      });

      // Animate stairs growing in
      tl.to(stairs, {
        height: '100%',
        stagger: {
          amount: 0.3,
          from: 'start',
        },
        duration: 0.4,
        ease: 'power2.out',
      });

      // Animate stairs sliding out
      tl.to(stairs, {
        y: '100%',
        stagger: {
          amount: 0.3,
          from: 'start',
        },
        duration: 0.4,
        ease: 'power2.in',
      });

      // Animate page content fading in (no scale to avoid layout shifts)
      tl.to(
        pageRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3' // Overlap with stairs sliding out
      );

      // Cleanup on unmount or path change
      return () => {
        tl.kill();
        gsap.set(stairParentRef.current, { display: 'none', opacity: 0, pointerEvents: 'none', clearProps: 'all' });
        gsap.set(stairs, { height: 0, y: 0, opacity: 1, clearProps: 'all' });
        gsap.set(pageRef.current, { opacity: 1, clearProps: 'all' });
      };
    },
    { dependencies: [currentPath], scope: stairParentRef }
  );

  return (
    <div>
      <div ref={stairParentRef} className="h-screen w-full fixed z-[9999] top-0 pointer-events-none">
        <div className="h-full w-full flex">
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
        </div>
      </div>
      <div ref={pageRef} className="stairs-page-content">
        {children}
      </div>
    </div>
  );
};

export default Stairs;