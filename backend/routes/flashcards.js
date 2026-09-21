const express = require("express");
const router = express.Router();
const { chamarGroq } = require("../utils/groqClient");

function extrairJson(texto) {
    const limpo = texto.replace(/```json|```/g, "").trim();
    return JSON.parse(limpo);
}

router.post("/", async (req, res) => {
    const { tema } = req.body;

    if (!tema) {
        return res.status(400).json({ erro: "O tema dos flashcards é obrigatório." });
    }

    const promptSistema = `Você é um gerador de flashcards de estudo.
Responda SOMENTE com um JSON válido, sem nenhum texto antes ou depois, no formato:
{
  "flashcards": [
    { "pergunta": "texto da pergunta", "resposta": "texto da resposta" }
  ]
}
Gere exatamente 6 flashcards curtos e objetivos sobre o tema informado pelo usuário.`;

    try {
        const textoGerado = await chamarGroq([
            { role: "system", content: promptSistema },
            { role: "user", content: `Tema: ${tema}` }
        ], { forcarJson: true });

        const flashcardsGerados = extrairJson(textoGerado);

        if (!Array.isArray(flashcardsGerados.flashcards) || flashcardsGerados.flashcards.length === 0) {
            throw new Error("Formato de flashcards inválido retornado pela IA.");
        }

        res.json({ tema, flashcards: flashcardsGerados.flashcards });

    } catch (erro) {
        console.error("Erro ao gerar flashcards:", erro);
        res.status(500).json({ erro: "Não foi possível gerar os flashcards. Tente novamente." });
    }
});

module.exports = router;