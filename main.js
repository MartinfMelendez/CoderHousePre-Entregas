const STORAGE_PRODUCTOS = "productos";
const STORAGE_CARRITO = "carrito";

class Producto {

    constructor(id, nombre, precio, categoria, marca) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.marca = marca;
    }

    precioConIva() {
        return this.precio * 1.21;
    }

}

function guardarProductos() {
    localStorage.setItem(STORAGE_PRODUCTOS, JSON.stringify(dbProductos));
}

function cargarProductos() {
    const productosGuardados = localStorage.getItem(STORAGE_PRODUCTOS);
    // Si no hay productos guardados
    // devolvemos un array vacío

    if (!productosGuardados) {
        return [];
    }

    const productosJSON = JSON.parse(productosGuardados);

    const productos = [];


    // Recorremos los productos guardados

    for (const producto of productosJSON) {

        const nuevoProducto = new Producto(producto.id, producto.nombre, producto.precio, producto.categoria, producto.marca);

        productos.push(nuevoProducto);

    }

    return productos;

}

function guardarCarrito() {

    sessionStorage.setItem(STORAGE_CARRITO, JSON.stringify(dbCarrito));

}

function cargarCarrito() {
    try {
        const carritoGuardado = sessionStorage.getItem(STORAGE_CARRITO);

        // Si no hay carrito guardado

        if (!carritoGuardado) {

            return [];

        }

        const carritoJSON = JSON.parse(carritoGuardado);

        const carrito = [];

        // Recorremos los productos del carrito

        for (const producto of carritoJSON) {

            const nuevoProducto = new Producto(producto.id, producto.nombre, producto.precio, producto.categoria, producto.marca);

            carrito.push(nuevoProducto);

        }

        return carrito;
    } catch (error) {
        console.error("No se pudieron cargar los productos:", error);

        return [];
    } finally {
        console.log("Carga de productos finalizada");
    }


}

const dbProductos = cargarProductos();


const dbCarrito = cargarCarrito();

function listarProductos() {

    return dbProductos;

}

function listarCarrito() {

    return dbCarrito;

}

function agregarProducto(nombre, precio, categoria, marca) {

    try {

        let id = 1;

        // Si ya existen productos,
        // buscamos el último ID

        if (dbProductos.length > 0) {

            const ultimoProducto = dbProductos[dbProductos.length - 1];

            id = ultimoProducto.id + 1;

        }

        const producto = new Producto(id, nombre.trim().toLowerCase(), Number(precio), categoria.trim().toLowerCase(), marca.trim().toLowerCase()
        );

        dbProductos.push(producto);

        // Guardamos en localStorage

        guardarProductos();

        return producto;

    } catch (error) {

        console.error("Error al agregar producto:", error);

        throw error;

    }

}

function buscarProductoPorId(id) {

    const producto = dbProductos.find(producto => producto.id === id);

    if (!producto) {

        console.log("Producto no encontrado");

        return false;

    }

    return producto;

}

function buscarProductoPorNombre(nombre) {

    const producto = dbProductos.find(producto => producto.nombre.toLowerCase() === nombre.trim().toLowerCase()
    );

    if (!producto) {

        return false;

    }

    return producto;

}

function filtrarProductos(nombre) {

    return dbProductos.filter(producto => producto.nombre.toLowerCase().includes(nombre.trim().toLowerCase())
    );

}

function eliminarProductoPorId(id) {

    const index = dbProductos.findIndex(producto => producto.id === id);

    if (index === -1) {

        console.log("Producto no encontrado");

        return false;

    }

    const productoEliminado = dbProductos.splice(index, 1)[0];

    guardarProductos();

    return productoEliminado;

}

function agregarAlCarrito(id) {

    const producto = buscarProductoPorId(id);

    if (!producto) {

        console.log("Producto no encontrado");

        return false;

    }

    const existe = dbCarrito.find(producto => producto.id === id);

    if (existe) {
        alert("El producto ya está agregado al carrito");
        return false;
    }

    dbCarrito.push(producto);

    guardarCarrito();

    return producto;

}

function eliminarProductoCarrito(id) {

    const index = dbCarrito.findIndex(producto => producto.id === id);

    if (index === -1) {

        console.log("Producto no encontrado en el carrito");

        return false;

    }

    dbCarrito.splice(index, 1);

    guardarCarrito();

    return true;

}

function sumarTotalCarrito() {

    if (dbCarrito.length === 0) {
        return 0;
    }

    return dbCarrito.reduce((total, producto) => { return total + producto.precioConIva(); }, 0);

}

function cargarProductosIniciales() {

    if (dbProductos.length > 0) {
        return;
    }


    const productosIniciales = [

        ["Monitor", 75000, "Perifericos", "Asus"],

        ["Mouse", 7500, "Perifericos", "Redragon"],

        ["Teclado", 15000, "Perifericos", "Redragon"],

        ["Auriculares", 32000, "Audio", "HyperX"],

        ["Parlantes", 45000, "Audio", "Logitech"],

        ["Webcam", 28000, "Perifericos", "Logitech"],

        ["Notebook", 850000, "Computacion", "Lenovo"],

        ["Gabinete", 120000, "Componentes", "Thermaltake"],

        ["Placa de video", 650000, "Componentes", "Nvidia"],

        ["Procesador", 420000, "Componentes", "AMD"],

        ["Memoria RAM 16GB", 85000, "Componentes", "Kingston"],

        ["Disco SSD 1TB", 110000, "Almacenamiento", "Samsung"],

        ["Disco HDD 2TB", 95000, "Almacenamiento", "Western Digital"],

        ["Motherboard", 250000, "Componentes", "Gigabyte"],

        ["Fuente 650W", 135000, "Componentes", "Corsair"],

        ["Mousepad", 12000, "Perifericos", "Razer"],

        ["Microfono", 55000, "Audio", "HyperX"],

        ["Silla Gamer", 280000, "Muebles", "Corsair"],

        ["Tablet", 350000, "Moviles", "Samsung"],

        ["Smartphone", 720000, "Moviles", "Motorola"]

    ];


    for (const datos of productosIniciales) {

        const id = dbProductos.length + 1;


        const producto = new Producto(id, datos[0].toLowerCase(), datos[1], datos[2].toLowerCase(), datos[3].toLowerCase());

        dbProductos.push(producto);

    }

    guardarProductos();

}

cargarProductosIniciales();

export { agregarProducto, buscarProductoPorId, eliminarProductoPorId, buscarProductoPorNombre, filtrarProductos, agregarAlCarrito, sumarTotalCarrito, listarProductos, listarCarrito, eliminarProductoCarrito };
