const ship = document.querySelector('.ship-cursor');
let altitude = 0;
let score = 0;
let isGameOver = false;

const scoreVal = document.getElementById('score');
const altVal = document.getElementById('alt-value');

// hitbox config
const shipRadius = 40;
const orbRadius = 24;


document.addEventListener('mousemove', (event) => {
    if (isGameOver) return;
    const minX = window.innerWidth * 0.25;
    const maxX = window.innerWidth * 0.75;

    const constrainedX = event.clientX < minX ? minX : event.clientX > maxX ? maxX : event.clientX;
    ship.style.left = `${constrainedX}px`;
    ship.style.top = `${event.clientY}px`;

    const smoke = document.createElement('div');
    smoke.classList.add('smoke');
    smoke.style.left = `${constrainedX}px`;
    smoke.style.top = `${event.clientY}px`;
    document.body.appendChild(smoke);

    setTimeout(() => {
        smoke.remove();
    }, 500);


});

const spaceEmojis = ['🪐', '👽', '☄️', '🛸', '🛰️'];
const game = document.querySelector('.game');
const orbs = [];
const stars = [];
const minXInit = window.innerWidth * 0.25;
const maxXInit = window.innerWidth * 0.75;


for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.textContent = '⭐';

    const sizes = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px'];
    star.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
    game.appendChild(star);

    stars.push({
        element: star,
        x: minXInit + Math.random() * (maxXInit - minXInit),
        y: Math.random() * window.innerHeight,
        vy: parseFloat(star.style.fontSize) * 0.15
    });
}



function createSpaceObject() {
    if (orbs.length >= 4) return;
    const orblist = document.createElement('div');
    orblist.classList.add('hitboxes');
    const randomEmoji = spaceEmojis[Math.floor(Math.random() * spaceEmojis.length)];
    orblist.textContent = randomEmoji; 
    game.appendChild(orblist);

    const minX = window.innerWidth * 0.30;
    const maxX = window.innerWidth * 0.70;

    const X = minX + Math.random() * (maxX - minX);
    const Y = -50;

    orbs.push({
        element: orblist,
        x: X,
        y: Y,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 5 + 6,
    });
}
const spawnInterval = setInterval(createSpaceObject, 1500);

const altInterval = setInterval(() => {
    if (isGameOver) return;
    altitude += 1;
    altVal.textContent = altitude;
}, 100);

function updateOrbs() {
    if (isGameOver) return;

    const minX = window.innerWidth * 0.32;
    const minX1 = window.innerWidth * 0.25;
    const maxX = window.innerWidth * 0.72;
    const maxX1 = window.innerWidth * 0.75;
    const shipX = parseFloat(ship.style.left) || 0;
    const shipY = parseFloat(ship.style.top) || 0;

    const speedMultiplier =  1 + altitude / 1000;

    stars.forEach(star => {
        star.y += star.vy * speedMultiplier;

        if (star.y > window.innerHeight) {
            star.y = -20;
            star.x = minX1 + Math.random() * (maxX1 - minX1);
        }
        star.element.style.left = `${star.x}px`;
        star.element.style.top = `${star.y}px`;
    });

    orbs.forEach(orb => {
        orb.y += orb.vy * speedMultiplier;
        orb.x += orb.vx * speedMultiplier;
       
       if (orb.x < minX || orb.x > maxX) {
            orb.vx *= -1;
        }

        if (orb.y > window.innerHeight + 50) {
            score += 1;
            scoreVal.textContent = score;

            orb.y = -50;
            orb.x = minX + Math.random() * (maxX - minX);
            orb.element.textContent = spaceEmojis[Math.floor(Math.random() * spaceEmojis.length)];
        }

        orb.element.style.left = `${orb.x}px`;
        orb.element.style.top = `${orb.y}px`;

        const dx = orb.x - shipX;
        const dy = orb.y - shipY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < shipRadius + orbRadius) {
            endGame();
        }
    });

    requestAnimationFrame(updateOrbs);
}

function endGame() {
    isGameOver = true;
    clearInterval(spawnInterval);
    clearInterval(altInterval);
    game.style.backgroundColor = 'red';
    setTimeout(() => {
        alert(`Game Over! Your score: ${score}, Altitude: ${altitude}! Refresh the page to play again!`);
    }, 100);
    }

updateOrbs();