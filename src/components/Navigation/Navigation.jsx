import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QuestionContext } from '../../Context';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    message1, // USD
    message2, // EUR
    message3, // XAF
    message4, // CNY
  } = useContext(QuestionContext);

  const totalBalance = message1 + message2 + message3 + message4;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <div className="brand-icon">💰</div>
            <span className="brand-text">PlusMinus</span>
          </Link>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link
            to="/exchange"
            className={`nav-link ${location.pathname === '/exchange' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">💱</span>
            Exchange
          </Link>
          <Link
            to="/shop"
            className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">🛍️</span>
            Shop
          </Link>
        </div>

        <div className="nav-wallet">
          <div className="wallet-info">
            <span className="wallet-icon">👛</span>
            <span className="wallet-total">
              $
              {totalBalance.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="nav-hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
