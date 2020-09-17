import '../../styles/fonts/_fonts.scss';
import './search_room.scss';
import '../../blocks/expandable-checkbox-list/expandable-checkbox-list';
import RangeSlider from '../../blocks/slider/slider';

const initAll = () => {
  const sliders = document.querySelectorAll('.js-slider');
  sliders.forEach((slider) => new RangeSlider(slider));
};

document.addEventListener('DOMContentLoaded', initAll);
