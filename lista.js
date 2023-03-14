document.addEventListener("DOMContentLoaded", function () {
  const nuevaTareaInput = document.querySelector("#nuevatarea input");
  nuevaTareaInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      agregarTarea();
    }
  });

  document.querySelector("#push").addEventListener("click", function () {
    agregarTarea();
  });

  document.querySelector("#tareas").addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminar")) {
      event.target.parentNode.remove();

      actualizarContadores();

      guardarEnLocalStorage();
    } else if (event.target.classList.contains("nombretarea")) {
      event.target.classList.toggle("completado");

      actualizarContadores();

      guardarEnLocalStorage();
    }
  });

  function agregarTarea() {
    const tareasContainer = document.querySelector("#tareas");

    if (nuevaTareaInput.value.length == 0) {
      alert("Por favor agregar una tarea");
    } else {
      const tareaHTML = `
        <div id="tarea">
          <span class="nombretarea">${nuevaTareaInput.value}</span>
          <button class="eliminar">X</button>
        </div>
      `;
      tareasContainer.innerHTML += tareaHTML;
      nuevaTareaInput.value = "";

      actualizarContadores();

      guardarEnLocalStorage();
    }
  }

  function actualizarContadores() {
    const tareas = document.querySelectorAll("#tareas div");
    const completados = document.querySelector("#completos");
    const incompletos = document.querySelector("#incompletos");
    const total = document.querySelector("#total");

    const tareasCompletadas = document.querySelectorAll(
      "#tareas div span.completado"
    ).length;

    total.textContent = `Totales: ${tareas.length}`;
    completados.textContent = `Completados: ${tareasCompletadas}`;
    incompletos.textContent = `Incompletos: ${
      tareas.length - tareasCompletadas
    }`;
  }

  function guardarEnLocalStorage() {
    const tareasHTML = document.querySelector("#tareas").innerHTML;
    localStorage.setItem("tareas", tareasHTML);
  }

  function cargarDesdeLocalStorage() {
    if (localStorage.getItem("tareas")) {
      document.querySelector("#tareas").innerHTML = localStorage.getItem(
        "tareas"
      );

      actualizarContadores();
    }
  }

  cargarDesdeLocalStorage();
});