const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Substitua pelo seu token real da OpenAI assim que adicionar os créditos
const OPENAI_API_KEY = "SUA_CHAVE_DA_OPENAI_AQUI";

app.post('/api/chat', async (req, res) => {
    const { pergunta } = req.body;

    if (!pergunta) {
        return res.status(400).json({ erro: "A pergunta é obrigatória." });
    }

    try {
        const respostaOpenAI = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Você é o MADUK AI, um assistente de estudos prestativo." },
                    { role: "user", content: pergunta }
                ],
                temperature: 0.7
            }),
        });

        if (!respostaOpenAI.ok) {
            const erroDetalhes = await respostaOpenAI.text();
            console.error("Detalhes do erro da OpenAI:", erroDetalhes);
            throw new Error("Erro na comunicação com a API da OpenAI");
        }

        const dadosOpenAI = await respostaOpenAI.json();
        const textoGerado = dadosOpenAI.choices?.[0]?.message?.content || "Não foi possível gerar uma resposta.";

        const dbPath = path.join(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        const novaConversa = {
            id: String(Date.now()),
            titulo: pergunta.substring(0, 40),
            data: new Date().toLocaleDateString("pt-BR"),
            pergunta: pergunta,
            resposta: textoGerado
        };

        if (!dbData.historico) {
            dbData.historico = [];
        }

        dbData.historico.push(novaConversa);
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');

        res.json({
            resposta: textoGerado,
            conversa: novaConversa
        });

    } catch (erro) {
        console.error("Erro no servidor:", erro);
        res.status(500).json({ erro: "Erro ao processar a requisição com a IA." });
    }
});

app.get('/historico', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.json(dbData.historico || []);
});

app.delete('/historico/:id', (req, res) => {
    const { id } = req.params;
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    dbData.historico = (dbData.historico || []).filter(item => item.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
    
    res.json({ sucesso: true });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});