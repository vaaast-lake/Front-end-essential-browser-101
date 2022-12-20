'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');
    // 이해 안 댐
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText = (text) => {
    this.popUpMessage.innerText = text;
    this.popUp.classList.remove('hide');
  }

  hide() {
    this.popUp.classList.add('hide');
  }

}