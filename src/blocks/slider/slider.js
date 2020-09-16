/* eslint-disable no-console */
import 'nouislider/distribute/nouislider.css';
import noUiSlider from 'nouislider';

const defaultOptions = {
  start: [5000, 10000],
  connect: true,
  range: {
    min: 500,
    max: 15500,
  },
};

class RangeSlider {
  constructor(element, options) {
    this.options = options || defaultOptions;
    this.slider = noUiSlider.create(element, this.options);
  }
}
export default RangeSlider;
