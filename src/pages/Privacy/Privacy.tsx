import React from 'react';
import styles from './Privacy.module.scss';
import privacyData from './privacy.json';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className={styles.privacyPage}>
      <div className={styles.particles}>
        {Array.from({ length: 40 }).map((_, index) => (
          <div
            key={index}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.header}>
        <h1>Privacy Policy</h1>
        <p>How we collect, use, and protect your personal information.</p>
      </div>

      <div className={styles.privacyContainer}>
        <div className={styles.policy}>
          <div className={styles.policyContent}>
            <h2 className={styles.policyTitle}>[Your Coaching Website Name] Privacy Policy</h2>
            <p className={styles.lastUpdated}>Last Updated: August 14, 2025</p>
            
            {privacyData.sections.map((section) => (
              <div key={section.id} className={styles.policySection}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: section.content }} />
                
                {section.dataTypes && (
                  <div className={styles.dataTypes}>
                    <h4>Types of data we collect:</h4>
                    <ul>
                      {section.dataTypes.map((type, i) => (
                        <li key={i}>{type}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.contactCta}>
        <h3>Questions About Your Data?</h3>
        <p>Contact our privacy team for any questions about your personal information.</p>
        <Link to={"/contactus"} className='.button'>
            Contact Privacy Officer
        </Link>
      </div>
    </div>
  );
};

export default Privacy;