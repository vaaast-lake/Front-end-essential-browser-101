'use strict';

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotNum, bugNum) {
    this.carrotNum = carrotNum;
    this.bugNum = bugNum;
    this.section = document.querySelector('.game__field');
    this.carrotCnt = document.querySelector('.game__counter');
    this.fieldHeight = this.section.getBoundingClientRect().height;
    this.fieldWidth = this.section.getBoundingClientRect().width;
    this.section.addEventListener('click', this.itemRemover);
  }

  setClickListener = (func1) => {
    this.onClick = func1;
  }
  
  _addImgItem = (className, count, path) => {
    const minX = 0;
    const maxX = className === ItemType.carrot ? this.fieldWidth - 80 : this.fieldWidth - 60;
    const minY = 0;
    const maxY = className === ItemType.carrot ? this.fieldHeight - 80 : this.fieldHeight - 60;
  
    for (let i = 0; i < count; i++) {
      const x = randomPositioning(minX, maxX);
      const y = randomPositioning(minY, maxY);
  
      const imgItem = document.createElement('img');
      imgItem.setAttribute('class', className);
      imgItem.setAttribute('src', path);
      imgItem.style.position = 'absolute';
      // imgItem.style.transform = `translate(${x}px, ${y}px)`;
      imgItem.style.left = `${x}px`;
      imgItem.style.top = `${y}px`;
      this.section.appendChild(imgItem);
    }
  }
  
  // 여기서 헤맴. 좀 더 큰 단위(onItemClick)를 넣어야하는데 updateCarrotCnt를 넣었음
  itemRemover = (e) => {
    const target = e.target;
    if (target.matches('.carrot')) {
      target.remove();
      this.onClick && this.onClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      this.onClick && this.onClick(ItemType.bug);
    }
  }
}

const randomPositioning = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}