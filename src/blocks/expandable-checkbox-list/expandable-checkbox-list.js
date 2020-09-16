class ExpandableCheckboxList {
  constructor(element) {
    this.element = element;
    this.isOpen = false;
    this.initElements();
    this.bindHandlers();
  }

  initElements() {
    this.toggler = this.element.querySelector('.js-checkbox-toggler');
    this.checkboxes = this.element.querySelector('.js-checkboxes');
    if (this.toggler.classList.contains('js-open')) {
      this.isOpen = true;
      this.checkboxes.classList.add('js-open');
    }
  }

  toggleCheckboxes() {
    if (this.isOpen) {
      this.isOpen = !this.isOpen;
      this.toggler.classList.remove('js-open');
      this.checkboxes.classList.remove('js-open');
    } else {
      this.isOpen = !this.isOpen;
      this.toggler.classList.add('js-open');
      this.checkboxes.classList.add('js-open');
    }
  }

  bindHandlers() {
    this.toggler.addEventListener('click', this.toggleCheckboxes.bind(this));
  }
}

export default ExpandableCheckboxList;
