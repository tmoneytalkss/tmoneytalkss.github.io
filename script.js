javascript
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

const welcome = document.getElementById("welcome");
const fuckyou = document.getElementById("fuckyou");

let stars = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);


/* =========================
   CREATE STARS
========================= */

for (let i = 0; i < 500; i++) {
    stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.35 + 0.05,
        opacity: Math.random()
    });
}


/* =========================
   ANIMATE STARS
========================= */

function animateStars() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    stars.forEach(star => {

        star.y -= star.speed;

        if (star.y < 0) {
            star.y = canvas.height;
            star.x = Math.random() * canvas.width;
        }

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${star.opacity})`;

        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

animateStars();


/* =========================
   SCROLL TEXT TRANSITION
========================= */

window.addEventListener("scroll", () => {

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    let progress =
        window.scrollY / maxScroll;

    progress = Math.max(0, Math.min(1, progress));


    /*
        WELCOME
        1 → 0
    */

    welcome.style.opacity =
        1 - progress;

    welcome.style.transform =
        `translateY(${-progress * 100}px)
         scale(${1 - progress * 0.15})`;

    welcome.style.filter =
        `blur(${progress * 20}px)`;


    /*
        FUCK YOU
        0 → 1
    */

    fuckyou.style.opacity =
        progress;

    fuckyou.style.transform =
        `translateY(${80 - progress * 80}px)
         scale(${0.9 + progress * 0.1})`;

    fuckyou.style.filter =
        `blur(${20 - progress * 20}px)`;

});
