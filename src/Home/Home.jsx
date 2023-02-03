import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home__main">
        <h1>
          <i>Welcome to your currency Exchange App </i>
        </h1>
        <i className="fa-solid fa-wallet" />
        <h2>click on the below to get started</h2>
        <button type="button">
          <Link to="/exchange">Get Started</Link>{' '}
        </button>
      </div>
    </div>
  );
}

export default Home;
