document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("isbn");

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      await buscarProducto();
    }
  });

  input.focus();

  const guardado = localStorage.getItem('producto');

  if (guardado) {
    const producto = JSON.parse(guardado);
    const resultadoDiv = document.getElementById("resultado");

    let precioFinal = parseFloat(producto.price.replace('.', '').replace(',', '.'));
    if (producto.tax === "1") {
      precioFinal *= 1.19;
    }

    resultadoDiv.innerHTML = `
      <strong>ISBN:</strong> ${producto.isbn}<br>
      <strong>Nombre:</strong> ${producto.name}<br>
      <strong>Precio:</strong> <span class="precio">$${new Intl.NumberFormat('es-CO').format(Math.round(precioFinal))}</span>
    `;

    localStorage.removeItem('producto');
  }
});

async function buscarProducto(desdeEscaner = false) {
  const isbnInputEl = document.getElementById("isbn");
  const isbnInput = isbnInputEl.value.trim();
  const resultadoDiv = document.getElementById("resultado");

  resultadoDiv.innerHTML = "";

  if (!isbnInput) {
    resultadoDiv.innerHTML = "Por favor, ingresa un ISBN.";
    return;
  }

  try {
    const response = await fetch('/product-checker/products.json'); // Asegúrate que esta ruta sea la correcta

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
      localStorage.setItem('producto', JSON.stringify(producto));
    } else {
      localStorage.setItem('producto', JSON.stringify({
        isbn: isbnInput,
        name: "Producto no encontrado",
        price: "0",
        tax: "0"
      }));
    }

    if (desdeEscaner) {
      window.location.href = '/';
    } else {
      const prod = producto || {
        isbn: isbnInput,
        name: "Producto no encontrado",
        price: "0",
        tax: "0"
      };

      let precioFinal = parseFloat(prod.price.replace('.', '').replace(',', '.'));
      if (prod.tax === "1") {
        precioFinal *= 1.19;
      }

let precioDescuento = precioFinal;
let descuentoTexto = '';
let precioSubrayado = '';

if (producto.discount && !isNaN(parseFloat(producto.discount))) {
  const porcentaje = parseFloat(producto.discount);
  const descuento = precioFinal * (porcentaje / 100);
  precioDescuento = precioFinal - descuento;

  descuentoTexto = `<div style="color: red; font-weight: bold;">-${porcentaje}% de descuento</div>`;
  precioSubrayado = `<s style="color: gray;">$${new Intl.NumberFormat('es-CO').format(Math.round(precioFinal))}</s>`;
} else {
  precioSubrayado = `$${new Intl.NumberFormat('es-CO').format(Math.round(precioFinal))}`;
}

resultadoDiv.innerHTML = `
  <strong>ISBN:</strong> ${producto.isbn}<br>
  <strong>Nombre:</strong> ${producto.name}<br>
  <strong>Precio:</strong> <span class="precio">${precioSubrayado}</span><br>
  ${descuentoTexto}
  <strong>Precio Final:</strong> <span style="font-size: 1.2em; font-weight: bold;">$${new Intl.NumberFormat('es-CO').format(Math.round(precioDescuento))}</span>
`;

    }

  } catch (error) {
    resultadoDiv.innerHTML = `Error: ${error.message}`;
    console.error(error);
  }

  isbnInputEl.value = "";
  isbnInputEl.focus();
}
