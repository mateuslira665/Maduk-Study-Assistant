import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import ChatInput from "../components/ChatInput.jsx";

import api from "../services/api.js";

function Chat() {
    const [mensagens, setMensagens] = useState([]);
    const [carregando, setCarregando] = useState(false);

    async function enviarPergunta(pergunta) {
        if (!pergunta.trim() || carregando) return;

        const mensagemUsuario = {
            id: Date.now(),
            autor: "usuario",
            texto: pergunta
        };

        setMensagens((mensagensAtuais) => [
            ...mensagensAtuais,
            mensagemUsuario
        ]);

        setCarregando(true);

        try {
            const resposta = await api.post("/api/chat", {
                pergunta: pergunta
            });

            const mensagemIA = {
                id: Date.now() + 1,
                autor: "ia",
                texto: resposta.data.resposta
            };

            setMensagens((mensagensAtuais) => [
                ...mensagensAtuais,
                mensagemIA
            ]);
        } catch (erro) {
            console.error(
                "Erro ao conversar com a API:",
                erro
            );

            const mensagemErro = {
                id: Date.now() + 1,
                autor: "ia",
                texto:
                    "Não consegui obter uma resposta da IA. Verifique se o backend e a chave da API estão funcionando."
            };

            setMensagens((mensagensAtuais) => [
                ...mensagensAtuais,
                mensagemErro
            ]);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        const perguntaInicial =
            sessionStorage.getItem("perguntaAtual");

        if (perguntaInicial) {
            sessionStorage.removeItem("perguntaAtual");

            enviarPergunta(perguntaInicial);
        }
    }, []);

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-area">

                <MobileHeader />

                <main className="chat-page">

                    <div className="chat-container">

                        <div className="chat-header">

                            <div className="chat-header-icon">
                                <i className="bi bi-stars"></i>
                            </div>

                            <div>
                                <h1>MADUK AI</h1>

                                <p>
                                    Assistente de estudos
                                </p>
                            </div>

                        </div>

                        <section className="messages-area">

                            {mensagens.length === 0 && (
                                <div className="chat-empty">

                                    <div className="chat-empty-icon">
                                        <i className="bi bi-chat-dots"></i>
                                    </div>

                                    <h2>
                                        Como posso ajudar?
                                    </h2>

                                    <p>
                                        Digite uma dúvida para começar.
                                    </p>

                                </div>
                            )}

                            {mensagens.map((mensagem) => (
                                <div
                                    key={mensagem.id}
                                    className={
                                        mensagem.autor === "usuario"
                                            ? "message-row user"
                                            : "message-row ai"
                                    }
                                >

                                    {mensagem.autor === "ia" && (
                                        <div className="message-avatar ai-avatar">
                                            <i className="bi bi-stars"></i>
                                        </div>
                                    )}

                                    <div className="message-bubble">
                                        {mensagem.texto}
                                    </div>

                                    {mensagem.autor === "usuario" && (
                                        <div className="message-avatar user-avatar">
                                            M
                                        </div>
                                    )}

                                </div>
                            ))}

                            {carregando && (
                                <div className="message-row ai">

                                    <div className="message-avatar ai-avatar">
                                        <i className="bi bi-stars"></i>
                                    </div>

                                    <div className="message-bubble typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>

                                </div>
                            )}

                        </section>

                        <div className="chat-bottom">

                            <ChatInput
                                onSend={enviarPergunta}
                            />

                            <p className="ai-disclaimer">
                                A IA pode cometer erros.
                                Confira informações importantes.
                            </p>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Chat;