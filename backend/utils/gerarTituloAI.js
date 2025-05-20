// services/titleService.js

const getTitleFromDeepSeek = async (description) => {
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "Com base na seguinte descrição de um pedido de ajuda, crie um título curto (máximo 20 palavras), direto e muito chamativo, que desperte empatia e faça as pessoas quererem clicar para saber mais. O título deve transmitir urgência ou conexão emocional, para aumentar a chance de engajamento.. Não inclua explicações, sugestões ou qualquer outro texto além do título. Não use aspas. Não quero que uses letras maiuculas a meio do texto. O texto deve estar em Português de Portugal.",
        },
        {
          role: "user",
          content: description,
        },
      ],
      temperature: 1.3,
      max_tokens: 50,
    }),
  });

  if (response.status === 402) {
    throw new Error("Plano da API expirado ou sem crédito.");
  }

  const data = await response.json();

  const rawTitle = data?.choices?.[0]?.message?.content || null;
  const cleanedTitle = rawTitle?.trim().replace(/^["']|["']$/g, "");
  return cleanedTitle;
};

module.exports = { getTitleFromDeepSeek };
