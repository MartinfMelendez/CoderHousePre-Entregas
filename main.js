

const dbProductos = []; //Se utiliza como base de datos

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
    if (!nombre || !categoria || !marca || !precio) { //Validamos que se agreguen datos
        console.log("Todos los campos son obligatorios");
        return;
    }

    if (typeof (precio) !== "number" || precio <= 0) { //Verificamos que el precio sea un numero
        console.log("El precio debe ser un valor numerico positivo");
        return
    }
    const id = dbProductos.length + 1 //Se genera un id para cada producto
    const producto = new Producto(id, nombre, precio, categoria, marca);
    dbProductos.push(producto);
}

function buscarProductoPorId(id) {

    const producto = dbProductos.find(producto => producto.id === id); //Si se encuentra el producto, lo retornamos

    if (!producto) {
        return "Producto no encontrado"; //Si no se encuentra el producto, retornamos un mensaje
    }
    return producto;
}



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

console.log(dbProductos)

for (const producto of dbProductos) { //Listamos todos los productos con su precio con IVA
    console.log(`El precio con IVA para el ${producto.nombre} es de: $${producto.precioConIva()}`)
}

console.log(buscarProductoPorId("30")) //Buscamos un producto por su id

