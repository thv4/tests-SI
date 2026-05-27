import React from 'react';
import './App.css';
import data from './data/questions.json';
import { useQuiz } from './hooks/useQuiz';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

const { temas } = data;

export default function App() {
  const {
    screen,
    selectedTema,
    currentIndex,
    answers,
    selectedAnswer,
    showFeedback,
    score,
    startQuiz,
    selectAnswer,
    nextQuestion,
    restartQuiz,
    goHome,
  } = useQuiz(temas);

  const topbarLabel = screen === 'quiz' && selectedTema
    ? `${currentIndex + 1} / ${selectedTema.preguntas.length} preguntas`
    : screen === 'results'
    ? 'Resultados'
    : `${temas.length} temas disponibles`;

  return (
    <div className="app-container">
      <header className="app-topbar">
        <div className="app-logo">
          <span className="app-logo-dot" />
          TestRepaso
        </div>
        <span className="app-topbar-info">{topbarLabel}</span>
      </header>

      <main className="app-main">
        {screen === 'home' && (
          <HomeScreen temas={temas} onSelectTema={startQuiz} />
        )}

        {screen === 'quiz' && selectedTema && (
          <QuizScreen
            tema={selectedTema}
            currentIndex={currentIndex}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            onSelect={selectAnswer}
            onNext={nextQuestion}
            onGoHome={goHome}
          />
        )}

        {screen === 'results' && selectedTema && (
          <ResultsScreen
            tema={selectedTema}
            score={score}
            answers={answers}
            onRestart={restartQuiz}
            onGoHome={goHome}
          />
        )}
      </main>
    </div>
  );
}
