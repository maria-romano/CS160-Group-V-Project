import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-container">
          <img src="/Logo.png" alt="Donor Loop Logo" className="logo-image" />
          <h1 className="logo-text">Donor Loop</h1>
        </div>
        <div className="menu-icon">
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
        </div>
      </header>

      <main className="home-content">
        <h1 className="headline">
          Stay Connected. Stay Engaged.
          <br />
          Keep the Giving Going.
        </h1>
        
        <p className="subheadline">
          The all-in-one platform for NGOs to connect with donors, share real-time
          updates, and maximize fundraising impact.
        </p>
        
        <div className="cta-buttons">
          <Link to="/signup" className="cta-button primary">
            Get Started
          </Link>
          <a to="/signup" className="cta-button secondary">
            Sign in
          </a>
        </div>
      </main>
    </div>
  );
}

export default HomePage;