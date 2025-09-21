// server.js
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.static(".")); // serve os arquivos HTML, CSS, JS da raiz

app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  // aqui tu coloca tua lógica ou IA
  res.json({ reply: "Tu disse: " + message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));