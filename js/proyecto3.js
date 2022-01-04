
const items = document.querySelector('.items');
const input1 = document.querySelector('#value1')
const input2 = document.querySelector('#value2')
const input3 = document.querySelector('#value3')
const tablabody = document.querySelector('.tablaBody');
const divimg = document.querySelector('#TOP');

let carrito = [];
let indice = 0;
let dpaises;


document.addEventListener('DOMContentLoaded', () => {

    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));

	carrito = carritoStorage || [];
    mostrarcarrito();

    $.ajax ({   
        method: 'GET',
        dataType: 'JSON',
        url:'js/dpaises.json',
      success: function (data, textStatus, hxr){
            dpaises = data;
            verviajes(data);
        
        },

        error: function (hxr, textStatus, error){
            console.log(hxr)
            console.log(textStatus);
            console.log(error);
        }
        });
      
         setiarimg()

    
    
});


$(".tfooter").append(`<button class="botonlimpiarcarrito">Vaciar carrito</button>`);
$(".tfooter").append(`<button class="botoncomprar">Comprar</button>`)
$("button.botonlimpiarcarrito").on('click', borrarcarrito);
$(".iconocarrito").on('click', (e) => {
          entraysale(e)
});

function setiarimg(){
    $(".portadas").hide();
    $("#1").show();   
}

function entraysale(e){
    e.preventDefault();
    $("#carritoid").slideToggle();
};
function mostrar(){
    $("#carritoid").show();
};


tablabody.addEventListener('click', (e) => {
       eliminarviaje(e)
});

tablabody.addEventListener('click', (e) => {
     sumarcantidad(e)
});

tablabody.addEventListener('click', (e) => {
     restarcantidad(e)
});


input1.addEventListener('click', () => {

    escuchandoalinput1(dpaises)
});

input2.addEventListener('click', () => {

    escuchandoalinput2(dpaises)
});

input3.addEventListener('click', () => {

   verviajes(dpaises);
})

items.addEventListener('click', e => {

    agregarcarrito(e);
    mostrar();
});



function verviajes(dpaises) {

    items.innerHTML = ""

    dpaises.forEach(viaje => {
        const crearhtml =
            `<div class="cards">
        <img src="${viaje.imagen}" alt="" class="imgcard">
        <h3>${viaje.pais}</h3>
        <h4>${viaje.fecha}</h4>
        <p>${viaje.dias}</p>
        <h2>${viaje.precio}</h2>
        <button class= "botonc" data-id ="${viaje.id}">Comprar</button>
    </div>`

        items.innerHTML += crearhtml;

    });
};



const agregarcarrito = e => {

    if (e.target.classList.contains("botonc")) {
        sumarcarrito(e.target.parentElement);
    };
};

const sumarcarrito = viaje => {
    const mostrarviaje = {

        pais: viaje.querySelector('h3').textContent,
        fecha: viaje.querySelector('h4').textContent,
        dias: viaje.querySelector('p').textContent,
        precio: viaje.querySelector('h2').textContent,
        id: viaje.querySelector('.botonc').dataset.id,
        cantidad: 1,
    };
    const existe = carrito.some(viaje => viaje.id === mostrarviaje.id);
    if (existe) {
        const nuevoCarrito = carrito.map(viaje => {
            if (viaje.id === mostrarviaje.id) {
                viaje.cantidad++;
            }
            return viaje;
        });
        carrito = [...nuevoCarrito];
    } else {
        carrito.push(mostrarviaje);
    }
      mostrarcarrito();
      actualizarStorage();
    
};




function mostrarcarrito() {

    tablabody.innerHTML = '';
    
     carrito.forEach(viaje => {
        const { pais, fecha, dias, precio, cantidad, id } = viaje;
        const agregarfila = document.createElement('tr');
      
        agregarfila.innerHTML = `<td>${pais}</td><td>${fecha}</td><td>${dias}</td><td>${precio}</td><td><button class="bresta" data-id="${id}">-</button>${cantidad}<button class="bsuma" data-id="${id}" >+</button></td><td><button class="beliminar" data-id="${id}">Eliminar</button></td>`
        


        tablabody.appendChild(agregarfila);
        
    });

};


function borrarcarrito(){

    carrito = [];
    mostrarcarrito();
    actualizarStorage();
    
};

function eliminarviaje(e){

     if(e.target.classList.contains("beliminar")){
    const guardarid = e.target.dataset.id;
    const quitardelcarrito = carrito.filter(viaje => viaje.id !== guardarid);
    carrito = [...quitardelcarrito];
    mostrarcarrito();
    actualizarStorage();
};
};

function sumarcantidad(e){

    if(e.target.classList.contains("bsuma")){
        //console.log(e.target.dataset.id)
        const guardarid = e.target.dataset.id;
        const existeid = carrito.some(viaje => viaje.id === guardarid);
        if (existeid) {
            const nuevoCarrito = carrito.map(viaje => {
                if (viaje.id === guardarid) {
                    viaje.cantidad++;
                };
                return viaje;
            });
            carrito = [...nuevoCarrito];
    };
    mostrarcarrito();
    actualizarStorage();
    } ;
};
 

function restarcantidad(e){

    if(e.target.classList.contains("bresta")){
        //console.log(e.target.dataset.id)
        const guardarid = e.target.dataset.id;
        const existeid = carrito.some(viaje => viaje.id === guardarid);
        if (existeid) {
            const nuevoCarrito = carrito.map(viaje => {
                let contador = viaje.cantidad;
                if (viaje.id === guardarid && contador > 1 ) {
                    viaje.cantidad--;
                };
                return viaje;
            });
            carrito = [...nuevoCarrito];
    };
    mostrarcarrito();
    actualizarStorage();
    };
};

function escuchandoalinput1(dpaises){

    items.innerHTML = ""
    
    const filtromayor = dpaises.filter(viaje => viaje.precio >= 100000);
    filtromayor.forEach(viaje=> {
        const crearhtml =
            `<div class="cards">
        <img src="${viaje.imagen}" alt="" class="imgcard">
        <h3>${viaje.pais}</h3>
        <h4>${viaje.fecha}</h4>
        <p>${viaje.dias}</p>
        <h2>${viaje.precio}</h2>
        <button class= "botonc" data-id ="${viaje.id}">Comprar</button>
    </div>`

        items.innerHTML += crearhtml;
    });

    
};

function escuchandoalinput2(dpaises){

    items.innerHTML = ""
    
    const filtromenor = dpaises.filter(viaje => viaje.precio <= 90000);
    filtromenor.forEach(viaje=> {
        const crearhtml =
            `<div class="cards">
        <img src="${viaje.imagen}" alt="" class="imgcard">
        <h3>${viaje.pais}</h3>
        <h4>${viaje.fecha}</h4>
        <p>${viaje.dias}</p>
        <h2>${viaje.precio}</h2>
        <button class= "botonc" data-id ="${viaje.id}">Comprar</button>
    </div>`

        items.innerHTML += crearhtml;
    });

    
};



function actualizarStorage() {

 localStorage.setItem('carrito', JSON.stringify(carrito));
  
};