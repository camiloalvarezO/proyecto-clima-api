const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>{
    formulario.addEventListener('submit',cargardatos)
})

function cargardatos(e){
    e.preventDefault();


    //validamos
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        console.log("todos los campos son obligatorios");
        mostrarMensaje("todos los campos son obligatorios");
        return;
    }

    
    //traemos los datos
    consultarAPI(ciudad,pais)
}

function mostrarMensaje(mensaje){
    const alerta = document.querySelector(".bg-red-100")

    if(!alerta){

    const mensajeerror = document.createElement('div');

    mensajeerror.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3',
    'rounded','max-w-md','mx-auto','mt-6','text-center');

    mensajeerror.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
    `;
    formulario.appendChild(mensajeerror);
    setTimeout(() => {
        formulario.removeChild(mensajeerror)
    }, 4000);
}
}

function consultarAPI(ciudad,pais){

    const apikey = `a0804d42ff42b6337c35ea51e07e600f`;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apikey}`

    mostrarSpinner();
    debugger;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            limpiarHTML()
            console.log(resultado);
            if(resultado.cod === "404"){
                mostrarMensaje('Ciudad no encontrada');
                return;
            }
            
            mostrarClima(resultado)
        })
}

function mostrarClima(clima){
    // const bandera = document.querySelector('.centigrados')
    // if(!bandera){
    
    
    const {name,main: {temp,temp_max,temp_min}, } = clima;
    const centigrados = kelvinAcentigrados(temp);
    const tempmax = kelvinAcentigrados(temp_max);
    const tempmin = kelvinAcentigrados(temp_min);
    // const centigrados = Math.round(temp - 273.15);
    // const tempMax =Math.round( temp_max - 273.15);
    // const tempMin =Math.round (temp_min - 273.15);
    
    const ciudad =document.createElement('p');
    ciudad.classList.add('text-bold','text-xl')
    ciudad.textContent = `${name}`

    const rain1h = clima.rain['1h'];
    const prob = rain1h * 100;
    const lluvia1h = document.createElement('p');
    lluvia1h.classList.add('text-bold','text-xl')
    lluvia1h.textContent = `Probabilidad de lluvia en la proxima hora: ${prob}% `;

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('text-bold','text-6xl','centigrados');

    const max = document.createElement('p')
    max.innerHTML = `${tempmax} &#8451; max`;
    max.classList.add('text-bold','text-xl')

    const min = document.createElement('p');
    min.innerHTML = `${tempmin} &#8451; min `;
    min.classList.add('text-bold','text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');

    resultadoDiv.appendChild(ciudad);
    resultadoDiv.appendChild(lluvia1h);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(max);
    resultadoDiv.appendChild(min);
    resultado.appendChild(resultadoDiv);
    // }
    
}

//podemos convertir esta funcion a funcion helper, que es una que hace una sóla cosa
// function kelvinAcentigrados(temperatura){
// return parseInt(temperatura - 273.15);
// }

const kelvinAcentigrados = temperatura => parseInt(temperatura - 273.15);


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarSpinner(){
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}