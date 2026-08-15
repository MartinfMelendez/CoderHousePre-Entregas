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

const baseProductos = []; //Creacion del array productos

const esNumero = (dato) => !isNaN(dato); //Verifica que lo que se ingresa sea un numero

const productoRepetido = (producto) => baseProductos.includes(producto); //Verifico si ya existe el producto

const indiceProductoBuscado = (producto) => baseProductos.indexOf(producto);

const promptNull = (valor) => valor === null;

//Acciones sobre el array
function agregarProducto(producto) {
  baseProductos.push(producto); //Agrega producto al final del array
}

function eliminarUltimoProducto() {
  const productoEliminado = baseProductos.pop();
  return alert(`Se elimino el producto: ${productoEliminado}`); //Elimina el ultimo producto y lo muestra en un alert
}

function eliminarProductoEspecifico(producto) {
  const indice = indiceProductoBuscado(producto);
  if (indice === -1) {
    return alert("El producto ingresado no existe");
  }
  const productoEliminado = baseProductos.splice(indice, 1);
  return alert(`Se elimino el producto: ${productoEliminado}`);
}

function hayProductos() {
  //Funcion para valir si hay productos en el array
  if (baseProductos.length === 0) {
    alert("No hay productos en la lista");
    return false;
  }
  return true;
}

const productoNoExiste = (producto) => indiceProductoBuscado(producto) === -1;

function menuAgregarProdcuto() {
  do {
    const productoUsuario = prompt("Nombre del producto a ingresar:"); //Solicitar producto al usuario

    if (promptNull(productoUsuario)) {
      alert("Hasta luego");
      break;
    }

    if (productoUsuario === "") {
      alert("No se permite que este vacio el nombre del producto");
      continue;
    }

    const productoNormalizado = productoUsuario.toLocaleUpperCase();

    if (esNumero(productoNormalizado)) {
      alert("El producto ingresado no es valido, ingrese un producto valido");
      continue;
    }
    if (
      productoRepetido(productoNormalizado)
    ) //Se normaliza los datos para evitar problemas de key sensitive
    {
      alert("El producto ya existe en la lista, ingrese otro producto");
      continue;
    }

    agregarProducto(productoNormalizado); //Agrega el producto al array
    alert(`Producto agregado: ${productoNormalizado}`); //Muestra el producto agregado
  } while (confirm("Desea agregar un producto?"));
}

function menuEliminarUnProducto() {
  const productoAEliminar = prompt("Ingrese el producto que quiere eliminar");
  if (promptNull(productoAEliminar)) {
    return;
  }

  const normalizoProductoAEliminar = productoAEliminar.toLocaleUpperCase();

  if (normalizoProductoAEliminar === "") {
    eliminarUltimoProducto();
  } else {
    eliminarProductoEspecifico(normalizoProductoAEliminar);
  }
}

function menuBuscarUnProducto() {}

alert(`Bienvenido al simulador de productos.`);

let opciones;

do {
  opciones = prompt(
    "1-Agregar producto\n2-Eliminar un producto\n3-Buscar producto\n4-Listar productos\n 5-Salir",
  );

  if (promptNull(opciones)) {
    alert("Hasta luego");
    break;
  }

  switch (opciones) {
    case "1":
      menuAgregarProdcuto();
      break;
    case "2":
      if (!hayProductos()) {
        break;
      }
      menuEliminarUnProducto();
      break;
    case "3":
      const producto = prompt("Producto a buscar").toLocaleUpperCase();
      if (productoNoExiste(producto)) {
        alert("El producto ingresado no existe");
        break;
      } else {
        const indice = indiceProductoBuscado(producto);
        alert(`${indice + 1} - ${baseProductos[indice]}`);
        break;
      }
    case "4":
      break;
    case "5":
      alert("Hasta luego");
      break;
    default:
      alert("Opcion no valida");
      break;
  }
} while (opciones !== "5");
