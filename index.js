import { agregarProducto, buscarProductoPorId, buscarProductoPorNombre, eliminarProductoPorId, filtrarProductos, agregarAlCarrito, sumarTotalCarrito, listarProductos, listarCarrito, eliminarProductoCarrito } from "./main.js";

document.addEventListener("DOMContentLoaded", (e) => { //Cargamos los productos al Iniciar el HTML
    e.preventDefault()
    createCard();
});

const btnAgregar = document.getElementById("agregar")
const btnBuscar = document.getElementById("limpiarBusqueda")


const contenedorProductos = document.getElementById("listaProductos")
const contenedorCarrito = document.getElementById("carritoProductos")


btnAgregar.addEventListener("click", (e) => {
    try {
        e.preventDefault()
        const nombre = document.getElementById("nombre").value;
        const precio = Number(document.getElementById("precio").value);
        const categoria = document.getElementById("categoria").value;
        const marca = document.getElementById("marca").value

        if (!nombre || !categoria || !marca) { //Validamos que se agreguen datos

            return alert("Todos los campos son obligatorios");
        }

        if (typeof (precio) !== "number" || precio <= 0) { //Verificamos que el precio sea un numero

            return alert("El precio debe ser mayor a 0");
        }

        const repetido = buscarProductoPorNombre(nombre)
        if (repetido) {
            return alert("El producto que intenta ingresar ya existe")
        }

        agregarProducto(nombre, Number(precio), categoria, marca)

        alert("Producto agregado correctamente")

        createCard()

    } catch (error) {
        alert(error)
    }

})

btnBuscar.addEventListener("click", (e) => {
    e.preventDefault()
    const name = document.getElementById("busqueda").value
    console.log(name)

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

function createCardCarrito(obj) { //Funcion para crear las Cards
    let productos = obj ?? listarCarrito()

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

contenedorProductos.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.classList.contains("btnEliminar")) {
        const card = e.target.closest(".card");
        const id = card.id;
        eliminarProductoPorId(Number(id))
        createCard()
    }
})


contenedorCarrito.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.classList.contains("btnEliminarCarrito")) {
        const card = e.target.closest(".cardCarrito");
        const id = card.id;

        eliminarProductoCarrito(Number(id))

        createCardCarrito()
        const carrito = document.getElementById("totalCarrito")

        const total = sumarTotalCarrito()
        console.log(total)
        if (total === undefined) {
            carrito.innerText = ""
            return;
        }
        carrito.innerText = `$ ${total}`

    }
})


contenedorProductos.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.classList.contains("btnComprar")) {
        const card = e.target.closest(".card");
        const id = card.id;
        agregarAlCarrito(Number(id))
        createCardCarrito()

        const carrito = document.getElementById("totalCarrito")

        const total = sumarTotalCarrito()

        carrito.innerText = `$ ${total}`
    }
})