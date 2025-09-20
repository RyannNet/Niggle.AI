// server.js
import express from "express";
import pkg from "cohere-ai";
import path from "path";
import { fileURLToPath } from "url";

const { CohereClientV2 } = pkg;
const app = express();

app.use(express.json());

// Serve o front-end direto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.use(express.static(__dirname));

// API do chat
const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if(!message) return res.status(400).json({ error: "Mensagem vazia" });

  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        { role: "system", content: "Você é uma IA criada pra zoar com o usuário" },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    res.json({ reply: response.message.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao conectar com a API do Cohere" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server rodando na Render em porta ${PORT}`));
