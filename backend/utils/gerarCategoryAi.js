// services/titleService.js

const getCategoryFromDeepSeek = async (description) => {
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
            "Com base na descrição lista as principais palavras-chave. Essas palavras-chave devem estar separadas por virgula e quero só mesmo essas palavras e nada mais. Não uses palavras-chaves fracas. A ideia é obter categorias. Máximo 3 palavras-chave. Não uses palavras-chave genéricas. Escolhe as mais fortes.",
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
  const cleanedTitle = rawTitle
    ?.trim()
    .replace(/^["']|["']$/g, "")
    .split(", ");
  return cleanedTitle;
};

module.exports = { getCategoryFromDeepSeek };
