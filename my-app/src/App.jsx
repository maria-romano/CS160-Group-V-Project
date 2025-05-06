import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard2 from "./components/Dashboard2";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import SignUp from "./components/SignUp";
import ProfileSetup from "./components/ProfileSetup";
import HomePage from "./components/HomePage";
import Form990Upload from "./components/Form990Upload";

import "./App.css";

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewSignup, setIsNewSignup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [timeGranularity, setTimeGranularity] = useState("monthly");
  const [form990Data, setForm990Data] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("form990StructuredData");
    if (storedData) {
      try {
        setForm990Data(JSON.parse(storedData));
      } catch (err) {
        console.error("Error parsing stored form990Data:", err);
      }
    }
  }, []);

  const handleAuth = () => {
    setIsAuthenticated(true);
    setIsNewSignup(true);
  };

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const handleForm990Upload = (data) => {
    setForm990Data(data);
    setIsNewSignup(false);
  };

  const hideNavBarRoutes = ["/profile-setup", "/form990-upload"];
  const showNavBar = isAuthenticated && !hideNavBarRoutes.includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />

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

        <Route
          path="/profile-setup"
          element={<ProfileSetup onComplete={() => navigate("/form990-upload")} />}
        />

        <Route
          path="/form990-upload"
          element={
            <Form990Upload
              onComplete={(data) => {
                setForm990Data(data);
                navigate("/dashboard");
              }}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard2
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                timeGranularity={timeGranularity}
                setTimeGranularity={setTimeGranularity}
                form990Data={form990Data}
              />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile posts={posts} />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />

        <Route
          path="/create-post"
          element={
            isAuthenticated ? (
              <CreatePost addPost={addPost} />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
