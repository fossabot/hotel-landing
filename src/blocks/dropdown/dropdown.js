import("./dropdown.scss");

function openDropdown() {
    const options = document.querySelector('.dropdown__options');
    const optionsOpen = 'dropdown__options_open';
    console.log('Options: ', options.classList.contains(optionsOpen));
    options.classList.contains(optionsOpen)
        ? options.classList.remove(optionsOpen)
        : options.classList.add(optionsOpen)
    const input = document.querySelector('.dropdown__input');
    const inputOpen = 'dropdown__input_open';
    input.classList.contains(inputOpen)
        ? input.classList.remove(inputOpen)
        : input.classList.add(inputOpen)
}

const dropdownOpener = document.querySelector('.dropdown__input');
dropdownOpener.addEventListener('click', openDropdown);
