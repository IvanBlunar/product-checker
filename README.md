# product-checker
README.txt
==========

Nombre del Proyecto: Verificador de Productos por ISBN

Descripción:
------------
Este proyecto es una herramienta web que permite buscar información de productos utilizando su código ISBN. Al ingresar un ISBN en el campo correspondiente y presionar "Enter", se realiza una búsqueda en el archivo `products.json` y se muestra el resultado correspondiente.

Estructura de Archivos:
-----------------------
- /public_html/
  - index.html          → Página principal con el campo de búsqueda.
  - style.css           → Estilos CSS para la interfaz.
  - script.js           → Lógica JavaScript para realizar la búsqueda por ISBN.
  - product-checker/
    - products.json     → Contiene los datos de los productos en formato JSON.
    - sync.php          → Se utiliza sincronización de datos (no detallado aquí).
    - CO-1000.CSV       → Archivo CSV (propósito no especificado).
  - logo.png            → Imagen del logo.
  - favicon.ico         → Icono de la pestaña del navegador.


## ⚙️ Funcionamiento

1. El usuario abre la página `index.html`.
2. Ingresa un ISBN en el campo de texto.
3. Al presionar **Enter**, se ejecuta la función `buscarProducto()` desde `script.js`.
4. Esta función:
   - Lee el archivo `products.json`.
   - Busca coincidencias con el ISBN ingresado.
   - Muestra la información si encuentra una coincidencia.
   - Muestra un mensaje de error si no encuentra nada o el campo está vacío.

## ✅ Requisitos

- Navegador web moderno (con soporte para JavaScript ES6+)
- Servidor web local o en línea (por ejemplo, Apache o Nginx)

## 📝 Notas

- Asegúrate de que `products.json` esté correctamente formateado y accesible desde el navegador.
- Puedes actualizar los datos manualmente o mediante `sync.php` si está configurado.

## 👨‍💻 Autor

**Iván Bello**  
🌐 Sitio web: [https://productos.sanpablo.co](https://productos.sanpablo.co)

## 📅 Fecha

Abril 2025
