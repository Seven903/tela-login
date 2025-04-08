let formulario = document
  .querySelector("#formulario")
  .addEventListener("submit", (para) => {
    para.preventDefault();

    let usuario = document.querySelector("#uso").value;
    let senha = document.querySelector("#sen").value;

    fetch("/cadastro", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("dados enviados com sucesso", data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  });
