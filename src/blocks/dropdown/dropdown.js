/* eslint-disable no-console */
import DropdownOption from '../select-option/select-option';
import locales from './locales.json';

class Dropdown {
  constructor(element, data) {
    this.data = data;
    this.groups = data.groups;
    this.singleItems = data.singleItems;
    this.element = element;
    this.dropdownContainer = this.element.querySelector('.dropdown__options');
    this.dropdownOpener = this.element.querySelector('.dropdown__input');
    this.input = this.dropdownOpener.querySelector('.dropdown__content');
    this.options = this.findOptions();
    this.items = [...data.items];
    this.values = this.createValues();
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.bindHandlers();
    this.bindButtons();
  }

  bindButtons() {
    this.hasButtons = this.element.querySelector('.dropdown__buttons');
    if (this.hasButtons) {
      const applyButton = this.element.querySelector('.js-apply');
      applyButton.addEventListener('click', this.closeDropdown);
      const clearButton = this.element.querySelector('.js-clear');
      clearButton.addEventListener('click', this.clearValues);
    }
  }

  clearValues() {
    const selectKeys = Object.keys(this.values);
    selectKeys.forEach((key) => { this.values[key] = 0; });
    this.options.forEach((item) => { item.setOptionValue(0); });
    this.updateValue();
    // TODO: disable minuses
    this.disableClear();
  }

  createValues() {
    const values = {};
    this.items.forEach((item) => {
      values[item.name] = 0;
    });
    return values;
  }

  findOptions() {
    const options = [];
    const optionElements = this.dropdownContainer.querySelectorAll('.select-option');
    optionElements.forEach((optionElement) => {
      if (optionElement) {
        const dropdownOption = new DropdownOption(optionElement, this.element);
        options.push(dropdownOption);
      }
    });
    return options;
  }

  static getLocaleString(key, number) {
    let stringIndex;
    if (number === 1) {
      stringIndex = 0;
    } else if (number < 5) {
      stringIndex = 1;
    } else {
      stringIndex = 2;
    }
    return locales[key][stringIndex];
  }

  updateValue() {
    // value passed here is not used, fix this
    let valueString = '';
    if (this.groups) {
      Object.keys(this.groups).forEach((key) => {
        const groupValue = this.groups[key]
          .map((i) => (this.values[i]))
          .reduce((a, b) => (a + b), 0);
        if (groupValue) {
          valueString += `${groupValue} ${Dropdown.getLocaleString(key, groupValue)}`;
        }
      });
    }
    this.singleItems.forEach((single) => {
      if (this.values[single]) {
        const singleString = `${this.values[single]} ${Dropdown.getLocaleString(single, this.values[single])}`;
        if (valueString) {
          valueString += `, ${singleString}`;
        } else {
          valueString += singleString;
        }
      }
    });
    if (valueString) {
      this.input.innerHTML = valueString;
      if (this.hasButtons) {
        this.enableClear();
      }
    } else {
      if (this.hasButtons) {
        this.disableClear();
      }
      this.input.innerHTML = this.data.placeholder;
    }
  }

  enableClear() {
    const clearBtn = this.element.querySelector('.dropdown__clear');
    clearBtn.classList.remove('dropdown__clear_disabled');
  }

  disableClear() {
    const clearBtn = this.element.querySelector('.dropdown__clear');
    clearBtn.classList.add('dropdown__clear_disabled');
  }

  handleOptionChange(e) {
    const { name, value } = e.detail;
    this.values[name] = value;
    this.updateValue(`${value} ${name}`);
  }

  bindHandlers() {
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.disableClear = this.disableClear.bind(this);
    this.enableClear = this.enableClear.bind(this);
    this.clearValues = this.clearValues.bind(this);
    this.dropdownOpener.addEventListener('click', this.toggleDropdown, false);
    this.element.addEventListener('optionChanged', this.handleOptionChange);
    this.handleDocumentClick();
  }

  handleDocumentClick() {
    const stopDropdownClickPropagation = (e) => e.stopPropagation();
    this.dropdownContainer.addEventListener('click', stopDropdownClickPropagation);
    // document.addEventListener('click', this.closeDropdown);
  }

  toggleDropdown(e) {
    e.stopPropagation();
    if (this.isDropdownOpen()) {
      this.closeDropdown(e);
    } else {
      this.openDropdown(e);
    }
  }

  openDropdown() {
    const optionsOpen = 'dropdown__options_open';
    const inputOpen = 'dropdown__input_open';
    this.dropdownContainer.classList.add(optionsOpen);
    this.dropdownOpener.classList.add(inputOpen);
  }

  closeDropdown() {
    const optionsOpen = 'dropdown__options_open';
    const inputOpen = 'dropdown__input_open';
    this.dropdownContainer.classList.remove(optionsOpen);
    this.dropdownOpener.classList.remove(inputOpen);
  }

  isDropdownOpen() {
    return this.dropdownContainer.classList.contains('dropdown__options_open');
  }
}

export default Dropdown;
