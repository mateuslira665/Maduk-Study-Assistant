import React from 'react';
// Importando o hook useNavigate para conseguir trocar de página através dos botões
import { useNavigate } from 'react-router-dom';

function QuizResult() {
  // Inicializando o hook de navegação
  const navigate = useNavigate();

  // Usamos o sessionStorage para manter o dado apenas enquanto a aba estiver aberta.
  const resultadoSalvo = sessionStorage.getItem("resultadoQuiz");
  
  // Convertemos o valor salvo (que vem como string) para número.
  // Se não houver nada salvo (null), definimos como 0 para evitar erros no cálculo.
  const pontuacao = resultadoSalvo ? Number(resultadoSalvo) : 0;

  // Aqui estamos calculando a porcentagem assumindo um total de 10 perguntas (ajuste se for diferente).
  const porcentagemAcerto = Math.round((pontuacao / 10) * 100);

  const refazerQuiz = () => {
    // É uma boa prática limpar o resultado anterior antes de iniciar o quiz novamente
    sessionStorage.removeItem("resultadoQuiz");
    // Redireciona o usuário de volta para a tela do Quiz
    navigate("/quiz");
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Resultado do Quiz</h2>
      
      <div className="card my-4 p-4 shadow-sm">
        <h4>Você acertou {pontuacao} perguntas!</h4>
        <p className="fs-5 text-muted">Aproveitamento de {porcentagemAcerto}%</p>
      </div>
      
      <div className="d-flex justify-content-center gap-3">
        {/* Botão que chama a função refazerQuiz criada ali em cima */}
        <button className="btn btn-primary" onClick={refazerQuiz}>
          Refazer Quiz
        </button>
        
        {/* Substituímos o voltarInicio inexistente por uma chamada direta ao navigate("/") */}
        <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
          Voltar ao início
        </button>
      </div>
    </div>
  );
}

export default QuizResult;