import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../Images/logo1.png';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home__main">
        <h1>
          <i>Welcome to your currency Exchange App </i>
        </h1>
        <img src={logo1} alt="money" className="logo" />
        <h2>click on the button below to get started</h2>
        <button type="button">
          <Link to="/exchange" className="home__link">
            Get Started
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
