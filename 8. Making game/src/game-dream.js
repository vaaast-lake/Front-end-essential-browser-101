'use strict';

import { Field, ItemType } from './field-dream.js';
import * as sound from './sound-dream.js'

// 타입을 보장.
export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder Pattern
// 오브젝트를 간단명료하고 가독성 좋게 만들 수 있다.
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    // class 자체를 리턴.
    return this;
  }

  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }
  
  build() {
    return new Game (
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    )
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');

    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  onItemClick = (item) => {
    if (!this.started) return;
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start = () => {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }
  
  stop = (reason) => {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  showStopButton = () => {
    const icon = this.gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-pause');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }
  
  hideGameButton = () => {
    this.gameBtn.style.visibility = 'hidden';
  }
  
  showTimerAndScore = () => {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }
  
  startGameTimer = () => {
    let remainingSeconds = this.gameDuration;
    this.updateTimerText(remainingSeconds);
    this.timer = setInterval(() => {
      if (remainingSeconds === 0) {
        this.stop(this.CARROT_COUNT === this.score ? Reason.win : Reason.lose);
        return; 
      }
      this.updateTimerText(--remainingSeconds);
    }, 1000);
  }

  stopGameTimer = () => {
    clearInterval(this.timer);
    this.hideGameButton();
  }
  
  updateTimerText = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  initGame = () => {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  updateScoreBoard = () => {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}