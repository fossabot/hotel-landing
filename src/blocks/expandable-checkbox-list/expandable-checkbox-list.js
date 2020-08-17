function toggleOptions() {
  const element = document.querySelector('.expandable-checkbox-list__title');
  const items = document.querySelector('.expandable-checkbox-list__items');
  if (items.classList.contains('js-open')) {
    items.classList.remove('js-open');
    element.classList.remove('js-open');
  } else {
    items.classList.add('js-open');
    element.classList.add('js-open');
  }
}

const element = document.querySelector('.expandable-checkbox-list__title');
element.addEventListener('click', toggleOptions);
/* eslint-disable no-console */
console.log('element');
