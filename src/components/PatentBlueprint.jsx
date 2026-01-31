import { useEffect, useRef, useState } from 'react';

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const PatentBlueprint = ({ title, imageUrl }) => {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ dragging: false, sx: 0, sy: 0, px: 0, py: 0 });

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const resetView = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  const onWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setScale((s) => clamp(Number((s + delta).toFixed(2)), 1, 3));
  };

  const onMouseDown = (e) => {
    dragRef.current = { dragging: true, sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.sx;
    const dy = e.clientY - dragRef.current.sy;
    setPos({ x: dragRef.current.px + dx, y: dragRef.current.py + dy });
  };
  const onMouseUp = () => {
    dragRef.current.dragging = false;
  };

  if (!imageUrl) {
    return (
      <div className="blueprint-card">
        <div className="section-title" style={{ marginTop: 0 }}>Patent Blueprint</div>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          Blueprint image not available yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="blueprint-card">
        <div className="blueprint-head">
          <div className="section-title" style={{ marginTop: 0 }}>Patent Blueprint</div>
          <button className="btn btn-primary" type="button" onClick={() => { setOpen(true); resetView(); }}>
            Open
          </button>
        </div>
        <div className="blueprint-thumb" onClick={() => { setOpen(true); resetView(); }} role="button" tabIndex={0}>
          <img src={imageUrl} alt={`${title} patent blueprint`} />
        </div>
      </div>

      {open && (
        <div className="blueprint-modal-overlay" onClick={() => setOpen(false)}>
          <div className="blueprint-modal" onClick={(e) => e.stopPropagation()}>
            <div className="blueprint-modal-top">
              <div className="blueprint-title">{title}</div>
              <div className="blueprint-actions">
                <button className="btn" type="button" onClick={() => setScale((s) => clamp(Number((s - 0.1).toFixed(2)), 1, 3))}>-</button>
                <button className="btn" type="button" onClick={() => setScale((s) => clamp(Number((s + 0.1).toFixed(2)), 1, 3))}>+</button>
                <button className="btn" type="button" onClick={resetView}>Reset</button>
                <button className="btn btn-primary" type="button" onClick={() => setOpen(false)}>Close</button>
              </div>
            </div>

            <div
              className="blueprint-viewport"
              onWheel={onWheel}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              <img
                className="blueprint-image"
                src={imageUrl}
                alt={`${title} patent blueprint`}
                style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
                draggable={false}
              />
            </div>

            <div className="blueprint-hint">
              Scroll to zoom • Drag to pan • Esc to close
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatentBlueprint;

