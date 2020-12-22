'use strict'

const itemForm = document.querySelector('.shopping-form'),
  itemInput = itemForm.querySelector('.shopping-form__input'),
  itemAddBtn = itemForm.querySelector('.shopping-form__add-btn');

const ITEM_LS = 'item';

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = itemInput.value;
  paintItem(curentValue);
}

function loadItems() {
  const loadedItems = localStorage.getItem(ITEM_LS);
  if(loadedItems !== null) {

  }
}

function init() {
  loadItems();
  itemForm.addEventListener('submit', handleSubmit);
}

init();