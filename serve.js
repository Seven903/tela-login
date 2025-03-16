import express from "express";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const usuarios = [];

app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "opa", saveUninitialized: true, resave: false }));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  if (req.session.usuario) {
    res.render("inicial", { usuario: req.session.usuario });
  } else {
    res.render("cadastro");
  } 
});

app.get("/login", (req, res) => {
  if (req.session.usuario) {
    res.render("inicial", { usuario: req.session.usuario });
  } else {
    res.render("login");
  }
});

app.post("/", (req, res) => {
  const { nome, senha } = req.body;
  usuarios.push({ nome, senha });
  console.log(usuarios);
  res.redirect("login");
});

app.post("/login", (req, res) => {
  const { usulog, senhalog } = req.body;

  const usuariosencontrados = usuarios.find(
    (user) => user.nome === usulog && user.senha === senhalog
  );

  if (usuariosencontrados) {
    req.session.usuario = usuariosencontrados;
    res.render("inicial", { usuario: usuariosencontrados });
  } else {
    res.render("login");
  }
});

app.get("/sair", (req, res) => {
  req.session.destroy((erro) => {
    if (erro) {
      res.redirect("inicil");
    } else {
      res.redirect("login");
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
