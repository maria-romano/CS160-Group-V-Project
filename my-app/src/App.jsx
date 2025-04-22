// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import SignUp from "./components/SignUp";
import ProfileSetup from "./components/ProfileSetup";

import "./App.css";
function App() {
  //checking authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Track if user is in profile setup flow
  const [isNewSignup, setIsNewSignup] = useState(false);

  // handles login and signups
  const handleAuth = () => {
    setIsAuthenticated(true);
    setIsNewSignup(true); // Mark as new signup to allow profile setup flow
  };

  return (
    <Router>
      {/* Only show NavBar when authenticated */}
      {isAuthenticated && <NavBar />}

      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/signup"} />}
        />
        <Route
          path="/signup"
          element={
            isAuthenticated && !isNewSignup ? (
              <Navigate to="/dashboard" />
            ) : (
              <SignUp onSignUp={handleAuth} />
            )
          }
        />
        {/* <Route path="/signup" element={<SignUp onSignUp={() => setIsAuthenticated(true)} />} /> */}

        {/* <Route
          path="/profile-setup"
          element={
            isAuthenticated ? <ProfileSetup /> : <Navigate to="/signup" />
          }
        /> */}

        <Route
          path="/profile-setup"
          element={<ProfileSetup onComplete={() => setIsNewSignup(false)} />}
        />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/signup" />}
        />
        <Route
          path="/create-post"
          element={isAuthenticated ? <CreatePost /> : <Navigate to="/signup" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
