import { useState } from 'react';

const ScratchOff = ({ title, content }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="scratch-off-container">
      <div
        className={`scratch-overlay ${revealed ? 'revealed' : ''}`}
        onClick={() => setRevealed(true)}
      >
      </div>
      <div className="fact-content">
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ScratchOff;
