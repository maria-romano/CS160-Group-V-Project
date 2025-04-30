import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

export default function CreatePost({ addPost }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);
  const [titleStyles, setTitleStyles] = useState({});
  const [descriptionStyles, setDescriptionStyles] = useState({});
  const navigate = useNavigate();

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const handleNextClick = () => {
    if (step === 2 && !media) {
      alert("Please add an image or video before proceeding.");
      return;
    }
    next();
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        {step === 1 && (
          <>
            <h2 className="create-post-title">Create Post</h2>
            <p className="create-post-subtitle">Share your story and inspire donations.</p>

            <label>Title</label>
            <input 
              type="text"
              className="create-post-input"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Give your post a title!" 
            />

            <label>Description</label>
            <textarea 
              className="create-post-textarea"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Tell us about your post!" 
            />

            <div className="create-post-buttons">
              <button className="create-post-button" onClick={next}>Next</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="create-post-title">Add a photo or video</h2>
            <div className={`upload-box ${media ? 'has-media' : ''}`}>
              {media ? (
                <>
                  {media.type.startsWith('image/') && (
                    <img 
                      src={URL.createObjectURL(media)} 
                      alt="Media Preview" 
                      className="media-preview"
                    />
                  )}
                  {media.type.startsWith('video/') && (
                    <video 
                      controls
                      src={URL.createObjectURL(media)} 
                      className="media-preview"
                    />
                  )}
                  <p style={{ marginTop: '1rem' }}>{media.name}</p>
                  <button 
                    className="reupload-button" 
                    onClick={() => setMedia(null)}
                    style={{ marginTop: '1rem' }}
                  >
                    Change Media
                  </button>
                </>
              ) : (
                <>
                  <p>Upload or Drag Image</p>
                  <input 
                    type="file"
                    accept="image/*,video/*" 
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                </>
              )}
            </div>

            <div className="create-post-buttons">
              <button className="create-post-button" onClick={prev}>Back</button>
              <button className="create-post-button" onClick={handleNextClick}>Next</button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="customize-step">
            <div className="customize-field">
              <div className="customize-left">
                <div className="label-row">
                  <label className="section-label">Title</label>
                  <button className="edit-btn" onClick={() => setStep(1)}>Edit</button>
                </div>
                <p className="custom-text" style={{ ...titleStyles }}>{title || 'New Post'}</p>
              </div>
          
              <div className="customize-right">
                <h4>Fonts</h4>
                <select onChange={(e) => setTitleStyles(prev => ({ ...prev, fontFamily: e.target.value }))}>
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
                <input
                  type="color"
                  onChange={(e) => setTitleStyles(prev => ({ ...prev, color: e.target.value }))}
                />
                <input
                  type="number"
                  placeholder="Font size"
                  onChange={(e) => setTitleStyles(prev => ({ ...prev, fontSize: `${e.target.value}px` }))}
                />
                <div className="style-buttons">
                  <button
                    className={`bold-btn ${titleStyles.fontWeight === 'bold' ? 'active' : ''}`}
                    onClick={() => setTitleStyles(prev => ({
                      ...prev,
                      fontWeight: prev.fontWeight === 'bold' ? 'normal' : 'bold'
                    }))}
                  >
                    B
                  </button>
                  <button
                    className={`italic-btn ${titleStyles.fontStyle === 'italic' ? 'active' : ''}`}
                    onClick={() => setTitleStyles(prev => ({
                      ...prev,
                      fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic'
                    }))}
                  >
                    I
                  </button>
                </div>
              </div>
            </div>
          
            <div className="customize-field">
              <div className="customize-left">
                <div className="label-row">
                  <label className="section-label">Your Description</label>
                  <button className="edit-btn" onClick={() => setStep(1)}>Edit</button>
                </div>
                <p className="custom-text" style={{ ...descriptionStyles }}>{description || 'No description provided.'}</p>
              </div>
          
              <div className="customize-right">
                <h4>Fonts</h4>
                <select onChange={(e) => setDescriptionStyles(prev => ({ ...prev, fontFamily: e.target.value }))}>
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
                <input
                  type="color"
                  onChange={(e) => setDescriptionStyles(prev => ({ ...prev, color: e.target.value }))}
                />
                <input
                  type="number"
                  placeholder="Font size"
                  onChange={(e) => setDescriptionStyles(prev => ({ ...prev, fontSize: `${e.target.value}px` }))}
                />
                <div className="style-buttons">
                  <button
                    className={`bold-btn ${descriptionStyles.fontWeight === 'bold' ? 'active' : ''}`}
                    onClick={() => setDescriptionStyles(prev => ({
                      ...prev,
                      fontWeight: prev.fontWeight === 'bold' ? 'normal' : 'bold'
                    }))}
                  >
                    B
                  </button>
                  <button
                    className={`italic-btn ${descriptionStyles.fontStyle === 'italic' ? 'active' : ''}`}
                    onClick={() => setDescriptionStyles(prev => ({
                      ...prev,
                      fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic'
                    }))}
                  >
                    I
                  </button>
                </div>
              </div>
            </div>
          
            <div className="customize-field">
              <div className="customize-left">
                <label className="section-label">Your Media</label>
                {media && media.type.startsWith('image/') && (
                  <img src={URL.createObjectURL(media)} alt="Preview" className="media-preview" />
                )}
                {media && media.type.startsWith('video/') && (
                  <video controls src={URL.createObjectURL(media)} className="media-preview" />
                )}
                <button className="edit-btn" onClick={() => setStep(2)}>Edit</button>
              </div>
            </div>
          
            <div className="create-post-buttons">
              <button className="create-post-button" onClick={prev}>Back</button>
              <button className="create-post-button" onClick={next}>Next</button>
            </div>
          </div>
        )}


        {step === 4 && (
          <>
            <h2 className="create-post-title">Review & Post</h2>
            <div className="review-box">
              <h3 style={{ color: 'black', ...titleStyles }}>{title || 'New Post'}</h3>
              <p style={{ color: 'black', ...descriptionStyles }}>
                {description || 'No description provided.'}
              </p>
              {media && media.type.startsWith('image/') && (
                <img src={URL.createObjectURL(media)} alt="Preview" style={{ maxWidth: '100%' }} />
              )}
              {media && media.type.startsWith('video/') && (
                <video controls src={URL.createObjectURL(media)} style={{ maxWidth: '100%' }} />
              )}
            </div>
            <div className="create-post-buttons">
              <button className="create-post-button" onClick={prev}>Back</button>
              <button
                className="create-post-button"
                onClick={() => {
                  addPost({ title, description, media, titleStyles, descriptionStyles });
                  navigate('/profile');
                }}
              >
                Post
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
