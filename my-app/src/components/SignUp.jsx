import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp({ onSignUp }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.orgName.trim()) {
      newErrors.orgName = "Organization name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      localStorage.setItem("orgName", formData.orgName);
  
      if (onSignUp) {
        onSignUp();
      }
  
      navigate("/profile-setup");
    }
  };

  return (
    <div className="signup-fullscreen">
      <div className="signup-content">
        <div className="logo-container">
          <img src="/Logo.png" alt="Donor Loop" className="logo-image" />
          <h1 className="logo-text">Donor Loop</h1>
        </div>

        <div className="form-container">
          <h2>Create a New Account</h2>
          <p className="subtitle">
            Come join our community! Let's set up your account.
          </p>

          <div className="signin-link">
            Already have one?{" "}
            <a to="/signin" className="accent-link">
              Sign in here
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Organization Name</label>
              <input
                type="text"
                name="orgName"
                placeholder="NGO name"
                value={formData.orgName}
                onChange={handleChange}
                className={errors.orgName ? "input-error" : ""}
              />
              {errors.orgName && (
                <span className="error-message">{errors.orgName}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="organization email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="enter passkey"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="re-enter passkey"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className={errors.agreeTerms ? "checkbox-error" : ""}
              />
              <label htmlFor="agreeTerms">I accept the terms</label>
              {errors.agreeTerms && (
                <span className="error-message">{errors.agreeTerms}</span>
              )}
            </div>

            <div className="terms-link">
              <a to="/terms" className="accent-link">
                Read our Terms and Conditions
              </a>
            </div>

            <button type="submit" className="join-button">
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
