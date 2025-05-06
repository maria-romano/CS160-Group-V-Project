import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile({ posts }) {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h1>Your Posts</h1>
        <img
          src={profileImage || "/pfp.jpg"}
          alt="Profile"
          className="profile-avatar"
        />
      </div>

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

      <button
        className="create-post-button"
        onClick={() => navigate("/create-post")}
      >
        Create Post
      </button>
    </div>
  );
}

export default Profile;
