/*Instrucciones del Checkpoint
1. Estructura de Decisión (Condicionales)

Debes usar if, else if y else para bifurcar el flujo. Por ejemplo: validar si un número es mayor que otro, si un string coincide con una clave, o si un usuario tiene permisos. Opcional: Puedes usar un switch si tienes múltiples opciones fijas (como un menú de selección).
2. Estructura de Repetición (Bucles)

Debes implementar al menos un bucle (for, while o do...while).

    Usa for si conoces la cantidad de veces que quieres repetir algo (ej: mostrar los números del 1 al 10).
    Usa while si la repetición depende de una condición que el usuario puede cambiar (ej: repetir hasta que el usuario escriba "ESC").
*/

//Creacion del juego adivina el numero

let continuar;
let intentos = 0;

let numeroSecreto = Math.floor(Math.random() * 10) + 1; //Creacion numero aleatorio entre 1 y 10
console.log(numeroSecreto);

alert(
  "Bienvenido al juego de adivina el numero, tienes 3 intentos para adivinar el numero secreto entre 1 y 10",
);

function validarNumeroIngresado(num1) {
  if (num1 < 0 || num1 > 10 || isNaN(num1)) {
    alert("El numero ingresado no es valido");
    return false;
  }
  return true;
}

const validarIntentos = (intentos) => {
  if (intentos === 3) {
    alert(`Game Over! El numero era ${numeroSecreto}`);
    continuar = confirm("Quieres jugar otra vez?");
    if (continuar) {
      numeroSecreto = Math.floor(Math.random() * 10) + 1; //Genera otro numero para el proximo juego
      console.log(numeroSecreto);
      return (intentos = 0);
    }
  }
};

while (intentos < 3) {
  const numeroUsuario = parseInt(prompt("Adivina el numero entre 1 y 10"));
  intentos++;
  console.log(`Intento numero: ${intentos}`);

  if (validarNumeroIngresado(numeroUsuario)) {
    if (numeroUsuario === numeroSecreto) {
      alert("Felicidades! Adivinaste el numero");
      continuar = confirm("Quieres jugar otra vez?");
      if (continuar) {
        numeroSecreto = Math.floor(Math.random() * 10) + 1; //Genera otro numero para el proximo juego
        intentos = 0;
      } else {
        break;
      }
    } else if (numeroUsuario < numeroSecreto) {
      alert("El numero ingresado es menor al numero secreto");
    } else {
      alert("El numero ingresado es mayor al numero secreto");
    }
  }

  validarIntentos(intentos);
}
