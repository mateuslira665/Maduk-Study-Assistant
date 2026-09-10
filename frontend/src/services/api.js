const BASE_URL = "http://localhost:3001";

export const getHistorico = async () => {
  try {
    const resposta = await fetch(`${BASE_URL}/historico`);
    if (!resposta.ok) throw new Error("Erro ao buscar histórico");
    return await resposta.json();
  } catch (erro) {
    console.error(erro);
    return [];
  }
};

export const deletarConversa = async (id) => {
  try {
    const resposta = await fetch(`${BASE_URL}/historico/${id}`, {
      method: "DELETE",
    });
    return resposta.ok;
  } catch (erro) {
    console.error(erro);
    return false;
  }
};

// Função única que bate no backend seguro (OpenAI + Salvamento)
export const enviarParaIA = async (pergunta) => {
  try {
    const resposta = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pergunta }),
    });

    if (!resposta.ok) {
      throw new Error("Erro ao comunicar com o servidor");
    }

    const dados = await resposta.json();
    return dados.resposta;
  } catch (erro) {
    console.error("Erro na API de IA:", erro);
    return "Desculpe, ocorreu um erro ao processar sua dúvida.";
  }
};