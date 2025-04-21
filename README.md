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
    - sync.php          → Posiblemente se utiliza para sincronización de datos (no detallado aquí).
    - CO-1000.CSV       → Archivo CSV (propósito no especificado).
  - logo.png            → Imagen del logo.
  - favicon.ico         → Icono de la pestaña del navegador.

Funcionamiento:
---------------
1. El usuario abre la página `index.html`.
2. Ingresa un ISBN en el campo de texto.
3. Al presionar "Enter", se ejecuta la función `buscarProducto()` desde `script.js`.
4. Esta función lee el archivo `products.json` y busca coincidencias con el ISBN ingresado.
5. Si encuentra un producto, muestra la información en pantalla; si no, informa que no se encontró nada.

Requisitos:
-----------
- Navegador web moderno (con soporte para JavaScript ES6+).
- Servidor web (por ejemplo, Apache o Nginx) para acceder correctamente a los archivos locales, especialmente `products.json`.

Notas:
------
- Asegúrate de que el archivo `products.json` esté correctamente formateado y accesible.
- Si necesitas actualizar los datos, puedes hacerlo directamente en `products.json` o usando `sync.php` si está configurado para eso.

Autor:
------
[Nombre del desarrollador o equipo, si aplica]

Fecha:
------
Abril 2025
