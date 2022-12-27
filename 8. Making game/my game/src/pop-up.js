'use strict';

export class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.refreshBtn = document.querySelector('.pop-up__refresh.btn');
    this.message = document.querySelector('.pop-up__message');
    this.refreshBtn.addEventListener('click', () => {
      this.onClick1 && this.onClick1();
      this.hide();
    });
  }

  setClickListener = (func1) => {
    this.onClick1 = func1;
  }

  hide = () => {
    this.popUp.classList.add('hide');
  }

  showWithMessage = (message) => {
    this.popUp.classList.remove('hide');
    this.message.textContent = message;
  }
}