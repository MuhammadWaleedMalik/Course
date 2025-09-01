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
       text={`🚀 Embark on an exciting journey with ${websiteInfo.name} — ${websiteInfo.slogan}!  
Our step-by-step roadmap is your ultimate guide to mastering both frontend 🌐 and backend ⚙️ development.  
Learn how to craft stunning, responsive UIs and build powerful, scalable server-side systems — all while exploring the world of AI-driven apps 🤖.  `}
   typingSpeed={50}
          pauseDuration={2000}
          loop={true}
          cursor={false}
        />

    
      </div>
    </div>
  );
};

export default Page7;