import  { useEffect, useRef } from 'react';

const Page4 = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video autoplay on mobile
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
        // Fallback for autoplay restrictions
        const playPromise = videoRef.current?.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Show play button or handle accordingly
          });
        }
      });
    }
  }, []);

  return (
    <div className="bg-white p-4 md:p-6 h-screen relative">
      <div className="h-full w-full bg-black overflow-hidden rounded-3xl md:rounded-[50px] relative">

        {/* Background video with responsive settings */}
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          className="h-full w-full object-cover absolute inset-0 z-0 opacity-40"
          src="https://video.wixstatic.com/video/f1c650_988626917c6549d6bdc9ae641ad3c444/1080p/mp4/file.mp4"
        />

     
        
        {/* Responsive heading */}
        <h1 className="uppercase top-[50%] z-10 absolute w-full text-center px-4 bottom-1/4 md:bottom-48 left-1/2 -translate-x-1/2 font-[myFont1] text-4xl sm:text-5xl md:text-[6vw] text-white leading-tight">
            You Can Call Us<br className="md:hidden" /> Any Time
        </h1>

        {/* Optional: Add a click-to-play overlay for mobile */}
        <div 
          className="md:hidden absolute inset-0 z-20 flex items-center justify-center"
          onClick={() => videoRef.current?.play()}
        >
          <div className="bg-black bg-opacity-50 rounded-full p-4">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4;