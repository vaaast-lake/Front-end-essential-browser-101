'use strict';

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const randomCoordinate = (maxHorizontal, maxVertical) => {
  const randomHorizontal = Math.floor(Math.random() * (maxHorizontal + 1));
  const randomVertical = Math.floor(Math.random() * (maxVertical + 1));
  return [randomHorizontal, randomVertical];
}

const initGame = () => {
  const bugMaxHorizontal = fieldRect.width - 50;
  const bugMaxVertical = fieldRect.height - 50;
  const carrotMaxHorizontal = fieldRect.width - 80;
  const carrotMaxVertical = fieldRect.height - 80;
  
  for (let i = 0; i < 5; i++) {
    const bug = document.createElement('img');
    const carrot = document.createElement('img');
    const [bugX, bugY] = randomCoordinate(bugMaxHorizontal, bugMaxVertical);
    const [carrotX, carrotY] = randomCoordinate(carrotMaxHorizontal, carrotMaxVertical);
    bug.setAttribute('class', 'bug');
    bug.setAttribute('src', './carrot/img/bug.png');
    carrot.setAttribute('class', 'carrot');
    carrot.setAttribute('src', './carrot/img/carrot.png');
   
    bug.style.transform = `translate(${bugX}px, ${bugY}px)`;
    carrot.style.transform = `translate(${carrotX}px, ${carrotY}px)`;

    field.append(bug, carrot);
  }
}

initGame();