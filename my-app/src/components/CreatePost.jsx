import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);
  const [customStyles, setCustomStyles] = useState({});
  const navigate = useNavigate();

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      {step === 1 && (
        <div>
          <h2>📝 Title & Description</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <br />
          <button onClick={next}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>📷 Add Media</h2>
          <input type="file" accept="image/*,video/*" onChange={(e) => setMedia(e.target.files[0])} />
          <br />
          <button onClick={next}>Next</button>
          <button onClick={prev}>Back</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>🎨 Customize Message</h2>
          <label>Font size: <input type="number" onChange={e => setCustomStyles({ ...customStyles, fontSize: e.target.value + 'px' })} /></label>
          <br />
          <label>Color: <input type="color" onChange={e => setCustomStyles({ ...customStyles, color: e.target.value })} /></label>
          <br />
          <label><input type="checkbox" onChange={e => setCustomStyles({ ...customStyles, fontWeight: e.target.checked ? 'bold' : 'normal' })} /> Bold</label>
          <br />
          <label><input type="checkbox" onChange={e => setCustomStyles({ ...customStyles, fontStyle: e.target.checked ? 'italic' : 'normal' })} /> Italic</label>
          <br />
          <button onClick={next}>Next</button>
          <button onClick={prev}>Back</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>🔍 Review & Post</h2>
          <div style={customStyles}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          {media && <p>Uploaded file: {media.name}</p>}
          <button onClick={() => {
            alert('Post created!');
            navigate('/profile');
          }}>Finish</button>
          <button onClick={prev}>Back</button>
        </div>
      )}
    </div>
  );
}