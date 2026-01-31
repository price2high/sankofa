import React from 'react';

const ProgressBar = ({ current, total }) => {
    const percentage = Math.min((current / total) * 100, 100);

    return (
        <div className="progress-container">
            <div className="progress-label">
                Discovery Progress: {current} / {total} Days
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
