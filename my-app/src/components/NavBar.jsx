// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import the CSS

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/Logo.png" alt="Donor Loop" className="logo-image" />
        <span className="logo-text">Donor Loop</span>
      </div>
      {/* <div className="navbar-links">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </div>
      <div className="navbar-profile">
        <Link to="/profile" className="profile-icon">
          <div className="avatar-placeholder">P</div>
        </Link>
      </div> */}
    </nav>
  );
}

export default NavBar;
