import React from 'react';
import styles from './Terms.module.scss';
import termsData from './terms.json';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    <div className={styles.termsPage}>
      <div className={styles.particles}>
        {Array.from({ length: 80 }).map((_, index) => (
          <div
            key={index}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.header}>
        <h1>Terms and Conditions</h1>
        <p>Governing your participation in our 6-month coding programs.</p>
      </div>

      <div className={styles.termsContainer}>
        <div className={styles.charter}>
          <div className={styles.charterContent}>
            <h2 className={styles.charterTitle}>[Your Coaching Website Name] Program Charter</h2>
            <p className={styles.lastUpdated}>Last Updated: August 14, 2025</p>
            {termsData.terms.map((term) => (
              <div key={term.id} className={styles.termSection}>
                <h3 className={styles.termTitle}>{term.title}</h3>
                <p className={styles.termContent}>{term.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.contactCta}>
        <h3>Need Clarification?</h3>
        <p>Contact our support team for any questions about these terms.</p>
        <Link to={"/contactus"}>
              Contact Us
        </Link>    
      </div>
    </div>
  );
};

export default Terms;