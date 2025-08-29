  import React, { useEffect, useRef, useCallback } from 'react';
  import imagesLoaded from 'imagesloaded';
  import "./Page6.scss";

  // Types for our team members
  type TeamMember = {
    id: number;
    name: string;
    role: string;
    description: string;
    imageUrl: string;
    bgUrl?: string;
  };

  // Team member data array
  const TEAM_MEMBERS: TeamMember[] = [
    {
      id: 1,
      name: "Muhammad Ali Abbas Khan",
      role: "Frontend Developer",
      description: "Specializes in React, TypeScript, and modern web animations",
      imageUrl: "/images/assests/1 (1).jpeg",
      bgUrl: "https://video.wixstatic.com/video/f1c650_988626917c6549d6bdc9ae641ad3c444/1080p/mp4/file.mp4"
    },
    {
      id: 2,
      name: "Waleed Akhtar",
      role: "Backend Developer",
      description: "Expert in Node.js, TypeScript, databases, and scalable APIs",
      imageUrl: "/images/assests/1 (1).jpg",
      bgUrl: "https://video.wixstatic.com/video/f1c650_988626917c6549d6bdc9ae641ad3c444/1080p/mp4/file.mp4"
    },
    {
      id: 3,
      name: "Abdullah Asif",
      role: "AI Developer",
      description: "Focuses on machine learning, NLP, and AI model integration in web apps",
      imageUrl: "/images/assests/1 (3).jpg",
      bgUrl: "https://video.wixstatic.com/video/f1c650_988626917c6549d6bdc9ae641ad3c444/1080p/mp4/file.mp4"
    }
  ];

  // Utility functions outside the component
  const wrap = (n: number, max: number) => (n + max) % max;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  class Vec2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
    }

    set(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    lerp(v: Vec2, t: number) {
      this.x = lerp(this.x, v.x, t);
      this.y = lerp(this.y, v.y, t);
    }
  }

  const vec2 = (x: number = 0, y: number = 0) => new Vec2(x, y);

  class Raf {
    rafId: number;
    callbacks: Array<{ callback: (args: { id: string }) => void; id: string }>;
    
    constructor() {
      this.rafId = 0;
      this.callbacks = [];
      this.start();
    }

    start() {
      this.raf();
    }

    stop() {
      cancelAnimationFrame(this.rafId);
    }

    raf = () => {
      this.callbacks.forEach(({ callback, id }) => callback({ id }));
      this.rafId = requestAnimationFrame(this.raf);
    };

    add(callback: (args: { id: string }) => void, id?: string) {
      this.callbacks.push({ callback, id: id || genId() });
    }

    remove(id: string) {
      this.callbacks = this.callbacks.filter((callback) => callback.id !== id);
    }
  }

  const genId = (() => {
    let count = 0;
    return () => (count++).toString();
  })();

  const resolveOptions = (node: HTMLElement, options?: { trigger?: HTMLElement; target?: HTMLElement | HTMLElement[] }) => {
    return {
      trigger: options?.trigger ?? node,
      target: options?.target
        ? Array.isArray(options.target)
          ? options.target
          : [options.target]
        : [node]
    };
  };

  const Page6: React.FC = () => {
    const loaderRef = useRef<HTMLDivElement>(null);
    const loaderTextRef = useRef<HTMLSpanElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<Raf | null>(null);
    const bgContainerRef = useRef<HTMLDivElement>(null);
    const tiltInstances = useRef<Array<{ destroy: () => void }>>([]);

    const tilt = useCallback((node: HTMLElement, options?: { trigger?: HTMLElement; target?: HTMLElement | HTMLElement[] }) => {
      const { trigger, target } = resolveOptions(node, options);
      let lerpAmount = 0.06;
      const rotDeg = { current: vec2(), target: vec2() };
      const bgPos = { current: vec2(), target: vec2() };
      let rafId: string;

      function ticker({ id }: { id: string }) {
        rafId = id;
        rotDeg.current.lerp(rotDeg.target, lerpAmount);
        bgPos.current.lerp(bgPos.target, lerpAmount);

        target.forEach((el) => {
          el.style.setProperty("--rotX", `${rotDeg.current.y.toFixed(2)}deg`);
          el.style.setProperty("--rotY", `${rotDeg.current.x.toFixed(2)}deg`);
          el.style.setProperty("--bgPosX", `${bgPos.current.x.toFixed(2)}%`);
          el.style.setProperty("--bgPosY", `${bgPos.current.y.toFixed(2)}%`);
        });
      }

      const onMouseMove = (e: MouseEvent) => {
        lerpAmount = 0.1;
        target.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const ox = (e.clientX - rect.left - el.clientWidth * 0.5) / (Math.PI * 3);
          const oy = -(e.clientY - rect.top - el.clientHeight * 0.5) / (Math.PI * 4);
          rotDeg.target.set(ox, oy);
          bgPos.target.set(-ox * 0.3, oy * 0.3);
        });
      };

      const onMouseLeave = () => {
        lerpAmount = 0.06;
        rotDeg.target.set(0, 0);
        bgPos.target.set(0, 0);
      };

      const addListeners = () => {
        trigger.addEventListener("mousemove", onMouseMove);
        trigger.addEventListener("mouseleave", onMouseLeave);
      };

      const removeListeners = () => {
        trigger.removeEventListener("mousemove", onMouseMove);
        trigger.removeEventListener("mouseleave", onMouseLeave);
      };

      const init = () => {
        addListeners();
        rafRef.current?.add(ticker);
      };

      const destroy = () => {
        removeListeners();
        rafRef.current?.remove(rafId);
      };

      init();
      const instance = { destroy, update: () => {} };
      tiltInstances.current.push(instance);
      return instance;
    }, []);

    const changeSlide = useCallback((direction: number) => {
      return () => {
        if (!sliderRef.current) return;

        const slider = sliderRef.current;
        const slides = Array.from(slider.querySelectorAll('.slide'));
        const slideInfos = Array.from(slider.querySelectorAll('.slide-info'));
        const slideBgs = Array.from(slider.querySelectorAll('.slide__bg'));

        if (slides.length < 3) return;

        const currentIndex = slides.findIndex(slide => slide.hasAttribute('data-current'));
        let nextIndex = wrap(currentIndex + direction, slides.length);
        let prevIndex = wrap(currentIndex - direction, slides.length);

        // Remove all data attributes first
        slides.forEach(slide => slide.removeAttribute('data-current'));
        slides.forEach(slide => slide.removeAttribute('data-next'));
        slides.forEach(slide => slide.removeAttribute('data-previous'));
        slideInfos.forEach(info => info.removeAttribute('data-current'));
        slideInfos.forEach(info => info.removeAttribute('data-next'));
        slideInfos.forEach(info => info.removeAttribute('data-previous'));
        slideBgs.forEach(bg => bg.removeAttribute('data-current'));
        slideBgs.forEach(bg => bg.removeAttribute('data-next'));
        slideBgs.forEach(bg => bg.removeAttribute('data-previous'));

        // Update z-index for smooth transition
        slides[currentIndex].style.zIndex = '20';
        slides[prevIndex].style.zIndex = direction === 1 ? '30' : '10';
        slides[nextIndex].style.zIndex = direction === 1 ? '10' : '30';

        // Set new attributes
        slides[currentIndex].setAttribute(direction === 1 ? 'data-previous' : 'data-next', '');
        slideInfos[currentIndex]?.setAttribute(direction === 1 ? 'data-previous' : 'data-next', '');
        slideBgs[currentIndex]?.setAttribute(direction === 1 ? 'data-previous' : 'data-next', '');

        slides[nextIndex].setAttribute(direction === 1 ? 'data-current' : 'data-previous', '');
        slideInfos[nextIndex]?.setAttribute(direction === 1 ? 'data-current' : 'data-previous', '');
        slideBgs[nextIndex]?.setAttribute(direction === 1 ? 'data-current' : 'data-previous', '');

        slides[prevIndex].setAttribute(direction === 1 ? 'data-next' : 'data-current', '');
        slideInfos[prevIndex]?.setAttribute(direction === 1 ? 'data-next' : 'data-current', '');
        slideBgs[prevIndex]?.setAttribute(direction === 1 ? 'data-next' : 'data-current', '');
      };
    }, []);

    const initSlider = useCallback(() => {
      if (!sliderRef.current) return;

      const loader = loaderRef.current;
      const slides = Array.from(sliderRef.current.querySelectorAll(".slide")) as HTMLElement[];
      const slidesInfo = Array.from(sliderRef.current.querySelectorAll(".slide-info")) as HTMLElement[];
      const buttons = {
        prev: sliderRef.current.querySelector(".slider--btn__prev") as HTMLElement,
        next: sliderRef.current.querySelector(".slider--btn__next") as HTMLElement
      };

      if (loader) {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
      }

      // Initialize first slide state if not set
      if (slides.length > 0 && !slides.some(s => s.hasAttribute('data-current'))) {
        slides[0].setAttribute('data-current', '');
        slidesInfo[0]?.setAttribute('data-current', '');
        sliderRef.current.querySelector('.slide__bg')?.setAttribute('data-current', '');

        if (slides.length > 1) {
          slides[1].setAttribute('data-next', '');
          slidesInfo[1]?.setAttribute('data-next', '');
          sliderRef.current.querySelectorAll('.slide__bg')[1]?.setAttribute('data-next', '');
        }

        if (slides.length > 2) {
          slides[2].setAttribute('data-previous', '');
          slidesInfo[2]?.setAttribute('data-previous', '');
          sliderRef.current.querySelectorAll('.slide__bg')[2]?.setAttribute('data-previous', '');
        }
      }

      // Clear previous tilt instances
      tiltInstances.current.forEach(instance => instance.destroy());
      tiltInstances.current = [];

      // Add new tilt instances
      slides.forEach((slide, i) => {
        const slideInner = slide.querySelector(".slide__inner") as HTMLElement;
        const slideInfoInner = slidesInfo[i]?.querySelector(".slide-info__inner") as HTMLElement;
        if (slideInner && slideInfoInner) {
          tilt(slide, { target: [slideInner, slideInfoInner] });
        }
      });

      const prevHandler = changeSlide(-1);
      const nextHandler = changeSlide(1);

      buttons.prev?.addEventListener("click", prevHandler);
      buttons.next?.addEventListener("click", nextHandler);

      return () => {
        buttons.prev?.removeEventListener("click", prevHandler);
        buttons.next?.removeEventListener("click", nextHandler);
      };
    }, [tilt, changeSlide]);

    const setup = useCallback(() => {
      rafRef.current = new Raf();
      const loaderText = loaderTextRef.current;
      if (!sliderRef.current || !loaderText) return;

      const images = Array.from(sliderRef.current.querySelectorAll("img")) as HTMLImageElement[];
      
      // Enhanced lazy loading with optional placeholder
      images.forEach(img => {
        img.loading = "lazy";
        img.decoding = "async";
        if (!img.complete) {
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.4s ease';
          img.onload = () => {
            img.style.opacity = '1';
          };
        }
      });

      const totalImages = images.length;
      let loadedImages = 0;
      let progress = { current: 0, target: 0 };

      images.forEach((image) => {
        imagesLoaded(image, (instance) => {
          if (instance.isComplete) {
            loadedImages++;
            progress.target = loadedImages / totalImages;
          }
        });
      });

      const progressId = genId();
      rafRef.current.add(({ id }: { id: string }) => {
        progress.current = lerp(progress.current, progress.target, 0.06);
        const progressPercent = Math.round(progress.current * 100);
        loaderText.textContent = `${progressPercent}%`;

        if (progressPercent === 100) {
          const cleanup = initSlider();
          rafRef.current?.remove(id);
          return cleanup;
        }
      }, progressId);

      return () => {
        rafRef.current?.remove(progressId);
      };
    }, [initSlider]);

    useEffect(() => {
      setup();
      return () => {
        // Cleanup all tilt instances
        tiltInstances.current.forEach(instance => instance.destroy());
        tiltInstances.current = [];
        
        // Stop RAF
        rafRef.current?.stop();
        rafRef.current = null;
      };
    }, [setup]);

    return (
      <div className="page6-container" ref={sliderRef}>
        <div className="page6-bg-container" ref={bgContainerRef}></div>
        
        <div className="slider">
          <button className="slider--btn slider--btn__prev" aria-label="Previous slide">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="slides__wrapper">
            <div className="slides">
              {TEAM_MEMBERS.map((member, index) => (
                <React.Fragment key={member.id}>
                  <div className="slide" {...(index === 0 ? { 'data-current': '' } : {})}>
                    <div className="slide__inner">
                      <div className="slide--image__wrapper">
                        <img 
                          className="slide--image" 
                          src={member.imageUrl} 
                          alt={member.name} 
                          loading="lazy"
                          decoding="async"
                          width="400"
                          height="600"
                        />
                      </div>
                    </div>
                  </div>
                  <div 
                    className="slide__bg" 
                    style={{ 
                      "--bg": `url(${member.bgUrl || member.imageUrl})`, 
                    } as React.CSSProperties}
                    {...(index === 0 ? { 'data-current': '' } : {})}
                  ></div>
                </React.Fragment>
              ))}
            </div>
            <div className="slides--infos">
              {TEAM_MEMBERS.map((member, index) => (
                <div 
                  className="slide-info" 
                  key={`info-${member.id}`}
                  {...(index === 0 ? { 'data-current': '' } : {})}
                >
                  <div className="slide-info__inner">
                    <div className="slide-info--text__wrapper">
                      <div data-title className="slide-info--text">
                        <span>{member.name}</span>
                      </div>
                      <div data-subtitle className="slide-info--text">
                        <span>{member.role}</span>
                      </div>
                      <div data-description className="slide-info--text">
                        <span>{member.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="slider--btn slider--btn__next" aria-label="Next slide">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="loader" ref={loaderRef}>
          <span className="loader__text" ref={loaderTextRef}>0%</span>
        </div>

      
      </div>
    );
  };

  export default Page6;