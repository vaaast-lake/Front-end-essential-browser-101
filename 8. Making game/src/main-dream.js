'use strict';

import PopUp from './popup-dream.js';
import {GameBuilder, Reason} from './game-dream.js';



const gameFinishBanner = new PopUp();
const game = new GameBuilder()
              .gameDuration(5)
              .carrotCount(3)
              .bugCount(3)
              .build();

game.steGameStopListener(reason => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'replay?';
      break;
    case Reason.win:
      message = 'You Won';
      break;
    case Reason.lose:
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