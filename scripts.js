/* PRIMER ENTREGA
El estudiante deberá codificar la funcionalidad inicial del simulador. 
Identificando el flujo de trabajo en el script en términos de captura de entradas ingresadas por el usuario, 
procesamiento esencial del simulador y notificación de resultados en forma de salida.
*/

/* SEGUNDA ENTREGA
El estudiante deberá codificar las funcionalidades mínimas del simulador. Identificando el flujo de trabajo
en el script en términos de captura de entradas y eventos de usuario, funciones de procesos esenciales y 
notificación de resultados en forma de salida por HTML, modificando el DOM.

En caso de requerir un volumen de información estàtica significante, el estudiante deberá emplear objetos 
literales y/o parseo JSON, tanto para obtener como para almacenar datos.
*/

// Seleccionamos las tarjetas
const tarjetas = document.querySelectorAll('.tarjeta-ind')
// Iniciamos variables globales que luego usamos
let hayVolteada = false
let impedirVoltear = false
let primeraTarjeta, segundaTarjeta

// Las mezclamos, las mostramos unos segundos
mezclarTarjetas()
muestraInicial()

// Hay una propiedad llamada ORDER. Por defecto la tienen en 0 asique se ponen en el orden que estan declaradas en el HTML.
// Asique para mezclar recorremos las y les asignamos un numero random
function mezclarTarjetas() {
  tarjetas.forEach(tarjeta => {
    let posicion = Math.floor(Math.random() * 12);
    tarjeta.style.order = posicion;
  });
}

function muestraInicial(){
  tarjetas.forEach(tarjeta => tarjeta.classList.add('volteada'))
  setTimeout(() => {
    tarjetas.forEach(tarjeta => tarjeta.classList.remove('volteada'))
  }, 2000);
}


function voltearTarjeta() {
  if ((impedirVoltear) || (this == primeraTarjeta))   //Antes que nada, metemos esto asi no puede voltear mas de dos al mismo tiempo y asi no puede dar dos clicks a la misma y romper todo
    return
  this.classList.add('volteada')   //Agregamos la clase 'volteada' a esta tarjeta
  if (!hayVolteada) {   // Se fija si hay alguna volteada. Si no, ahora si hay, y esta es la primera.
    hayVolteada = true
    primeraTarjeta = this
  } else {
    segundaTarjeta = this     // Si esta aca es porque ya hay volteada, osea esta es la segunda carta, asique ponemos esta, reseteamos el hayVolteada
    hayVolteada = false
    impedirVoltear = true     // Ya hay dos, impedimos voltear una tercera y luego lo volvemos a habilitar al terminar de analizar si es o no igual
    verCoincidencia()    // Llamamos a la función que se encarga de ver si las dos volteadas coinciden, no sin antes bloquear el tablero
  }
}

function verCoincidencia() {
  if (primeraTarjeta.dataset.producto == segundaTarjeta.dataset.producto) {
    bloquearTarjetas()    // Si hay acierto, quitamos el listener para que no se puedan voltear nuevamente
  } else {
    desVoltearTarjetas()    // Si no hay acierto, las desvolteamos
  }
} 

function bloquearTarjetas() {
  primeraTarjeta.removeEventListener('click', voltearTarjeta)
  segundaTarjeta.removeEventListener('click', voltearTarjeta)
  primeraTarjeta = null // Si no, por lo de this != primera tarjeta, no podrias tocar dos veces seguidas la misma como primera, cosa q es muy normal en este juego
  impedirVoltear = false
}

function desVoltearTarjetas() {
  setTimeout(() => { // Esperamos unos segundos antes de desvoltearlas para que se vea mas lindo
    primeraTarjeta.classList.remove('volteada')
    segundaTarjeta.classList.remove('volteada')
    primeraTarjeta = null
    impedirVoltear = false
  }, 1000);
}

// Escucha evento de click para ejecutar la volteada
tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', voltearTarjeta))