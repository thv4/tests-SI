import React from 'react';
import './ResultsScreen.css';

export default function ResultsScreen({ tema, score, answers, onRestart, onGoHome }) {
  const total = answers.length;
  const percentage = Math.round((score / total) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { label: 'Excelente', color: '#10b981' };
    if (percentage >= 70) return { label: 'Bien', color: '#3b82f6' };
    if (percentage >= 50) return { label: 'Aprobado', color: '#f59e0b' };
    return { label: 'Sigue practicando', color: '#ef4444' };
  };

  const grade = getGrade();

  return (
    <div className="results-screen">
      <div className="results-header">
        <div className="results-score-circle" style={{ '--grade-color': grade.color }}>
          <span className="score-number">{score}</span>
          <span className="score-divider">/</span>
          <span className="score-total">{total}</span>
        </div>
        <div className="results-info">
          <span className="grade-badge" style={{ color: grade.color, borderColor: grade.color, background: `${grade.color}18` }}>
            {grade.label}
          </span>
          <h2 className="results-title">{tema.nombre}</h2>
          <p className="results-subtitle">Has acertado el <strong style={{ color: grade.color }}>{percentage}%</strong> de las preguntas</p>
        </div>
      </div>

      <div className="results-actions">
        <button id="btn-restart" className="btn-primary" onClick={onRestart}>↺ Repetir test</button>
        <button id="btn-go-home-results" className="btn-secondary" onClick={onGoHome}>← Elegir tema</button>
      </div>

      <div className="results-review">
        <h3 className="review-title">Revisión de respuestas</h3>
        <div className="review-list">
          {answers.map((answer, idx) => (
            <div key={idx} className={`review-item ${answer.isCorrect ? 'correct' : 'wrong'}`}>
              <div className="review-item-header">
                <span className="review-icon">{answer.isCorrect ? '✓' : '✗'}</span>
                <span className="review-q-num">Pregunta {idx + 1}</span>
              </div>
              <p className="review-question">{answer.pregunta}</p>
              <div className="review-answers">
                <div className="review-answer selected-answer">
                  <span className="review-answer-label">Tu respuesta:</span>
                  <span>{answer.opciones[answer.selected]}</span>
                </div>
                {!answer.isCorrect && (
                  <div className="review-answer correct-answer">
                    <span className="review-answer-label">Correcta:</span>
                    <span>{answer.opciones[answer.correct]}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
