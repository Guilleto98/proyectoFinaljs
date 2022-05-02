const contenedorProductos = document.getElementById('contenedorProductos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('contadorCarrito')
const precioFinal = document.getElementById('precioFinal')



let carrito = []

document.addEventListener('DOMContentLoaded', () =>{
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})



stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src="${producto.img}" alt=""/>
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">LO QUIERO <i class fas-fa-shopping-cart></button>
    `

    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id)
    })
})
  
// 1- PRIMER PASO

// AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA EN CARRITO
    const existe = carrito.some (prod => prod.id === prodId)

    if(existe){  // SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
        const prod = carrito.map (prod =>{ // creamos un nuevo arreglo e iteramos sobre cada curso y cuando // map encuentre cual es igual al que está agregado, le suma la cantidad
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else{// EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO

    const item = stockProductos.find((prod) => prod.id === prodId)// Trabajamos con ID
    //Una vez obtenida la ID, lo que haremos es un push para agregar al carrito
    carrito.push(item)
    console.log(carrito)
}
// Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito
actualizarCarrito()
}
// Le pasamos el ID por parametro. Tenemos que asignarle como evento a esta funcion al boton con el id de su producto correspondiente


const eliminarDelCarrito = (prodId) =>{
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) // Busca el elemento que le pase y devuelve su indice
    carrito.splice(indice, 1) // Le paso el indice de mi elemente ITEM y borra un elemento
    actualizarCarrito() // Llamo a la función creada, cada vez que se modifica el carrito
    console.log(carrito)
}

const actualizarCarrito = () =>{

    contenedorCarrito.innerHTML = "" // Cada vez que llame actualizar Carrio, lo primero que hago es borrar el nodo. Y después recorro el array, lo actualizo de nuevo y se rellana con la info actualizada

    carrito.forEach((prod) =>{
        const div = document.createElement('div')
        div.clssName = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio}</p>
        <p>Cantidad: <span id= "cantidad">${prod.cantidad}</span></p>
        <button onclick= "eliminarDelCarrito(${prod.id})" class="boton.eliminar"><i class="fas fa-trash-alt"></button>
        `

        contenedorCarrito.appendChild(div)


        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio,0)
    precioFinal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio,0)
}


