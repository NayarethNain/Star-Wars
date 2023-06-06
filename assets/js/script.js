const URL_BASE = 'https://swapi.dev/api/';
const URL_CHARACTERS = URL_BASE + 'people/';
const cartas = {};
let gen1, gen2, gen3;

const obtenerDatos = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

// PINTA TARJETA
const pintaTarjeta = (personaje, carta) => {
  carta.innerHTML += `
    <div class="card m-3" style="width: 21rem; height: 9rem;">
      <div class="row g-0 justify-content-end">
        <div class="col-md-4 d-flex">
          <div id="circulo" class="circulo-card"></div>
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

// Revela personajes
const revelaPersonajes = async (event, index) => {
  switch (index) {
    case 1:
      const carta1 = document.getElementById('carta1');
      if (!carta1.innerHTML) {
        const response = await obtenerDatos(URL_CHARACTERS);
        const personajes = response.slice(0, 5);
        personajes.forEach(personaje => {
          pintaTarjeta(personaje, carta1);
        });
      }
      break;

    case 2:
      const carta2 = document.getElementById('carta2');
      if (!carta2.innerHTML) {
        const response = await obtenerDatos(URL_CHARACTERS);
        const personajes = response.slice(5, 11);
        personajes.forEach(personaje => {
          pintaTarjeta(personaje, carta2);
        });
      }
      break;

    case 3:
      const carta3 = document.getElementById('carta3');
      if (!carta3.innerHTML) {
        const response = await obtenerDatos(URL_CHARACTERS);
        const personajes = response.slice(11, 17);
        personajes.forEach(personaje => {
          pintaTarjeta(personaje, carta3);
        });
      }
      break;
  }
}

// Generador
async function* generador1() {
  const carta1 = document.getElementById('carta1');
  const response = await obtenerDatos(URL_CHARACTERS);
  const personajes = response.slice(0, 5);
  personajes.forEach(personaje => {
    pintaTarjeta(personaje, carta1);
  });
  yield* personajes.map(personaje => personaje.name);
}

// DOM
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 1; i <= 3; i++) {
    const boton = document.getElementById(`boton${i}`);
    const carta = document.getElementById(`carta${i}`);
    cartas[`carta${i}`] = carta;
    boton.addEventListener('mouseover', (event) => revelaPersonajes(event, i));
  }
  gen1 = generador1();
});