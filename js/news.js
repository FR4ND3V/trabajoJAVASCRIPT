document.addEventListener("DOMContentLoaded", function () {
  fetch("json/news.json")
    .then((response) => response.json())
    .then((data) => {
      const newsSection = document.getElementById("news-section");

      data.forEach((newsItem) => {
        const newsDiv = document.createElement("div");
        newsDiv.className = "news-item";

        // Imagen
        const imageElement = document.createElement("img");
        imageElement.src = newsItem.image;
        imageElement.alt = newsItem.title;
        imageElement.className = "news-image";

        // Contenedor de título y fecha
        const headerDiv = document.createElement("div");
        headerDiv.className = "news-header";

        const titleElement = document.createElement("h3");
        titleElement.textContent = newsItem.title;
        titleElement.className = "news-title";

        const metaElement = document.createElement("p");
        metaElement.className = "news-meta";
        metaElement.textContent = `Por ${newsItem.author} | ${newsItem.date}`;

        headerDiv.appendChild(titleElement);
        headerDiv.appendChild(metaElement);

        // Contenido
        const contentElement = document.createElement("p");
        contentElement.className = "news-content";
        contentElement.textContent = newsItem.content;

        // Botón de compartir
        const shareContainer = document.createElement("div");
        shareContainer.className = "share-container";

        const shareButton = document.createElement("button");
        shareButton.className = "share-button";
        shareButton.innerHTML = "&#x1F517;"; // Ícono de enlace

        const shareOptions = document.createElement("div");
        shareOptions.className = "share-options";

        Object.keys(newsItem.social).forEach((platform) => {
          const socialLink = document.createElement("a");
          socialLink.href = newsItem.social[platform];
          socialLink.target = "_blank";
          socialLink.innerHTML = platform.charAt(0).toUpperCase() + platform.slice(1);
          shareOptions.appendChild(socialLink);
        });

        shareContainer.appendChild(shareButton);
        shareContainer.appendChild(shareOptions);

        shareButton.addEventListener("click", function () {
          shareOptions.style.display = shareOptions.style.display === "block" ? "none" : "block";
        });

        // Agregando los elementos al contenedor principal
        newsDiv.appendChild(imageElement);
        newsDiv.appendChild(headerDiv);
        newsDiv.appendChild(contentElement);
        newsDiv.appendChild(shareContainer);

        newsSection.appendChild(newsDiv);
      });
    })
    .catch((error) => {
      console.error("Error al cargar las noticias:", error);
      const newsSection = document.getElementById("news-section");
      const errorElement = document.createElement("p");
      errorElement.textContent =
        "Lo siento, no se pudieron cargar las noticias.";
      errorElement.style.color = "red";
      newsSection.appendChild(errorElement);
    });
});
