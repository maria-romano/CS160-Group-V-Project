import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ posts }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>👤 Profile Page</h1>
      <button onClick={() => navigate('/create-post')}>New Post</button>

      <h2>Your Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post, index) => (
          <div key={index} style={{ background: '#333', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
            <h3 style={post.titleStyles}>{post.title}</h3>
            <p style={post.descriptionStyles}>{post.description}</p>
            {post.media && post.media.type.startsWith('image/') && (
              <img 
                src={URL.createObjectURL(post.media)} 
                alt="Post media" 
                style={{ maxWidth: '100%', marginTop: '1rem', borderRadius: '0.5rem' }} 
              />
            )}
            {post.media && post.media.type.startsWith('video/') && (
              <video 
                controls 
                src={URL.createObjectURL(post.media)} 
                style={{ maxWidth: '100%', marginTop: '1rem', borderRadius: '0.5rem' }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;