import { useState, useCallback } from 'react';

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function randomizeTema(tema) {
  if (!tema || !tema.preguntas) return tema;

  const randomizedPreguntas = tema.preguntas.map(pregunta => {
    const optionsWithIndices = pregunta.opciones.map((opcion, idx) => ({
      text: opcion,
      isCorrect: idx === pregunta.correcta
    }));

    const shuffledOptions = shuffleArray(optionsWithIndices);
    const newCorrectIdx = shuffledOptions.findIndex(opt => opt.isCorrect);

    return {
      ...pregunta,
      opciones: shuffledOptions.map(opt => opt.text),
      correcta: newCorrectIdx
    };
  });

  return {
    ...tema,
    preguntas: shuffleArray(randomizedPreguntas)
  };
}

export function useQuiz(temas) {
  const [screen, setScreen] = useState('home'); // 'home' | 'quiz' | 'results'
  const [selectedTema, setSelectedTema] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // { selected, correct, isCorrect }
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const startQuiz = useCallback((tema) => {
    const randomized = randomizeTema(tema);
    setSelectedTema(randomized);
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
    if (!selectedTema) return;
    // Buscamos el tema original en la lista para volver a barajar desde cero
    const originalTema = temas.find(t => t.id === selectedTema.id);
    const randomized = randomizeTema(originalTema || selectedTema);
    
    setSelectedTema(randomized);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScreen('quiz');
  }, [selectedTema, temas]);

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

