
          function calcularPresupuesto() {
          let producto = parseInt(document.getElementById("producto").value);
          let plazo = parseInt(document.getElementById("plazo").value) || 1;

          // Obtener extras seleccionados y convertirlos en un string separado por comas
          let extrasSeleccionados = Array.from(document.querySelectorAll(".extra:checked"))
              .map(el => el.value);

          let extrasTotal = extrasSeleccionados.reduce((sum, val) => sum + parseInt(val), 0);

        // Inicializar el descuento
        let descuento = 1; // Sin descuento por defecto

                // Solo aplicar descuento si el plazo es 2 o mayor
            if (plazo >= 2) {
                descuento = 1 - (plazo * 0.0125); // Descuento del 1.25% por mes
                if (descuento < 0.5) {
                    descuento = 0.5; // Máximo 50% de descuento
                }
            }

          let total = (producto + extrasTotal) * descuento;

          // Mostrar total en la interfaz
          document.getElementById("total").textContent = `${total.toFixed(2)}€`;

          // Guardar valores en los campos ocultos para que se envíen en el formulario
          document.getElementById("extrasHidden").value = extrasSeleccionados.join(","); // Convertir a cadena separada por comas
          document.getElementById("totalHidden").value = total.toFixed(2);
        }


        document
          .getElementById("producto")
          .addEventListener("change", calcularPresupuesto);
        document
          .getElementById("plazo")
          .addEventListener("input", calcularPresupuesto);
        document.querySelectorAll(".extra").forEach((el) => {
          el.addEventListener("change", calcularPresupuesto);
        });

        document
          .getElementById("presupuestoForm")
          .addEventListener("submit", function (event) {
            let valid = true;

            let nombre = document.getElementById("nombre").value;
            if (!/^[A-Za-zÀ-ÿ\s]{1,15}$/.test(nombre)) {
              document.getElementById("errorNombre").textContent =
                "Máximo 15 caracteres, solo letras.";
              valid = false;
            } else {
              document.getElementById("errorNombre").textContent = "";
            }

            let apellidos = document.getElementById("apellidos").value;
            if (!/^[A-Za-zÀ-ÿ\s]{1,40}$/.test(apellidos)) {
              document.getElementById("errorApellidos").textContent =
                "Máximo 40 caracteres, solo letras.";
              valid = false;
            } else {
              document.getElementById("errorApellidos").textContent = "";
            }

            let telefono = document.getElementById("telefono").value;
            if (!/^[0-9]{9}$/.test(telefono)) {
              document.getElementById("errorTelefono").textContent =
                "Debe tener 9 dígitos numéricos.";
              valid = false;
            } else {
              document.getElementById("errorTelefono").textContent = "";
            }

            let email = document.getElementById("email").value;
            if (!/^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
              document.getElementById("errorEmail").textContent =
                "Formato de email no válido.";
              valid = false;
            } else {
              document.getElementById("errorEmail").textContent = "";
            }

            if (!valid) {
              event.preventDefault();
            }
          });