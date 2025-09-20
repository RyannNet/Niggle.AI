// server.js
import express from "express";
import { CohereClientV2 } from "cohere-ai";

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
        { role: "system", content: "Você é uma IA criada pra zoar com o usuário" },
        { role: "user", content: message }
      ],
      temperature: 0.3
    });
    
    res.json({ reply: response.message.content[0].text });
  } catch (err) {
    res.status(500).json({ error: "Erro ao conectar com a API" });
  }
});

// Serve o front-end se quiser
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => console.log("Server rodando na Render"));
