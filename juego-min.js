const miModulo = (() => { "use strict"; let e = [],
        f = ["C", "D", "H", "S"],
        g = ["A", "J", "Q", "K"],
        h = [],
        a = document.querySelector("#btnPedir"),
        b = document.querySelector("#btnDetener"),
        c = document.querySelector("#btnNuevo"),
        i = document.querySelectorAll(".divCartas"),
        j = document.querySelectorAll("small"),
        d = (d = 2) => { e = k(), h = []; for (let c = 0; c < d; c++) h.push(0);
            j.forEach(a => a.innerText = 0), i.forEach(a => a.innerHTML = ""), a.disabled = !1, b.disabled = !1 },
        k = () => { e = []; for (let a = 2; a <= 10; a++)
                for (let b of f) e.push(a + b); for (let c of f)
                for (let d of g) e.push(d + c); return _.shuffle(e) },
        l = () => { if (0 === e.length) throw "No hay cartas en el deck"; return e.pop() },
        m = b => { let a = b.substring(0, b.length - 1); return isNaN(a) ? "A" === a ? 11 : 10 : 1 * a },
        n = (b, a) => (h[a] = h[a] + m(b), j[a].innerText = h[a], h[a]),
        o = (b, c) => { let a = document.createElement("img");
            a.src = `/assets/cartas/${b}.png`, a.classList.add("carta"), i[c].append(a) },
        p = () => { let [a, b] = h;
            setTimeout(() => { b === a ? alert("Nadie Gano") : a > 21 ? alert("Computadora gana") : b > 21 ? alert("Jugador gana") : alert("computadora Gana") }, 100) },
        q = a => { let b = 0;
            do { let c = l();
                b = n(c, h.length - 1), o(c, h.length - 1) } while (b < a && a <= 21) p() }; return a.addEventListener("click", () => { let d = l(),
            c = n(d, 0);
        o(d, 0), c > 21 ? (console.warn("Lo siento mucho perdiste "), a.disabled = !0, b.disabled = !0, q(c)) : 21 === c && (console.warn("21 genial!"), a.disabled = !0, b.disabled = !0, q(c)) }), b.addEventListener("click", () => { a.disabled = !0, b.disabled = !0, q(h[0]) }), c.addEventListener("click", () => { d() }), { nuevoJuego: d } })()