const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const rotas = require("./routes/rotas");
const db = require("./banco");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", rotas);
app.set("view engine", "ejs");

app.post("/", (req, res) => {
  const { usuario, senha } = req.body;

  const nivel_seg = 12;

  let query = `SELECT * FROM usuarios WHERE usuario = ?`;

  db.all(query, [usuario], (err, row) => {
    if (err) {
      return res.status(500).json({ msg: "Erro ao consutar usuario" });
    }

    if (row.length > 0) {
      return res.status(409).json({ msg: "O usuario ja existe!" });
    }
    bcrypt.hash(senha, nivel_seg, (err, hash) => {
      let query = `INSERT INTO usuarios (usuario,senha) VALUES (?,?)`;

      db.run(query, [usuario, hash], function (err) {
        if (err) {
          return res.status(500).json({ msg: "Erro ao inserir usuario" });
        }
        return res
          .status(200)
          .json({ msg: "Usuario inserido", id: this.lastID });
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
