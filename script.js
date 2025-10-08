// --- Target Exam Date ---
const examDate = new Date("February 17, 2026 09:00:00").getTime();

// --- DOM Elements ---
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const daysRing = document.getElementById('days-ring');
const hoursRing = document.getElementById('hours-ring');
const minutesRing = document.getElementById('minutes-ring');
const secondsRing = document.getElementById('seconds-ring');

const countdownContainer = document.getElementById('countdown-container');
const examMessage = document.getElementById('exam-message');

// --- SVG Circle Logic ---
const rings = [daysRing, hoursRing, minutesRing, secondsRing];
rings.forEach(ring => {
    const radius = ring.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    ring.style.strokeDasharray = `${circumference} ${circumference}`;
    ring.style.strokeDashoffset = circumference;
});

function setProgress(ring, percent) {
    const radius = ring.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;
}

// --- Main Countdown Function ---
const updateCountdown = () => {
    const now = new Date().getTime();
    const timeRemaining = examDate - now;

    if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        countdownContainer.classList.add('hidden');
        examMessage.classList.remove('hidden');
        return;
    }

    // Calculate time units
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update text
    daysEl.innerText = days;
    hoursEl.innerText = hours;
    minutesEl.innerText = minutes;
    secondsEl.innerText = seconds;

    // Update progress rings
    // Assuming a max of 366 days for the ring. Adjust if the initial countdown is longer.
    setProgress(daysRing, (days / 366) * 100); 
    setProgress(hoursRing, (hours / 24) * 100);
    setProgress(minutesRing, (minutes / 60) * 100);
    setProgress(secondsRing, (seconds / 60) * 100);
};

// --- Animated Starfield Background ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = [];
const numStars = 200;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: Math.random() * 0.2 + 0.1
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
            star.y = canvas.height;
            star.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawStars);
}

// --- Start Everything ---
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call
drawStars(); // Start the background animation