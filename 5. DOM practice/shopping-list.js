'use strict';

const inputData = document.querySelector('#input');
const addBtn = document.querySelector('.add-btn');
const mainFrame = document.querySelector('.frame');
const items = document.querySelector('.items');

// input + enter
inputData.addEventListener('keyup', (el) => {

  // createElement
  const item = document.createElement('div');
  const itemLeft = document.createElement('span');
  const itemRight = document.createElement('span');
  const deleteAnchor = document.createElement('a');
  const trashIcon = document.createElement('i');
  const strickBtn = document.createElement('input');

  // add item
  const addItem = (value) => {

    item.setAttribute('class', 'item');
    
    itemLeft.setAttribute('class', 'item__left');
    itemRight.setAttribute('class', 'item__right');
    strickBtn.setAttribute('type', 'checkbox');
    strickBtn.setAttribute('class', 'strickBtn');
    
    deleteAnchor.setAttribute('class', 'delete');
    trashIcon.setAttribute('class', 'fa-solid fa-trash-can');
    
    items.append(item);
    item.append(itemLeft);
    itemLeft.append(strickBtn);
    itemLeft.append(`${value}`);
    item.append(itemRight);
    itemRight.append(deleteAnchor);
    deleteAnchor.append(trashIcon);
  }

  if (el.keyCode === 13 && el.target.value) {
      addItem(el.target.value);
      el.target.value = '';
    } else if (el.target.value === '') {
      alert('please type your item.');
    }
  
  const deleteItem = (value) => {
    value.remove();
  }

  trashIcon.addEventListener('click', (el) => {
    deleteItem(el.target.parentNode.parentNode.parentNode);
  });
  
});

const controlStrickthrough = (node) => {
  const strickthrough = document.createElement('s');
  const leftNode = node[0];
  const button = leftNode.childNodes[0];
  const textNode = leftNode.childNodes[1];

  // type 3 = text;
  if (textNode.nodeType === 3) {
    leftNode.removeChild(textNode);
    leftNode.append(strickthrough);
    strickthrough.append(textNode);
    // 취소선이 들어가면 버튼도 체크된다.
    button.checked = true;
    // type 1 = element;
  } else if (textNode.nodeType === 1) {
    const pureText = textNode.childNodes[0];
    leftNode.removeChild(textNode);
    leftNode.append(pureText);
    button.checked = false;
  }
}

// if click, string add strickthrough
items.addEventListener('click', (el) => {
  const node = el.target;

  if (node.nodeName !== 'I') {

    // 체크박스를 누르거나 이미 취소선이 그어진 텍스트를 눌렀을 때 보내야 할 노드를 구분했다.
    if (node.nodeName === 'S' || node.nodeName === 'INPUT') {
      controlStrickthrough(node.parentNode.parentNode.childNodes);
      // 아이템 박스를 클릭하거나 텍스트를 클릭했을 때 보낼 노드를 구분해줬다.
    } else if (node.nodeName === 'SPAN') {
      console.log(node.parentNode.childNodes);
      controlStrickthrough(node.parentNode.childNodes);
    } else if (node.nodeName === 'DIV') {
      controlStrickthrough(node.childNodes);
    }

  }
});
