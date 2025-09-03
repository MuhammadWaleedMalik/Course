import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useEffect } from 'react';
import ProjectCard from '../../../components/Projects/ProjectCard';

const Page3 = () => {
  const projects = [{
    image1: 'https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail-1280x960.jpg'
  }, {
    image1: 'https://k72.ca/uploads/caseStudies/OKA/OKA_thumbnail-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/Opto/thumbnailimage_opto-1280x960.jpg'
  }, {
    image1: 'https://k72.ca/uploads/caseStudies/LAMAJEURE_-_Son_sur_mesure/chalaxeur-thumbnail_img-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/SHELTON/thumbnailimage_shelton-1280x960.jpg'
  }];

  const containerRef = useRef(null);
  
  // Preload project images
  useEffect(() => {
    const allImages = projects.flatMap(project => [project.image1, project.image2]);
    
    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useGSAP(() => {
    // Set up the hero animation
    gsap.from('.hero', {
      height: '100px',
      stagger: {
        amount: 0.4
      },
      scrollTrigger: {
        trigger: '.lol',
        start: 'top 100%',
        end: 'top -150%',
        scrub: true,
        markers: false,
        invalidateOnRefresh: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current || 
            trigger.vars.trigger === '.lol') {
          trigger.kill();
        }
      });
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='lg:p-4 p-2 mb-[10vh]'>
      <div className='pt-[45vh]'>
        <h2 className='font-[font2] lg:text-[9.5vw] text-7xl uppercase'>Projets</h2>
      </div>
      <div className='-lg:mt-0 lol'>
        {projects.map(function (elem, idx) {
          return (
            <div key={idx} className='hero w-full lg:h-[850px] mb-0 flex lg:flex-row flex-col lg:gap-4 gap-2'>
              <ProjectCard image1={elem.image1} image2={elem.image2} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page3;