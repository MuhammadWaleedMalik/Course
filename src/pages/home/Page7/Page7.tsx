import React from 'react';

import { websiteInfo } from '../../../data/website/info';
import './Page7.scss';
import TypeWriter from '../../../components/TypeWriter/TypeWriter';

const Page7 = () => {
  return (
    <div className="page7-container">
      <div className="roadmap-content">
        <h1>{websiteInfo.name}'s Development Roadmap</h1>
        
        <TypeWriter
          className='page7-typewriter'
          text={`Embark on a transformative journey with ${websiteInfo.name}, ${websiteInfo.slogan}. Our comprehensive roadmap empowers you to master frontend and backend development, equipping you with the skills to build cutting-edge, AI-driven applications. From responsive user interfaces to scalable server-side systems, our guides cover it all. Download our expertly crafted frontend and backend roadmaps below to start building the future with ${websiteInfo.name}!`}
          typingSpeed={50}
          pauseDuration={2000}
          loop={true}
          cursor={true}
        />

        <div className="roadmap-buttons">
          <a 
            href="/assets/frontend-roadmap.pdf"
            download="Frontend_Roadmap.pdf"
            className="download-button frontend"
            aria-label="Download Frontend Roadmap PDF"
          >
            <span className="button-text">Download Frontend Roadmap</span>
            <span className="robot-animation"></span>
          </a>
          <a 
            href="/assets/backend-roadmap.pdf"
            download="Backend_Roadmap.pdf"
            className="download-button backend"
            aria-label="Download Backend Roadmap PDF"
          >
            <span className="button-text">
              Download Backend Roadmap
            </span>
            <span className="robot-animation"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page7;