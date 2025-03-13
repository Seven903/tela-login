
function pegar_dados() {
  let dados = {
    usuario: document.querySelector("#usuario").value,
    senha: document.querySelector("#senha").value,
  };

  fetch("http://127.0.0.1:3000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro: ", res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Dados Enviados com sucesso. Dados enviados: ", data);
    })
    .catch((erro) => {
      console.error(erro);
    });
}
pegar_dados()