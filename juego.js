let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;
const puntosHTML = document.querySelectorAll('small');

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divJugadorCartas = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


// console.log(btnPedir);

//Crea una nueva baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        // deck.push(i + 'C');
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

//La funcion permitira una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';

    }

    let carta = deck.pop();
    // console.log('la crata: ' + carta);
    // console.log(deck);
    return carta;
}


// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        valor * 1;
}

//Turno de la computadora
const turnoComputador = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        // console.log(carta);
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        const imgCartas = document.createElement('img');
        // console.log(carta);
        imgCartas.src = `/assets/cartas/${carta}.png`;
        imgCartas.classList.add('carta');
        divCartasComputadora.append(imgCartas);
        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie Gano');
        } else if (puntosMinimos > 21) {
            alert('Computadora gana');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana');
        } else {
            alert('computadora Gana')
        }
    }, 100)


}


// const valor = valorCarta(pedirCarta());
// console.log(valor);

//Eventos, pedir carta
//Call back es una funcion que se esta mandado como argumento
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    // console.log(carta);
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    const imgCartas = document.createElement('img');
    // console.log(carta);
    imgCartas.src = `/assets/cartas/${carta}.png`;
    imgCartas.classList.add('carta');
    divJugadorCartas.append(imgCartas);
    // <img class="carta" src=assets/cartas/3C.png" alt=""> 
    if (puntosJugador > 21) {
        console.warn('Lo siento mucho perdiste ');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21 genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);

    }

});
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputador(puntosJugador);


});
btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasComputadora.innerHTML = '';
    divJugadorCartas.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;


})