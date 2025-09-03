import  { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const Page9= () => {
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
    <div  className="bg-white p-4 md:p-6 h-screen relative">
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
        <Link 
            to={"/alumni"}
            className="uppercase top-[50%] z-10 absolute w-full text-center px-4 bottom-1/4 md:bottom-48 left-1/2 -translate-x-1/2 font-[myFont1] text-4xl sm:text-5xl md:text-[6vw] text-white leading-tight">

                Become an Alumni
        </Link>

      
      
      
       </div>
    </div>
  );
};

export default Page9;