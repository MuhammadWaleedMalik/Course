import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import './Collaborators.scss';

const Collaborators: React.FC = () => {
  const [activeMember, setActiveMember] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const colorThemes = [
    { primary: '#f8f9fa', secondary: '#e9ecef', accent: '#0d6efd', glow: '#0d6efd' },
    { primary: '#f8f9fa', secondary: '#e9ecef', accent: '#198754', glow: '#198754' },
    { primary: '#f8f9fa', secondary: '#e9ecef', accent: '#6f42c1', glow: '#6f42c1' },
    { primary: '#f8f9fa', secondary: '#e9ecef', accent: '#fd7e14', glow: '#fd7e14' },
    { primary: '#f8f9fa', secondary: '#e9ecef', accent: '#0dcaf0', glow: '#0dcaf0' },
  ];

  const teamMembers = [
    {
      id: 1,
      firstName: "Muhammad Adeel",
      lastName: "Tariq",
      role: "Python Developer",
      degree: "BS Computer Science",
      university: "International University Islamabad",
      bio: "Experienced Python developer with a strong background in building scalable applications and backend systems. Skilled in designing APIs, automation scripts, and cloud-based solutions to enhance performance and efficiency.",
      skills: ["Python", "Django", "Flask", "AWS"],
      image: "/images/assests/1 (2).jpg",
    },
    {
      id: 2,
      firstName: "Muhammad Abdullah",
      lastName: "Tahir",
      role: "Data Scientist",
      degree: "BS Computer Science",
      university: "COMSATS University",
      bio: "Data Scientist specializing in machine learning, data analysis, and predictive modeling. Passionate about turning complex datasets into actionable insights that drive business decisions.",
      skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
      image: "/images/assests/1 (1).jpg",
    },
    {
      id: 3,
      firstName: "Muhammad",
      lastName: "Huzaifah",
      role: "Computer Engineer",
      degree: "BS Computer Engineering",
      university: "University Of Sargodha",
      bio: "Computer Engineer with expertise in system design, hardware-software integration, and embedded systems. Interested in creating efficient real-world solutions through engineering innovation.",
      skills: ["C++", "Python", "Embedded Systems", "Microcontrollers"],
      image: "/images/assests/1 (2).jpg",
    },
    {
      id: 4,
      firstName: "Muhammad Abdullah",
      lastName: "Asif",
      role: "AI Developer",
      degree: "BS Artificial Intelligence",
      university: "Gazi Ismail Khan University",
      bio: "AI Developer focused on creating intelligent systems using machine learning and deep learning. Skilled in developing NLP models, computer vision applications, and AI-powered automation.",
      skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
      image: "/images/assests/1 (3).jpg",
    },
  ];

  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      setActiveMember((prev) => (prev + 1) % teamMembers.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoSlide, teamMembers.length]);

  const handleNext = () => {
    setAutoSlide(false);
    setActiveMember((prev) => (prev + 1) % teamMembers.length);
    setTimeout(() => setAutoSlide(true), 1000);
  };

  const handlePrev = () => {
    setAutoSlide(false);
    setActiveMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    setTimeout(() => setAutoSlide(true), 15000);
  };

  // Define variants with proper TypeScript typing
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0,   
      y: -20, 
      transition: { duration: 0.4, ease: "easeIn" } 
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stripVariants: Variants = {
    hidden: { opacity: 0, width: 0 },
    visible: {
      opacity: 0.7,
      width: "100%",
      transition: { duration: 1, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      width: 0,
      transition: { duration: 0.8, ease: "easeIn" },
    },
  };

  return (
    <div
      className="team-page"
      style={{ backgroundColor: colorThemes[activeMember].primary }}
      onMouseEnter={() => setAutoSlide(false)}
      onMouseLeave={() => setAutoSlide(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`strip-1-${activeMember}`}
          className="glow-strip strip-1"
          variants={stripVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            background: `linear-gradient(90deg, transparent, ${colorThemes[activeMember].glow}, transparent)`,
          }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`strip-2-${activeMember}`}
          className="glow-strip strip-2"
          variants={stripVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ delay: 0.2 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${colorThemes[activeMember].glow}, transparent)`,
          }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`strip-3-${activeMember}`}
          className="glow-strip strip-3"
          variants={stripVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ delay: 0.4 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${colorThemes[activeMember].glow}, transparent)`,
          }}
        />
      </AnimatePresence>

      <div className="team-container">
        <div className="member-display">
          <AnimatePresence mode="wait">
            <motion.div
              className="member-image-container"
              key={`image-${activeMember}`}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div
                className="image-frame"
                style={{
                  borderColor: colorThemes[activeMember].accent,
                  boxShadow: `0 15px 35px ${colorThemes[activeMember].glow}40`,
                }}
              >
                <img
                  src={teamMembers[activeMember]?.image}
                  alt={`${teamMembers[activeMember]?.firstName} ${teamMembers[activeMember]?.lastName}`}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="member-details">
            <AnimatePresence mode="wait">
              <motion.div
                key={`name-${activeMember}`}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="member-name"
              >
                <motion.span
                  className="first-name"
                  style={{ color: colorThemes[activeMember].accent }}
                >
                  {teamMembers[activeMember]?.firstName}
                </motion.span>
                <motion.span className="last-name">
                  {teamMembers[activeMember]?.lastName}
                </motion.span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`role-${activeMember}`}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.1 }}
                className="member-role"
                style={{ color: colorThemes[activeMember].accent }}
              >
                {teamMembers[activeMember]?.role}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`education-${activeMember}`}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.2 }}
                className="member-education"
              >
                <div className="degree">{teamMembers[activeMember]?.degree}</div>
                <div
                  className="university"
                  style={{ color: colorThemes[activeMember].accent }}
                >
                  {teamMembers[activeMember]?.university}
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`bio-${activeMember}`}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.3 }}
                className="member-bio"
              >
                {teamMembers[activeMember]?.bio}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`skills-${activeMember}`}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.4 }}
                className="member-skills"
              >
                <div
                  className="skills-title"
                  style={{ color: colorThemes[activeMember].accent }}
                >
                  Skills:
                </div>
                <div className="skills-list">
                  {teamMembers[activeMember]?.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      className="skill-tag"
                      style={{ backgroundColor: colorThemes[activeMember].accent }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        transition: { delay: 0.5 + i * 0.1 } 
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="navigation-controls">
          <div className="member-count">
            <span className="current">{String(activeMember + 1).padStart(2, '0')}</span>
            <span className="total">/{String(teamMembers.length).padStart(2, '0')}</span>
          </div>

          <div className="nav-buttons">
            <button
              className="nav-button prev"
              onClick={handlePrev}
              style={{
                backgroundColor: colorThemes[activeMember].secondary,
                color: colorThemes[activeMember].accent,
              }}
              aria-label="Previous team member"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{
                  width: '100%',
                  transition: { duration: 6, ease: 'linear' },
                }}
                key={activeMember}
                style={{ backgroundColor: colorThemes[activeMember].accent }}
              />
            </div>

            <button
              className="nav-button next"
              onClick={handleNext}
              style={{
                backgroundColor: colorThemes[activeMember].secondary,
                color: colorThemes[activeMember].accent,
              }}
              aria-label="Next team member"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborators;