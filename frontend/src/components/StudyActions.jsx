import { useNavigate } from "react-router-dom";

function StudyActions() {
    const navigate = useNavigate();

    return (
        <div className="study-action">
            {/* Cartão de Resumo */}
            <button className="study-action-card" type="button">
                <div className="study-action-icon">
                    <i className="bi bi-file-earmark-text"></i>
                </div>
                <div className="study-action-text">
                    <strong>Resumo</strong>
                    <span>Resuma um conteúdo</span>
                </div>
            </button>

            {/* Cartão de Quiz (Ajustado com o texto e ícone corrigidos) */}
            <button 
                className="study-action-card"
                type="button"
                onClick={() => navigate("/quiz")}
            >
                <div className="study-action-icon">
                    <i className="bi bi-patch-question"></i>
                </div>
                <div className="study-action-text">
                    <strong>Quiz</strong>
                    <span>Teste seus conhecimentos</span>
                </div>
            </button>

            {/* Cartão de Flashcards */}
            <button
                className="study-action-card"
                type="button"
                onClick={() => navigate("/flashcards")}
            >
                <div className="study-action-icon">
                    <i className="bi bi-layers"></i>
                </div>
                <div className="study-action-text">
                    <strong>Flashcards</strong>
                    <span>Revise rapidamente</span>
                </div>
            </button>
        </div>
    );
}

export default StudyActions;