const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("./banco");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get('/',(req,res)=>{
    res.render("cadastro")
})

app.post("/", (req, res) => {
  const { usuario, senha } = req.body;
  console.log(usuario, senha);

  res.status(200).json({ msg: "Dados recebidos com sucesso" });
});


app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000")
})