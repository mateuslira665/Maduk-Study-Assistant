import { useState } from "react";

function FlashCard({ pergunta, resposta }) {
    const [virado, setVirado] = useState(false);

    function virarCard() {
        setVirado((estadoAtual) => !estadoAtual);
    }

    function teclado(event) {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            virarCard();
        }
    }

    return (
        <div
            className={`flashcard ${virado ? "flipped" : ""}`}
            onClick={virarCard}
            onKeyDown={teclado}
            role="button"
            tabIndex={0}
        >
            <div className="flashcard-inner">

                <div className="flashcard-front">
                    <span className="flashcard-label">
                        Pergunta
                    </span>

                    <div className="flashcard-icon">
                        <i className="bi bi-question-lg"></i>
                    </div>

                    <h2>{pergunta}</h2>

                    <p>
                        Clique para revelar a resposta
                    </p>
                </div>

                <div className="flashcard-back">
                    <span className="flashcard-label">
                        Resposta
                    </span>

                    <div className="flashcard-icon">
                        <i className="bi bi-lightbulb"></i>
                    </div>

                    <h2>{resposta}</h2>

                    <p>
                        Clique novamente para voltar
                    </p>
                </div>

            </div>
        </div>
    );
}

export default FlashCard;