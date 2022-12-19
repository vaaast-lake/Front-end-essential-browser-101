'use strict';

// random positioned carrots & bugs variables
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME__DURATION__SEC = 10;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();


// timer button & timer variables
const gameBtn = document.querySelector('.game__button');
const gameBtnIcon = gameBtn.querySelector('.fa-play');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

// pop-up
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const randomNumber = (min, max) => {
  return Math.random() * (max - min + 1) + min;
}

const initGame = () => {
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
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
let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

const startGame = () => {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  addItem('carrot', 5, './carrot/img/carrot.png');
  addItem('carrot', 5, './carrot/img/bug.png');
}

const stopGame = () => {
  stopGameTimer();
}

const showStopButton = () => {
  gameBtnIcon.classList.add('fa-pause');
  gameBtnIcon.classList.remove('fa-play');
}

const showPlayButton = () => {
  gameBtnIcon.classList.add('fa-play');
  gameBtnIcon.classList.remove('fa-pause');
}

const hideGameButton = () => {
  gameBtn.style.visibility = 'hidden';
}

const showGameButton = () => {
  gameBtn.style.visibility = 'visible';
}

const showTimerAndScore = () => {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

const startGameTimer = () => {
  let remainingSeconds = GAME__DURATION__SEC;
  updateTimerText(remainingSeconds);
  timer = setInterval(() => {
    if (remainingSeconds === 0) {
      clearInterval(timer);
      showPopUpWithText('Replay?');
      hideGameButton();
      return; 
    }
    updateTimerText(--remainingSeconds);
  }, 1000);
}

const stopGameTimer = () => {
  clearInterval(timer);
  hideGameButton();
  showPopUpWithText('Replay?')
}

const updateTimerText = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const showPopUpWithText = (text) => {
  popUpMessage.innerText = text;
  popUp.classList.remove('hide');
}

const hidePopUp = () => {
  popUp.classList.add('hide');
}

popUpRefresh.addEventListener('click', () => {
  initGame();
  hidePopUp();
  showGameButton();
  showPlayButton();
});