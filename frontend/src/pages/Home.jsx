import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import StudyActions from "../components/StudyActions.jsx";
import ChatInput from "../components/ChatInput.jsx";

function Home() {
    const navigate = useNavigate();

    const [texto, setTexto] = useState("");
    const [mostrarTipoMaterial, setMostrarTipoMaterial] = useState(false);

    function enviarPergunta(pergunta) {
        if (!pergunta.trim()) return;

        sessionStorage.setItem("perguntaAtual", pergunta);
        setTexto("");
        navigate("/chat");
    }

    function abrirMenuMaterial() {
        if (!texto.trim()) return;
        setMostrarTipoMaterial(!mostrarTipoMaterial);
    }

    function gerarMaterial(tipo) {
        const tema = texto.trim();
        if (!tema) return;

        setMostrarTipoMaterial(false);
        setTexto("");

        navigate(tipo === "quiz" ? "/quiz" : "/flashcards", {
            state: { tema }
        });
    }

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-area">

                <MobileHeader />

                <main className="home-page">

                    <section className="home-content">

                        <div className="maduk-logo">
                            <i className="bi bi-stars"></i>
                        </div>

                        <h1>O que vamos estudar?</h1>

                        <p className="home-description">
                            Tire suas dúvidas, revise conteúdos
                            e crie materiais para estudar melhor.
                        </p>

                        <StudyActions />

                    </section>

                    <section className="home-input-area">

                        <div className="generate-material-wrapper">

                            <button
                                className="generate-material-button"
                                type="button"
                                onClick={abrirMenuMaterial}
                                disabled={!texto.trim()}
                            >
                                <i className="bi bi-stars"></i>
                                Gerar material
                            </button>

                            {mostrarTipoMaterial && (
                                <div className="material-type-menu">

                                    <button
                                        type="button"
                                        className="material-type-option"
                                        onClick={() => gerarMaterial("quiz")}
                                    >
                                        <i className="bi bi-patch-question"></i>
                                        <span>Quiz sobre "{texto.trim()}"</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="material-type-option"
                                        onClick={() => gerarMaterial("flashcards")}
                                    >
                                        <i className="bi bi-layers"></i>
                                        <span>Flashcards sobre "{texto.trim()}"</span>
                                    </button>

                                </div>
                            )}

                        </div>

                        <ChatInput
                            value={texto}
                            onChange={setTexto}
                            onSend={enviarPergunta}
                        />

                        <p className="ai-disclaimer">
                            A IA pode cometer erros.
                            Confira informações importantes.
                        </p>

                    </section>

                </main>

            </div>

        </div>
    );
}

export default Home;