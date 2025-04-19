import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>👤 Profile Page</h1>
      <p>This is the profile section.</p>
      <button onClick={() => navigate('/create-post')}>New Post</button>
    </div>
  );
}

export default Profile;
