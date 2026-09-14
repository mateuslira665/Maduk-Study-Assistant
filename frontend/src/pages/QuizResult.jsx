import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuizResult() {
  const navigate = useNavigate();

  const resultadoSalvo = sessionStorage.getItem("resultadoQuiz");
  const resultado = resultadoSalvo
    ? JSON.parse(resultadoSalvo)
    : { acertos: 0, total: 0 };

  const { acertos, total } = resultado;

  const porcentagemAcerto = total > 0
    ? Math.round((acertos / total) * 100)
    : 0;

  const refazerQuiz = () => {
    sessionStorage.removeItem("resultadoQuiz");
    navigate("/quiz");
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Resultado do Quiz</h2>

      <div className="card my-4 p-4 shadow-sm">
        <h4>Você acertou {acertos} de {total} perguntas!</h4>
        <p className="fs-5 text-muted">Aproveitamento de {porcentagemAcerto}%</p>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-primary" onClick={refazerQuiz}>
          Refazer Quiz
        </button>

        <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
          Voltar ao início
        </button>
      </div>
    </div>
  );
}

export default QuizResult;