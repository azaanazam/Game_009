const bird = document.getElementById("bird");
const pipeContainer = document.getElementById("pipeContainer");
const scoreDisplay = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");

let birdY = 150;
let gravity = 2;
let velocity = 0;
let isGameOver = false;
let score = 0;
let pipes = [];

function jump() {
  if (isGameOver) {
    location.reload();
  }
  velocity = -10;
}

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);
document.addEventListener("touchstart", jump);

function createPipe() {
  const gap = 150;
  const topHeight = Math.floor(Math.random() * 200) + 50;
  const bottomHeight = 400 - topHeight - gap;

  const topPipe = document.createElement("div");
  topPipe.classList.add("pipe", "pipeTop");
  topPipe.style.height = `${topHeight}px`;
  topPipe.style.left = "100%";

  const bottomPipe = document.createElement("div");
  bottomPipe.classList.add("pipe", "pipeBottom");
  bottomPipe.style.height = `${bottomHeight}px`;
  bottomPipe.style.left = "100%";

  pipeContainer.appendChild(topPipe);
  pipeContainer.appendChild(bottomPipe);

  pipes.push({ top: topPipe, bottom: bottomPipe, passed: false });
}

function updatePipes() {
  pipes.forEach((pipe, index) => {
    let left = parseInt(pipe.top.style.left);
    left -= 4;

    pipe.top.style.left = left + "px";
    pipe.bottom.style.left = left + "px";

    if (left + 60 < 80 && !pipe.passed) {
      score++;
      scoreDisplay.innerText = "Score: " + score;
      pipe.passed = true;
    }

    if (
      left < 120 &&
      left + 60 > 80 &&
      (birdY < pipe.top.offsetHeight || birdY + 40 > window.innerHeight - pipe.bottom.offsetHeight)
    ) {
      gameOver();
    }

    if (left < -60) {
      pipe.top.remove();
      pipe.bottom.remove();
      pipes.splice(index, 1);
    }
  });
}

function gameOver() {
  isGameOver = true;
  gameOverText.classList.remove("hidden");
  clearInterval(pipeInterval);
}

function update() {
  if (isGameOver) return;

  velocity += gravity;
  birdY += velocity;
  if (birdY < 0) birdY = 0;
  if (birdY + 40 > window.innerHeight) {
    gameOver();
  }
  bird.style.top = birdY + "px";
  updatePipes();
}

let pipeInterval = setInterval(() => {
  if (!isGameOver) createPipe();
}, 2000);

setInterval(update, 30);
