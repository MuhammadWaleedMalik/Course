import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.scss';

const Courses: React.FC = () => {
  return (
    <div className="courses-page">
      <div className="courses-hero">
        <h1>Our Courses</h1>
        <p>Choose your path to becoming a full-stack developer</p>
      </div>
      
      <div className="courses-container">
        <div className="course-card">
          <div className="course-image">
            <img 
              src="https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Frontend Development" 
              loading="lazy"
            />
          </div>
          <div className="course-content">
            <h2>Frontend Development</h2>
            <p className="instructor">By Instructor Ali</p>
            <div className="course-details">
              <div className="detail-item">
                <span className="label">Duration:</span>
                <span className="value">3 Months</span>
              </div>
              <div className="detail-item">
                <span className="label">Level:</span>
                <span className="value">Beginner to Advanced</span>
              </div>
              <div className="detail-item">
                <span className="label">Technologies:</span>
                <span className="value">HTML, CSS, JavaScript, React</span>
              </div>
            </div>
            <ul className="features-list">
              <li>Modern React with Hooks</li>
              <li>Responsive Web Design</li>
              <li>State Management</li>
              <li>API Integration</li>
              <li>Real-world Projects</li>
            </ul>
            <Link to="/frontend-by-ali" className="join-button">
              Join Frontend Course
            </Link>
          </div>
        </div>

        <div className="course-card">
          <div className="course-image">
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Backend Development" 
              loading="lazy"
            />
          </div>
          <div className="course-content">
            <h2>Backend Development</h2>
            <p className="instructor">By Instructor Waleed</p>
            <div className="course-details">
              <div className="detail-item">
                <span className="label">Duration:</span>
                <span className="value">3 Months</span>
              </div>
              <div className="detail-item">
                <span className="label">Level:</span>
                <span className="value">Beginner to Advanced</span>
              </div>
              <div className="detail-item">
                <span className="label">Technologies:</span>
                <span className="value">Node.js, Express, MongoDB, SQL</span>
              </div>
            </div>
            <ul className="features-list">
              <li>RESTful API Development</li>
              <li>Database Management</li>
              <li>Authentication & Authorization</li>
              <li>Server Deployment</li>
              <li>Real-world Backend Systems</li>
            </ul>
            <Link to="/backend-by-waleed" className="join-button">
              Join Backend Course
            </Link>
          </div>
        </div>
      </div>

      <div className="fullstack-cta">
        <h2>Become a Full-Stack Developer</h2>
        <p>Complete both courses and become a job-ready full-stack developer in just 6 months!</p>
        <div className="benefits">
          <div className="benefit">
            <span className="icon">🎯</span>
            <h4>Career Ready</h4>
            <p>Industry-relevant skills</p>
          </div>
          <div className="benefit">
            <span className="icon">👨‍💻</span>
            <h4>Mentorship</h4>
            <p>1-on-1 guidance from experts</p>
          </div>
          <div className="benefit">
            <span className="icon">📂</span>
            <h4>Portfolio</h4>
            <p>Real projects for your portfolio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;