import React from 'react';
import styles from './Roadmap.module.scss';
import roadmapData from './roadmap.json';
import { Link } from 'react-router-dom';

const Roadmap = () => {
  return (
    <div className={styles.roadmapPage}>
      {/* Particle Background */}
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

      {/* Header */}
      <div className={styles.header}>
        <h1>Course Roadmaps</h1>
        <p>Explore and download the detailed roadmaps for our 6-month coding programs.</p>
      </div>

      {/* Roadmap Container */}
      <div className={styles.roadmapContainer}>
        <div className={styles.charter}>
          <div className={styles.charterContent}>
            <h2 className={styles.charterTitle}>Program Roadmaps</h2>
            <p className={styles.lastUpdated}>Last Updated: August 14, 2025</p>
            {roadmapData.courses.map((course) => (
              <div key={course.id} className={styles.courseSection}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseDescription}>{course.description}</p>
                <ul className={styles.courseTopics}>
                  {course.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
                <a
                  href={`/roadmaps/${course.id}-roadmap.pdf`}
                  download
                  className={styles.downloadButton}
                >
                  Download {course.title} Roadmap
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className={styles.contactCta}>
        <h3>Have Questions?</h3>
        <p>Reach out to our team for more details about our roadmaps or programs.</p>
        <Link to={"/contactus"} className='.button'>
            Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Roadmap;