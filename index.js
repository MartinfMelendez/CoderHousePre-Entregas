import { agregarProducto, buscarProductoPorNombre, eliminarProductoPorId, filtrarProductos, agregarAlCarrito, sumarTotalCarrito, listarProductos, listarCarrito, eliminarProductoCarrito } from "./main.js";

document.addEventListener("DOMContentLoaded", () => { //Cargamos los productos al Iniciar el HTML

    createCard();
});

const btnAgregar = document.getElementById("agregar")
const btnBuscar = document.getElementById("limpiarBusqueda")


const contenedorProductos = document.getElementById("listaProductos")
const contenedorCarrito = document.getElementById("carritoProductos")

const carrito = document.getElementById("totalCarrito")


btnAgregar.addEventListener("click", (e) => {

    e.preventDefault()
    const nombre = document.getElementById("nombre").value;
    const precio = Number(document.getElementById("precio").value);
    const categoria = document.getElementById("categoria").value;
    const marca = document.getElementById("marca").value

    if (!nombre || !categoria || !marca) { //Validamos que se agreguen datos

        return alert("Todos los campos son obligatorios");
    }

    if (isNaN(precio) || precio <= 0) { //Verificamos que el precio sea un numero

        return alert("El precio debe ser mayor a 0");
    }

    const repetido = buscarProductoPorNombre(nombre)
    if (repetido) {
        return alert("El producto que intenta ingresar ya existe")
    }

    agregarProducto(nombre, precio, categoria, marca)

    alert("Producto agregado correctamente")

    createCard()


})

btnBuscar.addEventListener("click", () => {

    const name = document.getElementById("busqueda").value

    const productos = filtrarProductos(name)
    if (productos.length === 0) {
        return alert("No hay productos con esa descripcion")
    }
    createCard(productos)

})

function createCard(obj) { //Funcion para crear las Cards
    let productos = obj ?? listarProductos()

    if (!Array.isArray(productos)) {
        productos = [productos]
    }

    contenedorProductos.innerHTML = '' //Cada vez que buscamos limpiamos el HTML

    for (const producto of productos) {
        contenedorProductos.innerHTML += `  
                            <div class="card" id="${producto.id}">
                            <h3>Nombre: ${producto.nombre}</h3>
                            <p>Precio: $${producto.precio}</p> 
                            <p>Marca: ${producto.marca}</p>
                            <p>Categoria: ${producto.categoria}</p>
                            <button class="btnEliminar">Eliminar</button> <button class="btnComprar">Comprar</button> 
                        </div>`
    }
}

function createCardCarrito() { //Funcion para crear las Cards
    let productos = listarCarrito()

    if (!Array.isArray(productos)) {
        productos = [productos]
    }

    contenedorCarrito.innerHTML = '' //Cada vez que buscamos limpiamos el HTML

    for (const producto of productos) {
        contenedorCarrito.innerHTML += `  
                            <div class="cardCarrito" id="${producto.id}">
                            <h3>Nombre: ${producto.nombre}</h3>
                            <p>Precio: $${producto.precio}</p> 
                            <p>Marca: ${producto.marca}</p>
                            <p>Categoria: ${producto.categoria}</p>
                            <button class="btnEliminarCarrito">Eliminar</button> 
                        </div>`
    }
}


contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEliminarCarrito")) {
        const card = e.target.closest(".cardCarrito");
        const id = card.id;

        eliminarProductoCarrito(Number(id))

        createCardCarrito()

        const total = sumarTotalCarrito()

        carrito.innerText = `$ ${total}`

    }
})

contenedorProductos.addEventListener("click", (e) => {

    const card = e.target.closest(".card");

    if (!card) return;

    const id = Number(card.id);

    if (e.target.classList.contains("btnEliminar")) {
        eliminarProductoPorId(id);
        createCard();
    }

    if (e.target.classList.contains("btnComprar")) {
        agregarAlCarrito(id);
        createCardCarrito();

        const total = sumarTotalCarrito();
        carrito.innerText = `$ ${total}`;
    }
});
