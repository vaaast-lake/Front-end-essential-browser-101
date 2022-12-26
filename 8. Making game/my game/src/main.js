'use strict';

// game section
const gameControlBtn = document.querySelector('.game__control.btn');
const gameTimer = document.querySelector('.game__timer');
const GAME_TIME_SECONDS = 100;

// game Field
const gameField = document.querySelector('.game__field');
const carrotCnt = document.querySelector('.game__counter');
const fieldHeight = gameField.getBoundingClientRect().height;
const fieldWidth = gameField.getBoundingClientRect().width;
const ITEM_NUM = 5;

// pop-up
const popUp = document.querySelector('.pop-up');
const refreshBtn = document.querySelector('.pop-up__refresh.btn');

// stop-reason
const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  pause: 'pause',
});
// item Type
const itemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

let start = false;
let interval = null;
let remainingTime = GAME_TIME_SECONDS;
let count = 0;

const gameInit = () => {
  start = false;
  remainingTime = GAME_TIME_SECONDS;
  gameField.innerHTML = '';
  count = 0;
  updateTimer(remainingTime);
  gameInterfaceControl();
  updateCarrotCnt();
}

const timeControl = (reason) => {
  if (reason) {
    clearInterval(interval);
    return;
  }
  updateTimer(remainingTime);
  interval = setInterval(() => {
    if (remainingTime === 0) {
      clearInterval(interval);
      gameStop(Reason.lose);
      return;
    }
    updateTimer(--remainingTime);
  }, 1000);
}

const updateTimer = (remainingTime) => {
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
  const seconds = (remainingTime % 60).toString().padStart(2, '0');
  gameTimer.innerText = `${minutes}:${seconds}`;
}

const gameStart = () => {
  start = true;
  gameInterfaceControl();
  timeControl();
  popUpHideControl();
  updateCarrotCnt();
  if (!gameField.innerHTML) {
    addImgItem(itemType.carrot, ITEM_NUM, '../carrot/img/carrot.png');
    addImgItem(itemType.bug, ITEM_NUM, '../carrot/img/bug.png');
  }
}

const gameStop = (reason) => {
  start = false;
  gameInterfaceControl(reason);
  popUpHideControl(reason);
  timeControl(reason);
}

const gameInterfaceControl = (reason) => {
  if (reason === Reason.lose || reason === Reason.win) {
    gameControlBtn.style.visibility = 'hidden';
    return;
  } else {
    gameControlBtn.style.visibility = 'visible';
  }
  if (start) {
    gameControlBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    gameControlBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

gameControlBtn.addEventListener('click', () => {
  if (start) {
    gameStop(Reason.pause);
  } else {
    gameStart();
  }
});

// pop-up
const popUpHideControl = (reason) => {
  if (reason) {
    popUp.classList.remove('hide');
  } else {
    popUp.classList.add('hide');
  }
}

refreshBtn.addEventListener('click', () => {
  gameInit();
  popUpHideControl();
});

// game-field
const randomPositioning = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addImgItem = (className, count, path) => {
  const minX = 0;
  const maxX = className === itemType.carrot ? fieldWidth - 80 : fieldWidth - 60;
  const minY = 0;
  const maxY = className === itemType.carrot ? fieldHeight - 80 : fieldHeight - 60;

  for (let i = 0; i < count; i++) {
    const x = randomPositioning(minX, maxX);
    const y = randomPositioning(minY, maxY);

    const imgItem = document.createElement('img');
    imgItem.setAttribute('class', className);
    imgItem.setAttribute('src', path);
    imgItem.style.position = 'absolute';
    // imgItem.style.transform = `translate(${x}px, ${y}px)`;
    imgItem.style.left = `${x}px`;
    imgItem.style.top = `${y}px`;
    gameField.appendChild(imgItem);
  }
}

const updateCarrotCnt = (count = 0) => {
  carrotCnt.textContent = ITEM_NUM - count;
  if (ITEM_NUM === count) {
    gameStop(Reason.win);
    gameInterfaceControl(Reason.win);
    return;
  }
}

const onItemClick = (e) => {
  const target = e.target;
  if (target.matches('.carrot')) {
    target.remove();
    updateCarrotCnt(++count);
  } else if (target.matches('.bug')) {
    gameStop(Reason.lose);
  }
}

gameField.addEventListener('click', onItemClick);

gameInit();