const productos = [
    { Nombre: "Internet", Imagen: '/imgs/internet.jpg', Descripcion: 'La mejor conexión a internet para empresas y hogares con un servicio de alta disponibilidad y con la mayor cobertura del mercado.' },
    { Nombre: "Television", Imagen: '/imgs/flow.jpg', Descripcion: 'Televisión satelital, la mayor variedad de canales nacionales e internacionales y contenido on-demand las 24 horas.' },
    { Nombre: "Telefonia", Imagen: '/imgs/redmovil.jpg', Descripcion: 'Servicio de red movil con la mayor cobertura del mercado, roaming gratuito en toda américa, llamadas y SMS gratis.' },
]

// Tengo que crear uno de esto de arriba por cada uno y dsp se mete en el ID contenedorProductos

contProductos = document.getElementById("contenedorProductos")

// La siguiente función agrega productos en función del array de objetos "productos"
productos.forEach(function(producto) {
    htmlProducto = `
    <div class="col-4">
        <div class="card cardProducto text-center">
            <img src="${producto.Imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.Nombre}</h5>
                <p class="card-text">${producto.Descripcion}</p>
                <a href="/memotest.html" class="btn btn-primary">¡Lo quiero!</a>
            </div>
        </div>
    </div>
    `
    contProductos.innerHTML += htmlProducto
})