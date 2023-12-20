document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
    const productList = document.getElementById('productList');
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');

    // Función para renderizar la lista de productos
    function renderProductList(productos) {
        productList.innerHTML = productos.map((producto, index) => {
            return `
                <li>
                    ${producto}
                    <button onclick="eliminarProducto(${index})">Eliminar</button>
                    <button onclick="actualizarProducto(${index})">Actualizar</button>
                </li>
            `;
        }).join('');
    }

    // Escuchar actualizaciones de la lista de productos
    socket.on('productos', (productos) => {
        renderProductList(productos);
    });

    // Enviar la solicitud para agregar un nuevo producto
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nuevoProducto = productNameInput.value.trim();

        if (nuevoProducto !== '') {
            socket.emit('agregarProducto', nuevoProducto);
            productNameInput.value = '';
        }
    });

            // Función para eliminar un producto
    window.eliminarProducto = function (index) {
        socket.emit('eliminarProducto', index);
    };

    // Función para actualizar un producto
    window.actualizarProducto = function (index) {
        const nuevoNombre = prompt('Ingrese el nuevo nombre del producto:');
        if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
            socket.emit('actualizarProducto', { index, nuevoProducto: nuevoNombre });
        }
    };
});