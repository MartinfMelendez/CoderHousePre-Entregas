/*

Entregable
Consigna: Checkpoint de Arrays

En esta entrega, integrarás lo aprendido sobre arrays en la estructura de proyecto que venimos desarrollando.
Criterios de Aceptación:

    El código debe ser funcional y no arrojar errores en la consola.
    Se deben utilizar al menos 3 métodos de arrays vistos en el módulo.
    El uso de for...of debe estar correctamente implementado para recorrer la lista.
    Se debe continuar trabajando con las herramientas vistas hasta el momento (funciones, condicionales, ciclos) en un entorno de simulador, no pueden ser herramientas sueltas.

Pasos sugeridos:

    Preparación de la Colección:
        Crea un array con un nombre semántico asociado a tu proyecto.
        Inicialízalo con al menos 5 elementos (strings o números).
    Manipulación Dinámica:
        Agrega un nuevo elemento al final del array usando push.
        Agrega uno al principio usando unshift.
        Elimina el último elemento y guárdalo en una variable para mostrarlo en un mensaje: "Se ha eliminado el elemento: [nombre]".
    Búsqueda y Validación:
        Solicita al usuario (mediante prompt o una variable fija) el nombre de un elemento para buscar.
        Usa includes para verificar si existe.
        Si existe, usa indexOf para informar en qué posición (índice) se encuentra.
    Actualización por Índice:
        Busca un índice específico y cambia su valor por uno nuevo implementando el método splice.
    Reporte Iterativo:
        Crea una función para recorrer el array.
        Dentro de la función, utiliza un bucle for...of para recorrer el array y mostrar cada elemento con un formato claro (ej: "Producto: Manzana").


*/

const productos = []; //Creacion del array productos

function agregarProducto(producto) {
  productos.push(producto); //Agrega producto al final del array
}

function eliminarUltimoProducto() {
  const productoEliminado = productos.pop();
  alert(`Se elimino el producto: ${productoEliminado}`); //Elimina el ultimo producto y lo muestra en un alert
}

function hayProducto(producto) {
  //Funcion para valir si hay productos en el array
  if (productos.length === 0) {
    alert("No hay productos en la lista");
    return false;
  }
  return true;
}

const esNumero = (dato) => !isNaN(dato); //Verifica que lo que se ingresa sea un numero

const productoRepetido = (producto) => productos.includes(producto);

alert(
  `Bienvenido al simulador de productos, actualmente hay ${productos.length} productos en la lista.`,
);

const opciones = prompt(
  "1-Agregar producto\n2-Eliminar un producto\n3-Buscar producto\n4-Listar productos",
);
console.log(opciones);

do {
  const productoUsuario = prompt("Nombre del producto a ingresar:"); //Solicitar producto al usuario
  if (productoUsuario === null || productoUsuario === "") {
    alert("No se permite que este vacio el nombre del producto");
    continue;
  }

  if (esNumero(productoUsuario)) {
    alert("El producto ingresado no es valido, ingrese un producto valido");
    continue;
  }
  if (
    productoRepetido(productoUsuario)
  ) //Se normaliza los datos para evitar problemas de key sensitive
  {
    alert("El producto ya existe en la lista, ingrese otro producto");
    continue;
  }

  agregarProducto(productoUsuario); //Agrega el producto al array
  alert(`Producto agregado: ${productoUsuario}`); //Muestra el producto agregado
} while (confirm("Desea agregar un producto?"));
