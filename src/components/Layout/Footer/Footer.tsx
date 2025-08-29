import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaFacebook, FaWhatsapp, FaChevronDown, FaLinkedin, FaInstagram } from "react-icons/fa";
import { websiteInfo } from '../../../data/website/info';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const controls = useAnimation();
  const footerRef = useRef<HTMLDivElement | null>(null);

  const colors = {
    primary: '#ED5565',
    facebookBlue: "blue",
    whatsappGreen: "#25D366",
    linkedinBlue: "blue",
    instagramPurple: "#E1306C",
  };

  const contacts = {
    phoneNumbers: [
      {
        id: 1,
        number: websiteInfo.contactnumber1,
        whatsappLink: "https://wa.me/923261079672?text=Hello%20AtlasNexusCorps%20AI%20Team",
        available: "9AM - 5PM PKT"
      },
      {
        id: 2,
        number: websiteInfo.contactnumber2,
        whatsappLink: "https://wa.me/923007693131?text=Hello%20AtlasNexusCorps%20AI%20Team",
        available: "24/7 Support"
      }
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const toggleDropdown = (dropdown: string | null) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const bubbles = Array.from({ length: 228 }).map((_, i) => {
    const size = 2 + Math.random() * 4;
    const distance = 6 + Math.random() * 4;
    const position = -5 + Math.random() * 110;
    const time = 2 + Math.random() * 2;
    const delay = -1 * (1 + Math.random() * 2);

    return (
      <div
        key={i}
        className={styles.bubble}
        style={{
          '--size': `${size}rem`,
          '--distance': `${distance}rem`,
          '--position': `${position}%`,
          '--time': `${time}s`,
          '--delay': `${delay}s`,
        } as React.CSSProperties}
      />
    );
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.footer} ref={footerRef}>
          <div className={styles.bubbles}>{bubbles}</div>
          <motion.div
            className={styles.content}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <div className={styles.footerGrid}>
              <motion.div className={styles.footerSection}>
                <div className={styles.brandContainer}>
                  <motion.div
                    className={styles.logoContainer}
                    style={{ transformStyle: "preserve-3d" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={websiteInfo.logo}
                      alt="website logo"
                      className={styles.logoImage}
                      style={{ backfaceVisibility: "visible" }}
                    />
                  </motion.div>
                  <motion.div whileHover={{ x: 3 }}>
                    <h2 className={styles.brandName}>
                      {websiteInfo.name}
                    </h2>
                    <p className={styles.brandSlogan}>
                      {websiteInfo.slogan}
                    </p>
                  </motion.div>
                </div>
                <motion.p className={styles.brandDescription} whileHover={{ x: 3 }}>
         
                  <div className={styles.socialIcons}>
                    <motion.a
                      href={websiteInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ backgroundColor: `${colors.linkedinBlue}20` }}
                      whileHover={{
                        y: -3,
                        backgroundColor: `${colors.linkedinBlue}50`,
                        scale: 1.2
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLinkedin size={46} color={colors.linkedinBlue} />
                    </motion.a>
                    <motion.a
                      href={websiteInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ backgroundColor: `${colors.instagramPurple}20` }}
                      whileHover={{
                        y: -3,
                        backgroundColor: `${colors.instagramPurple}50`,
                        scale: 1.2
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInstagram size={46} color={colors.instagramPurple} />
                    </motion.a>
                    <motion.a
                      href={websiteInfo.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ backgroundColor: `${colors.facebookBlue}20` }}
                      whileHover={{
                        y: -3,
                        backgroundColor: `${colors.facebookBlue}50`,
                        scale: 1.2
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaFacebook size={46} color={colors.facebookBlue} />
                    </motion.a>
                  </div>
                </motion.p>
              </motion.div>

              <motion.div className={styles.footerSection}>
                <h3 className={styles.sectionTitle}>{"Atlas Nexus Corps"}</h3>
                <ul className={styles.linkList}>
                  {[
                    { path: "/blog", label: "Blogs" },
                    { path: "/alumni", label: "Alumnis" },
                    { path: "/roadmap", label: "Roadmap" },
                    { path: "/faqs", label: "FAQs" },
                    { path: "/collaborators", label: "Collaborators" },
                    { path: "/pricing", label: "Pricing" },
           
           
                  ].map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        to={link.path}
                        className={styles.link}
                        onClick={handleLinkClick}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className={styles.footerSection}>
                <h3 className={styles.sectionTitle}>{"Offices"}</h3>
                <ul className={styles.linkList}>
                  {[
                    { path: "https://maps.app.goo.gl/MFmtm7gand9HKRfs9", label: "Taxila, Punjab, Pakistan" },
                    { path: "https://maps.app.goo.gl/eSX1yB1jPGjMsq8m7", label: "Soon Valley, Punjab, Pakistan" },
                  ].map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <a
                        href={link.path}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className={styles.footerSection}>
                <h3 className={styles.sectionTitle}>{"Contact Us"}</h3>
                <div className={styles.contactOptions}>
                  <div className={styles.dropdownContainer}>
                    <motion.button
                      className={`${styles.dropdownButton} ${activeDropdown === 'phone' ? styles.activeDropdown : ''}`}
                      onClick={() => toggleDropdown('phone')}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={styles.buttonContent}>
                        <div className={styles.buttonIcon} style={{ backgroundColor: colors.whatsappGreen }}>
                          <FaPhoneAlt size={16} color="white" />
                        </div>
                        <span className={styles.buttonText}>{"Call Us"}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: activeDropdown === 'phone' ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FaChevronDown size={16} className={styles.dropdownChevron} />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeDropdown === 'phone' && (
                        <motion.div
                          className={styles.dropdownContent}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={styles.dropdownItems}>
                            {contacts.phoneNumbers.map((contact) => (
                              <motion.a
                                key={contact.id}
                                href={contact.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.contactItem}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className={styles.contactIcon} style={{ backgroundColor: colors.whatsappGreen }}>
                                  <FaWhatsapp size={16} color="white" />
                                </div>
                                <div>
                                  <p className={styles.contactText}>{contact.number}</p>
                                  <p className={styles.contactSubtext}>{contact.available}</p>
                                </div>
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div className={styles.copyrightContainer}>
              <div className={styles.copyrightContent}>
                <motion.p
                  className={styles.copyrightText}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {`© ${new Date().getFullYear()} ${websiteInfo.name} All rights reserved.`}
                </motion.p>
                <div className={styles.legalLinks}>
                  {[
                    { path: "/privacy", label: "Privacy Policy" },
                    { path: "/terms", label: "Terms of Service" },
                    { path: "/cookie", label: "Cookie Policy" }
                  ].map((link, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        to={link.path}
                        className={styles.legalLink}
                        onClick={handleLinkClick}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <svg style={{ position: 'fixed', top: '100vh' }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default Footer;