nombre = localStorage.getItem('nombre')
mail = localStorage.getItem('mail')
puntajeObtenido = localStorage.getItem('puntajeObtenido')
segundosTardados = localStorage.getItem('segundosTardados')
idProducto = localStorage.getItem('idProducto')


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


// Traemos los productos del JSON, aplicamos precio con descuento, mostramos, renderizamos en el html

fetch("../datosProductos.json")
  .then(res => res.json())
  .then(json => {
    console.log(json)
    productos = json.productos

    // Le paso los productos que coinciden con el producto que escogió al inicio
    for (i=0; i<productos.length; i++)
        if (productos[i].numProducto == idProducto)
            mostrarProductos(productos[i])
  })

elem = document.getElementById('contenedorProductosOfrecidos')

function mostrarProductos(producto){
    precioOriginal = producto.precio
    precioDesc = Math.round(precioOriginal * (1 - ((puntajeObtenido*2)/100)))
    productoNombre = producto.nombre

    htmlProductoOf = `
    <div class="col-4">
        <div class="card cardProducto text-center">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <br>
                <p class="card-text"><i>Precio original: $${precioOriginal}</i></p>
                <p class="card-text"><b>Precio con descuento: $${precioDesc}</b></p>
                <button onclick="eligioContratar('${productoNombre}')" class="btn btn-primary">¡Contratar!</a>
            </div>
        </div>
    </div>
    `
    elem.innerHTML = elem.innerHTML + htmlProductoOf
}

finalContrato = document.getElementById('tarjetaRdosFinal')

function eligioContratar(productoNombre) {
    finalContrato.innerHTML =
        `
        ¡Perfecto ${nombre}!, en breve un ejecutivo se estará contactando a tu mail ${mail} para finalizar
        la contratación del servicio "${productoNombre}". ¡Gracias!
        `
}