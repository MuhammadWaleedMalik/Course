import React from 'react';

import './Page1.scss';
import { Link } from 'react-router-dom';
import TypeWriter from '../../../components/TypeWriter/TypeWriter';

const Page1: React.FC = () => {
  const galleryImages = [

      "https://i.ibb.co/Q7t69BB3/4.png",
      "https://i.ibb.co/5XdfJvNq/3.png",
      "https://i.ibb.co/qY2QdH4j/2.png",
      "https://i.ibb.co/VhYmDtc/4.png",
      "https://i.ibb.co/VhYmDtc/3.png",
      "https://i.ibb.co/VhYmDtc/6.png",
    
  ];

  return (
    <div className="page1-container">
      <div className="page1">
        <div className="page1-left">
          <h1>THE COACHING</h1>
          <h1>WEBSITE</h1>
          
          <TypeWriter
            text="Be a freelancer in 6 months"
            typingSpeed={100}
            pauseDuration={2000}
            className="typewritercolor"
          />

          <div className="action-buttons">
            <Link to={"/signup"} className="primary-button">Get Started</Link>
            <Link to={"/about"}  className="secondary-button">Learn More</Link>
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