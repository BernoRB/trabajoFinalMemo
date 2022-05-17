puntajeObtenido = localStorage.getItem('puntajeObtenido')
segundosTardados = localStorage.getItem('segundosTardados')

// puntajeObtenido = 15
// segundosTardados = 30

function muestraRdos() {
    document.getElementById('rdosFinales').innerHTML = "Hiciste un puntaje de " + puntajeObtenido + " en " + segundosTardados + " segs"
    
    document.getElementById('rdosGanaste').innerHTML = "Eso significa que tenés un " + puntajeObtenido*2 + "% de descuento en los servicios que elijas contratar"

    if(segundosTardados < 30) {
        document.getElementById('rdosBonus').innerHTML = "Y como tardaste menos de 30 segundos, te llevás de regalo una GORRA"
    } else if (segundosTardados < 60) {
        document.getElementById('rdosBonus').innerHTML = "Y como tardaste menos de 60 segundos, te llevás de regalo una GORRA"
    } else if (segundosTardados < 90) {
        document.getElementById('rdosBonus').innerHTML = "Y como tardaste menos de 90 segundos, te llevás de regalo una GORRA"
    }
}

muestraRdos()