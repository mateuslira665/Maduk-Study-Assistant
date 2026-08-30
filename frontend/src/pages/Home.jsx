import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import StudyActions from "../components/StudyActions.jsx";
import ChatInput from "../components/ChatInput.jsx";

function Home() {
    const navigate = useNavigate();

    function enviarPergunta(pergunta) {
        if (!pergunta.trim()) return;

        sessionStorage.setItem(
            "perguntaAtual",
            pergunta
        );

        navigate("/chat");
    }

    return (
        <div className="app-layout">

            {/* MENU DESKTOP */}
            <Sidebar />

            <div className="main-area">

                {/* MENU CELULAR */}
                <MobileHeader />

                <main className="home-page">

                    <section className="home-content">

                        {/* LOGO */}
                        <div className="maduk-logo">
                            <i className="bi bi-stars"></i>
                        </div>

                        <h1>
                            O que vamos estudar?
                        </h1>

                        <p className="home-description">
                            Tire suas dúvidas, revise conteúdos
                            e crie materiais para estudar melhor.
                        </p>

                        {/* RESUMO / QUIZ / FLASHCARDS */}
                        <StudyActions />

                    </section>

                    {/* PARTE INFERIOR */}
                    <section className="home-input-area">

                        <button
                            className="generate-material-button"
                            type="button"
                        >
                            <i className="bi bi-stars"></i>

                            Gerar material
                        </button>

                        <ChatInput
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