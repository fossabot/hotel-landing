function openDropdown() {
  const options = document.querySelector('.dropdown__options');
  const optionsOpen = 'dropdown__options_open';
  options.classList.add(optionsOpen);
  const input = document.querySelector('.dropdown__input');
  const inputOpen = 'dropdown__input_open';
  input.classList.add(inputOpen);
}

const dropdownOpener = document.querySelector('.dropdown__input');
dropdownOpener.addEventListener('click', openDropdown);
