import React, { useState, useEffect } from 'react';
import './PricingPage.scss';

interface PricingTier {
  id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

const Pricing: React.FC = () => {
  const [pricingData, setPricingData] = useState<PricingTier | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Simulate fetching data from a JSON file
    const fetchPricingData = async () => {
      try {
        // In a real application, this would be an API call or import
        const data: PricingTier = {
          id: "fullstack-monthly",
          title: "Full Stack Development Program",
          price: 199,
          duration: "6 months (monthly payment)",
          description: "Master full stack development with our comprehensive 6-month program. Pay monthly with no long-term commitment.",
          features: [
            "200+ hours of interactive coding sessions",
            "Real-world projects portfolio",
            "1:1 Mentorship sessions",
            "Code reviews from industry experts",
            "Career preparation & interview coaching",
            "Access to exclusive developer community",
            "Flexible learning schedule",
            "Certificate of completion"
          ],
          ctaText: "Enroll Now",
          popular: true
        };
        setPricingData(data);
      } catch (error) {
        console.error("Error loading pricing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingData();
  }, []);

  if (loading) {
    return (
      <div className="pricing-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="pricing-container">
      <div className="background-animation">
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
      </div>
      
      <div className="pricing-header">
        <h1>Full Stack Development Program</h1>
        <p>Transform your career in just 6 months with our comprehensive coding program</p>
      </div>

      {pricingData && (
        <div 
          className={`pricing-card ${pricingData.popular ? 'popular' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {pricingData.popular && <div className="popular-badge">MOST POPULAR</div>}
          
          <div className="price-section">
            <div className="price">${pricingData.price}<span>/month</span></div>
            <div className="duration">{pricingData.duration}</div>
          </div>
          
          <div className="features-list">
            <h3>What's Included:</h3>
            <ul>
              {pricingData.features.map((feature, index) => (
                <li key={index}>
                  <span className="checkmark">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <button className="cta-button">
            {pricingData.ctaText}
            <span className="button-glow"></span>
          </button>
          
          <div className="guarantee">
            <div className="guarantee-icon">🛡️</div>
            <p>7-day money-back guarantee · Cancel anytime</p>
          </div>

          {/* Animated Glow Elements */}
          <div className={`glow-effect ${isHovered ? 'active' : ''}`}></div>
          <div className="corner-glows">
            <div className="corner-glow top-left"></div>
            <div className="corner-glow top-right"></div>
            <div className="corner-glow bottom-left"></div>
            <div className="corner-glow bottom-right"></div>
          </div>
        </div>
      )}
      
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What if I miss a payment?</h3>
          <p>We provide a 7-day grace period for payments. If you're experiencing financial difficulties, contact our support team to discuss options.</p>
        </div>
        <div className="faq-item">
          <h3>Can I pay the full amount upfront?</h3>
          <p>Yes! Contact us for information about our discounted annual payment option.</p>
        </div>
        <div className="faq-item">
          <h3>What happens after 6 months?</h3>
          <p>You'll have lifetime access to course materials and can continue in our alumni community at no additional cost.</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;