import 'nouislider/distribute/nouislider.css';
import noUiSlider from 'nouislider';

const slider = document.querySelector('.js-slider');
noUiSlider.create(slider, {
  start: [5000, 10000],
  connect: true,
  range: {
    min: 500,
    max: 15500,
  },
});
