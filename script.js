
const torta = document.getElementById("torta");
const inicio = document.getElementById("inicio");
const mensaje = document.getElementById("mensaje");
const recuerdos = document.getElementById("recuerdos");
const musica = document.getElementById("musica");
const botonFotos = document.getElementById("botonFotos");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let iniciada = false;
let particulas = [];

// CAMBIA ESTOS MENSAJES POR LOS TUYOS
const primerMensaje = `Feliz 20 años Allison, esto lo estoy subiendo antes de las 12, no pienses que me olvide de ti, ni de tu cumpleaños, solo tengo que tener esta distancia contigo bueno si llegaste hasta aca es porque leiste completa mi carta y no pensaste que esto es una manera de rastrearte, no pienses asi, como lo dije ya en la carta ha pasado tiempo o al menos es lo que yo siento, siento como si fuera hace años que no interactuaramos pero no es asi, tuve que hacer cosas por miedo a que te pase algo, aunque aun te sigo viendo todos los dias, sigo viendo si sales temprano, si es que vas o no vas a tus clases, es triste pensar que ya no volteas a verme, es triste ver como ves a alguien mas, porque si aun los veo en sus salidas, las veces que estan juntos estoy ahi, tal vez el crea que te ama pero no es verdad o al menos no como te amo yo, porque si te sigo amando, dicen llamar amor de mi vida a la persona que mas les marco o en el futuro la persona con la que tengan hijos o se lleguen a casar pero la verdad es que el amor de mi vida no se mide por eso mas alla de que te dije que no me casaria con nadie, que tampoco tendria hijos, la unica manera que me nacio de llegar a ser papá o casarme fue por ti, amor de mi vida significa mas que marcar la vida de la otra persona, apesar de que lo hiciste, para mi significa sacrificarlo todo sin importar nada, luchar incluso cuando ya todo este perdido, significas tu porque de una manera tan impensable te metiste en mi mente, corazon y vida, te hiciste dueña de cada parte de mi, de cada babosada que decia, dueña de mis chistes tontos, dueña de mis caricias, dueña de mi tonta manera de ser, se que cometi un error pero seguiras creyendo eso que piensas, paso mucho tiempo y crees que te he podido dejar de amar?, crees que en algun momento me nacio lo idea de conocer a alguien mas?, por que si todo es asi como pensaste, te sigo mirando como el primer dia cuando ingresaste por la puerta del salon con un buzo que no era del colegio, te amo de una manera tan diferente que me vuelvo loco, que te sigo rezando, que sigues siendo mi religion, te amo de esta manera tonta que me hace tener que verte con alguien mas y aun asi seguir rompiendome el corazon pero que eso no importe porque lo importante sera que tu estes bien, aveces me pongo a pensar que me falto o tal vez yo no fui tu alma gemela por la idea de que lo amaste en poco tiempo, de que con el si muchas cosas que conmigo no, tal vez ustedes si estaban destinados para estar juntos y yo destinado a ver como mi alma gemela encontraba su otra mitad, creeme que aun hasta el dia de hoy sigo revisando tus fotos, nuestros videos, aprendiendo tus nuevos gustos, tus nuevas costumbres desde lejos, sigo aprendiendo cada cosa de ti, como lo hacia antes cuando estabamos juntos, lo significaste todo para mi, por como eres, porque no tenias que cambiar, porque no tenias que dejar de molestarte, porque no tenias que dejar de botar lagrimas, porque bastaba verte los ojos para entenderte, porque eres perfecta como eres, porque no importa si la vida nos pone diferentes caminos seguire buscandote, seguire viendo por ti, por la unica persona que me demnostro que puede haber mas en mi y que no soy un simple chico que se cayo de la cama, que no soy especial de imbecil si no especial de importante, en ti encontre la manera de seguir adelante, me mostraste que con esfuerzo puedo conseguir las cosas, creeme que no hay persona mas valiosa que tu, aprendi a vivir sin ti me obligue a esto, pero es triste que tu vida no tenga el mismo color, que la sonrisa sea superficial, tenia tantas cosas pensadas por tu cumpleaños que tal vez el lo haga o al menos haga una de las cosas que planie, un año diferente, unas rosas diferentes, un mensaje diferente, pero con el mismo sentimiento de que quiero que avanzes, que quiero verte triunfar, que quiero verte lograr cada cosa que te propongas, como con lo del chino, como en la universidad y no estare fisicamente contigo o no me podras ver pero todas mis mejores vibras seran para ti, tal vez tu no pienses en mi, pero te pienso todos los dias, te deseo en tu cumpleaños numero 20 que seas la persona mas feliz del mundo y no importa si no es conmigo, tu brillas en todo lo que haces, eres la mujer mas fuerte y valiente, la mujer mas hermosa, la mujer con el mejor corazon de toda la existencia de este mundo y no habra nadie mas, feliz cumpleaños Allison Ariana Vega Agapito, espero la pases muy bonito hoy, te amo con todo mi corazon.`;

const segundoMensaje = `Y es de esta manera que quiero verte todos los dias, no hay nada mas especial que tu, no hay nadie despues de ti y si algun dia te llegas a preguntar como es que te amo tanto, la respuesta esta cuando te veas a un espejo y veas la mujer en la que te vas convirtiendo, jamas pienses que debes cambiar porque asi eres perfecta, lo tienes todo, gracias por haberme hecho celebrar tus cumpleaños desde hace 5 años atras, tu sonrisa sera mi mejor alegria en este dia, me siento triste si pero feliz a la vez, un dia como hoy hace 20 años naciste e hiciste mas historia en mi vida, gracias por existir negra`;

// AJUSTAR TAMAÑO DEL CANVAS
function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

// CAMBIAR PANTALLAS
function mostrarPantalla(pantalla) {
    document.querySelectorAll(".pantalla").forEach(p => {
        p.classList.remove("activa");
    });

    pantalla.classList.add("activa");
}

// EFECTO MÁQUINA DE ESCRIBIR
function escribirTexto(elemento, texto, velocidad = 45) {
    return new Promise(resolve => {
        let i = 0;
        elemento.textContent = "";

        function escribir() {
            if (i < texto.length) {
                elemento.textContent += texto.charAt(i);
                i++;

                setTimeout(escribir, velocidad);
            } else {
                resolve();
            }
        }

        escribir();
    });
}

// CREAR FUEGOS ARTIFICIALES
function crearFuego() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.65;
    const colores = ["#ff477e", "#ffd166", "#ffffff", "#ff8fab"];

    for (let i = 0; i < 65; i++) {
        const angulo = Math.random() * Math.PI * 2;
        const velocidad = Math.random() * 5 + 1;

        particulas.push({
            x,
            y,
            vx: Math.cos(angulo) * velocidad,
            vy: Math.sin(angulo) * velocidad,
            vida: 100,
            color: colores[Math.floor(Math.random() * colores.length)]
        });
    }
}

function animarFuegos() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particulas.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.025;
        p.vida -= 1.3;

        ctx.globalAlpha = Math.max(0, p.vida / 100);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        if (p.vida <= 0) {
            particulas.splice(i, 1);
        }
    });

    ctx.globalAlpha = 1;

    if (iniciada && !recuerdos.classList.contains("activa")) {
        requestAnimationFrame(animarFuegos);
    }
}

// INICIAR LA SORPRESA
torta.addEventListener("click", async () => {
    if (iniciada) return;
    iniciada = true;

    // Reproducir música después del clic
    musica.volume = 0.65;
    musica.play().catch(error => {
        console.log("No se pudo reproducir la música:", error);
    });

    // Mostrar fuegos artificiales
    canvas.style.display = "block";
    crearFuego();
    animarFuegos();

    const intervalo = setInterval(crearFuego, 650);

    // Ocultar pantalla inicial
    mostrarPantalla(mensaje);

    // Esperar unos segundos con los fuegos
    await new Promise(resolve => setTimeout(resolve, 3000));

    clearInterval(intervalo);
    canvas.style.display = "none";

    // Escribir primer mensaje
    await escribirTexto(
        document.getElementById("texto1"),
        primerMensaje,
        45
    );

    botonFotos.classList.remove("oculto");
});

// REVELAR FOTOGRAFÍAS
botonFotos.addEventListener("click", async () => {
    botonFotos.disabled = true;

    mostrarPantalla(recuerdos);

    // Escribir mensaje final
    await escribirTexto(
        document.getElementById("texto2"),
        segundoMensaje,
        40
    );
});
