import React, { useState } from "react";
import { Menu, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfileSetup.css";
import NavBar from "./NavBar";

export default function ProfileSetup({ onComplete }) {
  const navigate = useNavigate();
  const [selectedCauses, setSelectedCauses] = useState(["Animals"]);
  const [profileImage, setProfileImage] = useState(null);
  const [mission, setMission] = useState("");
  const [fundDirection, setFundDirection] = useState("");

  const toggleCause = (cause) => {
    if (selectedCauses.includes(cause)) {
      setSelectedCauses(selectedCauses.filter((item) => item !== cause));
    } else {
      setSelectedCauses([...selectedCauses, cause]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        // Save to localStorage for use in other components
        localStorage.setItem("profileImage", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Save profile data to localStorage
      localStorage.setItem("orgMission", mission);
      localStorage.setItem("fundDirection", fundDirection);
      localStorage.setItem("selectedCauses", JSON.stringify(selectedCauses));

      if (onComplete) {
        onComplete();
      } else {
        navigate("/form990-upload");
      }
    }
  };

  const validateForm = () => {
    // Add your form validation logic here
    // For now, we'll assume the form is always valid
    return true;
  };

  const causes = [
    "Animals",
    "Churches",
    "Journalism",
    "Disaster Relief",
    "Arts",
    "Education",
    "Political",
    "Jewish",
    "Medical",
    "Environment",
    "Music",
    "LGBTQIA",
    "Human Rights",
    "Microfinance",
    "Elderly Support",
    "Youth Empowerment",
    "Housing & Homelessness",
    "Food Security",
    "Water & Sanitation",
    "Legal Aid",
    "Disability Services",
    "Indigenous Rights",
  ];

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="home-header">
        <div className="logo-container">
          <img src="/Logo.png" alt="Donor Loop Logo" className="logo-image" />
          <h1 className="logo-text">Donor Loop</h1>
        </div>
      </header>

      {/* Content */}
      <div className="profile-container">
        <h1 className="profile-title">Profile Set-up</h1>
        <p className="profile-subtitle">
          We want to learn more about your organization and your goals. The
          responses below will be used to educate your donors about your
          organization.
        </p>

        {/* Image Upload */}
        <div className="image-upload">
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <label htmlFor="profile-image" className="upload-label">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-preview"
              />
            ) : (
              <div className="upload-circle">
                <Upload className="upload-icon" size={32} />
              </div>
            )}
            <span className="upload-text">
              {profileImage ? "Change Image" : "Upload or Drag Image"}
            </span>
          </label>
        </div>

        {/* Textareas */}
        <div className="form-fields">
          <div>
            <label className="form-label">
              Tell us about your organization's mission
            </label>
            <textarea
              className="form-textarea"
              placeholder="Minimum 150 words"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">
              Where do you want to direct your funds?
            </label>
            <textarea
              className="form-textarea"
              placeholder="Minimum 100 words"
              value={fundDirection}
              onChange={(e) => setFundDirection(e.target.value)}
            />
          </div>

          {/* Cause Buttons */}
          <div>
            <label className="form-label">
              What causes does your organization primarily support?{" "}
              <span className="italic">(Select all that apply)</span>
            </label>
            <div className="cause-group">
              {causes.map((cause) => (
                <button
                  key={cause}
                  onClick={() => toggleCause(cause)}
                  className={`cause-button ${
                    selectedCauses.includes(cause) ? "active" : ""
                  }`}
                >
                  {selectedCauses.includes(cause) && (
                    <span className="checkmark">✓</span>
                  )}
                  {cause}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="next-button-container">
          <button className="next-button" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
