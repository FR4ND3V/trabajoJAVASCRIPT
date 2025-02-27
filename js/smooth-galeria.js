document.addEventListener("DOMContentLoaded", function () {
    const galleryDiv = document.getElementById("lightGallery");
  
    fetch("../json/images.json")
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) throw new Error("No hay imágenes en el JSON.");
  
        data.forEach(imageItem => {
          const imgElement = document.createElement("a");
          imgElement.href = imageItem.src;
          imgElement.className = "lg-item";
  
          const img = document.createElement("img");
          img.setAttribute("data-src", imageItem.thumbnail);
          img.alt = imageItem.title;
          img.classList.add("lazy-load");
  
          imgElement.appendChild(img);
          galleryDiv.appendChild(imgElement);
        });
  
        // Agregar la clase "loaded" para la transición
        setTimeout(() => {
          galleryDiv.classList.add("loaded");
        }, 100);
  
        // Activar Lazy Loading
        applyLazyLoading();
  
        // Inicializar LightGallery después de cargar imágenes
        lightGallery(galleryDiv, {
          thumbnail: true,
          animateThumb: false,
          showThumbByDefault: false,
        });
      })
      .catch(error => console.error("Error al cargar imágenes:", error));
  });
  
  // Lazy Loading con Fade-In
  function applyLazyLoading() {
    const images = document.querySelectorAll(".lazy-load");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.classList.add("loaded"); // Aplica efecto Fade-In
          observer.unobserve(img);
        }
      });
    }, { rootMargin: "50px 0px", threshold: 0.1 });
  
    images.forEach(img => observer.observe(img));
  }
  