import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QuestionContext } from '../Context';
import logo1 from '../Images/logo1.png';
import './Home.css';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const {
    message1, // USD
    message2, // EUR
    message3, // XAF
    message4, // CNY
  } = useContext(QuestionContext);

  const features = [
    {
      icon: '💱',
      title: 'Currency Exchange',
      description: 'Exchange between USD, EUR, XAF, and CNY with real-time rates'
    },
    {
      icon: '🛍️',
      title: 'Digital Shopping',
      description: 'Purchase items using your digital wallet balance'
    },
    {
      icon: '👛',
      title: 'Digital Wallet',
      description: 'Manage multiple currencies in one secure wallet'
    },
    {
      icon: '📊',
      title: 'Live Tracking',
      description: 'Monitor your balances and transactions in real-time'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const totalBalance = message1 + message2 + message3 + message4;

  return (
    <div className="home">
      <div className="floating-elements">
        <div className="floating-coin coin-1">💰</div>
        <div className="floating-coin coin-2">💵</div>
        <div className="floating-coin coin-3">💶</div>
        <div className="floating-coin coin-4">💴</div>
      </div>

      <div className={`home__container ${isVisible ? 'visible' : ''}`}>
        <div className="home__hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="brand-highlight">PlusMinus</span>
            </h1>
            <p className="hero-subtitle">
              Your ultimate digital currency exchange and shopping platform
            </p>

            <div className="hero-logo">
              <img src={logo1} alt="PlusMinus Logo" className="logo-image" />
              <div className="logo-glow"></div>
            </div>

            <div className="wallet-preview">
              <div className="wallet-card">
                <h3>💼 Your Wallet</h3>
                <div className="balance-grid">
                  <div className="balance-item">
                    <span className="currency-flag">🇺🇸</span>
                    <span className="amount">${message1.toFixed(2)}</span>
                  </div>
                  <div className="balance-item">
                    <span className="currency-flag">🇪🇺</span>
                    <span className="amount">€{message2.toFixed(2)}</span>
                  </div>
                  <div className="balance-item">
                    <span className="currency-flag">🇨🇲</span>
                    <span className="amount">{message3.toFixed(2)} XAF</span>
                  </div>
                  <div className="balance-item">
                    <span className="currency-flag">🇨🇳</span>
                    <span className="amount">¥{message4.toFixed(2)}</span>
                  </div>
                </div>
                <div className="total-balance">
                  <span>Total Value: ${totalBalance.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="cta-buttons">
              <Link to="/exchange" className="btn btn-primary cta-primary">
                <span>🚀</span>
                Start Trading
              </Link>
              <Link to="/shop" className="btn btn-secondary cta-secondary">
                <span>🛍️</span>
                Browse Shop
              </Link>
            </div>
          </div>
        </div>

        <div className="home__features">
          <h2 className="features-title">Why Choose PlusMinus?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${index === currentFeature ? 'active' : ''}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="home__stats">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">4</div>
              <div className="stat-label">Currencies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Secure</div>
              <div className="stat-label">Transactions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
