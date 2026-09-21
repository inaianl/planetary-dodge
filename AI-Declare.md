This project was created, in part, with the assistance of generative AI (Gemini and Visual Studio Code Auto-complete).
The following features were created in assistance with generative AI. Key word assistance. 
-style.css (Gemini AI)
*".hitboxes{
    position: fixed;
    font-size: 100px;
    z-index: 700;
    transform: translate(-50%, -50%);
}"
*"@keyframes fadeOut {
    to {
        opacity: 0;
    }
}"
*"cursor: none !important;"

-index.html (V.S. Autocomplete)
*"<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>"

-game.html (V.S. Autocomplete)
*"<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="script.js" defer></script>
</head>"

-script.js (Gemini AI)
*"const shipRadius = 40;
const orbRadius = 24;"
*"const scoreVal = document.getElementById('score');
const altVal = document.getElementById('alt-value');
const ship = document.querySelector('.ship-cursor');
"
*"const constrainedX = event.clientX < minX ? minX : event.clientX > maxX ? maxX : event.clientX;
ship.style.left = `${constrainedX}px`;
ship.style.top = `${event.clientY}px`;"
*"    star.classList.add('star');
    star.textContent = '⭐';

    const sizes = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px'];
    star.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
    game.appendChild(star);

    stars.push({
        element: star,
        x: minXInit + Math.random() * (maxXInit - minXInit),
        y: Math.random() * window.innerHeight,
        vy: parseFloat(star.style.fontSize) * 0.15
    });"
*"    stars.forEach(star => {
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
            orb.x = minX + Math.random() * (max1 - minX);
            "
*"updateOrbs() function"
  

