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
import Dashboard2 from "./components/Dashboard2";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import SignUp from "./components/SignUp";
import ProfileSetup from "./components/ProfileSetup";
import HomePage from "./components/HomePage"; // Add this import

import "./App.css";
function App() {
  //checking authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Track if user is in profile setup flow
  const [isNewSignup, setIsNewSignup] = useState(false);

  const [posts, setPosts] = useState([]); 

  //Store dashboard so it doesnt delete everytime i go through states
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [timeGranularity, setTimeGranularity] = useState('monthly');


  // handles login and signups
  const handleAuth = () => {
    setIsAuthenticated(true);
    setIsNewSignup(true); // Mark as new signup to allow profile setup flow
  };

  // handles post saving
  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  return (
    <Router>
      {/* Only show NavBar when authenticated */}
      {isAuthenticated && <NavBar />}

      <Routes>
        {/* Add HomePage route */}
        <Route path="/" element={<HomePage />} />

        {/* Modified original root route to "/home" as a fallback */}
        <Route
          path="/home"
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

        {/* <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />}
        /> */}
        
        <Route
          path="/dashboard"
          element={isAuthenticated ? (
            <Dashboard2
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              timeGranularity={timeGranularity}
              setTimeGranularity={setTimeGranularity}
            />
          ) : (
            <Navigate to="/signup" />
          )}
        />

        <Route
          path="/profile"
          element={isAuthenticated ? <Profile posts={posts} /> : <Navigate to="/signup" />}
        />
        <Route
          path="/create-post"
          element={isAuthenticated ? <CreatePost addPost={addPost} /> : <Navigate to="/signup" />}
        />
      </Routes>
    </Router>
  );
}

export default App;