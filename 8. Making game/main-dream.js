'use strict';

const CARROT_SIZE = 80;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const randomNumber = (min, max) => {
  return Math.random() * (max - min + 1) + min;
}

const initGame = () => {
  addItem('carrot', 5, './carrot/img/carrot.png');
  addItem('carrot', 5, './carrot/img/bug.png');
}

const addItem = (className, count, imgPath) => {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);

    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

initGame();