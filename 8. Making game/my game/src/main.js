'use strict';

import { Gamebuilder, Reason } from "./game.js";
import { PopUp } from "./pop-up.js";

// const GAME_TIME_SECONDS = 2;
// const CARROT_NUM = 5;
// const BUG_NUM = 5;

// const game = new Game(GAME_TIME_SECONDS, CARROT_NUM, BUG_NUM)
const game = new Gamebuilder()
              .withDuration(5)
              .withCarrotCnt(3)
              .withBugCnt(3)
              .build();
const popUp = new PopUp();

game.stopGameListener(reason => {
  let message;
  switch (reason) {
    case Reason.win:
      message = 'You Won!';
      break;
    case Reason.lose:
      message = 'You Lost!';
      break;
    case Reason.pause:
      message = 'Retry?';
      break;
  
    default:
      console.error('No Valid request.');
      break;
  }
  popUp.showWithMessage(message);
});

game.init();