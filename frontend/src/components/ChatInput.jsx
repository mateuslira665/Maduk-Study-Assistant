import { useState } from "react";

function ChatInput({ onSend }) {
    const [texto, setTexto] = useState("");
    const [mostrarAnexos, setMostrarAnexos] = useState(false);

    function enviarMensagem() {
        if (!texto.trim()) {
            return;
        }

        onSend(texto);

        setTexto("");
        setMostrarAnexos(false);
    }

    function verificarTecla(event) {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            enviarMensagem();
        }
    }

    return (
        <div className="chat-input-area">

            {mostrarAnexos && (
                <div className="attachment-menu">

                    <label className="attachment-option">
                        <i className="bi bi-file-earmark"></i>

                        <span>Arquivo</span>

                        <input
                            type="file"
                            hidden
                        />
                    </label>

                    <label className="attachment-option">
                        <i className="bi bi-image"></i>

                        <span>Fotos</span>

                        <input
                            type="file"
                            accept="image/*"
                            hidden
                        />
                    </label>

                    <label className="attachment-option">
                        <i className="bi bi-camera"></i>

                        <span>Câmera</span>

                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            hidden
                        />
                    </label>

                </div>
            )}

            <div className="maduk-chat-input">

                <button
                    type="button"
                    className="attachment-button"
                    onClick={() =>
                        setMostrarAnexos(
                            !mostrarAnexos
                        )
                    }
                    aria-label="Adicionar anexo"
                >
                    <i className="bi bi-plus-lg"></i>
                </button>

                <textarea
                    value={texto}
                    maxLength={3000}
                    rows="1"
                    placeholder="Descreva sua dúvida..."
                    onChange={(event) =>
                        setTexto(event.target.value)
                    }
                    onKeyDown={verificarTecla}
                />

                <div className="chat-input-actions">

                    <span className="character-counter">
                        {texto.length} / 3.000
                    </span>

                    <button
                        type="button"
                        className="send-button"
                        onClick={enviarMensagem}
                        disabled={!texto.trim()}
                        aria-label="Enviar pergunta"
                    >
                        <i className="bi bi-arrow-up"></i>
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ChatInput;