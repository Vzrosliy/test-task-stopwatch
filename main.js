//  создать переменные для управления секундомера и кнопками
//  использую const вместо let чтобы избежать переопределения переменной
const clockEl = document.getElementById("clock");
const playBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");
// переменные для математических вычеслений
const msInMinutes = 60000;
const msInSeck = 1000;

//  флаг отвечает за состояния: "секундомер запущен" или "остановлен"
let isClockRun = false;

//  момент отсчета времени, null - значит не заданно, если указать "0", значит что-то задано.
let startTime = null;

let getTimeStr = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};

let getMsStr = (num) => {
  if (num < 10) {
    return `00${num}`;
  }

  if (num < 100) {
    return `0${num}`;
  }

  return `${num}`;
};

//  обрабатываю "клик" кнопки "старт"
playBtn.addEventListener("click", () => {
  playClick();
});

resetBtn.addEventListener("click", () => {
  resetClick();
});

const resetClick = () => {
  if (isClockRun) {
    startTime = new Date();
  } else {
    startTime = null;
  }

  clockEl.innerText = `00:00:000`;
};

const playClick = () => {
  if (isClockRun) {
    pauseClock();
  } else {
    playClock();
  }
};

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    playClick();
  }

  if (event.code === "Escape") {
    resetClick();
  }
});

const playClock = () => {
  //чтобы не возвращалась к null во время клика
  if (startTime === null) {
    startTime = new Date();
  }
  playBtn.innerText = "Пауза";
  isClockRun = true;
};

const pauseClock = () => {
  playBtn.innerText = "Старт";
  isClockRun = false;
};

//clock.innerText = "str";

setInterval(() => {
  if (isClockRun) {
    const now = new Date();
    const diff = now.valueOf() - startTime.valueOf();
    let minutes = Math.floor(diff / msInMinutes);
    let remainderSec = diff % msInMinutes;
    let seconds = Math.floor(remainderSec / msInSeck);
    let remainderMs = remainderSec % msInSeck;
    //  ввод результатов исчеслений
    clockEl.innerText = `${getTimeStr(minutes)}:${getTimeStr(
      seconds
    )}:${getMsStr(remainderMs)}`;
  }
}, 0);
