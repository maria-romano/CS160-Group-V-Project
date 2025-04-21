import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp({ onSignUp }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.orgName.trim()) {
      newErrors.orgName = 'Organization name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Call the onSignUp function passed from App.jsx
      onSignUp();
      
      // Navigate to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className="signup-container">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <div className="logo">C</div>
          <span className="logo-text">Donor Loop</span>
        </Link>
      </div>
      
      <div className="signup-form-container">
        <div className="signup-card">
          <h2>Create a New Account</h2>
          <p className="signup-subtitle">Come join our community! Let's set up your account.</p>
          
          <div className="already-have-account">
            Already have one? <Link to="/signin" className="signin-link">Sign in here</Link>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="orgName">Organization Name</label>
              <input
                type="text"
                id="orgName"
                name="orgName"
                placeholder="NGO name"
                value={formData.orgName}
                onChange={handleChange}
                className={errors.orgName ? 'input-error' : ''}
              />
              {errors.orgName && <span className="error-message">{errors.orgName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="organization email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="enter passkey"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="re-enter passkey"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className={errors.agreeTerms ? 'checkbox-error' : ''}
              />
              <label htmlFor="agreeTerms" className="checkbox-label">
                I accept the terms
              </label>
              {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
            </div>
            
            <div className="terms-link">
              <Link to="/terms">Read our Terms and Conditions</Link>
            </div>
            
            <button type="submit" className="join-button">Join</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;