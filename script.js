
// Control del Carrusel
const carousel = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function moveCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.querySelector('.carousel-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    moveCarousel();
});

document.querySelector('.carousel-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    moveCarousel();
});

// Auto-rotación del carrusel
setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    moveCarousel();
}, 5000);

// Ruleta
const wheel = document.querySelector('.wheel');
const spinButton = document.querySelector('.spin-button');
const modal = document.querySelector('.modal');
const playerNameSpan = document.querySelector('.player-name');
const questionP = document.querySelector('.question');

// Preguntas de ingeniería de sistemas
const questions = [
    "¿Qué es un algoritmo y cuáles son sus características principales?",
    "Explica los cuatro pilares de la Programación Orientada a Objetos",
    "¿Qué es una base de datos relacional y cuáles son sus ventajas?",
    "Define qué es una API RESTful y sus principios básicos",
    "¿Qué es Git y cuáles son sus comandos más importantes?",
    "Explica el concepto de recursividad y da un ejemplo práctico",
    "¿Qué es el paradigma cliente-servidor y cómo funciona?",
    "Define qué es un framework y menciona ejemplos populares"
];

// Respuestas correctas (solo como ejemplo)
const correctAnswers = [
    "Un algoritmo es un conjunto de instrucciones bien definidas que resuelven un problema.",
    "Los cuatro pilares de la Programación Orientada a Objetos son: Encapsulamiento, Abstracción, Herencia y Polimorfismo.",
    "Una base de datos relacional organiza los datos en tablas relacionadas entre sí. Ventajas: integridad de datos, fácil consulta y escalabilidad.",
    "Una API RESTful es un conjunto de normas para interactuar con servicios web mediante HTTP, usando métodos como GET, POST, PUT y DELETE.",
    "Git es un sistema de control de versiones distribuido. Los comandos más importantes son: git init, git clone, git commit, git push, git pull.",
    "La recursividad es una técnica donde una función se llama a sí misma. Ejemplo: cálculo del factorial.",
    "El paradigma cliente-servidor es un modelo de comunicación donde un cliente solicita servicios y el servidor los provee.",
    "Un framework es un conjunto de herramientas y librerías que facilitan el desarrollo de aplicaciones. Ejemplos populares: Django, Angular, React."
];

// Premios atractivos
const prizes = [
    "¡Una licencia anual de JetBrains!",
    "¡Un curso premium de Udemy a elección!",
    "¡Una suscripción de 6 meses a PluralSight!",
    "¡Un libro digital de O'Reilly!",
    "¡Una membresía GitHub Pro por 3 meses!",
    "¡Un mouse Logitech MX Master 3!",
    "¡Un teclado mecánico programador!",
    "¡Un SSD de 500GB!"
];

// Castigos graciosos
const punishments = [
    "¡Tienes que hacer una imitación de tu profesor de sistemas!",
    "¡Aplaude como si estuvieras en un concierto de rock durante 30 segundos!",
    "¡Canta el himno de tu universidad con mucha emoción!",
    "¡Haz una flexión en el aire como si estuvieras en un gimnasio!",
    "¡Imita a un pingüino caminando por un minuto!",
    "¡Haz una llamada de teléfono fingida con tu compañero de trabajo!"
];

const numSections = 8;
for (let i = 0; i < numSections; i++) {
    const section = document.createElement('div');
    section.className = 'wheel-section';
    section.style.transform = `rotate(${i * (360 / numSections)}deg)`;
    const hue = i * (360 / numSections);
    section.style.backgroundColor = `hsla(${hue}, 70%, 50%, 0.8)`;
    section.textContent = `Pregunta ${i + 1}`;
    wheel.appendChild(section);
}

let isSpinning = false;

// Función para girar la ruleta
spinButton.addEventListener('click', () => {
    if (isSpinning) return;

    const playerName = document.querySelector('.name-input').value;
    if (!playerName) {
        alert('Por favor, ingresa tu nombre para participar');
        return;
    }

    isSpinning = true;
    spinButton.disabled = true;
    spinButton.style.opacity = '0.5';

    // Cálculo mejorado para el giro
    const spins = 5;
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalDegrees = spins * 360 + extraDegrees;

    // Aplicar la animación de giro
    wheel.style.transform = `rotate(${totalDegrees}deg)`;

    // Mostrar la pregunta después de que la ruleta se detenga
    setTimeout(() => {
        isSpinning = false;
        spinButton.disabled = false;
        spinButton.style.opacity = '1';

        const questionIndex = Math.floor(Math.random() * questions.length);
        playerNameSpan.textContent = playerName;
        questionP.textContent = questions[questionIndex];

        // Mostrar el modal con animación
        modal.style.display = 'flex';
        modal.querySelector('.modal-content').classList.add('animate__animated', 'animate__fadeInDown');
    }, 4000);
});

// Manejar la respuesta
document.querySelector('.submit-answer').addEventListener('click', () => {
    const answer = document.querySelector('.answer-input').value.trim();
    const correctAnswer = correctAnswers[questions.indexOf(questionP.textContent)];

    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        const prizeIndex = Math.floor(Math.random() * prizes.length);

        // Mostrar el premio con una alerta estilizada
        Swal.fire({
            title: '¡Respuesta Correcta!',
            html: `<h3>¡Felicitaciones!</h3>
                       <p>Has ganado: ${prizes[prizeIndex]}</p>`,
            icon: 'success',
            confirmButtonText: '¡Genial!',
            background: '#2c3e50',
            color: '#fff'
        });

        modal.style.display = 'none';
        document.querySelector('.answer-input').value = '';
    } else {
        const punishmentIndex = Math.floor(Math.random() * punishments.length);

        // Mostrar un castigo gracioso con una alerta
        Swal.fire({
            title: '¡Respuesta Incorrecta!',
            html: `<h3>¡Ups!</h3>
                       <p>${punishments[punishmentIndex]}</p>`,
            icon: 'error',
            confirmButtonText: '¡Sigue Intentando !',
            background: '#e74c3c',
            color: '#fff'
        });

        modal.style.display = 'none';
        document.querySelector('.answer-input').value = '';
    }
});

// Cerrar modal al hacer clic fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Control de música
const audioControl = document.getElementById('audioControl');
const audioIcon = audioControl.querySelector('i');
const music = document.getElementById('background-music');
let isMusicPlaying = false;

// Función para controlar la música
audioControl.addEventListener('click', () => {
    if (!isMusicPlaying) {
        music.play()
            .then(() => {
                isMusicPlaying = true;
                audioIcon.className = 'fas fa-volume-up';
                audioControl.style.background = 'rgba(46, 204, 113, 0.8)';
            })
            .catch(error => {
                console.error('Error al reproducir el audio:', error);
                alert('No se pudo reproducir la música. Por favor, inténtalo de nuevo.');
            });
    } else {
        music.pause();
        isMusicPlaying = false;
        audioIcon.className = 'fas fa-volume-mute';
        audioControl.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// Ajustar volumen inicial
music.volume = 0.3; // 30% del volumen máximo
music.autoplay = false;

