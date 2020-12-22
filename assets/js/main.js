'use strict'

const shoppingList = document.querySelector('.lists'), 
  itemForm = document.querySelector('.shopping-form'),
  itemInput = itemForm.querySelector('.shopping-form__input'),
  itemAddBtn = itemForm.querySelector('.shopping-form__add-btn');

const ITEM_LS = 'item',
  LIST_CN = 'list',
  LIST_ITEM_CN = 'list__item',
  DEL_BTN_CN = 'list__del-btn';

let items = [];

function deleteItem(e) {
  const target = e.currentTarget;
  const list = target.parentNode;
  shoppingList.removeChild(list);
  const cleanItem = items.filter(function(item) {
    return parseInt(list.id) !== item.id;
  });
  items = cleanItem;
  saveItem(items);
}

function saveItem(text) {
  localStorage.setItem(ITEM_LS, JSON.stringify(text));
}

function paintItem(text) {
  const list = document.createElement('li');
  const span = document.createElement('span');
  const delBtn = document.createElement('button');
  const newId = items.length + 1;
  list.setAttribute('class', LIST_CN);
  list.id = newId;
  span.textContent = text;
  span.setAttribute('class', LIST_ITEM_CN);
  delBtn.innerHTML = '<i class="fas fa-minus"></i>';
  delBtn.setAttribute('class', DEL_BTN_CN);
  delBtn.addEventListener('click', deleteItem);
  list.appendChild(span);
  list.appendChild(delBtn);
  shoppingList.appendChild(list);
  const itemsObj = {
    text: text,
    id: newId
  }
  items.push(itemsObj);
  saveItem(items);
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = itemInput.value;
  paintItem(currentValue);
  itemInput.value = '';
}

function loadItems() {
  const loadedItems = localStorage.getItem(ITEM_LS);
  if(loadedItems !== null) {
    const parseItems = JSON.parse(loadedItems);
    parseItems.forEach(function(item) {
      paintItem(item.text);
    });
  }
}

function init() {
  loadItems();
  itemForm.addEventListener('submit', handleSubmit);
}

init();