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
let yaInicio = false
let sigueSegundero = true
let rtasCorrectas = 0
let segundos = 0
let tiempoFinal = 0
// Click para iniciar juego
botonInicio = document.getElementById('botonInicio')
botonInicio.addEventListener('click', iniciarJuego)
// Click para reglas
botonInicio = document.getElementById('botonReglas')
botonInicio.addEventListener('click', mostrarReglas)

// document.getElementById('seccionNombre').innerHTML = "Jugador: " + localStorage.getItem('nombre');

/*  EJECUTADO CON EL CLICK DEL BOTON REGLAS */

function mostrarReglas() {
    alert("Al hacer click en INICIAR JUEGO se mostrarán las cartas por unos segundos. Luego deberá adivinar los pares. \n\nPor cada acierto suma 3 puntos, por cada error resta 1. ¡Buena suerte!")
}

/*  EJECUTADO CON EL CLICK DEL BOTON INICIO */

function iniciarJuego() {
    // Checkeo que no lo inicie mas de una vez
    if (yaInicio)
        return
    yaInicio = true

    // Las mezclamos, las mostramos unos segundos
    mezclarTarjetas()
    muestraInicial()

    //Ejecuta sumaSegundos cada segundo
    setInterval(sumaSegundos, 1000)

    // Recien ahora podran clickear las tarjetas
    tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', voltearTarjeta))
}

// Asique para mezclar recorremos las y les asignamos un numero random
function mezclarTarjetas() {
    tarjetas.forEach(tarjeta => {
        let posicion = Math.floor(Math.random() * 12);
        tarjeta.style.order = posicion;
    });
}

// Muestra las imagenes unos segundos y luego las vuelve a ocultar
function muestraInicial() {
    setTimeout(() => {
        tarjetas.forEach(tarjeta => tarjeta.classList.add('volteada'))
    }, 500);
    setTimeout(() => {
        tarjetas.forEach(tarjeta => tarjeta.classList.remove('volteada'))
    }, 2500);
}



/* MANEJO TARJETAS  */

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
        sumarPuntos()
    } else {
        desVoltearTarjetas()
        restarPuntos() // Si no hay acierto, las desvolteamos
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



/* CONTEO DE PUNTOS */

puntaje = 0

function sumarPuntos() {
    puntaje += 3
    setTimeout(() => { //con delay asi coincide con la volteada
        document.getElementById('seccionPuntaje').innerHTML = "Puntaje: " + puntaje
    }, 1000);
    rtasCorrectas++
    if (rtasCorrectas == 6)
        terminoJuego()
}

function restarPuntos() {
    if (puntaje > 0)
        puntaje--
    setTimeout(() => {
        document.getElementById('seccionPuntaje').innerHTML = "Puntaje: " + puntaje
    }, 1000);
}


/* CRONOMETRO */

function sumaSegundos() {
    if (sigueSegundero) {
        segundos += 1;
        document.getElementById('seccionTiempo').innerHTML = "Tiempo: " + segundos + " segs";
    }
}


/* TERMINA EL JUEGO */

function terminoJuego() {
    sigueSegundero = false // Detenemos el timer
    console.log("Termino el juego. Hiciste "+puntaje+" puntos y tardaste "+segundos+" segundos.")
    // Ocultamos botones previos, mostramos nuevo botón de avanzar
    document.getElementById('botonAvanzar').style.display = "flex"
    document.getElementById('botonReglas').style.display = "none"
    document.getElementById('botonInicio').style.display = "none"
    // Guardamos en storage
    localStorage.setItem("puntajeObtenido",puntaje)
    localStorage.setItem("segundosTardados",segundos)
}

botonJugar = document.getElementById('botonAvanzar')
botonJugar.addEventListener('click', avanzarJuego)






