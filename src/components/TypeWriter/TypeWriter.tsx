    import React, { useState, useEffect, useCallback, useRef } from 'react';
    import '../../data/colors/theme.scss';

    interface TypeWriterProps {
      text?: string | string[];
      typingSpeed?: number;
      pauseDuration?: number;
      className?: string;
      loop?: boolean;
      cursor?: boolean;
    }

    const TypeWriter: React.FC<TypeWriterProps> = ({
      text = '',
      typingSpeed = 150,
      pauseDuration = 2000,
      className = '',
      loop = true,
      cursor = true,
    }) => {
      const [displayedText, setDisplayedText] = useState('');
      const [currentTextIndex, setCurrentTextIndex] = useState(0);
      const animationRef = useRef<number | null>(null);
      const lastUpdateTimeRef = useRef<number>(0);

      // Normalize and validate input
      const texts = Array.isArray(text) ? text : [text];
      const safeTypingSpeed = Math.max(30, Math.min(typingSpeed, 1000));
      const safePauseDuration = Math.max(500, Math.min(pauseDuration, 10000));

      const clearAnimation = useCallback(() => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }, []);

      const getCurrentText = useCallback(() => {
        return texts[currentTextIndex % texts.length] || '';
      }, [texts, currentTextIndex]);

      const typeWriterEffect = useCallback((timestamp: number) => {
        if (!texts.length) {
          setDisplayedText('');
          return;
        }

        const currentText = getCurrentText();
        const timeElapsed = timestamp - lastUpdateTimeRef.current;

        if (timeElapsed < safeTypingSpeed) {
          animationRef.current = requestAnimationFrame(typeWriterEffect);
          return;
        }

        lastUpdateTimeRef.current = timestamp;

        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          // Move to next text after pause
          clearAnimation();
          setTimeout(() => {
            setCurrentTextIndex(prev => (loop ? (prev + 1) % texts.length : Math.min(prev + 1, texts.length - 1)));
            setDisplayedText('');
            lastUpdateTimeRef.current = performance.now();
            animationRef.current = requestAnimationFrame(typeWriterEffect);
          }, safePauseDuration);
          return;
        }

        animationRef.current = requestAnimationFrame(typeWriterEffect);
      }, [
        texts,
        displayedText,
        safeTypingSpeed,
        safePauseDuration,
        loop,
        getCurrentText,
        clearAnimation
      ]);

      useEffect(() => {
        lastUpdateTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(typeWriterEffect);

        return () => clearAnimation();
      }, [typeWriterEffect, clearAnimation]);

      useEffect(() => {
        // Reset when text changes
        setDisplayedText('');
        setCurrentTextIndex(0);
        lastUpdateTimeRef.current = performance.now();
      }, [text]);

      const isLastTextComplete = !loop && currentTextIndex === texts.length - 1 && 
                                displayedText.length === getCurrentText()?.length;

      return (
        <div className={`typewriter-container flex items-center ${className}`}>
          <span className="typewriter-text text-2xl sm:text-3xl md:text-4xl font-mono">
            {displayedText}
          </span>
          {cursor && (
            <span 
              className="typewriter-cursor ml-1 h-8 w-1 bg-current inline-block align-middle"
              style={{ 
                animation: 'blink 1s step-end infinite',
                opacity: isLastTextComplete ? 0 : 1
              }}
            />
          )}
          <style>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </div>
      );
    };

    export default TypeWriter;