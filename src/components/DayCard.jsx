import ScratchOff from './ScratchOff';
import AudioPlayer from './AudioPlayer';


const DayCard = ({ dayData }) => {
  const { day, figure, invention, lecture, fact } = dayData;

  return (
    <div className="card card-inner">
      <div className="card-header">
        <div className="day-badge">{day}</div>
        <h3 className="card-title">{figure.name}</h3>
      </div>

      <div className="card-body">
        {figure.imageUrl && (
          <div className="figure-image-frame">
            <img
              className="figure-image"
              src={figure.imageUrl}
              alt={figure.name}
            />
          </div>
        )}
        <div>
          <p className="figure-dates">{figure.dates}</p>
          <p className="figure-description">{figure.description}</p>
        </div>
      </div>

      <div className="invention-section">
        <div className="section-title" style={{ marginTop: 0 }}>Invention & Patent</div>
        <h4 className="invention-title">{invention.name}</h4>
        <p className="invention-inventor">Inventor: {invention.inventor}</p>
        <p className="invention-description">{invention.description}</p>
      </div>



      <div className="lecture-section">
        <div className="section-title">Primary Source</div>
        <AudioPlayer {...lecture} />
        {lecture?.transcript?.length ? (
          <details className="transcript">
            <summary className="transcript-summary">Read transcript</summary>
            <div className="transcript-body">
              {lecture.transcript.map((p, idx) => (
                <p key={idx} className="transcript-paragraph">{p}</p>
              ))}
            </div>
          </details>
        ) : (
          <p className="transcript-missing">Transcript not available yet.</p>
        )}
      </div>

      <div className="fact-section" style={{ marginTop: '1.5rem' }}>
        <div className="section-title">Excavate History</div>
        <ScratchOff {...fact} />
      </div>

      <div className="resources-section" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
        <div className="section-title">Further Resources</div>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {/* Dynamic resources based on figure and invention */}
          <li style={{ marginBottom: '0.5rem' }}>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(figure.name + " history")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ fontSize: '1.2em' }}>📚</span> Learn more about {figure.name}
            </a>
          </li>
          {invention && (
            <li style={{ marginBottom: '0.5rem' }}>
              <a
                href={`https://patents.google.com/?q=${encodeURIComponent(invention.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-info-green)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span style={{ fontSize: '1.2em' }}>🛠️</span> View Patent: {invention.name}
              </a>
            </li>
          )}
          {dayData.resources && dayData.resources.map((res, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-text-primary)', textDecoration: 'underline' }}
              >
                🔗 {res.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DayCard;
