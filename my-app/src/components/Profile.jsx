import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile({ posts }) {
  const [profileImage, setProfileImage] = useState(null);
  const [orgName, setOrgName] = useState("");
  const [orgMission, setOrgMission] = useState("");
  const [fundDirection, setFundDirection] = useState("");
  const [selectedCauses, setSelectedCauses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProfileImage(localStorage.getItem("profileImage"));
    setOrgName(localStorage.getItem("orgName") || "");
    setOrgMission(localStorage.getItem("orgMission") || "");
    setFundDirection(localStorage.getItem("fundDirection") || "");
    const causes = localStorage.getItem("selectedCauses");
    setSelectedCauses(causes ? JSON.parse(causes) : []);
  }, []);

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h1>{orgName || "Profile"}</h1>
        <img
          src={profileImage || "/pfp.jpg"}
          alt="Profile"
          className="profile-avatar"
        />
      </div>

      <div className="profile-section">
        <p><strong>Bio:</strong> {orgMission}</p>
        <p><strong>Where do you want to direct your funds?</strong> {fundDirection}</p>
        <div>
          <strong>Selected Causes:</strong>
          <ul className="causes-list">
            {selectedCauses.map((cause, index) => (
              <li key={index}>{cause}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2>Your Posts</h2>
      <div className="posts-container">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post, index) => (
            <div className="post-card" key={index}>
              {post.media && post.media.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(post.media)}
                  alt="Post media"
                  className="post-media"
                />
              )}

              <div className="post-content">
                <h3
                  className="post-title"
                  style={{ color: "black", ...post.titleStyles }}
                >
                  {post.title}
                </h3>
              </div>

              <div className="post-stats">
                <div>
                  <strong>Impressions:</strong> <span>0</span>
                </div>
                <div>
                  <strong>Engagements:</strong> <span>0</span>
                </div>
                <div>
                  <strong>Profile Visits:</strong> <span>0</span>
                </div>
                <div>
                  <strong>Shares:</strong> <span>0</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="create-post-button" onClick={handleCreatePost}>
        Create Post
      </button>
      
    </div>
  );
}

export default Profile;
