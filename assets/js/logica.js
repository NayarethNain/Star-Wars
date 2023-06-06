const URL_BASE = 'https://swapi.dev/api/';
const URL_CHARACTERS = URL_BASE + '/people/';
const cartas = {};
let gen1, gen2, gen3;

const obtenerDatos = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

//PINTA TARJETA
const pintaTarjeta = (personaje, carta, circulo) => {
  carta.innerHTML += `
  <div class="card m-3" style="width: 21rem; height: 9rem;">
  <div class="row g-0 justify-content-end">
    <div class="col-md-4 d-flex">
      <div id="${circulo}"class="circulo-card" ></div>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Nombre: ${personaje.name}</h5>
        <p class="card-text">Peso: ${personaje.mass}</p>
        <p class="card-text">Altura: ${personaje.height}</p>
      </div>
    </div>
  </div>
</div>

  `;
};


//Revela personaje
const revelaPersonajes = async (event, index) => {
  switch (index) {
    case 1:
      gen1.next();
      break;

    case 2:
      gen2.next();

      break;

    case 3:
      gen3.next();
      break;
  }
}
// generador 
async function* generador1() {
  const carta1 = document.getElementById('carta1');
  for (let i = 1; i <= 5; i++) {
    const personaje = await obtenerDatos(URL_CHARACTERS + i);
    console.log(personaje);
    pintaTarjeta(personaje, carta1, 'circulo');
    yield personaje.name;
  }
}

// generador 2
async function* generador2() {
  const carta2 = document.getElementById('carta2');
  for (let i = 6; i <= 10; i++) {
    const personaje = await obtenerDatos(URL_CHARACTERS + i);
    console.log(personaje);
    pintaTarjeta(personaje, carta2, 'circulo2');
    yield personaje.name;
  }
}

// generador 3
async function* generador3() {
  const carta3 = document.getElementById('carta3');
  for (let i = 12; i <= 16; i++) {
    const personaje = await obtenerDatos(URL_CHARACTERS + i);
    console.log(personaje);
    pintaTarjeta(personaje, carta3, 'circulo3');
    yield personaje.name;
  }
}



//Dom
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 1; i <= 3; i++) {
    const boton = document.getElementById(`boton${i}`);
    const carta = document.getElementById(`carta${i}`);
    cartas[`carta${i}`] = carta;
    boton.addEventListener('mouseover', (event) => revelaPersonajes(event, i));

  }
  gen1 = generador1();
  gen2 = generador2();
  gen3 = generador3();








});

