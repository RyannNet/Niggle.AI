import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());
app.use(express.static(".")); // serve o HTML, CSS, JS da pasta raiz

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // aqui tu chama tua API de verdade
    const response = await fetch("https://api-que-tu-usa.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    res.json({ reply: data.reply || "Sem resposta da API." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Erro ao conectar na API." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
