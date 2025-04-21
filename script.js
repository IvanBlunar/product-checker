document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("isbn");

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      await buscarProducto();
    }
  });

  input.focus();
});

async function buscarProducto() {
  const isbnInputEl = document.getElementById("isbn");
  const isbnInput = isbnInputEl.value.trim();
  const resultadoDiv = document.getElementById("resultado");

  resultadoDiv.innerHTML = ""; // Limpiar resultado anterior

  if (!isbnInput) {
    resultadoDiv.innerHTML = "Por favor, ingresa un ISBN.";
    return;
  }

  try {
    const response = await fetch('/product-checker/products.json');

    if (!response.ok) {
      throw new Error(`Error al cargar el archivo: ${response.status}`);
    }

    const productosRaw = await response.json();

    const productos = productosRaw.map(entry => {
      const key = Object.keys(entry)[0];
      const campos = key.split('|');
      const valores = entry[key].split('|');

      const producto = {};
      campos.forEach((campo, index) => {
        producto[campo] = valores[index] || "";
      });

      return producto;
    });

    const producto = productos.find(p => p.isbn === isbnInput || p.isbn === '00000' + isbnInput);

    if (producto) {
      let precioFinal = parseFloat(producto.price.replace('.', '').replace(',', '.'));
      if (producto.tax === "1") {
        precioFinal *= 1.19;
      }

      resultadoDiv.innerHTML = `
        <strong>ISBN:</strong> ${producto.isbn}<br>
        <strong>Nombre:</strong> ${producto.name}<br>
        <strong>Precio:</strong> <span class="precio">$${new Intl.NumberFormat('es-CO').format(Math.round(precioFinal))}</span>
      `;
    } else {
      resultadoDiv.innerHTML = "Producto no encontrado.";
    }

  } catch (error) {
    resultadoDiv.innerHTML = `Error: ${error.message}`;
    console.error(error);
  }

  // Limpiar input y volver a enfocar
  isbnInputEl.value = "";
  isbnInputEl.focus();
}


