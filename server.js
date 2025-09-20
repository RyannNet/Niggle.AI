// server.js
import express from "express";
import pkg from "cohere-ai";

const { CohereClientV2 } = pkg;
const app = express();
app.use(express.json());

// Logando pra ver se a chave veio
console.log("COHERE_API_KEY:", process.env.COHERE_API_KEY ? "✅ setada" : "❌ não setada");

// API
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  console.log("Mensagem recebida:", message);

  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        { role: "system", content: "Você é uma IA criada pra zoar com o usuário" },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    console.log("Resposta bruta:", response);
    res.json({ reply: response.message.content[0].text });
  } catch (err) {
    console.error("ERRO NO CHAT >>>", err);
    res.status(500).json({ error: "Erro ao conectar com a API do Cohere" });
  }
});

// teste rápido: GET /
app.get("/", (req, res) => res.send("API tá de pé 🚀"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
