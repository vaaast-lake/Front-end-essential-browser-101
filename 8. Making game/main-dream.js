'use strict';

// random positioned carrots & bugs
const CARROT_SIZE = 80;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const randomNumber = (min, max) => {
  return Math.random() * (max - min + 1) + min;
}

const initGame = () => {
  addItem('carrot', 5, './carrot/img/carrot.png');
  addItem('carrot', 5, './carrot/img/bug.png');
}

const addItem = (className, count, imgPath) => {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);

    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

initGame();

// timer button & timer
const gameBtn = document.querySelector('.game__button');
const timer = document.querySelector('.game__timer');

let interval = null;
let remainingSeconds = 10;

const updateInterfaceTime = () => {
  timer.textContent = `00:${remainingSeconds.toString().padStart(2, '0')}`;
}

const start = () => {
  if (remainingSeconds === 0) return;

  interval = setInterval(() => {
    remainingSeconds--;
    updateInterfaceTime();
    if (remainingSeconds === 0) {
      remainingSeconds = 10;
      stop();
    }
  }, 1000);
  
  gameBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

const stop = () => {
  clearInterval(interval);
  interval = null;
  gameBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  updateInterfaceTime();
}

gameBtn.addEventListener('click', () => {
  if (interval === null) {
    start();
  } else {
    stop();
  }
});