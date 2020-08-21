/* eslint-disable no-console */

class DropdownOption {
  constructor(element, dropdown) {
    this.element = element;
    this.dropdown = dropdown;
    this.valueElement = this.element.querySelector('.select-option__value');
    this.minusBtn = this.element.querySelector('.js-minus');
    this.plusBtn = this.element.querySelector('.js-plus');
    this.name = this.getName();
    this.value = this.getOptionValue();
    this.btnHandler = this.btnHandler.bind(this);
    this.minusBtn.addEventListener('click', this.btnHandler);
    this.plusBtn.addEventListener('click', this.btnHandler);
  }

  getName() {
    const nameClass = Array.from(this.element.classList).filter((klass) => klass.startsWith('js'))[0];
    return nameClass.substr(3, nameClass.length);
  }

  btnHandler(event) {
    // If button is disabled, return
    // Determine button value
    // If Minus button is disabled, and Plus clicked and value is zero, enable minus button
    // Change current value of element
    // Disable buttons if necessary
    // Dispatch event for the dropdown
    const button = event.currentTarget;
    if (button.classList.contains('js-disabled')) return;
    const isMinus = button.classList.contains('js-minus');
    if (!isMinus && this.value === 0) {
      this.minusBtn.classList.remove('js-disabled');
    }
    const change = isMinus ? -1 : 1;
    const newValue = this.value + change;
    this.setOptionValue(newValue);
    if (newValue === 0) {
      this.disableMinus();
    }
    const optionChanged = new CustomEvent('optionChanged',
      { detail: { name: this.name, value: newValue } });
    this.dropdown.dispatchEvent(optionChanged);
  }

  getOptionValue() {
    return parseInt(this.valueElement.textContent, 10);
  }

  setOptionValue(value) {
    this.valueElement.textContent = value;
    this.value = value;
  }

  disableMinus() {
    this.minusBtn.classList.add('js-disabled');
  }
}

export default DropdownOption;
