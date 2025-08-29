import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Btn1.scss';

interface AnimatedButtonProps {
  defaultText?: string;
  successText?: string;
  primaryColor?: string;
  primaryDark?: string;
  primaryDarkest?: string;
  successColor?: string;
  showDribbble?: boolean;
  showTwitter?: boolean;
  dribbbleUrl?: string;
  twitterUrl?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Btn1: React.FC<AnimatedButtonProps> = ({
  defaultText = 'Send',
  successText = 'Sent',
  primaryColor = 'var(--accent)',
  primaryDark = 'var(--primary-color-1)',
  primaryDarkest = 'var(--primary-color-3)',
  successColor = 'var(--secondary-color-2)',
  showDribbble = false,
  showTwitter = false,
  dribbbleUrl = 'https://dribbble.com/ai',
  twitterUrl = 'https://twitter.com/aaroniker_me',
  onClick,
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const getVar = (variable: string) =>
      getComputedStyle(button).getPropertyValue(variable).trim();

    const handleClick = () => {
      if (disabled || button.classList.contains('active')) return;

      button.classList.add('active');

      gsap.to(button, {
        keyframes: [
          {
            '--left-wing-first-x': 50,
            '--left-wing-first-y': 100,
            '--right-wing-second-x': 50,
            '--right-wing-second-y': 100,
            duration: 0.2,
            onComplete() {
              gsap.set(button, {
                '--left-wing-first-y': 0,
                '--left-wing-second-x': 40,
                '--left-wing-second-y': 100,
                '--left-wing-third-x': 0,
                '--left-wing-third-y': 100,
                '--left-body-third-x': 40,
                '--right-wing-first-x': 50,
                '--right-wing-first-y': 0,
                '--right-wing-second-x': 60,
                '--right-wing-second-y': 100,
                '--right-wing-third-x': 100,
                '--right-wing-third-y': 100,
                '--right-body-third-x': 60,
              });
            },
          },
          {
            '--left-wing-third-x': 20,
            '--left-wing-third-y': 90,
            '--left-wing-second-y': 90,
            '--left-body-third-y': 90,
            '--right-wing-third-x': 80,
            '--right-wing-third-y': 90,
            '--right-body-third-y': 90,
            '--right-wing-second-y': 90,
            duration: 0.2,
          },
          {
            '--rotate': 50,
            '--left-wing-third-y': 95,
            '--left-wing-third-x': 27,
            '--right-body-third-x': 45,
            '--right-wing-second-x': 45,
            '--right-wing-third-x': 60,
            '--right-wing-third-y': 83,
            duration: 0.25,
          },
          {
            '--rotate': 55,
            '--plane-x': -8,
            '--plane-y': 24,
            duration: 0.2,
          },
          {
            '--rotate': 40,
            '--plane-x': 45,
            '--plane-y': -180,
            '--plane-opacity': 0,
            duration: 0.3,
            onComplete() {
              setTimeout(() => {
                button.removeAttribute('style');
                gsap.fromTo(
                  button,
                  { opacity: 0, y: -8 },
                  {
                    opacity: 1,
                    y: 0,
                    clearProps: true,
                    duration: 0.3,
                    onComplete() {
                      button.classList.remove('active');
                    },
                  }
                );
              }, 1000);
            },
          },
        ],
      });

      gsap.to(button, {
        keyframes: [
          {
            '--text-opacity': 0,
            '--border-radius': 0,
            '--left-wing-background': getVar('--primary-darkest'),
            '--right-wing-background': getVar('--primary-darkest'),
            duration: 0.1,
          },
          {
            '--left-wing-background': getVar('--primary'),
            '--right-wing-background': getVar('--primary'),
            duration: 0.1,
          },
          {
            '--left-body-background': getVar('--primary-dark'),
            '--right-body-background': getVar('--primary-darkest'),
            duration: 0.4,
          },
          {
            '--success-opacity': 1,
            '--success-scale': 1,
            duration: 0.25,
            delay: 0.25,
          },
        ],
      });

      if (onClick) onClick();
    };

    button.addEventListener('click', handleClick);
    return () => button.removeEventListener('click', handleClick);
  }, [onClick, disabled]);

  return (
    <div className="button-container">
      <button
        className="button"
        ref={buttonRef}
        disabled={disabled}
        style={
          {
            '--primary': primaryColor,
            '--primary-dark': primaryDark,
            '--primary-darkest': primaryDarkest,
            '--success': successColor,
          } as React.CSSProperties
        }
      >
        <span className="default">{defaultText}</span>
        <span className="success">{successText}</span>
        <div className="left"></div>
        <div className="right"></div>
      </button>
      {showDribbble && (
        <a className="dribbble" href={dribbbleUrl} target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg"
            alt="Dribbble"
          />
        </a>
      )}
      {showTwitter && (
        <a className="twitter" href={twitterUrl} target="_top" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 72 72">
            <path d="M67.812 16.141a26.246 26.246 0 0 1-7.519 2.06 13.134 13.134 0 0 0 5.756-7.244 26.127 26.127 0 0 1-8.313 3.176A13.075 13.075 0 0 0 48.182 10c-7.229 0-13.092 5.861-13.092 13.093 0 1.026.118 2.021.338 2.981-10.885-.548-20.528-5.757-26.987-13.679a13.048 13.048 0 0 0-1.771 6.581c0 4.542 2.312 8.551 5.824 10.898a13.048 13.048 0 0 1-5.93-1.638c-.002.055-.002.11-.002.162 0 6.345 4.513 11.638 10.504 12.84a13.177 13.177 0 0 1-3.449.457c-.846 0-1.667-.078-2.465-.231 1.667 5.2 6.499 8.986 12.23 9.09a26.276 26.276 0 0 1-16.26 5.606A26.21 26.21 0 0 1 4 55.976a37.036 37.036 0 0 0 20.067 5.882c24.083 0 37.251-19.949 37.251-37.249 0-.566-.014-1.134-.039-1.694a26.597 26.597 0 0 0 6.533-6.774z" />
          </svg>
        </a>
      )}
    </div>
  );
};

export default Btn1;