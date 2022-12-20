'use strict';

import PopUp from './popup-dream.js';
import Field from './field-dream.js';

// random positioned carrots & bugs variables
const CARROT_SIZE = 80;
let CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME__DURATION__SEC = 10;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();


// timer button & timer variables
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

// timer button & timer
let started = false;
let score = 0;
let timer = undefined;

const randomNumber = (min, max) => {
  return Math.random() * (max - min + 1) + min;
}

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
}

const stopSound = (sound) => {
  sound.pause();
}

const updateScoreBoard = () => {
  gameScore.innerText = CARROT_COUNT - score;
}

const finishGame = (win) => {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  gameFinishBanner.showWithText(win ? 'You Won' : 'You Lost');
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

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const onItemClick = (item) => {
  if (!started) return;
  if (tiem === 'carrot') {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === 'bug') {
    finishGame(false);
  }
}

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

const initGame = () => {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}

initGame();

const startGame = () => {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  addItem('carrot', 5, './carrot/img/carrot.png');
  addItem('bug', 5, './carrot/img/bug.png');
  playSound(bgSound);
}

const stopGame = () => {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('Repaly?');
  playSound(alertSound);
  stopSound(bgSound);
}

const showStopButton = () => {
  const icon = gameBtn.querySelector('.fa-solid');
  icon.classList.add('fa-pause');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

const hideGameButton = () => {
  gameBtn.style.visibility = 'hidden';
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
      finishGame(CARROT_COUNT === score);
      return; 
    }
    updateTimerText(--remainingSeconds);
  }, 1000);
}

const stopGameTimer = () => {
  clearInterval(timer);
  hideGameButton();
}

const updateTimerText = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}