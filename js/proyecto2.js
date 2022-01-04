let nuevoPais;
let viajesnuevos = [];

const tabla = document.querySelector('#tabla');
const boton = document.querySelector('.botonsito');
const tbodyt = document.querySelector('.tbodyt');


document.addEventListener('DOMContentLoaded', () => {
    const viajesStorage = JSON.parse(localStorage.getItem('viajesnuevos'));
    viajesnuevos = viajesStorage;
    viajesStorage.forEach(nuevoPais=> {
       tbodyt.innerHTML += '<td>'+nuevoPais.pais+'</td><td>'+nuevoPais.dias+'</td><td>'+nuevoPais.mes+'</td>';
    });
});



boton.addEventListener('click', (e) => {
    guardarInfo()
});

tbodyt.addEventListener('click', (e) => {
    e.preventDefault();
    borrarinput(e)
});

function guardarInfo(){
    
    
    function Object(pais,dias,mesviaje){
    this.pais = pais;
    this.dias = dias;
    this.mes  = mesviaje;
}
 let paiscapturado = document.getElementById("pais").value;
 let diascapturado = document.getElementById("dias").value;
 let mescapturado = document.getElementById("mes").value;
 

 nuevoPais = new Object (paiscapturado,diascapturado,mescapturado);
 console.log(nuevoPais);

 diario();
 actualizarStorage();
 
 
};


function diario(){
    
    viajesnuevos.push(nuevoPais);
    console.log(viajesnuevos);

    tbodyt.innerHTML += '<td>'+nuevoPais.pais+'</td><td>'+nuevoPais.dias+'</td><td>'+nuevoPais.mes+'</td>';
    
};


function borrarinput(e){
    
     console.log(e.target.classList.contains('fa-check'))

};

function actualizarStorage() {

localStorage.setItem('viajesnuevos', JSON.stringify(viajesnuevos));
    
     
 };
