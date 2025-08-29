import React from 'react';

import './Page1.scss';
import { Link } from 'react-router-dom';
import TypeWriter from '../../../components/TypeWriter/TypeWriter';

const Page1: React.FC = () => {
  const galleryImages = [
    "https://i.postimg.cc/qMCyr6xc/project-1.png",
 "https://i.postimg.cc/LXXgbJs1/Project-2.png",
"https://i.postimg.cc/Nj6X9hV5/Project-3.png",
    "https://i.postimg.cc/R0jyhHn7/Screenshot-2025-08-28-182510.png",
    
"https://i.postimg.cc/Nj6X9hV5/Project-3.png",
    "https://i.postimg.cc/R0jyhHn7/Screenshot-2025-08-28-182510.png",
    
  ];

  return (
    <div className="page1-container">
      <div className="page1">
        <div className="page1-left">
          <h1>Courses Craft</h1>
          <h1>WEBSITE</h1>
          
          <TypeWriter
            text="Be a freelancer in 6 months"
            typingSpeed={100}
            pauseDuration={2000}
            className="typewritercolor"
          />

          <div className="action-buttons">
            <Link to={"/signup"} className="primary-button">Get Started</Link>
            <Link to={"/about"}  className="primary-button ">Learn More</Link>
          </div>
        </div>

        <div className="page1-right">
          <div className="gallery-container">
            <div className="gallery">
              {galleryImages?.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;