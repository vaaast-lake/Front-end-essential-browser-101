'use strict';

const inputData = document.querySelector('#input');
const addBtn = document.querySelector('.add-btn');
const mainFrame = document.querySelector('.frame');
const items = document.querySelector('.items');

// input + enter
inputData.addEventListener('keyup', (el) => {

  // createElement
  const item = document.createElement('span');
  const deleteAnchor = document.createElement('a');
  const trashIcon = document.createElement('i');
  const strickBtn = document.createElement('button');

  // add item
  const addItem = (value) => {

    item.setAttribute('class', 'item');
    
    strickBtn.setAttribute('class', 'strickBtn');
    
    deleteAnchor.setAttribute('class', 'delete');
    trashIcon.setAttribute('class', 'fa-solid fa-trash-can');
    
    items.append(item);
    item.append(strickBtn);
    item.textContent = `${value}`;
    item.append(deleteAnchor);
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
    deleteItem(el.target.parentNode.parentNode);
  });
  
});

const controlStrickthrough = (node) => {
  const strickthrough = document.createElement('s');
  const nodeList = node.childNodes;
  const textNode = nodeList[0];
  const anchorNode = nodeList[1];

  // console.log('nodeType: ', textNode.nodeType);
  
  // type 3 = text;
  if (textNode.nodeType === 3) {
    node.removeChild(textNode);
    node.insertBefore(strickthrough, anchorNode);
    strickthrough.append(textNode);
    // type 1 = element;
  } else if (textNode.nodeType === 1) {
    const pureText = textNode.childNodes[0];
    node.removeChild(textNode);

    // console.log(pureText.nodeType);
    // console.log(nodeList[0].nodeType);

    anchorNode.before(pureText);

    // console.log('afterNodeList: ', nodeList);
    // console.log('pure: ', pureText);
    // console.log(anchorNode.nodeType);
    // return [pureText, nodeList];
  }
}

// if click, string add strickthrough
// inputData listener 안에 넣으면 반복해서 실행된다.
items.addEventListener('click', (el) => {
  const node = el.target;
  if (node.nodeName !== 'I') {
    // 취소선이 들어갔을 때 contents 안에 text를 클릭하면 취소선이 중첩해서 들어가는 버그가 있었다.
    // 취소선이 들어갔을 때는 취소선 노드의 부모를 넣어주고, 정상적으로 span node 가 node 로 할당됐으면 그대로 넣어줬다. 
    node.nodeName === 'S' ? controlStrickthrough(node.parentNode) : controlStrickthrough(node);
    // console.log('nodeName: ', node.nodeName);
    // console.log('nodeParent: ', node.parentNode);
  }
});
