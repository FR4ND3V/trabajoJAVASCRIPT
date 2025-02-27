document.addEventListener("DOMContentLoaded", () => {
  // Cargar el header
  fetch("../assets/header.html") // Cambia esta ruta si es necesario
    .then((response) => response.text())
    .then((data) => {
      const headerElement = document.getElementById("header");
      headerElement.innerHTML = data;

      // Dispara un evento para notificar que el header está cargado
      document.dispatchEvent(new Event("headerLoaded"));

      // Llamar a la función para resaltar el enlace activo después de que el header se cargue
      highlightActiveLink();
    });

  // Cargar el footer
  fetch("../assets/footer.html") // Cambia esta ruta si es necesario
    .then((response) => response.text())
    .then((data) => {
      const footerElement = document.getElementById("footer");
      footerElement.innerHTML = data;

      // Dispara un evento para notificar que el footer está cargado
      document.dispatchEvent(new Event("footerLoaded"));
    });
});

// Función para resaltar el enlace activo
function highlightActiveLink() {
  const currentPath = window.location.pathname.split("/").pop(); // Obtener solo el archivo actual
  const navLinks = document.querySelectorAll(".nav__link");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop(); // Obtener solo el archivo de cada enlace

    if (currentPath === linkPath) {
      link.classList.add("active"); // Añadir la clase active al enlace correspondiente
    } else {
      link.classList.remove("active"); // Eliminar la clase active de los enlaces no coincidentes
    }
  });
}
