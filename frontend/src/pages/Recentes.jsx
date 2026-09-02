import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import api from "../services/api.js";

function Recentes() {
    const [conversas, setConversas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    async function carregarConversas() {
        try {
            const resposta = await api.get("/conversas");

            setConversas(resposta.data);
        } catch (erro) {
            console.error(
                "Erro ao carregar conversas:",
                erro
            );
        } finally {
            setCarregando(false);
        }
    }

    async function apagarConversa(id) {
        try {
            await api.delete(`/conversas/${id}`);

            setConversas((listaAtual) =>
                listaAtual.filter(
                    (conversa) =>
                        conversa.id !== id
                )
            );
        } catch (erro) {
            console.error(
                "Erro ao apagar conversa:",
                erro
            );
        }
    }

    useEffect(() => {
        carregarConversas();
    }, []);

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-area">

                <MobileHeader />

                <main className="recentes-page">

                    <div className="recentes-container">

                        <div className="recentes-header">

                            <span className="page-badge">
                                <i className="bi bi-clock-history"></i>
                                Histórico
                            </span>

                            <h1>
                                Recentes
                            </h1>

                            <p>
                                Continue de onde parou.
                            </p>

                        </div>

                        {carregando && (
                            <div className="empty-state">
                                Carregando conversas...
                            </div>
                        )}

                        {!carregando &&
                            conversas.length === 0 && (
                                <div className="empty-state">

                                    <div className="empty-state-icon">
                                        <i className="bi bi-chat-left-text"></i>
                                    </div>

                                    <h2>
                                        Nenhuma conversa ainda
                                    </h2>

                                    <p>
                                        Suas conversas aparecerão aqui.
                                    </p>

                                </div>
                            )}

                        {!carregando &&
                            conversas.length > 0 && (
                                <div className="recentes-list">

                                    {conversas.map(
                                        (conversa) => (
                                            <article
                                                key={conversa.id}
                                                className="recent-conversation"
                                            >

                                                <div className="recent-icon">
                                                    <i className="bi bi-chat-square-text"></i>
                                                </div>

                                                <div className="recent-content">

                                                    <h2>
                                                        {conversa.titulo}
                                                    </h2>

                                                    <p>
                                                        {conversa.pergunta}
                                                    </p>

                                                    <span>
                                                        {conversa.data
                                                            ? new Date(
                                                                conversa.data
                                                            ).toLocaleDateString(
                                                                "pt-BR"
                                                            )
                                                            : "Sem data"}
                                                    </span>

                                                </div>

                                                <button
                                                    type="button"
                                                    className="delete-conversation"
                                                    onClick={() =>
                                                        apagarConversa(
                                                            conversa.id
                                                        )
                                                    }
                                                    aria-label="Excluir conversa"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>

                                            </article>
                                        )
                                    )}

                                </div>
                            )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Recentes;