const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const diffList = document.querySelector("#diff-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const restart = document.querySelector("#restart");
let diff = "easy";
let min = 0,
  max = 0;
let time = 0;
let score = 0;
let missScore = 0;
let intervalId;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

diffList.addEventListener("click", (event) => {
  if (event.target.classList.contains("diff-btn")) {
    diff = event.target.getAttribute("data-diff");
    screens[1].classList.add("up");
  }
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[2].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    showRipple(event);
    createRandomCircle();
  } else {
    missScore++;
  }
});

restart.addEventListener("click", (event) => {
  restartGame();
});

function startGame() {
  if (diff === "easy") {
    min = 40;
    max = 60;
  } else if (diff === "standart") {
    min = 20;
    max = 40;
  } else if (diff === "hard") {
    min = 10;
    max = 20;
  }
  intervalId = setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function restartGame() {
  score = 0;
  missScore = 0;
  timeEl.parentNode.classList.remove("hide");
  screens[0].classList.remove("up");
  screens[1].classList.remove("up");
  screens[2].classList.remove("up");
  restart.classList.add("hide");
  board.innerHTML = "";
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>
  <h2>Мимо: <span class="miss">${missScore}</span></h2>
  <h2>Точность: <span class="primary">${(
    ((score - missScore) * 100) /
    score
  ).toFixed(2)}%</span></h2>`;
  restart.classList.remove("hide");
  clearInterval(intervalId);
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(min, max);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = generateColor();
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function generateColor() {
  let hexValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hexValues[x];
      a += y;
    }
    return a;
  }

  let newColor1 = populate("#");
  let newColor2 = populate("#");
  let angle = Math.round(Math.random() * 360);

  let gradient =
    "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";

  return gradient;
}

function showRipple(e) {
  const ripple = document.createElement("div");

  ripple.className = "ripple";
  document.body.appendChild(ripple);

  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;

  ripple.style.animation = "ripple-effect .2s  linear";
  ripple.onanimationend = () => document.body.removeChild(ripple);
}
