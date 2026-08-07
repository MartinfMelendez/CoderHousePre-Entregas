/*

Entregable
El Escenario

Debes continuar el desarrollo de tu simulador, implementando el uso de funciones para mejorar y modularizar procesos en tu script para simplificar la lógica y la reutilización de fragmentos de código sin la necesidad de repetirlos.
Criterios de Aceptación

El repositorio debe:

    Crea al menos 3 funciones siguiendo el algoritmo básico de todo programa (entradas de datos, procesamiento de datos y mostrar los resultado de salida de los mismos.)
    Uso de parámetros: Ingresar información para procesarla dentro de la funcion mediante el uso de parámetros y argumentos en todas las funciones.
    Uso de return: Al menos una funcion debe retornar un valor para utilizarse en el algoritmo.
    Función flecha: Al menos una funcion debe ser del tipo flecha, optimizando un proceso simple.
    Realizar llamadas(invocar) a las funciones que utilizaste en tu simulador
    Agrega los ciclos de iteración y condicionales necesarios, para que tu proyecto funcione correctamente.
    La interacción del simulador se hará íntegramente sobre la Consola y Alert, con los datos previamente solicitados mediante prompt.

Método de entrega

Sube tus archivos a un repositorio de GitHub y comparte la URL. Asegúrate de que el repositorio sea público para que pueda ser revisado.

*/

//Creacion del juego adivina el numero utilizando funciones

let intentos = 0;
const maxIntentos = 3;
let numeroSecreto = Math.floor(Math.random() * 10) + 1; //Creacion numero aleatorio entre 1 y 10
console.log(numeroSecreto);

function numeroInvalido(num1) {
  const resultado = num1 < 1 || num1 > 10 || isNaN(num1);
  return resultado;
}
const reiniciarJuego = () => {
  intentos = 0;
  numeroSecreto = Math.floor(Math.random() * 10) + 1;
  console.log(numeroSecreto);
};

function volverAJugar() {
  return confirm("¿Quiere volver a jugar?");
}

const juegoTerminado = (intentos) => {
  if (intentos === maxIntentos) {
  
    return true;
  } else {
    return false;
  }
};

while (intentos < maxIntentos) {
  const numeroUsuario = parseInt(prompt("Adivina el numero entre 1 y 10"));

  if (!numeroInvalido(numeroUsuario)) {
    intentos++;
    console.log(`Intento numero: ${intentos}`);
  } else {
    alert("El numero ingresado no es valido");
    continue;
  }

  if (numeroUsuario === numeroSecreto) {
    alert("Felicidades! Adivinaste el numero");
    if (volverAJugar()) {
      reiniciarJuego();
      continue;
    } else {
      break;
    }
  } else if (numeroUsuario < numeroSecreto) {
    alert("El numero ingresado es menor al numero secreto");
  } else {
    alert("El numero ingresado es mayor al numero secreto");
  }

  if (juegoTerminado(intentos)) {
      alert(`Game Over! El numero era ${numeroSecreto}`);
    if (volverAJugar()) {      
      reiniciarJuego();
      continue;
    } else {
      break;
    }
  }
}
