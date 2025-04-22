import React, { useState } from "react";
import { Menu, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfileSetup.css";

export default function ProfileSetup({ onComplete }) {
  const navigate = useNavigate();
  const [selectedCauses, setSelectedCauses] = useState(["Animals"]);

  const toggleCause = (cause) => {
    if (selectedCauses.includes(cause)) {
      setSelectedCauses(selectedCauses.filter((item) => item !== cause));
    } else {
      setSelectedCauses([...selectedCauses, cause]);
    }
  };

  const causes = [
    "Animals",
    "Churches",
    "Islamic",
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
  ];

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <div className="profile-logo">
          <div className="logo-icon">D</div>
          <span className="logo-text">Donor Loop</span>
        </div>
        <button className="menu-button">
          <Menu size={24} />
        </button>
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
          <div className="upload-circle">
            <Upload className="upload-icon" size={32} />
          </div>
          <span className="upload-text">Upload or Drag Image</span>
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
            />
          </div>

          <div>
            <label className="form-label">
              Where do you want to direct your funds?
            </label>
            <textarea
              className="form-textarea"
              placeholder="Minimum 100 words"
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
          <button
            className="next-button"
            onClick={() => {
              // Call the onComplete callback if provided
              if (onComplete) {
                onComplete();
              }
              // Navigate to dashboard
              navigate("/dashboard");
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
