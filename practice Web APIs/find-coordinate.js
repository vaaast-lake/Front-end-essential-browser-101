'use strict';

const clientCoordinate = document.querySelector('.client-coordinate');
const horizonLine = document.querySelector('.horizon');
const verticalLine = document.querySelector('.vertical');
const aim = document.querySelector('.aim')

const coordinate = (el) => {
  clientCoordinate.innerHTML = `
  ${el.clientX}px, ${el.clientY}px
  `;
  console.log(el);
}

const tracker = (el) => {
  const clientX = el.clientX + 'px';
  const clientY = el.clientY + 'px';

  verticalLine.style.left = clientX;
  horizonLine.style.top = clientY;
  aim.style.left = clientX;
  aim.style.top = clientY;
  clientCoordinate.style.left = clientX;
  clientCoordinate.style.top = clientY;
}

window.addEventListener('mousemove', coordinate);
window.addEventListener('mousemove', tracker)
