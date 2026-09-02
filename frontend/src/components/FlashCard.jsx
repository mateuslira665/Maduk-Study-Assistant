import { useState } from "react";

function FlashCard({ pergunta, resposta }) {
    const [virado, setVirado] = useState(false);

    return (
        <div
            className={`flashcard ${virado ? "flipped" : ""}`}
            onClick={() => setVirado(!virado)}
        >
            <div className="flashcard-inner">

                <div className="flashcard-front">

                    <span className="flashcard-label">
                        Pergunta
                    </span>

                    <h2>
                        {pergunta}
                    </h2>

                    <p>
                        Clique para ver a resposta
                    </p>

                </div>

                <div className="flashcard-back">

                    <span className="flashcard-label">
                        Resposta
                    </span>

                    <h2>
                        {resposta}
                    </h2>

                    <p>
                        Clique novamente para voltar
                    </p>

                </div>

            </div>
        </div>
    );
}

export default FlashCard;