import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import FlashCard from "../components/FlashCard.jsx";

function Flashcards() {
    const [indice, setIndice] = useState(0);

    const cards = [
        {
            pergunta: "O que é um requisito funcional?",
            resposta:
                "É uma funcionalidade ou comportamento que o sistema deve executar."
        },
        {
            pergunta: "O que é um requisito não funcional?",
            resposta:
                "É uma característica de qualidade do sistema, como desempenho, segurança ou usabilidade."
        },
        {
            pergunta: "O que significa UML?",
            resposta:
                "UML significa Unified Modeling Language."
        }
    ];

    function anterior() {
        setIndice(
            indice === 0
                ? cards.length - 1
                : indice - 1
        );
    }

    function proximo() {
        setIndice(
            indice === cards.length - 1
                ? 0
                : indice + 1
        );
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-area">

                <MobileHeader />

                <main className="flashcards-page">

                    <div className="flashcards-header">

                        <span className="page-badge">
                            <i className="bi bi-layers"></i>
                            Flashcards
                        </span>

                        <h1>
                            Revise o conteúdo
                        </h1>

                        <p>
                            Clique no cartão para revelar a resposta.
                        </p>

                    </div>

                    <div className="flashcards-counter">
                        Pergunta {indice + 1} de {cards.length}
                    </div>

                    <div className="flashcard-wrapper">

                        <FlashCard
                            key={indice}
                            pergunta={cards[indice].pergunta}
                            resposta={cards[indice].resposta}
                        />

                    </div>

                    <div className="flashcard-navigation">

                        <button
                            type="button"
                            className="flashcard-nav-button"
                            onClick={anterior}
                            aria-label="Flashcard anterior"
                        >
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <div className="flashcard-dots">

                            {cards.map((card, position) => (
                                <button
                                    key={card.pergunta}
                                    type="button"
                                    className={
                                        position === indice
                                            ? "flashcard-dot active"
                                            : "flashcard-dot"
                                    }
                                    onClick={() =>
                                        setIndice(position)
                                    }
                                    aria-label={`Abrir flashcard ${position + 1}`}
                                />
                            ))}

                        </div>

                        <button
                            type="button"
                            className="flashcard-nav-button"
                            onClick={proximo}
                            aria-label="Próximo flashcard"
                        >
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Flashcards;