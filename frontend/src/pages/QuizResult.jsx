import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";

function QuizResult() {
    const navigate = useNavigate();
    const resultado = resultadoSalvo
        ? JSON.parse(resultadoSalvo)
        : {
            acertos: 0,
            total: 3
        };

    const porcentagem = math.round(
        (resultado.acertos / resultado.total) * 100
    );

    function refazQuiz() {
        sessionStorage.removeItem("resultadoQuiz");
        navigate("/quiz")
    }
    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-area">

                <MobileHeader />

                <main className="result-page">

                    <section className="result-card">

                        <div className="result-icon">
                            <i className="bi bi-trophy"></i>
                        </div>

                        <span className="page-badge">
                            Mini-Quiz concluído
                        </span>

                        <h1>
                            Resultado
                        </h1>

                        <p className="result-description">
                            Veja como você se saiu no quiz.
                        </p>

                        <div className="score-circle">

                            <strong>
                                {porcentagem}%
                            </strong>

                            <span>
                                de aproveitamento
                            </span>

                        </div>

                        <div className="result-score">

                            <strong>
                                {resultado.acertos}/{resultado.total}
                            </strong>

                            <span>
                                respostas corretas
                            </span>

                        </div>

                        <div className="result-message">

                            {porcentagem >= 80 && (
                                <>
                                    <i className="bi bi-stars"></i>

                                    <span>
                                        Excelente resultado!
                                    </span>
                                </>
                            )}

                            {porcentagem >= 50 &&
                                porcentagem < 80 && (
                                    <>
                                        <i className="bi bi-lightbulb"></i>

                                        <span>
                                            Bom trabalho. Continue revisando!
                                        </span>
                                    </>
                                )}

                            {porcentagem < 50 && (
                                <>
                                    <i className="bi bi-book"></i>

                                    <span>
                                        Revise o conteúdo e tente novamente.
                                    </span>
                                </>
                            )}

                        </div>

                        <div className="result-actions">

                            <button
                                type="button"
                                className="result-primary-button"
                                onClick={refazerQuiz}
                            >
                                <i className="bi bi-arrow-repeat"></i>

                                Refazer quiz
                            </button>

                            <button
                                type="button"
                                className="result-secondary-button"
                                onClick={voltarInicio}
                            >
                                <i className="bi bi-house"></i>

                                Voltar ao início
                            </button>

                        </div>

                    </section>

                </main>

            </div>

        </div>
    );
}

export default QuizResult;


