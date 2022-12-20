'use strict';

const carrotSound = new Audio('./carrot/sound/carrot_pull.mp3');
// 상수라 클래스 밖에서 선언.
const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, './carrot/img/carrot.png');
    this._addItem('bug', this.bugCount, './carrot/img/bug.png');
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
  
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  // 게임의 시작 여부, 스코어 등 모르는 정보는 다 삭제
  onClick(e) {
    const target = e.target;
    if (target.matches('.carrot')) {
      target.remove();
      playSound(carrotSound);
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  }
}

// 클래스와 상관없는 함수는 클래스 밖에 넣어서 메모리 절약.
const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
}

const randomNumber = (min, max) => {
  return Math.random() * (max - min + 1) + min;
}