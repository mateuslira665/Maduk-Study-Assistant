import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import api from "../services/api.js";

function Quiz() {
    const navigate = useNavigate();

    const [tema, setTema] = useState("");
    const [perguntas, setPerguntas] = useState([]);

    const [indice, setIndice] = useState(0);
    const [selecionada, setSelecionada] = useState(null);
    const [confirmada, setConfirmada] = useState(false);
    const [acertos, setAcertos] = useState(0);

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    async function gerarQuiz(event) {
        event.preventDefault();

        if (!tema.trim()) {
            setErro("Digite um tema para gerar o quiz.");
            return;
        }

        try {
            setCarregando(true);
            setErro("");

            setPerguntas([]);
            setIndice(0);
            setSelecionada(null);
            setConfirmada(false);
            setAcertos(0);

            sessionStorage.removeItem("resultadoQuiz");

            const resposta = await api.post(
                "/api/quiz",
                {
                    tema: tema.trim()
                }
            );

            const perguntasGeradas =
                resposta.data.perguntas;

            if (
                !Array.isArray(perguntasGeradas) ||
                perguntasGeradas.length === 0
            ) {
                throw new Error(
                    "Nenhuma pergunta foi recebida."
                );
            }

            setPerguntas(perguntasGeradas);

        } catch (erro) {
            console.error(
                "Erro ao gerar quiz:",
                erro
            );

            setErro(
                erro.response?.data?.erro ||
                "Não foi possível gerar o quiz."
            );

        } finally {
            setCarregando(false);
        }
    }

    function selecionar(index) {
        if (confirmada) return;

        setSelecionada(index);
    }

    function confirmarResposta() {
        if (selecionada === null) return;

        setConfirmada(true);
    }

    function proximaPergunta() {
        const questao = perguntas[indice];

        const acertou =
            selecionada === questao.correta;

        const novoTotal =
            acertos + (acertou ? 1 : 0);

        if (indice === perguntas.length - 1) {

            sessionStorage.setItem(
                "resultadoQuiz",
                JSON.stringify({
                    acertos: novoTotal,
                    total: perguntas.length,
                    tema
                })
            );

            navigate("/resultado");

            return;
        }

        setAcertos(novoTotal);

        setIndice(
            (indiceAtual) =>
                indiceAtual + 1
        );

        setSelecionada(null);
        setConfirmada(false);
    }

    function classeAlternativa(index) {
        if (!confirmada) {
            return selecionada === index
                ? "quiz-option selected"
                : "quiz-option";
        }

        const questao = perguntas[indice];

        if (index === questao.correta) {
            return "quiz-option correct";
        }

        if (
            index === selecionada &&
            index !== questao.correta
        ) {
            return "quiz-option wrong";
        }

        return "quiz-option";
    }

    const questao =
        perguntas.length > 0
            ? perguntas[indice]
            : null;

    const progresso =
        perguntas.length > 0
            ? ((indice + 1) / perguntas.length) * 100
            : 0;

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-area">

                <MobileHeader />

                <main className="quiz-page">

                    <div className="quiz-container">

                        {/* =========================
                GERADOR DO QUIZ
            ========================= */}

                        {perguntas.length === 0 && (
                            <>
                                <div className="flashcards-header">

                                    <span className="page-badge">
                                        <i className="bi bi-patch-question"></i>
                                        Mini-Quiz
                                    </span>

                                    <h1>
                                        Quiz com IA
                                    </h1>

                                    <p>
                                        Digite um tema e o MADUK AI
                                        criará um quiz automaticamente.
                                    </p>

                                </div>

                                <form
                                    onSubmit={gerarQuiz}
                                    className="mb-4"
                                >

                                    <div className="input-group">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ex: Machine Learning"
                                            value={tema}
                                            onChange={(event) =>
                                                setTema(
                                                    event.target.value
                                                )
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
                                                    Gerar quiz
                                                </>
                                            )}

                                        </button>

                                    </div>

                                </form>

                                {erro && (
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {erro}
                                    </div>
                                )}

                                {!carregando && !erro && (
                                    <div className="empty-state">

                                        <div className="empty-state-icon">
                                            <i className="bi bi-patch-question"></i>
                                        </div>

                                        <h2>
                                            Crie seu quiz
                                        </h2>

                                        <p>
                                            Digite qualquer conteúdo
                                            que você queira estudar.
                                        </p>

                                    </div>
                                )}
                            </>
                        )}

                        {/* =========================
                QUIZ GERADO
            ========================= */}

                        {questao && (
                            <>

                                <div className="quiz-top">

                                    <span className="page-badge">
                                        <i className="bi bi-patch-question"></i>

                                        {tema}
                                    </span>

                                    <span className="quiz-progress-text">
                                        Pergunta {indice + 1}
                                        {" de "}
                                        {perguntas.length}
                                    </span>

                                </div>

                                <div className="quiz-progress">

                                    <div
                                        className="quiz-progress-bar"
                                        style={{
                                            width: `${progresso}%`
                                        }}
                                    />

                                </div>

                                <section className="quiz-card">

                                    <h1>
                                        {questao.pergunta}
                                    </h1>

                                    <div className="quiz-options">

                                        {questao.opcoes.map(
                                            (opcao, index) => (

                                                <button
                                                    key={`${opcao}-${index}`}
                                                    type="button"
                                                    className={
                                                        classeAlternativa(index)
                                                    }
                                                    onClick={() =>
                                                        selecionar(index)
                                                    }
                                                >

                                                    <span className="option-letter">
                                                        {
                                                            [
                                                                "A",
                                                                "B",
                                                                "C",
                                                                "D",
                                                                "E"
                                                            ][index]
                                                        }
                                                    </span>

                                                    <span>
                                                        {opcao}
                                                    </span>

                                                    {confirmada &&
                                                        index ===
                                                        questao.correta && (

                                                            <i className="bi bi-check-circle-fill option-status"></i>

                                                        )}

                                                    {confirmada &&
                                                        index === selecionada &&
                                                        index !==
                                                        questao.correta && (

                                                            <i className="bi bi-x-circle-fill option-status"></i>

                                                        )}

                                                </button>

                                            )
                                        )}

                                    </div>

                                    {!confirmada ? (

                                        <button
                                            type="button"
                                            className="quiz-confirm-button"
                                            disabled={
                                                selecionada === null
                                            }
                                            onClick={
                                                confirmarResposta
                                            }
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

                                                <p>
                                                    {questao.justificativa}
                                                </p>

                                            </div>

                                            <button
                                                type="button"
                                                className="quiz-next-button"
                                                onClick={
                                                    proximaPergunta
                                                }
                                            >

                                                {indice ===
                                                    perguntas.length - 1
                                                    ? "Ver resultado"
                                                    : "Próxima pergunta"}

                                                <i className="bi bi-arrow-right"></i>

                                            </button>

                                        </>
                                    )}

                                </section>

                            </>
                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Quiz;