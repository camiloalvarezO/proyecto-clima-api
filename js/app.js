const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');

const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    document.addEventListener('submit', buscarClima)
});

function buscarClima(e){
    e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarMensaje('Ambos campos son obligatorios')
        return;
    }
    console.log(ciudad);
    console.log(pais);
    //consultar la api
    consultarAPI(ciudad,pais);
}

function mostrarMensaje(mensaje){
    const alerta = document.querySelector('.bg-red-100')
    if(!alerta){

    const alerta = document.createElement('div');
        
    alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md', 'mx-auto','mt-6', 'text-center');

    alerta.innerHTML=`
        <strong class="font-bold">Error!</strong>
        <span class= "block">${mensaje}</span>
        `;

        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad,pais){
    const appId = '';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    Spinner();
    fetch(url).then( resultado => resultado.json())
    .then( datos => {
        console.log(datos);
        limpiarHTML();
        // console.log(datos)
        if(datos.cod === '404'){
            mostrarMensaje('Ciudad no encontrada')
            return;
        }

        // mostrar los datos en el html
        
        mostrarClima(datos)
    })
}

function mostrarClima(datos){
    const {name,main : {temp, temp_max,temp_min}} = datos
    const centigrados = kelvinAcentigrados(temp);
    const max = kelvinAcentigrados(temp_max);
    const min = kelvinAcentigrados(temp_min);

    const nombre = document.createElement('p');
    nombre.textContent = `clima en ${name}`;
    nombre.classList.add('font-bold','text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `
        ${centigrados} &#8451;`;
    actual.classList.add('font-bold','text-6xl')

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `temperatura máxima ${max} &#8451; `;
    tempMax.classList.add('text-xl')

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `temperatura minima ${min} &#8451; `;
    tempMin.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white')
    resultadoDiv.appendChild(nombre);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

// La función se puede hacer así tranquilamente, pero se puede hacer aún más compacto
// function kelvinAcentigrados(temperatura){
//     return parseInt(temperatura - 273.15);
// }

// la función helper sería así y más rapida
const kelvinAcentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){
    limpiarHTML();
    const divSpinner = document.createElement('div')
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