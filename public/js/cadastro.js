
document.querySelector("#formulario").addEventListener("submit", () => {
  let usuario = document.querySelector("#uso").value;
  let senha = document.querySelector("#sen").value;

  fetch("/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ usuario, senha }),
  })
    .then((res) => res.json)
    .then((data) => console.log("Dados enviados com sucesso", data))
    .catch((err) => console.error(err.message));
});
