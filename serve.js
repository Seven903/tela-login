const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const db = require("./banco");

const app = express();
const basepath = path.join(__dirname);

app.use(express.json());
app.use(express.static(path.join(basepath, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(basepath, "views"));

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
  const { usuario, senha } = req.body;
  let nivel_seguranca = 10;

  console.log(`usuario: ${usuario}, senha: ${senha}`)

  const verificausuario = `SELECT * FROM usuarios WHERE usuario = ?`;

  db.all(verificausuario, [usuario], (err, rows) => {
    if (err) {
      return res.status(500).json({ msg: "Erro ao selecionar usuario" });
    }

    if (rows.length > 0) {
      return res.status(409).json({ msg: "O usuario ja existe" });
    }

    bcrypt.hash(senha, nivel_seguranca, (err, hash) => {
      if (err) {
        return res.status(500).json({ msg: "Erro ao criptografar senha" });
      }

      const query = `INSERT INTO usuarios (usuario, senha) VALUES (?, ?)`;

      db.run(query, [usuario, hash], function (err) {
        if (err) {
          return res.status(500).json({ msg: "Erro ao inserir usuario" });
        }

        res.status(200).json({ msg: "Usuário cadastrado", id: this.lastID });
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
