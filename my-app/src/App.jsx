// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import SignUp from './components/SignUp';
import './App.css';
function App() {
  //checking authetnication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // handles login and signups 
  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {/* Only show NavBar when authenticated */}
      {isAuthenticated && <NavBar />}
      
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signup"} />} />
        <Route path="/signup" element={
          isAuthenticated 
            ? <Navigate to="/dashboard" /> 
            : <SignUp onSignUp={handleAuth} />
        } />

        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />} />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/signup" />} />
        <Route 
          path="/create-post" 
          element={isAuthenticated ? <CreatePost /> : <Navigate to="/signup" />}  />
      </Routes>
    </Router>
  );
}

export default App;

