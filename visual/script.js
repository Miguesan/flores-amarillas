const startBtn = document.getElementById('start-btn');
const branches = document.querySelectorAll('.branch');
const letter = document.getElementById('letter');
const textBody = document.getElementById('text-body');
const quote = document.getElementById('quote');
const flowersContainer = document.getElementById('flowers-container');

const messageLines = [
    "CADA GIRASOL QUE VES AQUÍ ES UN LATIDO DE MI CORAZÓN.",
    "ASÍ COMO EL SOL ILUMINA LOS CAMPOS, TÚ ILUMINAS MI VIDA.",
    "QUE ESTAS FLORES TE RECUERDEN LO ESPECIAL QUE ERES PARA MÍ.",
    "¡TE AMO!",
    "PARA: DANIELA ALIAGA\nDE: MIGUEL SANCHEZ"
];

startBtn.addEventListener('click', () => {
    gsap.to(startBtn, { scale: 0, duration: 0.4, onComplete: () => startBtn.style.display = 'none' });

    gsap.to(branches, {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power1.inOut",
        onComplete: generateHeartFlowers
    });
});

function getHeartPoint(t, r = 1) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: x * r, y: y * r };
}

function generateHeartFlowers() {
    const centerX = 200; 
    const centerY = 160;
    const scale = 7.5;
    let delayCounter = 0;

    // 1. SILUETA EXTERIOR
    const outlineCount = 90;
    for (let i = 0; i < outlineCount; i++) {
        const t = (i / outlineCount) * 2 * Math.PI;
        const point = getHeartPoint(t, 1);
        const posX = centerX + (point.x * scale);
        const posY = centerY + (point.y * scale);
        
        createFlower(posX, posY, delayCounter * 0.005);
        delayCounter++;
    }

    // 2. RELLENO INTERIOR DENSO
    const fillCount = 220;
    for (let i = 0; i < fillCount; i++) {
        const t = Math.random() * 2 * Math.PI;
        const r = Math.sqrt(Math.random());
        const point = getHeartPoint(t, r);
        const posX = centerX + (point.x * scale);
        const posY = centerY + (point.y * scale);
        
        createFlower(posX, posY, delayCounter * 0.004);
        delayCounter++;
    }

    setTimeout(showLetter, 1800);
}

function createFlower(x, y, delay) {
    const flower = document.createElement('div');
    flower.className = 'flower';
    
    // Posicionamiento centrado
    flower.style.left = `calc(${(x / 400) * 100}% - 10px)`;
    flower.style.top = `calc(${(y / 500) * 100}% - 10px)`;
    
    flowersContainer.appendChild(flower);

    gsap.to(flower, {
        scale: 1,
        duration: 0.35,
        delay: delay,
        ease: "back.out(1.7)"
    });
}

function showLetter() {
    letter.classList.remove('hidden');
    gsap.to(letter, { opacity: 1, duration: 0.5 });

    let currentLine = 0;

    function typeLine() {
        if (currentLine < messageLines.length) {
            const p = document.createElement('p');
            
            if (currentLine === messageLines.length - 1) {
                p.style.marginTop = "20px";
                p.style.fontWeight = "bold";
                p.style.color = "#d97706";
            } else {
                p.style.marginBottom = "10px";
            }

            textBody.appendChild(p);

            let charIndex = 0;
            const text = messageLines[currentLine];

            const interval = setInterval(() => {
                p.textContent += text[charIndex];
                charIndex++;
                if (charIndex === text.length) {
                    clearInterval(interval);
                    currentLine++;
                    setTimeout(typeLine, 400);
                }
            }, 35);
        } else {
            quote.classList.remove('hidden');
            gsap.fromTo(quote, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1 });
        }
    }

    typeLine();
}