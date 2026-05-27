import React from 'react';
import './ProgressBar.css';

export default function ProgressBar({ current, total }) {
  const percentage = ((current) / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-label">Pregunta {current} de {total}</span>
        <span className="progress-percent">{Math.round(percentage)}%</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
