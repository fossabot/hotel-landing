import IMask from 'imask';

class MaskedDateInput {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.initMask();
  }

  initMask() {
    this.mask = IMask(this.element, {
      mask: Date,
      autofix: true, // defaults to `false`
      lazy: false,
      overwrite: true, // defaults to `false`
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
          placeholderChar: 'Д',
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
          placeholderChar: 'М',
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 9999,
          placeholderChar: 'Г',
        },
      },
    });
  }
}
/* eslint-disable no-new */
new MaskedDateInput('.masked-input');
