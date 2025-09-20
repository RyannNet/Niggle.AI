import express from "express";
import Cohere from "cohere-ai";

const app = express();
app.use(express.json());

const cohere = new Cohere(process.env.COHERE_API_KEY);

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
    res.json({ reply: response.output[0].content[0].text });
  } catch (err) {
    console.error("ERRO COHERE:", err);
    res.status(500).json({ error: "Erro ao conectar com a API Cohere" });
  }
});

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Server rodando na Render");
});
