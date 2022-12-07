'use strict';

const tag = document.querySelector('.tag');
const horizonLine = document.querySelector('.horizon');
const verticalLine = document.querySelector('.vertical');
const aim = document.querySelector('.aim')

window.addEventListener('load', () => {
  const aimRect = aim.getBoundingClientRect();
  const aimHalfWidth = aimRect.width / 2;
  const aimHalfHeight = aimRect.height / 2;
  console.log(aimRect);

  const tracker = (el) => {
    const x = el.clientX;
    const y = el.clientY;
  
    verticalLine.style.transform = `translateX(${x}px)`;
    horizonLine.style.transform = `translateY(${y}px)`;
    aim.style.transform = `translate(${x - aimHalfWidth}px, ${y - aimHalfHeight}px)`;
    tag.style.transform = `translate(${x + 25}px, ${y + 25}px)`;
    tag.innerHTML = `${x}px, ${y}px`;
  }

  window.addEventListener('mousemove', tracker);
});
