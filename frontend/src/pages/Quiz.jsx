import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import MobileHeader from "../components/MobileHeader.jsx";

function Quiz() {
    const navigate = useNavigate();

    const perguntas = [
        {
            id: 1,
            pergunta: "Qual destes é um requisito funcional?",
            opcoes: [
                "O sistema deve permitir login",
                "A página deve carregar em até 2 segundos",
                "O sistema deve possuir alta disponibilidade",
                "A interface deve ser responsiva",
                "Os dados devem ser criptografados"
            ],
            correta: 0,
            justificativa:
                "Permitir login representa uma funcionalidade que o sistema deve executar."
        },

        {
            id: 2,
            pergunta: "Qual é um exemplo de requisito não funcional?",
            opcoes: [
                "Cadastrar aluno",
                "Excluir usuário",
                "Gerar relatório",
                "A página deve carregar em até 2 segundos",
                "Enviar mensagem"
            ],
            correta: 3,
            justificativa:
                "Tempo de carregamento está relacionado ao desempenho, portanto é um requisito não funcional."
        },

        {
            id: 3,
            pergunta: "O que significa UML?",
            opcoes: [
                "Universal Machine Language",
                "Unified Modeling Language",
                "User Management Layer",
                "Unified Machine Logic",
                "Universal Modeling Logic"
            ],
            correta: 1,
            justificativa:
                "UML significa Unified Modeling Language."
        }
    ];

    const [indice, setIndice] = useState(0);
    const [selecionada, setSelecionada] = useState(null);
    const [confirmada, setConfirmada] = useState(false);
    const [acertos, setAcertos] = useState(0);

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
        const acertou =
            selecionada === questao.correta;

        const novoTotal =
            acertos + (acertou ? 1 : 0);

        if (indice === perguntas.length - 1) {
            sessionStorage.setItem(
                "resultadoQuiz",
                JSON.stringify({
                    acertos: novoTotal,
                    total: perguntas.length
                })
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
            return selecionada === index
                ? "quiz-option selected"
                : "quiz-option";
        }

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

                                Mini-Quiz
                            </span>

                            <span className="quiz-progress-text">
                                Pergunta {indice + 1} de {perguntas.length}
                            </span>

                        </div>

                        <div className="quiz-progress">

                            <div
                                className="quiz-progress-bar"
                                style={{
                                    width:
                                        `${((indice + 1) / perguntas.length) * 100}%`
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
                                            key={opcao}
                                            type="button"
                                            className={classeAlternativa(index)}
                                            onClick={() =>
                                                selecionar(index)
                                            }
                                        >

                                            <span className="option-letter">
                                                {
                                                    ["A", "B", "C", "D", "E"][index]
                                                }
                                            </span>

                                            <span>
                                                {opcao}
                                            </span>

                                            {confirmada &&
                                                index === questao.correta && (
                                                    <i className="bi bi-check-circle-fill option-status"></i>
                                                )}

                                            {confirmada &&
                                                index === selecionada &&
                                                index !== questao.correta && (
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

                                        <p>
                                            {questao.justificativa}
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        className="quiz-next-button"
                                        onClick={proximaPergunta}
                                    >

                                        {indice === perguntas.length - 1
                                            ? "Ver resultado"
                                            : "Próxima pergunta"}

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