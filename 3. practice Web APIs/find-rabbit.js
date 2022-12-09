'use strict'

const findBtn = document.querySelector('.find-rabbit');
const rabbitY = document.querySelector('.rabbit').getBoundingClientRect().top;


findBtn.addEventListener('click', (el) => {
  window.scrollTo({top: rabbitY, left: 0, behavior: 'smooth'});
  console.log(rabbitY);
});