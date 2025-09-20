// server.js
import express from "express";
import pkg from "cohere-ai";
const cohere = pkg; // não usar `new`

const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await cohere.chat({
      apiKey: process.env.COHERE_API_KEY,
      model: "command-a-03-2025",
      messages: [
        { role: "system", content: "Você é uma IA criada pra zoar com o usuário" },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });
    res.json({ reply: response.output[0].content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao conectar com a API" });
  }
});

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => console.log("Server rodando na Render"));
