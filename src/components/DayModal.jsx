import React, { useState } from 'react';
import DayCard from './DayCard';

const DayModal = ({ dayData, onClose }) => {
    if (!dayData) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                <DayCard dayData={dayData} />
            </div>
        </div>
    );
};

export default DayModal;
