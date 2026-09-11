const dbProductos = []; //Se utiliza como base de datos
const carrito = []; //Se utiliza como carrito de compras

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

function agregarProducto(nombre, precio, categoria, marca) {
    console.log(nombre, precio, categoria, marca);
    if (!nombre || !categoria || !marca) { //Validamos que se agreguen datos
        console.log("Todos los campos son obligatorios");
        return;
    }

    if (typeof (precio) !== "number" || precio <= 0) { //Verificamos que el precio sea un numero
        console.log("El precio debe ser un valor numerico positivo");
        return;
    }
    const id = dbProductos.length + 1 //Se genera un id para cada producto
    const producto = new Producto(id, nombre.toLowerCase(), precio, categoria.toLowerCase(), marca.toLowerCase());
    dbProductos.push(producto);
}

function buscarProductoPorId(id) {

    const producto = dbProductos.find(producto => producto.id === id); //Si se encuentra el producto, lo retornamos

    if (!producto) {
        console.log("Producto no encontrado"); //Si no se encuentra el producto, retornamos un mensaje
        return false;
    }
    return producto;
}


function eliminarProductoPorId(id) {
    const index = dbProductos.findIndex(indice => indice.id === id)//Buscamos el indice del producto a eliminar

    if (index === -1) {
        console.log("Producto no encontrado");
        return false; //Si no se encuentra el producto, retornamos un mensaje
    }

    const productoEliminado = dbProductos.splice(index, 1)//Se elimina el producto del array y se guarda en una variable
    console.log(`Se eliminó el producto: ${productoEliminado[0].nombre}`) //Mostramos un mensaje de que se elimino el producto
    return productoEliminado[0] //Retornamos el producto eliminado
}

function buscarProductoPorNombre(nombre) {
    const productos = dbProductos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase())) //Buscamos los productos que contengan el nombre ingresado

    if (productos.length === 0) {
        console.log("No hay productos con esa descripcion"); //Si no se encuentra el producto, retornamos un mensaje
        return productos; //Si no se encuentra el producto, retornamos el array vacio
    }
    return productos;
}

//Listamos todos los productos con su precio con IVA
for (const producto of dbProductos) { //Listamos todos los productos con su precio con IVA
    console.log(`El precio con IVA para el ${producto.nombre} es de: $${producto.precioConIva()}`)
}

function agregarAlCarrito(id) {
    const producto = buscarProductoPorId(id); //Buscamos el producto por su id
    if (producto === false) { //Si no se encuentra el producto, retornamos un mensaje
        console.log("No se puede agregar al carrito, producto no encontrado");
        return;
    }
    console.log(`El ${producto.nombre} ${producto.marca} se ha agregado al carrito`); //Mostramos un mensaje de que se agrego el producto al carrito
    carrito.push(producto);
}

function sumarTotalCarrito() {
    if (carrito.length === 0) {
        console.log("El carrito esta vacio");
        return;
    }
    const total = carrito.reduce((acc, producto) => acc + producto.precioConIva(), 0); //Sumamos el precio de todos los productos del carrito
    console.log(`El precio final con IVA es de: $${total}`)
    return carrito;
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


//Ejecutamos las funciones de busqueda y eliminacion de productos
console.log(buscarProductoPorId(25)) //Buscamos un producto por su id
console.log(eliminarProductoPorId(15)) //Eliminamos un producto por su id
console.log(buscarProductoPorId(15))
console.log(buscarProductoPorNombre("disco")) //Buscamos un producto por su nombre


//Agregamos productos al carrito
agregarAlCarrito(25)
agregarAlCarrito(1)
agregarAlCarrito(9)

console.log(sumarTotalCarrito()) //Sumamos el total del carrito


