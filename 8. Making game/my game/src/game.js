'use strict';

import { Field, ItemType } from "./field.js";
import { PopUp, Reason } from './pop-up.js';

export default class Game {
  constructor(gameTime, carrotNum, bugNum) {
    this.GAME_TIME = gameTime;
    this.CARROT_NUM = carrotNum;
    this.BUG_NUM = bugNum;

    this.controlBtn = document.querySelector('.game__control.btn');
    this.timer = document.querySelector('.game__timer');
    this.carrotCnt = document.querySelector('.game__counter');

    this.start = false;
    this.interval = null;
    this.remainingTime = this.GAME_TIME;
    this.count = 0;

    this.field = new Field();
    this.field.onClickListener(this.onItemClick);

    this.popUp = new PopUp();
    this.popUp.onClickListener(this.init);

    this.controlBtn.addEventListener('click', () => {
      if (this.start) {
        this.gameStop(Reason.pause);
      } else {
        this.gameStart();
      }
    });
  }

  init = () => {
    this.start = false;
    this.remainingTime = this.GAME_TIME;
    this.field.section.innerHTML = '';
    this.count = 0;
    this.updateTimer(this.remainingTime);
    this.gameInterfaceControl();
    this.updateCarrotCnt();
  }

  updateCarrotCnt = () => {
    this.carrotCnt.textContent = this.CARROT_NUM - this.count;
  }
  
  onItemClick = (item) => {
    if (item === ItemType.carrot) {
      this.updateCarrotCnt(++this.count);
      if (this.CARROT_NUM === this.count) {
        this.gameStop(Reason.win);
        this.gameInterfaceControl(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.gameStop(Reason.lose);
    }
  }

  timeControl = (reason) => {
    if (reason) {
      clearInterval(this.interval);
      return;
    }
    this.updateTimer(this.remainingTime);
    this.interval = setInterval(() => {
      if (this.remainingTime === 0) {
        clearInterval(this.interval);
        this.gameStop(Reason.lose);
        return;
      }
      this.updateTimer(--this.remainingTime);
    }, 1000);
  }

  updateTimer = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
    const seconds = (remainingTime % 60).toString().padStart(2, '0');
    this.timer.innerText = `${minutes}:${seconds}`;
  }

  // field, popup method?
  gameStart = () => {
    this.start = true;
    this.gameInterfaceControl();
    this.timeControl();
    this.popUp.hideControl();
    this.updateCarrotCnt();
    if (!this.field.section.innerHTML) {
      this.field._addImgItem(ItemType.carrot, this.CARROT_NUM, '../carrot/img/carrot.png');
      this.field._addImgItem(ItemType.bug, this.BUG_NUM, '../carrot/img/bug.png');
    }
  }

  // popup method?
  gameStop = (reason) => {
    this.start = false;
    this.gameInterfaceControl(reason);
    this.popUp.hideControl(reason);
    this.timeControl(reason);
    this.popUp.message(reason);
  }

  gameInterfaceControl = (reason) => {
    if (reason === Reason.lose || reason === Reason.win) {
      this.controlBtn.style.visibility = 'hidden';
      return;
    } else {
      this.controlBtn.style.visibility = 'visible';
    }
    if (this.start) {
      this.controlBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
      this.controlBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
  }

}