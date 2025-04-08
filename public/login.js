document.querySelector("#formulario").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const usolog = document.querySelector("#usuario").value;
    const senhalog = document.querySelector("#senha").value;
  
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usolog, senhalog }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg === "login realizado") {
          window.location.href = "/";
        } else {
          alert(data.msg);
        }
      });
  });
  