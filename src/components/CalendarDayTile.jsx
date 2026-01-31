import React, { useState } from 'react';

const CalendarDayTile = ({ dayData, onClick, isCompleted }) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);

        if (!isRevealed) {
            setIsRevealed(true);
        }

        onClick();
    };

    return (
        <div
            className={`calendar-day-tile ${isRevealed ? 'revealed' : ''} ${isAnimating ? 'click-animation' : ''}`}
            onClick={handleClick}
        >
            <div className="tile-overlay"></div>
            <div className="tile-number">{dayData.day}</div>

            {isRevealed && (
                <div className="tile-content-preview">
                    <div className="tile-preview-name">{dayData.figure.name}</div>
                    <div className="tile-preview-invention">Invention: {dayData.invention.name}</div>
                </div>
            )}

            {isCompleted && (
                <div className="sankofa-stamp">
                    <div className="stamp-text">SANKOFA</div>
                    <div className="stamp-sub">DISCOVERED</div>
                </div>
            )}
        </div>
    );
};

export default CalendarDayTile;
