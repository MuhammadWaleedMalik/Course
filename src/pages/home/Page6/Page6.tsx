import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Page6.scss';

const Page6: React.FC = () => {
  const marqueeVariants = {
    initial: { x: '0%' },
    animate: {
      x: '-100%',
      transition: {
        ease: 'linear',
        duration: 42, // Adjusted for readability
        repeat: Infinity,
      },
    },
  };

  return (
    <div data-scroll data-scroll-section data-scroll-speed=".2">

    <div className="page6"   >
      <div className="text-container">
        <motion.div variants={marqueeVariants} initial="initial" animate="animate" className="marquee-inner">
          <Link to="/courses" className="marquee-link">
            Join Frontend Course
          </Link>
          <Link to="/courses" className="marquee-link">
            Join Backend Course
          </Link>
          <Link to="/courses" className="marquee-link">
            Join Fullstack Course
          </Link>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default Page6;