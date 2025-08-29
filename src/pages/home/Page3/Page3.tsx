import  { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Page3.scss';

gsap.registerPlugin(ScrollTrigger);

const Page3 = () => {
  const mainHeadingRef = useRef(null);
  const subHeadingsRef = useRef(null);
  const coursesRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef(null);
  const pageRef = useRef(null);

 const courses = [
  {
    title: 'Frontend Development',
    description: 'Master HTML, CSS, JavaScript, React, and modern frontend frameworks to build responsive web interfaces',
    duration: '12 Weeks'
  },
  {
    title: 'Backend Development',
    description: 'Build scalable server-side applications with Node.js, Express, databases, and REST APIs',
    duration: '14 Weeks'
  }
];

  // Initialize refs - GSAP CODE REMAINS EXACTLY AS YOU WROTE IT
  useEffect(() => {
    const triggers: string[] = [];

    // Main heading animation - YOUR ORIGINAL CODE
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top end",
        end: "end top",
        scrub: 1,
        markers: true,
        id: "t1"
      }
    });
    triggers.push("t1");

    t1.fromTo(mainHeadingRef.current,
      { x: 0, y: 0, scale: 1.5, opacity: 1 },
      { 
        x: '-=430',
        y: '+=150',
        scale: 0.6,
        duration: 3,
        scrub: 5, 
        ease: "power2.out"
      }
    );

    // Sub-headings animation - YOUR ORIGINAL CODE
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "end top",
        scrub: 3,
        markers: false,
        id: "t2"
      }
    });
    triggers.push("t2");

    t2.fromTo(subHeadingsRef.current,
      { x: -700, opacity: 0, y: 150 },
      { 
        x: -37,
        y: 151,
        opacity: 1,
        delay: 0.4,
        duration: 0.8,
        ease: "back.out(1.2)"
      }
    );

    // Courses animation - YOUR ORIGINAL CODE
    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "end top",
        end: "top end",
        scrub: 1,
        markers: false,
        id: "t3"
      }
    });
    triggers.push("t3");

    t3.fromTo(coursesRef.current,
      { x: +140, opacity: 0 },
      { 
        x: +0,
        opacity: 1,
        duration: 3.6,
        delay: 3,
        stagger: 0.15,
        ease: "power2.out"
      }
    );

    // ONLY ADDITION: Adjust container height based on content
    const calculateHeight = () => {
      const baseHeight = window.innerHeight;
      const extraSpace = courses.length > 2 ? (courses.length - 2) * 120 : 0;
      gsap.set(pageRef.current, { height: baseHeight + extraSpace });
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    return () => {
      triggers.forEach(id => ScrollTrigger.getById(id)?.kill());
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return (
    <div className="page3-container" ref={containerRef}>
      {/* ONLY CHANGE: Added overflow hidden to contain absolutely positioned elements */}
      <div className="page3" ref={pageRef} style={{ overflow: 'hidden' }}>
        <h1 className="main-heading" ref={mainHeadingRef}>Our Courses</h1>
        
        <div className="sub-headings" ref={subHeadingsRef}>
          <h3>Professional Certifications</h3>
          <h3>Industry Training Programs</h3>
        </div>

        {/* ONLY CHANGE: Added scrollable container for courses */}
        <div className="courses-scroll-container">
          <div className="courses-container">
            {courses.map((course, index) => (
              <div 
                className="course-card"
                key={`${course.title}-${index}`}
                ref={el => coursesRef.current[index] = el}
              >
                <h4>{course.title}</h4>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span className="duration">{course.duration}</span>
                  &nbsp;&nbsp;
                  <a 
                    href="#join" 
                    className="join-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    Join Course
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;