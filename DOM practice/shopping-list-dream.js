'use strict';

/**
 * 1. 사용자가 텍스트 인풋에서 타이핑 할 수 있다
 * 2. 아이템 추가는 플러스 버튼이나 텍스트에서 엔터를 했을 때 가능하다.
 * 아이템이 등록되면 쓰레기 아이콘으로 삭제할 수 있다. 
 */

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

// 클릭해서 발생한 이벤트를 처리하는 함수는 보통 on을 붙인다.
const onAdd = () => {
  // 1. 사용자가 입력한 텍스트를 받아옴.
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }
  // 2. 받아온 텍스트로 새로운 아이템을 만든다.(텍스트 + 삭제 버튼)
  const item = createItem(text);
  // 3. items 컨테이너 안에 새로 만든 아이템을 추가한다.
  items.appendChild(item);
  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({block: 'center'});
  // 5. 인풋을 초기화 한다.
  input.value = '';
  // 입력 후 다시 인풋에 포커스를 줘서 재입력하기 용이하게 만듦
  input.focus();
}

let id = 0; // production level 에서는 UUID(unique id)나 obj의 hash code 로 고유한 아이디를 만들지만, 간단한 프로젝트라 숫자로 대체한다. 
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
  ++id;

  // itemRow.addEventListener('click', () => {
  //   if (event.target.tagName === "I") {
  //     items.removeChild(itemRow);
  //   }
  // });

  // const item = document.createElement('div');
  // item.setAttribute('class', 'item');

  // const name = document.createElement('span');
  // name.setAttribute('class', 'item__name');
  // name.innerText = text;

  // const deleteBtn = document.createElement('button');
  // deleteBtn.setAttribute('class', 'item__delete');
  // deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  // deleteBtn.addEventListener('click', () => {
  //   items.removeChild(itemRow);
  // });

  // const itemDivider = document.createElement('div');
  // itemDivider.setAttribute('class', 'item__divider');

  // item.appendChild(name);
  // item.appendChild(deleteBtn);

  // itemRow.appendChild(item);
  // itemRow.appendChild(itemDivider);

  return itemRow;
}

addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    onAdd();
  }
});

items.addEventListener('click', event => {
  const id = event.target.dataset.id;
  if (event.target.dataset.id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
