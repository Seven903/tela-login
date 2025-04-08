document.querySelector("#formulario").addEventListener("submit", (e) => {
  e.preventDefault();

  const uso = document.querySelector("#uso").value;
  const sen = document.querySelector("#sen").value;

  fetch("/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uso, sen }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg === "Cadastro realizado com sucesso") {
        window.location.href = "/login";
      } else {
        alert(data.msg);
      }
    });
});
