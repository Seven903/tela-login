const express = require("express");
const rotas = express.Router();

rotas.get("/", (req, res) => {
  res.render("login");
});

rotas.get("/cadastro", (req, res) => {
  res.render("login");
});

module.exports = rotas;