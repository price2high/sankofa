import { useMemo, useState } from 'react';

const AudioPlayer = ({ speaker, title, description, sourceUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to extract YouTube ID
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(sourceUrl);
  const isYouTube = !!videoId;
  const embedUrl = isYouTube ? `https://www.youtube.com/embed/${videoId}` : null;

  // If no source or raw audio
  const bars = useMemo(() => Array.from({ length: 28 }, (_, i) => i), []);

  return (
    <div className="audio-player-container">

      {isYouTube ? (
        <div style={{ marginBottom: '1rem' }}>
          <h4 className="audio-heading">{speaker} - {title}</h4>

          <div className="audio-visual" style={{ marginBottom: '1rem' }}>
            <button
              className="btn btn-primary audio-play-btn"
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause visualization' : 'Play visualization'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div className="audio-bars" style={{ opacity: isPlaying ? 1 : 0.45 }}>
              {bars.map((i) => (
                <div
                  key={i}
                  className="audio-bar"
                  style={{ height: isPlaying ? `${Math.random() * 100}%` : `${18 + (i % 5) * 6}%` }}
                />
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '14px' }}>
            <iframe
              src={embedUrl}
              title={title}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : sourceUrl ? (
        <div style={{ marginBottom: '1rem' }}>
          <h4 className="audio-heading">{speaker}: {title}</h4>

          <div className="audio-visual">
            <button
              className="btn btn-primary audio-play-btn"
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause visualization' : 'Play visualization'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div className="audio-bars" style={{ opacity: isPlaying ? 1 : 0.45 }}>
              {bars.map((i) => (
                <div
                  key={i}
                  className="audio-bar"
                  style={{ height: isPlaying ? `${Math.random() * 100}%` : `${18 + (i % 5) * 6}%` }}
                />
              ))}
            </div>
          </div>

          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '10px', display: 'inline-block' }}>
            Listen on External Source
          </a>
        </div>
      ) : (
        // Fallback for no source (Simulation)
        <>
          <div className="audio-controls">
            <button
              className="btn btn-primary audio-play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              type="button"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div>
              <h4 className="audio-heading" style={{ marginBottom: 0 }}>{speaker}</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>{title}</p>
            </div>
          </div>

          <p className="audio-sim-note">* Simulation: Audio source not available yet *</p>

          <div className="audio-bars" style={{ opacity: isPlaying ? 1 : 0.35 }}>
            {bars.map((i) => (
              <div
                key={i}
                className="audio-bar"
                style={{ height: isPlaying ? `${Math.random() * 100}%` : '20%' }}
              />
            ))}
          </div>
        </>
      )}

      <p className="audio-quote">"{description}"</p>
    </div>
  );
};

export default AudioPlayer;
