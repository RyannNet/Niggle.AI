
// server.js
import express from "express";
import pkg from "cohere-ai";
const { CohereClient } = pkg;

const app = express();
app.use(express.json());

const cohere = new CohereClient(process.env.COHERE_API_KEY);

app.get("/", (req, res) => {
  res.send("API tá de pé 🚀 Niggle.AI");
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
      temperature: 0.7
    });

    // nova forma de pegar a resposta
    const reply = response.output[0].content[0].text;
    res.json({ reply });
  } catch (err) {
    console.error("ERRO COHERE:", err);
    res.status(500).json({ error: "Erro ao conectar com a API Cohere" });
  }
});

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Server rodando na Render");
});
