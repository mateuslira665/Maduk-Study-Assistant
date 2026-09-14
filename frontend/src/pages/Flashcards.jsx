import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import FlashCard from "../components/FlashCard.jsx";
import { gerarFlashcards } from "../services/api.js";

function Flashcards() {
    const location = useLocation();
    const temaInicial = location.state?.tema || "";

    const [tema, setTema] = useState(temaInicial);
    const [cards, setCards] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [indice, setIndice] = useState(0);

    async function buscarFlashcards(temaBusca) {
        setCarregando(true);
        setErro(null);

        const resultado = await gerarFlashcards(temaBusca);

        if (!resultado || !resultado.flashcards) {
            setErro("Não foi possível gerar os flashcards. Tente novamente.");
            setCarregando(false);
            return;
        }

        setCards(resultado.flashcards);
        setIndice(0);
        setCarregando(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (temaInicial) {
            buscarFlashcards(temaInicial);
        }
    }, [temaInicial]);

    function iniciarComTema(e) {
        e.preventDefault();
        if (!tema.trim()) return;
        buscarFlashcards(tema.trim());
    }

    function anterior() {
        setIndice(indice === 0 ? cards.length - 1 : indice - 1);
    }

    function proximo() {
        setIndice(indice === cards.length - 1 ? 0 : indice + 1);
    }

    if (!cards && !carregando) {
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
                            <h1>Sobre qual assunto?</h1>
                        </div>
                        <form onSubmit={iniciarComTema} style={{ display: "flex", gap: "8px" }}>
                            <input
                                type="text"
                                value={tema}
                                onChange={(e) => setTema(e.target.value)}
                                placeholder="Ex: Revolução Francesa"
                                className="quiz-tema-input"
                            />
                            <button type="submit" className="quiz-confirm-button">
                                Gerar flashcards
                            </button>
                        </form>
                        {erro && <p style={{ color: "#c0392b", marginTop: "12px" }}>{erro}</p>}
                    </main>
                </div>
            </div>
        );
    }

    if (carregando) {
        return (
            <div className="app-layout">
                <Sidebar />
                <div className="main-area">
                    <MobileHeader />
                    <main className="flashcards-page">
                        <p>Gerando flashcards sobre "{tema}"...</p>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-area">
                <MobileHeader />
                <main className="flashcards-page">
                    <div className="flashcards-header">
                        <span className="page-badge">
                            <i className="bi bi-layers"></i>
                            Flashcards · {tema}
                        </span>
                        <h1>Revise o conteúdo</h1>
                        <p>Clique no cartão para revelar a resposta.</p>
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
                        <button type="button" className="flashcard-nav-button" onClick={anterior} aria-label="Flashcard anterior">
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <div className="flashcard-dots">
                            {cards.map((card, position) => (
                                <button
                                    key={card.pergunta}
                                    type="button"
                                    className={position === indice ? "flashcard-dot active" : "flashcard-dot"}
                                    onClick={() => setIndice(position)}
                                    aria-label={`Abrir flashcard ${position + 1}`}
                                />
                            ))}
                        </div>

                        <button type="button" className="flashcard-nav-button" onClick={proximo} aria-label="Próximo flashcard">
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Flashcards;