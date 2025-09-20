// server.js
import express from "express";
import pkg from "cohere-ai";
const { CohereClientV2 } = pkg;

const app = express();
app.use(express.json());

// Pega a API KEY da variável de ambiente do Render
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        { role: "system", content: "Você é um assistente de IA planejado para ajudar pessoas, você pode criar sites, ou zoar junto com o usuário!" },
        { role: "user", content: message }
      ],
      temperature: 0.3
    });

    // Pega o texto do reply
    res.json({ reply: response.message.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao conectar com a API" });
  }
});

// Serve front-end (opcional)
app.use(express.static("public"));

// Porta do Render ou 3000 local
app.listen(process.env.PORT || 3000, () => console.log("Server rodando no Render"));