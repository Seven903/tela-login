const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const db = require("./banco");

const app = express();
const basepath = path.join(__dirname);

app.use(express.json());
app.use(express.static(path.join(basepath, "public")));
app.use(session({ secret: "opa", resave: false, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(basepath, "views"));

app.get("/", (req, res) => {
  if (req.session.usuario) {
    res.render("inicial", { usuario: req.session.usuario });
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  if (req.session.usuario) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
  const { uso, sen } = req.body;
  const nivel_seguranca = 10;

  const verificausuario = `SELECT * FROM usuarios WHERE usuario = ?`;
  db.get(verificausuario, [uso], (err, row) => {
    if (err) return res.status(500).json({ msg: "Erro ao verificar usuário" });

    if (row) return res.status(409).json({ msg: "Usuário já existe" });

    bcrypt.hash(sen, nivel_seguranca, (err, hash) => {
      if (err) return res.status(500).json({ msg: "Erro ao criptografar senha" });

      const query = `INSERT INTO usuarios (usuario, senha) VALUES (?, ?)`;
      db.run(query, [uso, hash], function (err) {
        if (err) return res.status(500).json({ msg: "Erro ao cadastrar" });

        return res.status(200).json({ msg: "Cadastro realizado com sucesso" });
      });
    });
  });
});

app.post("/login", (req, res) => {
  const { usolog, senhalog } = req.body;

  const query = `SELECT * FROM usuarios WHERE usuario = ?`;
  db.get(query, [usolog], (err, row) => {
    if (err) return res.status(500).json({ msg: "Erro ao buscar usuário" });

    if (!row) return res.status(404).json({ msg: "Usuário não encontrado" });

    bcrypt.compare(senhalog, row.senha, (err, resultado) => {
      if (err) return res.status(500).json({ msg: "Erro ao verificar senha" });

      if (resultado) {
        req.session.usuario = { nome: row.usuario };
        return res.status(200).json({ msg: "login realizado" });
      } else {
        return res.status(401).json({ msg: "Senha incorreta" });
      }
    });
  });
});

app.get("/sair", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
