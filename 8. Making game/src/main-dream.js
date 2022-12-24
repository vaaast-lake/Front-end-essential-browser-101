'use strict';

import PopUp from './popup-dream.js';
import { GameBuilder, Reason } from './game-dream.js';
// import * as sound from './sound-dream.js'

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
              .withGameDuration(2)
              .withCarrotCount(1)
              .withBugCount(1)
              .build();

game.setGameStopListener(reason => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'replay?';
      // sound.playAlert();
      break;
    case Reason.win:
      message = 'You Won';
      // sound.playWin();
      break;
    case Reason.lose:
      message = 'You Lost';
      // sound.playBug();
      break;
  
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(game.start);