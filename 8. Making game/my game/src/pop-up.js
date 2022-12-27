'use strict';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  pause: 'pause',
});

export class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.refreshBtn = document.querySelector('.pop-up__refresh.btn');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.refreshBtn.addEventListener('click', () => {
      this.onClick1 && this.onClick1();
      this.hideControl();
    });
  }

  onClickListener = (func1) => {
    this.onClick1 = func1;
  }

  hideControl = (reason) => {
    if (reason) {
      this.popUp.classList.remove('hide');
    } else {
      this.popUp.classList.add('hide');
    }
  }
  
  message = (reason) => {
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
    this.popUpMessage.textContent = message;
  }
}