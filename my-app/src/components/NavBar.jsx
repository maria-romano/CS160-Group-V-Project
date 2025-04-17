// src/components/NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'; // Import the CSS

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><NavLink to="/dashboard">DASHBOARD</NavLink></li>
        <li><NavLink to="/profile">PROFILE</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
