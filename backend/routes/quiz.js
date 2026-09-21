const express = require("express");
const router = express.Router();
const { chamarGroq } = require("../utils/groqClient");

function extrairJson(texto) {
    const limpo = texto.replace(/```json|```/g, "").trim();
    return JSON.parse(limpo);
}

// Embaralha as opções de cada pergunta e reposiciona o índice da correta
function embaralharPerguntas(perguntas) {
    return perguntas.map((questao) => {
        const opcaoCorreta = questao.opcoes[questao.correta];

        const opcoesEmbaralhadas = [...questao.opcoes];
        for (let i = opcoesEmbaralhadas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opcoesEmbaralhadas[i], opcoesEmbaralhadas[j]] =
                [opcoesEmbaralhadas[j], opcoesEmbaralhadas[i]];
        }

        const novoIndiceCorreto = opcoesEmbaralhadas.indexOf(opcaoCorreta);

        return {
            ...questao,
            opcoes: opcoesEmbaralhadas,
            correta: novoIndiceCorreto
        };
    });
}

router.post("/", async (req, res) => {
    const { tema } = req.body;

    if (!tema) {
        return res.status(400).json({ erro: "O tema do quiz é obrigatório." });
    }

    const promptSistema = `Você é um gerador de quizzes educacionais.
Responda SOMENTE com um JSON válido, sem nenhum texto antes ou depois, no formato:
{
  "perguntas": [
    {
      "pergunta": "texto da pergunta",
      "opcoes": ["opção A", "opção B", "opção C", "opção D", "opção E"],
      "correta": 0,
      "justificativa": "explicação curta da resposta correta"
    }
  ]
}
Gere perguntas de múltipla escolha (5 opções cada) sobre o tema informado pelo usuário. caso o usuário não pedir uma quantidade específica de questões você gera esecificamente 10 questões. "correta" é o índice (0 a 4) da opção certa dentro de "opcoes".`;

    try {
        const textoGerado = await chamarGroq([
            { role: "system", content: promptSistema },
            { role: "user", content: `Tema: ${tema}` }
        ], { forcarJson: true });

        const quizGerado = extrairJson(textoGerado);

        if (!Array.isArray(quizGerado.perguntas) || quizGerado.perguntas.length === 0) {
            throw new Error("Formato de quiz inválido retornado pela IA.");
        }

        const perguntasEmbaralhadas = embaralharPerguntas(quizGerado.perguntas);

        res.json({ tema, perguntas: perguntasEmbaralhadas });

    } catch (erro) {
        console.error("Erro ao gerar quiz:", erro);
        res.status(500).json({ erro: "Não foi possível gerar o quiz. Tente novamente." });
    }
});

module.exports = router;