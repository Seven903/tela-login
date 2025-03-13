import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const logs = [];

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "corpo.html"));
});

app.post("/logs", (req, res) => {
  const dados = req.body;
  logs.push(dados);
  console.log("Dados recebidos: ", dados);

  res.status(200).json({ messagem: "Dados recebidos com sucesso "});
});

app.get("/logs",(req,res)=>{
  res.send(JSON.stringify(logs))
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
