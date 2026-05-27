import React from 'react';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import './QuizScreen.css';

export default function QuizScreen({ tema, currentIndex, selectedAnswer, showFeedback, onSelect, onNext, onGoHome }) {
  const pregunta = tema.preguntas[currentIndex];
  const total = tema.preguntas.length;
  const isLast = currentIndex + 1 === total;

  return (
    <div className="quiz-screen">
      <header className="quiz-header">
        <button id="btn-go-home" className="btn-back" onClick={onGoHome}>
          ← Temas
        </button>
        <span className="quiz-tema-badge">{tema.nombre}</span>
      </header>

      <ProgressBar current={currentIndex + 1} total={total} />

      <QuestionCard
        pregunta={pregunta.pregunta}
        opciones={pregunta.opciones}
        correcta={pregunta.correcta}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        onSelect={onSelect}
      />

      {showFeedback && (
        <div className="feedback-banner" data-correct={selectedAnswer === pregunta.correcta}>
          {selectedAnswer === pregunta.correcta
            ? '✓ ¡Correcto!'
            : `✗ Incorrecto — La respuesta correcta era: "${pregunta.opciones[pregunta.correcta]}"`
          }
        </div>
      )}

      <div className="quiz-footer">
        <button
          id="btn-next-question"
          className="btn-primary"
          onClick={onNext}
          disabled={!showFeedback}
        >
          {isLast ? 'Ver resultados →' : 'Siguiente →'}
        </button>
      </div>
    </div>
  );
}
