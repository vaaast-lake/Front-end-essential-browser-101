'use strict';

// import PopUp from "./pop-up.js";
// import Field from "./field.js";
import Game from "./game.js";

// game section
// const gameControlBtn = document.querySelector('.game__control.btn');
// const gameTimer = document.querySelector('.game__timer');
// const carrotCnt = document.querySelector('.game__counter');

const GAME_TIME_SECONDS = 2;
const CARROT_NUM = 5;
const BUG_NUM = 5;

const game = new Game(GAME_TIME_SECONDS, CARROT_NUM, BUG_NUM)

// game Field
// const gameField = document.querySelector('.game__field');
// const fieldHeight = gameField.getBoundingClientRect().height;
// const fieldWidth = gameField.getBoundingClientRect().width;

// const field = new Field(CARROT_NUM, BUG_NUM);

// pop-up
// const popUp = document.querySelector('.pop-up');
// const refreshBtn = document.querySelector('.pop-up__refresh.btn');
// const popUpMessage = document.querySelector('.pop-up__message');

// const popUp = new PopUp();


// stop-reason
// const Reason = Object.freeze({
//   win: 'win',
//   lose: 'lose',
//   pause: 'pause',
// });

// // item Type
// const ItemType = Object.freeze({
//   carrot: 'carrot',
//   bug: 'bug',
// });

// let start = false;
// let interval = null;
// let remainingTime = GAME_TIME_SECONDS;
// let count = 0;

// const gameInit = () => {
//   start = false;
//   remainingTime = GAME_TIME_SECONDS;
//   field.gameField.innerHTML = '';
//   count = 0;
//   updateTimer(remainingTime);
//   gameInterfaceControl();
//   updateCarrotCnt();
// }

// const timeControl = (reason) => {
//   if (reason) {
//     clearInterval(interval);
//     return;
//   }
//   updateTimer(remainingTime);
//   interval = setInterval(() => {
//     if (remainingTime === 0) {
//       clearInterval(interval);
//       gameStop(Reason.lose);
//       return;
//     }
//     updateTimer(--remainingTime);
//   }, 1000);
// }

// const updateTimer = (remainingTime) => {
//   const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
//   const seconds = (remainingTime % 60).toString().padStart(2, '0');
//   gameTimer.innerText = `${minutes}:${seconds}`;
// }

// const gameStart = () => {
//   start = true;
//   gameInterfaceControl();
//   timeControl();
//   popUp.hideControl();
//   updateCarrotCnt();
//   if (!field.gameField.innerHTML) {
//     field._addImgItem(ItemType.carrot, CARROT_NUM, '../carrot/img/carrot.png');
//     field._addImgItem(ItemType.bug, BUG_NUM, '../carrot/img/bug.png');
//   }
// }

// const gameStop = (reason) => {
//   start = false;
//   gameInterfaceControl(reason);
//   popUp.hideControl(reason);
//   timeControl(reason);
//   popUp.message(reason);
// }

// const gameInterfaceControl = (reason) => {
//   if (reason === Reason.lose || reason === Reason.win) {
//     gameControlBtn.style.visibility = 'hidden';
//     return;
//   } else {
//     gameControlBtn.style.visibility = 'visible';
//   }
//   if (start) {
//     gameControlBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
//   } else {
//     gameControlBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
//   }
// }

// gameControlBtn.addEventListener('click', () => {
//   if (start) {
//     gameStop(Reason.pause);
//   } else {
//     gameStart();
//   }
// });

// pop-up
// const popUpHideControl = (reason) => {
//   if (reason) {
//     popUp.classList.remove('hide');
//   } else {
//     popUp.classList.add('hide');
//   }
// }

// const popUpMessageControl = (reason) => {
//   let message;
//   switch (reason) {
//     case Reason.win:
//       message = 'You Won!';
//       break;
//     case Reason.lose:
//       message = 'You Lost!';
//       break;
//     case Reason.pause:
//       message = 'Retry?';
//       break;
  
//     default:
//       console.error('No Valid request.');
//       break;
//   }
//   popUpMessage.textContent = message;
// }

// refreshBtn.addEventListener('click', () => {
//   gameInit();
//   popUpHideControl();
// });

// popUp.onClickListener(gameInit);

// game-field
// const randomPositioning = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const addImgItem = (className, count, path) => {
//   const minX = 0;
//   const maxX = className === ItemType.carrot ? fieldWidth - 80 : fieldWidth - 60;
//   const minY = 0;
//   const maxY = className === ItemType.carrot ? fieldHeight - 80 : fieldHeight - 60;

//   for (let i = 0; i < count; i++) {
//     const x = randomPositioning(minX, maxX);
//     const y = randomPositioning(minY, maxY);

//     const imgItem = document.createElement('img');
//     imgItem.setAttribute('class', className);
//     imgItem.setAttribute('src', path);
//     imgItem.style.position = 'absolute';
//     // imgItem.style.transform = `translate(${x}px, ${y}px)`;
//     imgItem.style.left = `${x}px`;
//     imgItem.style.top = `${y}px`;
//     gameField.appendChild(imgItem);
//   }
// }

// const updateCarrotCnt = () => {
//   carrotCnt.textContent = CARROT_NUM - count;
// }

// const onItemClick = (item) => {
//   if (item === ItemType.carrot) {
//     updateCarrotCnt(++count);
//     if (CARROT_NUM === count) {
//       gameStop(Reason.win);
//       gameInterfaceControl(Reason.win);
//     }
//   } else if (item === ItemType.bug) {
//     gameStop(Reason.lose);
//   }
// }

// field.onClickListener(onItemClick);

// gameField.addEventListener('click', onItemClick);

game.init();