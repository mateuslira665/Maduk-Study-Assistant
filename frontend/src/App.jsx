import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import Quiz from './pages/Quiz.jsx';
import QuizResult from './pages/QuizResult.jsx';
import Recentes from './pages/Recentes.jsx';
import Flashcards from './pages/Flashcards.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/resultado" element={<QuizResult />} />
      <Route path="/recentes" element={<Recentes />} />
      <Route path="/flashcards" element={<Flashcards />} />
    </Routes>
  );
}

export default App;