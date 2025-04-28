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
            {/* <div className="formatting-buttons">
              <button><b>B</b></button>
              <button><i>I</i></button>
              <button><u>U</u></button>
            </div> */}

            <label>Description</label>
            <textarea 
              className="create-post-textarea"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Tell us about your post!" 
            />
            {/* <div className="formatting-buttons">
              <button><b>B</b></button>
              <button><i>I</i></button>
              <button><u>U</u></button>
            </div> */}

            <div className="create-post-buttons">
              <button className="create-post-button" onClick={next}>Next</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="create-post-title">Add a photo or video</h2>
            <div className="upload-box">
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
              <button className="create-post-button" onClick={next} disabled={!media}>Next</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="create-post-title">Customize Your Message</h2>

            <h4 className="customize-section-header">Title</h4>
            <div className="customize-controls">
              <select onChange={(e) => setTitleStyles({ ...titleStyles, fontFamily: e.target.value })}>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
              <input 
                type="color"
                onChange={(e) => setTitleStyles({ ...titleStyles, color: e.target.value })}
              />
              <input 
                type="number"
                placeholder="Font Size"
                onChange={(e) => setTitleStyles({ ...titleStyles, fontSize: e.target.value + 'px' })}
              />
              {/* <button className="edit-button" onClick={() => setTitleStyles({ ...titleStyles, fontWeight: 'bold' })}><b>B</b></button>
              <button className="edit-button" onClick={() => setTitleStyles({ ...titleStyles, fontStyle: 'italic' })}><i>I</i></button> */}
            </div>

            <h4 className="customize-section-header">Description</h4>
            <div className="customize-controls">
              <select onChange={(e) => setDescriptionStyles({ ...descriptionStyles, fontFamily: e.target.value })}>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
              <input 
                type="color"
                onChange={(e) => setDescriptionStyles({ ...descriptionStyles, color: e.target.value })}
              />
              <input 
                type="number"
                placeholder="Font Size"
                onChange={(e) => setDescriptionStyles({ ...descriptionStyles, fontSize: e.target.value + 'px' })}
              />
              {/* <button className="edit-button" onClick={() => setDescriptionStyles({ ...descriptionStyles, fontWeight: 'bold' })}><b>B</b></button>
              <button className="edit-button" onClick={() => setDescriptionStyles({ ...descriptionStyles, fontStyle: 'italic' })}><i>I</i></button> */}
            </div>

            <div className="create-post-buttons">
              <button className="create-post-button" onClick={prev}>Back</button>
              <button className="create-post-button" onClick={next}>Next</button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="create-post-title">Review & Post</h2>
            <div className="review-box">
              <h3 style={titleStyles}>{title || 'New Post'}</h3>
              <p style={descriptionStyles}>{description || 'No description provided.'}</p>
              {media && media.type.startsWith('image/') && (
                <img src={URL.createObjectURL(media)} alt="Preview" style={{ maxWidth: '100%' }} />
              )}
              {media && media.type.startsWith('video/') && (
                <video controls src={URL.createObjectURL(media)} style={{ maxWidth: '100%' }} />
              )}
            </div>
            <div className="create-post-buttons">
              <button
                className="create-post-button"
                onClick={() => {
                  addPost({ title, description, media, titleStyles, descriptionStyles });
                  navigate('/profile');
                }}
              >
                Post
              </button>
              <button className="create-post-button" onClick={prev}>Back</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
