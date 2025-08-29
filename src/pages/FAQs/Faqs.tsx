import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './faq.scss';
import faqsData from './faqs.json';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQs: React.FC = () => {
  const [activeQuestions, setActiveQuestions] = useState<{ [key: string]: number | null }>({
    general: null,
    frontend: null,
    backend: null,
  });

  const toggleQuestion = (category: string, id: number) => {
    setActiveQuestions((prev) => ({
      ...prev,
      [category]: prev[category] === id ? null : id,
    }));
  };

  return (
    <div className="faqPage">
      <div className="particles">
        {Array.from({ length: 40 }).map((_, index) => (
          <div
            key={index}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="header">
        <h1>Frequently Asked Questions</h1>
        <p>Click the plus icon to reveal answers to common questions about our coding programs.</p>
      </div>

      <div className="faqSections">
        {faqsData.map((section) => (
          <section key={section.category} className="faqSection">
            <h2 className="sectionTitle">{section.title}</h2>
            <div className="faqList">
              {section.faqs.map((faq) => (
                <div key={faq.id} className="faqRow">
                  <div
                    className="faqQuestion"
                    onClick={() => toggleQuestion(section.category, faq.id)}
                  >
                    <span>{faq.question}</span>
                    {activeQuestions[section.category] === faq.id ? (
                      <FaMinus className="icon" />
                    ) : (
                      <FaPlus className="icon" />
                    )}
                  </div>
                  <div
                    className={`faqAnswer ${activeQuestions[section.category] === faq.id ? 'active' : ''}`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="contactCta">
        <h3>Still have questions?</h3>
        <p>Reach out to our support team for personalized assistance.</p>
        <Link className="button" to="/contactus">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default FAQs;