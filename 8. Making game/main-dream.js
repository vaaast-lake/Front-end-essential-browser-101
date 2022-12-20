'use strict';

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

// pop-up
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const randomNumber = (min, max) => {
  return Math.random() * (max - min + 1) + min;
}

const initGame = () => {
  score = 0;
  CARROT_COUNT = 5;
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
}

const onFieldClick = (e) => {
  if (!started) return;

  const target = e.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    finishGame(false);
  }
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
  stopSound();
  showPopUpWithText(win ? 'You Won' : 'You Lost');
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
const carrotSound = new Audio('./carrot/sound/carrot_pull.mp3');
const alertSound = new Audio('./carrot/sound/alert.wav');
const bgSound = new Audio('./carrot/sound/bg.mp3');
const bugSound = new Audio('./carrot/sound/bug_pull.mp3');
const winSound = new Audio('./carrot/sound/game_win.mp3');
let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener('click', () => {
  startGame();
  hidePopUp();
})

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
  showPopUpWithText('Replay?');
  playSound(alertSound);
  stopSound(bgSound);
}

const showStopButton = () => {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-pause');
  icon.classList.remove('fa-play');
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
});