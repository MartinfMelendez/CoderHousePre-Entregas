import { agregarProducto, buscarProductoPorNombre, eliminarProductoPorId, filtrarProductos, agregarAlCarrito, sumarTotalCarrito, listarProductos, listarCarrito, eliminarProductoCarrito } from "./main.js";

const btnAgregar = document.getElementById("agregar");
const btnBuscar = document.getElementById("limpiarBusqueda");
const contenedorProductos = document.getElementById("listaProductos");
const contenedorCarrito = document.getElementById("carritoProductos");
const totalCarrito = document.getElementById("totalCarrito");

document.addEventListener("DOMContentLoaded", () => {
    crearCardsProductos();
    crearCardsCarrito();
    actualizarTotal();
});

btnAgregar.addEventListener("click", (e) => {

    e.preventDefault();

    try {

        const nombre = document.getElementById("nombre").value;
        const precio = Number(document.getElementById("precio").value);
        const categoria = document.getElementById("categoria").value;
        const marca = document.getElementById("marca").value;


        // Validaciones

        if (!nombre || !categoria || !marca) {
            return alert("Todos los campos son obligatorios");
        }

        if (!precio || precio <= 0) {
            return alert("El precio debe ser mayor a 0");
        }

        // Verificamos si existe
        const repetido =
            buscarProductoPorNombre(nombre);

        if (repetido) {
            return alert("El producto que intenta ingresar ya existe");
        }

        // Agregamos
        agregarProducto(nombre, precio, categoria, marca);

        alert("Producto agregado correctamente");

        // Actualizamos la interfaz
        crearCardsProductos();

        // Limpiamos formulario
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("categoria").value = "";
        document.getElementById("marca").value = "";

    } catch (error) {

        alert(error.message);

    }

});

btnBuscar.addEventListener("click", (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;

    if (!nombre) {
        return crearCardsProductos();
    }

    const productos =
        filtrarProductos(nombre);

    if (productos.length === 0) {

        alert("No hay productos con esa descripción");

        return;
    }

    crearCardsProductos(productos);

});

function crearCardsProductos(productos = listarProductos()) {

    contenedorProductos.innerHTML = "";

    if (productos.length === 0) {

        contenedorProductos.innerHTML =
            "<p>No hay productos disponibles.</p>";

        return;
    }

    productos.forEach(producto => {

        contenedorProductos.innerHTML += `
            <div class="card" id="${producto.id}">

                <h3>Nombre: ${producto.nombre}</h3>

                <p>Precio: $${producto.precio}</p>

                <p>Marca: ${producto.marca}</p>

                <p>Categoria: ${producto.categoria}</p>

                <button class="btnEliminar">
                    Eliminar
                </button>

                <button class="btnComprar">
                    Comprar
                </button>

            </div>
        `;

    });

}

function crearCardsCarrito(productos = listarCarrito()) {

    contenedorCarrito.innerHTML = "";

    if (productos.length === 0) {

        contenedorCarrito.innerHTML =
            "<p>El carrito está vacío.</p>";

        actualizarTotal();

        return;
    }

    productos.forEach(producto => {

        contenedorCarrito.innerHTML += `
            <div class="cardCarrito" id="${producto.id}">

                <h3>Nombre: ${producto.nombre}</h3>

                <p>Precio: $${producto.precio}</p>

                <p>Marca: ${producto.marca}</p>

                <p>Categoria: ${producto.categoria}</p>

                <button class="btnEliminarCarrito">
                    Eliminar
                </button>

            </div>
        `;

    });

}

contenedorProductos.addEventListener("click", (e) => {

    e.preventDefault();

    if (e.target.classList.contains("btnEliminar")) {

        const card = e.target.closest(".card");

        const id = Number(card.id);

        const eliminado = eliminarProductoPorId(id);

        if (eliminado) {

            alert(`Se eliminó el producto: ${eliminado.nombre}`);
        }

        crearCardsProductos();

    }

});

contenedorProductos.addEventListener("click", (e) => {

    e.preventDefault();

    if (e.target.classList.contains("btnComprar")) {

        const card = e.target.closest(".card");

        const id = Number(card.id);

        const producto = agregarAlCarrito(id);

        if (producto) {

            crearCardsCarrito();
            actualizarTotal();
        }

    }

});

contenedorCarrito.addEventListener("click", (e) => {

    e.preventDefault();

    if (e.target.classList.contains("btnEliminarCarrito")) {

        const card = e.target.closest(".cardCarrito");

        const id = Number(card.id);

        eliminarProductoCarrito(id);

        crearCardsCarrito();

        actualizarTotal();

    }

});

function actualizarTotal() {

    const total = sumarTotalCarrito();

    if (total === 0) {

        totalCarrito.innerText = "";

        return;
    }

    totalCarrito.innerText =
        `$ ${total.toFixed(2)}`;
}
