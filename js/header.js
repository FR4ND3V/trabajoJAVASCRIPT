document.addEventListener("DOMContentLoaded", () => {
  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  const initializeHeader = () => {
    /*=============== SHOW MENU ===============*/
    const showMenu = (toggleId, navId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          // Add show-menu class to nav menu
          nav.classList.toggle("show-menu");
          // Add show-icon to show and hide menu icon
          toggle.classList.toggle("show-icon");
        });
      }
    };

    showMenu("nav-toggle", "nav-menu");

    /*=============== SHOW DROPDOWN MENU ===============*/
    const dropdownItems = document.querySelectorAll(".dropdown__item");

    dropdownItems.forEach((item) => {
      const dropdownButton = item.querySelector(".dropdown__button");

      dropdownButton.addEventListener("click", () => {
        const showDropdown = document.querySelector(".show-dropdown");
        toggleItem(item);

        if (showDropdown && showDropdown !== item) {
          toggleItem(showDropdown);
        }
      });
    });

    
  };



  // Si el header ya está cargado (por ejemplo, en index.html), inicializa directamente
  if (headerElement && headerElement.children.length > 0) {
    initializeHeader();
  } else {
    // Si el header se carga dinámicamente, espera al evento headerLoaded
    document.addEventListener("headerLoaded", initializeHeader);
  }


});


