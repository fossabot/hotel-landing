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
    this.isOpen = !this.isOpen;
    this.toggler.classList.toggle('js-open');
    this.checkboxes.classList.toggle('js-open');
  }

  bindHandlers() {
    this.toggler.addEventListener('click', this.toggleCheckboxes.bind(this));
  }
}

export default ExpandableCheckboxList;
