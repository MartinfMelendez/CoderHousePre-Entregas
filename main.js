/*Entregable
Instrucciones paso a paso:

    Creación de la Estructura:
        Define una Clase llamada según tu proyecto (ejemplo: Producto, Item, Usuario).
        El constructor debe recibir al menos 4 parámetros para inicializar propiedades (ej: nombre, precio, categoria, stock).
    Añadir Comportamiento:
        Crea un método dentro de la clase que realice una operación lógica.
        Ejemplo: un método vender(cantidad) que reste el número del stock o un método aplicarDescuento(porcentaje) que modifique el precio.
    Instanciación:
        Crea al menos tres objetos diferentes usando la palabra clave new y guárdalos en constantes.
    Verificación:
        Ejecuta los métodos de tus objetos creados y usa console.log para mostrar los resultados finales de las propiedades modificadas.
    Contexto:
        El script debe continuar con la logica y herramientas (ciclos, funciones, etc.) del simulador elegido, siendo la Class y los objetos parte del mismo y no una aplicación aislada

Pasos sugeridos

    Define tu entidad: Piensa en qué vas a gestionar. Si es una tienda, tu entidad es  Producto . Si es un gimnasio, es  Socio .
    Escribe la clase: Define el  constructor  con los parámetros necesarios.
    Agrega lógica: Crea un método que haga un cálculo. Por ejemplo, si es un producto, un método  sumarIva()  que multiplique el precio por 1.21.
    Prueba tu código: Crea variables para tus objetos y usa  console.log  para ver si los métodos funcionan como esperas.

Entrega:

Sube tus archivos a un repositorio de GitHub y comparte la URL. Asegúrate de que el repositorio sea público para que pueda ser revisado.*/

const dbProductos = []; //Se utiliza como base de datos

class Producto {
    constructor(nombre, precio, categoria, marca) {
        this.id = dbProductos.length === 0 ? 1 : dbProductos[dbProductos.length - 1].id + 1; //Se hace un id autoincremental 
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.marca = marca;
    }

    precioConIva() { //Funcion para calcular el IVA de los productos
        return this.precio * 1.21;
    }
}

function addProducto(nombre, precio, categoria, marca) {
    console.log(nombre, precio, categoria, marca);
    if (!nombre || !categoria || !marca || !precio) { //Validamos que se agreguen datos
        console.log("Todos los campos son obligatorios");
        return;
    }

    if (typeof (precio) !== "number") { //Verificamos que el precio sea un numero
        console.log("El precio debe ser un valor numerico")
        return
    }

    const producto = new Producto(nombre, precio, categoria, marca);
    dbProductos.push(producto);
}
addProducto("Monitor", 75000, "Perifericos", "Asus");
addProducto("Mouse", 7500, "Perifericos", "Redragon");
addProducto("Teclado", 15000, "Perifericos", "Redragon");
addProducto("Prueba", "25000", "Perifericos", "Redragon");

console.log(dbProductos)

for (const producto of dbProductos) { //Listamos todos los productos con su precio con IVA
    console.log(`El precio con IVA para el ${producto.nombre} es de: $${producto.precioConIva()}`)
}


