const dbProductos = []; //Se utiliza como base de datos
const dbCarrito = []; //Se utiliza como carrito de compras

class Producto {
    constructor(id, nombre, precio, categoria, marca) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.marca = marca;
    }

    precioConIva() { //Funcion para calcular el IVA de los productos
        return this.precio * 1.21;
    }
}

function listarProductos() {

    return dbProductos
}

function listarCarrito() {

    return dbCarrito
}

function agregarProducto(nombre, precio, categoria, marca) {

    const id = dbProductos.length + 1 //Se genera un id para cada producto
    const producto = new Producto(id, nombre.toLowerCase(), precio, categoria.toLowerCase(), marca.toLowerCase());
    dbProductos.push(producto);


}

function buscarProductoPorId(id) {

    const producto = dbProductos.find(producto => producto.id === id); //Si se encuentra el producto, lo retornamos

    if (!producto) {

        return false;
    }
    return producto;
}


function eliminarProductoPorId(id) {
    const index = dbProductos.findIndex(indice => indice.id === id)//Buscamos el indice del producto a eliminar

    if (index === -1) {

        return false; //Si no se encuentra el producto, retornamos un mensaje
    }

    const productoEliminado = dbProductos.splice(index, 1)//Se elimina el producto del array y se guarda en una variable

    return alert(`Se eliminó el producto: ${productoEliminado[0].nombre}`) //Retornamos el producto eliminado
}

function buscarProductoPorNombre(nombre) {
    const producto = dbProductos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase())
    if (!producto) {

        return false;
    }
    return producto
}

function filtrarProductos(nombre) {
    const productos = dbProductos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase())) //Buscamos los productos que contengan el nombre ingresado

    return productos;
}


function agregarAlCarrito(id) {
    const producto = buscarProductoPorId(id); //Buscamos el producto por su id
    if (producto === false) { //Si no se encuentra el producto, retornamos un mensaje
        console.log("No se puede agregar al carrito, producto no encontrado");
        return;
    }

    const existe = dbCarrito.find(producto => producto.id === id)
    if (existe) {
        return alert("El producto ya esta agregado")
    }
    dbCarrito.push(producto);
}

function sumarTotalCarrito() {

    return dbCarrito.reduce((acc, producto) => acc + producto.precioConIva(), 0); //Sumamos el precio de todos los productos del carrito

}

function eliminarProductoCarrito(id) {
    const index = dbCarrito.findIndex(indice => indice.id === id)
    dbCarrito.splice(index, 1)
}

//Agregamos productos a la base de datos
agregarProducto("Monitor", 75000, "Perifericos", "Asus");
agregarProducto("Mouse", 7500, "Perifericos", "Redragon");
agregarProducto("Teclado", 15000, "Perifericos", "Redragon");
agregarProducto("Auriculares", 32000, "Audio", "HyperX");
agregarProducto("Parlantes", 45000, "Audio", "Logitech");
agregarProducto("Webcam", 28000, "Perifericos", "Logitech");
agregarProducto("Notebook", 850000, "Computacion", "Lenovo");
agregarProducto("Gabinete", 120000, "Componentes", "Thermaltake");
agregarProducto("Placa de video", 650000, "Componentes", "Nvidia");
agregarProducto("Procesador", 420000, "Componentes", "AMD");
agregarProducto("Memoria RAM 16GB", 85000, "Componentes", "Kingston");
agregarProducto("Disco SSD 1TB", 110000, "Almacenamiento", "Samsung");
agregarProducto("Disco HDD 2TB", 95000, "Almacenamiento", "Western Digital");
agregarProducto("Motherboard", 250000, "Componentes", "Gigabyte");
agregarProducto("Fuente 650W", 135000, "Componentes", "Corsair");
agregarProducto("Mousepad", 12000, "Perifericos", "Razer");
agregarProducto("Micrófono", 55000, "Audio", "HyperX");
agregarProducto("Silla Gamer", 280000, "Muebles", "Corsair");
agregarProducto("Tablet", 350000, "Moviles", "Samsung");
agregarProducto("Smartphone", 720000, "Moviles", "Motorola");


export { agregarProducto, eliminarProductoPorId, buscarProductoPorNombre, filtrarProductos, agregarAlCarrito, sumarTotalCarrito, listarProductos, listarCarrito, eliminarProductoCarrito }