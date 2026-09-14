import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import { gerarQuiz } from "../services/api.js";

function Quiz() {
    const navigate = useNavigate();
    const location = useLocation();

    const temaInicial = location.state?.tema || "";

    const [tema, setTema] = useState(temaInicial);
    const [perguntas, setPerguntas] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    const [indice, setIndice] = useState(0);
    const [selecionada, setSelecionada] = useState(null);
    const [confirmada, setConfirmada] = useState(false);
    const [acertos, setAcertos] = useState(0);

    async function buscarQuiz(temaBusca) {
        setCarregando(true);
        setErro(null);

        const resultado = await gerarQuiz(temaBusca);

        if (!resultado || !resultado.perguntas) {
            setErro("Não foi possível gerar o quiz. Tente novamente.");
            setCarregando(false);
            return;
        }

        setPerguntas(resultado.perguntas);
        setIndice(0);
        setSelecionada(null);
        setConfirmada(false);
        setAcertos(0);
        setCarregando(false);
    }

    useEffect(() => {
        if (temaInicial) {
            buscarQuiz(temaInicial);
        }
    }, [temaInicial]);

    function iniciarComTema(e) {
        e.preventDefault();
        if (!tema.trim()) return;
        buscarQuiz(tema.trim());
    }

    // Ainda sem tema definido: pede o assunto do quiz
    if (!perguntas && !carregando) {
        return (
            <div className="app-layout">
                <Sidebar />
                <div className="main-area">
                    <MobileHeader />
                    <main className="quiz-page">
                        <div className="quiz-container">
                            <section className="quiz-card">
                                <h1>Sobre qual assunto você quer um quiz?</h1>
                                <form onSubmit={iniciarComTema} style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                                    <input
                                        type="text"
                                        value={tema}
                                        onChange={(e) => setTema(e.target.value)}
                                        placeholder="Ex: Revolução Francesa"
                                        className="quiz-tema-input"
                                    />
                                    <button type="submit" className="quiz-confirm-button">
                                        Gerar quiz
                                    </button>
                                </form>
                                {erro && <p style={{ color: "#c0392b", marginTop: "12px" }}>{erro}</p>}
                            </section>
                        </div>
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
                    <main className="quiz-page">
                        <div className="quiz-container">
                            <section className="quiz-card">
                                <p>Gerando seu quiz sobre "{tema}"...</p>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    const questao = perguntas[indice];

    function selecionar(index) {
        if (confirmada) return;
        setSelecionada(index);
    }

    function confirmarResposta() {
        if (selecionada === null) return;
        setConfirmada(true);
    }

    function proximaPergunta() {
        const acertou = selecionada === questao.correta;
        const novoTotal = acertos + (acertou ? 1 : 0);

        if (indice === perguntas.length - 1) {
            sessionStorage.setItem(
                "resultadoQuiz",
                JSON.stringify({ acertos: novoTotal, total: perguntas.length })
            );
            navigate("/resultado");
            return;
        }

        setAcertos(novoTotal);
        setIndice(indice + 1);
        setSelecionada(null);
        setConfirmada(false);
    }

    function classeAlternativa(index) {
        if (!confirmada) {
            return selecionada === index ? "quiz-option selected" : "quiz-option";
        }
        if (index === questao.correta) return "quiz-option correct";
        if (index === selecionada && index !== questao.correta) return "quiz-option wrong";
        return "quiz-option";
    }

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-area">
                <MobileHeader />
                <main className="quiz-page">
                    <div className="quiz-container">
                        <div className="quiz-top">
                            <span className="page-badge">
                                <i className="bi bi-patch-question"></i>
                                Mini-Quiz · {tema}
                            </span>
                            <span className="quiz-progress-text">
                                Pergunta {indice + 1} de {perguntas.length}
                            </span>
                        </div>

                        <div className="quiz-progress">
                            <div
                                className="quiz-progress-bar"
                                style={{ width: `${((indice + 1) / perguntas.length) * 100}%` }}
                            />
                        </div>

                        <section className="quiz-card">
                            <h1>{questao.pergunta}</h1>

                            <div className="quiz-options">
                                {questao.opcoes.map((opcao, index) => (
                                    <button
                                        key={opcao}
                                        type="button"
                                        className={classeAlternativa(index)}
                                        onClick={() => selecionar(index)}
                                    >
                                        <span className="option-letter">
                                            {["A", "B", "C", "D", "E"][index]}
                                        </span>
                                        <span>{opcao}</span>

                                        {confirmada && index === questao.correta && (
                                            <i className="bi bi-check-circle-fill option-status"></i>
                                        )}
                                        {confirmada && index === selecionada && index !== questao.correta && (
                                            <i className="bi bi-x-circle-fill option-status"></i>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {!confirmada ? (
                                <button
                                    type="button"
                                    className="quiz-confirm-button"
                                    disabled={selecionada === null}
                                    onClick={confirmarResposta}
                                >
                                    Confirmar resposta
                                </button>
                            ) : (
                                <>
                                    <div className="quiz-explanation">
                                        <div className="quiz-explanation-title">
                                            <i className="bi bi-stars"></i>
                                            Justificativa da IA
                                        </div>
                                        <p>{questao.justificativa}</p>
                                    </div>

                                    <button type="button" className="quiz-next-button" onClick={proximaPergunta}>
                                        {indice === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta"}
                                        <i className="bi bi-arrow-right"></i>
                                    </button>
                                </>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Quiz;