'use strict';

import * as sound from './sound.js'

// 상수라 클래스 밖에서 선언.
const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export  class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    // js에서는 함수를 인자로 전달할 때 class 정보가 전달되지 않는다.
    //this.field.addEventListener('click', this.onClick);
    // 결국 this binding 과정을 하나 거쳐야 한다. 방법은 3 가지.
    // this.onClick() = this.onClick.bind(this);로 클래스와 바인드 시켜주거나 아래 처럼 arrow function을 이용해 this를 유지해준다.
    // this.field.addEventListener('click', (event) => {
    //   this.onClick(event);
    // });
    // 혹은 보내려는 함수를 다른 콜백으로 전달할 때 멤버 변수(name = arrow function)로 만들어서 전달한다.
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItem(ItemType.carrot, this.carrotCount, './carrot/img/carrot.png');
    this._addItem(ItemType.bug, this.bugCount, './carrot/img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // #functionName으로 private 설정 가능하나 유지 보수 측면에서 어렵다는 의견이다.
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
  
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
  
      item.style.transform = `translate(${x}px, ${y}px)`;
      this.field.appendChild(item);
    }
  }

  // 게임의 시작 여부, 스코어 등 모르는 정보는 다 삭제
  // 멤버 변수로 만들어서 this binding으로 만듦
  onClick = (e) => {
    const target = e.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

// 클래스와 상관없는 함수는 클래스 밖에 넣어서 메모리 절약.
const randomNumber = (min, max) => {
  return Math.random() * (max - min + 1) + min;
}