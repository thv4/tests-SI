import { useState, useCallback } from 'react';

export function useQuiz(temas) {
  const [screen, setScreen] = useState('home'); // 'home' | 'quiz' | 'results'
  const [selectedTema, setSelectedTema] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // { selected, correct, isCorrect }
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const startQuiz = useCallback((tema) => {
    setSelectedTema(tema);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScreen('quiz');
  }, []);

  const selectAnswer = useCallback((optionIdx) => {
    if (showFeedback) return;
    setSelectedAnswer(optionIdx);
    setShowFeedback(true);
  }, [showFeedback]);

  const nextQuestion = useCallback(() => {
    if (selectedAnswer === null) return;
    const pregunta = selectedTema.preguntas[currentIndex];
    const isCorrect = selectedAnswer === pregunta.correcta;

    const newAnswers = [...answers, {
      selected: selectedAnswer,
      correct: pregunta.correcta,
      isCorrect,
      pregunta: pregunta.pregunta,
      opciones: pregunta.opciones,
    }];

    setAnswers(newAnswers);
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentIndex + 1 >= selectedTema.preguntas.length) {
      setScreen('results');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [selectedAnswer, selectedTema, currentIndex, answers]);

  const restartQuiz = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScreen('quiz');
  }, []);

  const goHome = useCallback(() => {
    setScreen('home');
    setSelectedTema(null);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, []);

  const score = answers.filter(a => a.isCorrect).length;

  return {
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
  };
}
