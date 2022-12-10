'use strict';

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
const form = document.querySelector('.new-form');

form.addEventListener('submit', event => {
  event.preventDefault();
  onAdd();
});

const onAdd = () => {
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({block: 'center'});
  input.value = '';
  input.focus();
}

let id = 0;
const createItem = (text) => {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item">
      <span class="item__name">${text}</span>
      <button class="item__delete">
        <i class="fa-solid fa-trash-can" data-id="${id}"></i>
      </button>
    </div>
    <div class="item__divider"></div>
  `;

  localStorage.setItem(id, itemRow.outerHTML);

  ++id;

  return itemRow;
}

const listStoredItems = () => {
  // methods in localstorage is gotten as key too. They make null when JSON.parse() is running.
  // for (const key in localStorage) {
  //   const storedItem = JSON.parse(localStorage.getItem(key));
  //   items.insertAdjacentHTML('beforeend', storedItem);
  // }
  for (const key in localStorage) {
    // methods in localstorage assigned prototype method. So, if run for...in loop, method is printed as key. Object.hasOwnProperty() prevents prototype methods being printed.
    if (Object.hasOwnProperty.call(localStorage, key)) {
      const storedItem = localStorage[key];
      // console.log(storedItem);
      items.insertAdjacentHTML('beforeend', storedItem);
    }
  }
}

// 삭제
items.addEventListener('click', event => {
  const id = event.target.dataset.id;
  if (event.target.dataset.id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
    localStorage.removeItem(id);
  }
});

if (localStorage.getItem('0')) {
  listStoredItems();
}
