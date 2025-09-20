import express from "express";
import { CohereClientV2 } from "cohere-ai";

const app = express();
app.use(express.json());

// conecta no cohere usando a env do Render
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY
});

// rota de teste
app.get("/", (req, res) => {
  res.send("API tá de pé 🚀 Niggle.AI");
});

// rota do chat
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        { role: "system", content: "Você é uma IA criada pra zoar com o usuário" },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    // resposta certinha
    res.json({ reply: response.message.content[0].text });
  } catch (err) {
    console.error("ERRO COHERE:", err);
    res.status(500).json({ error: "Erro ao conectar com a API Cohere" });
  }
});

// serve os arquivos do front (public/)
app.use(express.static("public"));

// inicia server
app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Server rodando na Render");
});
