nombre = localStorage.getItem('nombre')
mail = localStorage.getItem('mail')
puntajeObtenido = localStorage.getItem('puntajeObtenido')
segundosTardados = localStorage.getItem('segundosTardados')
idProducto = localStorage.getItem('idProducto')

// puntajeObtenido = 15
// segundosTardados = 30

function muestraRdos() {
    document.getElementById('rdosFinales').innerHTML = `Hiciste un puntaje de ${puntajeObtenido} en ${segundosTardados} segundos`
    document.getElementById('rdosGanaste').innerHTML = "Eso significa que tenés un " + puntajeObtenido * 2 + "% de descuento en el servicio que elijas contratar"
    document.getElementById('rdosTitulo').innerHTML = `Felicitaciones ${nombre}`
    rdosBonus = document.getElementById('rdosBonus')
    if (segundosTardados < 30) {
        rdosBonus.innerHTML = "Y como tardaste menos de 30 segundos, te llevás de regalo un TERMO"
    } else if (segundosTardados < 60) {
        rdosBonus.innerHTML = "Y como tardaste menos de 60 segundos, te llevás de regalo un BOTELLA TERMICA"
    } else if (segundosTardados < 90) {
        rdosBonus.innerHTML = "Y como tardaste menos de 90 segundos, te llevás de regalo una GORRA"
    }
}

muestraRdos()