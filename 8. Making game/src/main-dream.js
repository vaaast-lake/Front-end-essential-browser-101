'use strict';

import PopUp from './popup-dream.js';
import Game from './game-dream.js';



const gameFinishBanner = new PopUp();
const game = new Game(3, 2, 2);

game.steGameStopListener(reason => {
  console.log(reason);
  let message;
  switch (reason) {
    case 'cancel':
      message = 'replay?';
      break;
    case 'win':
      message = 'You Won';
      break;
    case 'lose':
      message = 'You Lost';
      break;
  
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message)
});

gameFinishBanner.setClickListener(() => {
  game.start();
});