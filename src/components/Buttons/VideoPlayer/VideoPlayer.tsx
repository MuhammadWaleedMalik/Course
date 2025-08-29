
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import './VideoPlayer.scss';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoPlayerProps {
  videoId: string;
  containerClassName?: string;
  playButtonSize?: number;
  initialText?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  containerClassName = '',
  playButtonSize = 100,
  initialText = 'Watch Video'
}) => {
  const [clicked, setClicked] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const youtubeVideoRef = useRef<HTMLIFrameElement>(null);
  const playTriangleSvgRef = useRef<SVGSVGElement>(null);
  const buttonCircleSvgRef = useRef<SVGSVGElement>(null);
  const buttonCircleRef = useRef<SVGCircleElement>(null);
  const playTriangleRef = useRef<SVGPolygonElement>(null);
  const triangleTweenTargetRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    // Register MorphSVGPlugin
    gsap.registerPlugin(MorphSVGPlugin);

    // Load YouTube API script
    if (!document.getElementById('youtube-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    // Set up YouTube API ready callback
    window.onYouTubeIframeAPIReady = () => {
      if (youtubeVideoRef.current) {
        const newPlayer = new window.YT.Player(youtubeVideoRef.current, {
          events: {
            onReady: () => {
              setPlayer(newPlayer);
              youtubeVideoRef.current!.style.display = 'block';
              youtubeVideoRef.current!.style.visibility = 'visible';
            },
            onError: (event: any) => {
              console.error('YouTube Player Error:', event.data);
            }
          }
        });
      }
    };

    if (window.YT && window.YT.loaded) {
      window.onYouTubeIframeAPIReady();
    }

    if (buttonCircleRef.current && playTriangleRef.current && triangleTweenTargetRef.current) {
      MorphSVGPlugin.convertToPath(playTriangleRef.current);
      MorphSVGPlugin.convertToPath(triangleTweenTargetRef.current);

      const morph = gsap.to(playTriangleRef.current, {
        morphSVG: triangleTweenTargetRef.current,
        scale: 5,
        transformOrigin: 'center center',
        duration: 0.5,
        paused: true
      }).progress(1).pause(0);

      containerRef.current!.morph = morph;
    }

    return () => {
      if (player) {
        player.destroy();
      }
      gsap.killTweensOf([buttonCircleRef.current, playTriangleRef.current, playTriangleSvgRef.current, videoWrapperRef.current, youtubeVideoRef.current]);
    };
  }, [videoId]);

  const getScale = () => {
    if (!playTriangleSvgRef.current || !containerRef.current) return 1;

    const buttonPosition = {
      x: containerRef.current.getBoundingClientRect().left + containerRef.current.offsetWidth / 2,
      y: containerRef.current.getBoundingClientRect().top + containerRef.current.offsetHeight / 2
    };

    const farthestCorner = {
      x: buttonPosition.x > window.innerWidth / 2 ? 0 : window.innerWidth,
      y: buttonPosition.y > window.innerHeight / 2 ? 0 : window.innerHeight
    };

    const a = Math.abs(buttonPosition.x - farthestCorner.x);
    const b = Math.abs(buttonPosition.y - farthestCorner.y);
    const hypotenuse = Math.sqrt(a * a + b * b);

    return hypotenuse / (containerRef.current.offsetWidth / 2);
  };

  const playVideo = () => {
    if (player && player.playVideo) {
      player.playVideo();
    }
  };

  const stopVideo = () => {
    if (player && player.stopVideo) {
      player.stopVideo();
    }
  };

  const showVideo = () => {
    if (videoWrapperRef.current && youtubeVideoRef.current) {
      videoWrapperRef.current.style.display = 'block';
      gsap.to(videoWrapperRef.current, { opacity: 1, duration: 0.3 });
    }
  };

  const hideVideo = () => {
    if (videoWrapperRef.current) {
      gsap.to(videoWrapperRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          videoWrapperRef.current!.style.display = 'none';
        }
      });
    }
  };

  const handleClick = () => {
    if (!containerRef.current || !buttonCircleSvgRef.current || !buttonCircleRef.current || !playTriangleSvgRef.current) return;

    if (!clicked) {
      setClicked(true);
      gsap.to(buttonCircleSvgRef.current, { scale: getScale(), opacity: 0.8, duration: 0.2 });
      gsap.to(buttonCircleRef.current, { fill: '#333333', duration: 0.5 });
      containerRef.current.morph.play();
      gsap.to(playTriangleSvgRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
        x: -containerRef.current.getBoundingClientRect().left,
        y: -containerRef.current.getBoundingClientRect().top,
        duration: 0.5,
        onStart: playVideo,
        onComplete: showVideo
      });
    } else {
      setClicked(false);
      gsap.to(buttonCircleSvgRef.current, { scale: 1, duration: 0.5 });
      containerRef.current.morph.reverse();
      gsap.to(buttonCircleRef.current, { fill: '#DDDDDD', duration: 0.5 });
      gsap.to(playTriangleSvgRef.current, {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        onStart: () => {
          stopVideo();
          hideVideo();
        }
      });
    }
  };

  const handleClose = () => {
    if (clicked) {
      handleClick();
    }
  };

  return (
    <div className={`overflow ${containerClassName}`} ref={containerRef}>
      <div
        id="play-button-container"
        className="play-button-container"
        style={{
          width: `${playButtonSize}px`,
          height: `${playButtonSize}px`
        }}
        onClick={handleClick}
      >
        <svg id="button-circle-svg" className="button-circle-svg" viewBox="0 0 100 100" ref={buttonCircleSvgRef}>
          <circle
            id="button-circle"
            ref={buttonCircleRef}
            className="button-circle"
            cx="50"
            cy="50"
            r="50"
          />
        </svg>

        <svg id="play-triangle-svg" className="play-triangle-svg" viewBox="0 0 100 100" ref={playTriangleSvgRef}>
          <polygon
            id="play-triangle"
            ref={playTriangleRef}
            className="play-triangle"
            points="37,74.1 76.8,51.1 37,28.2"
          />
          <rect
            id="triangle-tween-target"
            ref={triangleTweenTargetRef}
            className="triangle-tween-target"
            x="47.6"
            y="46.7"
            width="16"
            height="9"
          />
        </svg>

        <div className="video-text">{initialText}</div>
      </div>

      {clicked && (
        <div className="video-modal" ref={videoWrapperRef}>
          <button className="close-btn" onClick={handleClose}>×</button>
          <iframe
            ref={youtubeVideoRef}
            id="youtube-video"
            className="youtube-video"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

