import { useState } from "react";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import FlashCard from "../components/FlashCard.jsx";
import api from "../services/api.js";

function Flashcards() {
    const [tema, setTema] = useState("");
    const [cards, setCards] = useState([]);
    const [indice, setIndice] = useState(0);

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    async function gerarFlashcards(event) {
        event.preventDefault();

        if (!tema.trim()) {
            setErro("Digite um tema para gerar os flashcards.");
            return;
        }

        try {
            setCarregando(true);
            setErro("");
            setCards([]);
            setIndice(0);

            const resposta = await api.post(
                "/api/flashcards",
                {
                    tema: tema.trim()
                }
            );

            const flashcardsGerados =
                resposta.data.flashcards;

            if (
                !Array.isArray(flashcardsGerados) ||
                flashcardsGerados.length === 0
            ) {
                throw new Error(
                    "Nenhum flashcard foi recebido."
                );
            }

            setCards(flashcardsGerados);
            setIndice(0);

        } catch (erro) {
            console.error(
                "Erro ao gerar flashcards:",
                erro
            );

            setErro(
                erro.response?.data?.erro ||
                "Não foi possível gerar os flashcards."
            );

        } finally {
            setCarregando(false);
        }
    }

    function anterior() {
        setIndice((indiceAtual) =>
            indiceAtual === 0
                ? cards.length - 1
                : indiceAtual - 1
        );
    }

    function proximo() {
        setIndice((indiceAtual) =>
            indiceAtual === cards.length - 1
                ? 0
                : indiceAtual + 1
        );
    }

    const progresso =
        cards.length > 0
            ? ((indice + 1) / cards.length) * 100
            : 0;

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-area">

                <MobileHeader />

                <main className="flashcards-page">

                    <div className="flashcards-container">

                        <div className="flashcards-header">

                            <span className="page-badge">
                                <i className="bi bi-layers"></i>
                                Flashcards
                            </span>

                            <h1>
                                Flashcards com IA
                            </h1>

                            <p>
                                Digite um tema e o MADUK AI
                                criará 6 flashcards para você.
                            </p>

                        </div>

                        {/* GERADOR */}

                        <form
                            onSubmit={gerarFlashcards}
                            className="mb-4"
                        >

                            <div className="input-group">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: Machine Learning"
                                    value={tema}
                                    onChange={(event) =>
                                        setTema(event.target.value)
                                    }
                                    disabled={carregando}
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={carregando}
                                >

                                    {carregando ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                            ></span>

                                            Gerando...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-stars me-2"></i>
                                            Gerar cards
                                        </>
                                    )}

                                </button>

                            </div>

                        </form>

                        {/* ERRO */}

                        {erro && (
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {erro}
                            </div>
                        )}

                        {/* ESTADO INICIAL */}

                        {!carregando &&
                            cards.length === 0 &&
                            !erro && (

                                <div className="empty-state">

                                    <div className="empty-state-icon">
                                        <i className="bi bi-layers"></i>
                                    </div>

                                    <h2>
                                        Nenhum flashcard ainda
                                    </h2>

                                    <p>
                                        Digite um tema acima para começar.
                                    </p>

                                </div>

                            )}

                        {/* CARDS */}

                        {cards.length > 0 && (
                            <>

                                <div className="flashcards-counter">

                                    <span>
                                        Card {indice + 1} de {cards.length}
                                    </span>

                                    <span className="flashcards-total">
                                        {cards.length} cards
                                    </span>

                                </div>

                                <div className="flashcards-progress">

                                    <div
                                        className="flashcards-progress-bar"
                                        style={{
                                            width: `${progresso}%`
                                        }}
                                    />

                                </div>

                                <div className="flashcard-wrapper">

                                    <FlashCard
                                        key={indice}
                                        pergunta={
                                            cards[indice].pergunta
                                        }
                                        resposta={
                                            cards[indice].resposta
                                        }
                                    />

                                </div>

                                <div className="flashcard-navigation">

                                    <button
                                        type="button"
                                        className="flashcard-nav-button"
                                        onClick={anterior}
                                    >
                                        <i className="bi bi-arrow-left"></i>
                                    </button>

                                    <div className="flashcard-dots">

                                        {cards.map(
                                            (card, posicao) => (

                                                <button
                                                    key={posicao}
                                                    type="button"
                                                    className={
                                                        posicao === indice
                                                            ? "flashcard-dot active"
                                                            : "flashcard-dot"
                                                    }
                                                    onClick={() =>
                                                        setIndice(posicao)
                                                    }
                                                    aria-label={
                                                        `Card ${posicao + 1}`
                                                    }
                                                />

                                            )
                                        )}

                                    </div>

                                    <button
                                        type="button"
                                        className="flashcard-nav-button"
                                        onClick={proximo}
                                    >
                                        <i className="bi bi-arrow-right"></i>
                                    </button>

                                </div>

                                <div className="flashcards-percentage">
                                    {Math.round(progresso)}% revisado
                                </div>

                            </>
                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Flashcards;