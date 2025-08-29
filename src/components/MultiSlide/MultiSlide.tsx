import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './MultiSlide.scss';

interface BoxPosition {
  X: number;
  Y: number;
}

interface BoxItem {
  pos: BoxPosition;
  img: string;
  DOMElement?: HTMLDivElement;
}

const MultiSlide: React.FC = () => {
  // Desktop constants
  const DESKTOP_UNIT = 250;
  const DESKTOP_MAX_X = 40;
  const DESKTOP_MIN_X = -3;
  const DESKTOP_MAX_Y = 4;
  const DESKTOP_MIN_Y = -3;

  // Mobile constants
  const MOBILE_UNIT = 120;
  const MOBILE_MAX_X = 3;
  const MOBILE_MIN_X = -1;
  const MOBILE_MAX_Y = 3;
  const MOBILE_MIN_Y = 0;

  // State
  const [registeredBoxes, setRegisteredBoxes] = useState<BoxItem[]>([]);
  const [slidePosX, setSlidePosX] = useState<number>(0);
  const [slidePosY, setSlidePosY] = useState<number>(0);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const figureRef = useRef<HTMLDivElement>(null);

  // Sample images
  const sampleImages = useMemo(() => [
    'https://picsum.photos/400/400?random=1',
    'https://picsum.photos/400/400?random=2',
    'https://picsum.photos/400/400?random=3',
    'https://picsum.photos/400/400?random=4',
    'https://picsum.photos/400/400?random=5',
    'https://picsum.photos/400/400?random=6',
    'https://picsum.photos/400/400?random=7',
    'https://picsum.photos/400/400?random=8',
  ], []);

  // Debounced resize handler
  const debounce = useCallback((fn: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay);
    };
  }, []);

  // Handle resize and mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    const debouncedCheckMobile = debounce(checkMobile, 200);
    window.addEventListener('resize', debouncedCheckMobile);
    checkMobile();

    return () => window.removeEventListener('resize', debouncedCheckMobile);
  }, [debounce]);

  // Initialize boxes
  useEffect(() => {
    const unit = isMobile ? MOBILE_UNIT : DESKTOP_UNIT;
    const boxes: BoxItem[] = isMobile
      ? [
          { pos: { X: -1, Y: 2 }, img: getNextImage() },
          { pos: { X: 0, Y: 2 }, img: getNextImage() },
          { pos: { X: 1, Y: 2 }, img: getNextImage() },
          { pos: { X: 2, Y: 2 }, img: getNextImage() },
          { pos: { X: 3, Y: 2 }, img: getNextImage() },
          { pos: { X: 2, Y: 1 }, img: getNextImage() },
          { pos: { X: 2, Y: 0 }, img: getNextImage() },
          { pos: { X: 2, Y: 3 }, img: getNextImage() },
        ]
      : [
          { pos: { X: -2, Y: 2 }, img: getNextImage() },
          { pos: { X: -1, Y: 2 }, img: getNextImage() },
          { pos: { X: 0, Y: 2 }, img: getNextImage() },
          { pos: { X: 1, Y: 2 }, img: getNextImage() },
          { pos: { X: 2, Y: 2 }, img: getNextImage() },
          { pos: { X: 3, Y: 2 }, img: getNextImage() },
          { pos: { X: 4, Y: 2 }, img: getNextImage() },
          { pos: { X: 2, Y: -2 }, img: getNextImage() },
          { pos: { X: 2, Y: -1 }, img: getNextImage() },
          { pos: { X: 2, Y: 0 }, img: getNextImage() },
          { pos: { X: 2, Y: 1 }, img: getNextImage() },
          { pos: { X: 2, Y: 3 }, img: getNextImage() },
          { pos: { X: 2, Y: 4 }, img: getNextImage() },
        ];

    setRegisteredBoxes(boxes);
    initializeBoxElements(boxes, unit);
  }, [isMobile]);

  const getNextImage = useCallback(() => {
    const nextIndex = (imageIndex + 1) % sampleImages.length;
    setImageIndex(nextIndex);
    return sampleImages[nextIndex];
  }, [imageIndex, sampleImages]);

  const initializeBoxElements = useCallback((boxes: BoxItem[], unit: number) => {
    if (!figureRef.current) return;

    // Clear existing elements
    figureRef.current.innerHTML = '';

    const updatedBoxes = boxes.map(box => {
      const DOMElement = document.createElement('div');
      DOMElement.className = 'box';
      DOMElement.style.left = `${(box.pos.X * unit) - unit}px`;
      DOMElement.style.top = `${(box.pos.Y * unit) - unit}px`;
      DOMElement.setAttribute('data-pos', `${box.pos.X}${box.pos.Y}`);

      const img = document.createElement('img');
      img.src = box.img;
      img.alt = `Image at position ${box.pos.X},${box.pos.Y}`;
      img.loading = 'lazy';
      DOMElement.appendChild(img);

      figureRef.current?.appendChild(DOMElement);

      return { ...box, DOMElement };
    });

    setRegisteredBoxes(updatedBoxes);
  }, []);

  const setPosition = useCallback((box: BoxItem, axis: 'X' | 'Y', val: number) => {
    if (!box?.DOMElement) return;

    const unit = isMobile ? MOBILE_UNIT : DESKTOP_UNIT;
    const newPos = { ...box.pos, [axis]: val };
    box.pos = newPos;

    if (axis === 'X') {
      box.DOMElement.style.left = `${(newPos.X * unit) - unit}px`;
    } else if (axis === 'Y') {
      box.DOMElement.style.top = `${(newPos.Y * unit) - unit}px`;
    }

    box.DOMElement.setAttribute('data-pos', `${newPos.X}${newPos.Y}`);
  }, [isMobile]);

  const updateImage = useCallback((box: BoxItem) => {
    if (!box?.DOMElement?.firstChild) return;
    
    const imgElement = box.DOMElement.firstChild as HTMLImageElement;
    imgElement.src = getNextImage();
  }, [getNextImage]);

  const slide = useCallback((axis: 'X' | 'Y', dir: number) => {
    const updatedBoxes = [...registeredBoxes];
    const maxX = isMobile ? MOBILE_MAX_X : DESKTOP_MAX_X;
    const minX = isMobile ? MOBILE_MIN_X : DESKTOP_MIN_X;
    const maxY = isMobile ? MOBILE_MAX_Y : DESKTOP_MAX_Y;
    const minY = isMobile ? MOBILE_MIN_Y : DESKTOP_MIN_Y;

    if (axis === 'Y') {
      if ((dir > 0 && slidePosY < maxY) || (dir < 0 && slidePosY > minY)) {
        updatedBoxes.forEach(box => {
          if (box.pos.X === 2) {
            setPosition(box, axis, box.pos.Y + dir);
            updateImage(box);
          }
        });
        setSlidePosY(prev => prev + dir);
      }
    } else if (axis === 'X') {
      if ((dir > 0 && slidePosX < maxX) || (dir < 0 && slidePosX > minX)) {
        updatedBoxes.forEach(box => {
          if (box.pos.Y === 2) {
            setPosition(box, axis, box.pos.X + dir);
            updateImage(box);
          }
        });
        setSlidePosX(prev => prev + dir);
      }
    }

    setRegisteredBoxes(updatedBoxes);
  }, [isMobile, registeredBoxes, slidePosX, slidePosY, setPosition, updateImage]);

  return (
    <div className="multi-slide-container">
      <div id="multiSlide" className="multiSlide" ref={figureRef}></div>
      <nav id="multiSlideNav" className="multiSlideNav">
        <button 
          id="top" 
          className="navButton"
          onClick={(e) => {
            e.preventDefault();
            slide('Y', -1);
          }}
          aria-label="Slide up"
        >↑</button>
        <button 
          id="bottom" 
          className="navButton"
          onClick={(e) => {
            e.preventDefault();
            slide('Y', 1);
          }}
          aria-label="Slide down"
        >↓</button>
        <button 
          id="left" 
          className="navButton"
          onClick={(e) => {
            e.preventDefault();
            slide('X', -1);
          }}
          aria-label="Slide left"
        >←</button>
        <button 
          id="right" 
          className="navButton"
          onClick={(e) => {
            e.preventDefault();
            slide('X', 1);
          }}
          aria-label="Slide right"
        >→</button>
      </nav>
    </div>
  );
};

export default React.memo(MultiSlide);