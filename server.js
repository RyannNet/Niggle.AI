import express from "express";
import coherePkg from "cohere-ai";

const { CohereClientV2 } = coherePkg; // pega do default import

const app = express();
app.use(express.json());

const cohere = new CohereClientV2({
  apiKey: process.env.COHERE_API_KEY
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

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => console.log("Server rodando na Render"));
