import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Globe, Heart } from 'lucide-react';
import { colors } from '../../data/colors/theme';
import { websiteInfo } from '../../data/website/info';
import './About.scss';

interface AboutContent {
  title: string;
  subtitle: string;
  stats: { label: string; value: string }[];
  values: { title: string; description: string }[];
  valuesTitle: string;
  story: {
    title: string;
    paragraphs: string[];
  };
  mission: {
    title: string;
    description: string;
    slogan: string;
  };
}

const pageContent: AboutContent = {
  title: `About ${websiteInfo.name}`,
  subtitle: "Dedicated  educators offering transformative online courses in full-stack development to empower aspiring developers.",
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Collaborators", value: "10+" },
    { label: "Team Members", value: "10+" }
  ],
  valuesTitle: "Our Values",
  values: [
    {
      title: "Passion",
      description: "We are driven to create engaging, hands-on full-stack development courses that inspire students to excel."
    },
    {
      title: "Clarity",
      description: "We focus on clear, accessible teaching to make full-stack concepts understandable for beginners."
    },
    {
      title: "Support",
      description: "We provide personalized guidance to help every student succeed in their learning journey."
    }
    
  ],
  story: {
    title: "Our Journey",
    paragraphs: [
      "As Full Stack Developers, We launched this platform to share our expertise in full-stack development and help others break into tech.",
      "This is not our first time teaching and with 5+ years of experience and 50+ completed projects fuel my passion for creating practical, real-world-focused courses.",
      "Our goal is to build a supportive community where aspiring developers can learn, grow, and achieve their dreams in tech."
    ]
  },
  mission: {
    title: "Our Mission",
    description: "To empower aspiring developers with high-quality, practical online courses in full-stack development, fostering skills for success in the tech industry.",
    slogan: "Learn to Code, Build Your Future"
  }
};

const About: React.FC = () => {
  const icons = [Heart, Award, Users, Globe];

  return (
    <div className="about-container" style={{ backgroundColor: colors.backgroundLight }}>
      <div className="content-wrapper">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hero-section"
        >
          <h1 style={{ color: colors.textPrimary }}>{websiteInfo.name}</h1>
          <p style={{ color: colors.textSecondary }}>{pageContent.subtitle}</p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="stats-section"
        >
          <div className="stats-grid">
            {pageContent.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="stat-item"
              >
                <div className="stat-value" style={{ color: colors.primaryColor1 }}>{stat.value}</div>
                <div className="stat-label" style={{ color: colors.textSecondary }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story Section */}
        <div className="story-mission-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="story-section"
          >
            <h2 style={{ color: colors.textPrimary }}>{pageContent.story.title}</h2>
            <div className="story-paragraphs" style={{ color: colors.textSecondary }}>
              {pageContent.story.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="story-paragraph"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mission-section"
          >
            <h3 style={{ color: colors.textPrimary }}>{pageContent.mission.title}</h3>
            <p className="mission-description" style={{ color: colors.textSecondary }}>
              {pageContent.mission.description}
            </p>
            <div className="mission-slogan" style={{ borderColor: colors.primaryColor1 }}>
              <p style={{ color: colors.textPrimary }}>"{pageContent.mission.slogan}"</p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="values-section"
        >
          <h2 style={{ color: colors.textPrimary }}>{pageContent.valuesTitle}</h2>
          <div className="values-grid">
            {pageContent.values.map((value, index) => {
              const IconComponent = icons[index % icons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="value-card"
                >
                  <div className="value-icon" style={{ backgroundColor: colors.primaryColor1 }}>
                    <IconComponent className="icon" size={24} />
                  </div>
                  <h4 className="value-title" style={{ color: colors.textPrimary }}>{value.title}</h4>
                  <p className="value-description" style={{ color: colors.textSecondary }}>
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;