import React from 'react';
import './QuestionCard.css';

export default function QuestionCard({ pregunta, opciones, correcta, selectedAnswer, showFeedback, onSelect }) {
  const getOptionClass = (idx) => {
    if (!showFeedback) return selectedAnswer === idx ? 'option selected' : 'option';
    if (idx === correcta) return 'option correct';
    if (idx === selectedAnswer && idx !== correcta) return 'option wrong';
    return 'option dimmed';
  };

  const getOptionIcon = (idx) => {
    if (!showFeedback) return null;
    if (idx === correcta) return <span className="option-icon">✓</span>;
    if (idx === selectedAnswer && idx !== correcta) return <span className="option-icon">✗</span>;
    return null;
  };

  return (
    <div className="question-card">
      <p className="question-text">{pregunta}</p>
      <div className="options-grid">
        {opciones.map((opcion, idx) => (
          <button
            key={idx}
            id={`option-${idx}`}
            className={getOptionClass(idx)}
            onClick={() => onSelect(idx)}
            disabled={showFeedback}
          >
            <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
            <span className="option-text">{opcion}</span>
            {getOptionIcon(idx)}
          </button>
        ))}
      </div>
    </div>
  );
}
