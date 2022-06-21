/*
patron modulo, es para que en el navegador sea anonimo
(()=>{})();
o 
fuction ()=>{}

*/
const miModulo = (() => {
    "use strict"; //use strict son restricciones

    let deck = [];
    const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];

    let puntosJugadores = []; //Definimos la cantidad de jugadores, el ultimo jugador siempre sera la computadora 

    //Referencias del HTML
    const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo");
    //
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll("small");

    //esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }


        puntosHTML.forEach(elem => elem.innerText = 0); //Ponemos en cero el div
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //Crea una nueva baraja
    const crearDeck = () => {
        deck = [];
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
        //retornamos el deck
        return _.shuffle(deck);
    };


    //La funcion permitira una carta

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el deck";
        }
        return deck.pop();
    };

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    };

    //turno: 0= primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCartas = document.createElement("img");
        imgCartas.src = `/assets/cartas/${carta}.png`;
        imgCartas.classList.add('carta');
        divCartasJugadores[turno].append(imgCartas);
    }
    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert("Nadie Gano");
            } else if (puntosMinimos > 21) {
                alert("Computadora gana");
            } else if (puntosComputadora > 21) {
                alert("Jugador gana");
            } else {
                alert("computadora Gana");
            }
        }, 100);
    }

    //Turno de la computadora
    const turnoComputador = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    };

    //Eventos, pedir carta
    //Call back es una funcion que se esta mandado como argumento
    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn("Lo siento mucho perdiste ");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputador(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn("21 genial!");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputador(puntosJugador);
        }

    });
    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugadores[0]);
    });
    btnNuevo.addEventListener("click", () => {
        inicializarJuego();
    });
    return {
        nuevoJuego: inicializarJuego
    };
})();