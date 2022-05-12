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


const tarjetas = document.querySelectorAll('.tarjeta-ind');

function voltearTarjeta() {
  this.classList.toggle('volteada');
}

tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', voltearTarjeta));