const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

async function chamarGroq(mensagens, { forcarJson = false } = {}) {
    const body = {
        model: MODEL,
        messages: mensagens,
        temperature: 0.7
    };

    if (forcarJson) {
        body.response_format = { type: "json_object" };
    }

    const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify(body)
    });

    if (!resposta.ok) {
        const detalhes = await resposta.text();
        console.error("Erro Groq:", detalhes);
        throw new Error("Erro na comunicação com a API do Groq");
    }

    const dados = await resposta.json();
    return dados.choices?.[0]?.message?.content || "";
}

module.exports = { chamarGroq };