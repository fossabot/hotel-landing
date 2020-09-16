/* eslint-disable no-console */
import '../../styles/fonts/_fonts.scss';
import './form_elements.scss';
import '../../blocks/masked-input/masked-input';
import '../../blocks/radiobutton/radiobutton';
import '../../blocks/range-slider/range-slider';
import '../../blocks/rate-button/rate-button';
import '../../blocks/toggle/toggle';

import Dropdown from '../../blocks/dropdown/dropdown';
import DateFilter from '../../blocks/date-filter/date-filter';
import RangeSlider from '../../blocks/slider/slider';
import ExpandableCheckboxList from '../../blocks/expandable-checkbox-list/expandable-checkbox-list';

const data = require('./dropdowns.json');

function initAll() {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach((d) => {
    /* eslint-disable no-new */
    const jsClass = Array.from(d.classList).filter((klass) => klass.startsWith('js-'))[0];
    const dropdownData = jsClass.substr(3, jsClass.length);
    return new Dropdown(d, data[dropdownData]);
  });

  const expandableCheckboxLists = document.querySelectorAll('.js-expandable-checkbox-list');
  expandableCheckboxLists.forEach((list) => new ExpandableCheckboxList(list));

  const dateFilters = document.querySelectorAll('.js-dates');
  dateFilters.forEach((filter) => new DateFilter(filter));

  const sliders = document.querySelectorAll('.js-slider');
  sliders.forEach((slider) => new RangeSlider(slider));
}

document.addEventListener('DOMContentLoaded', initAll);
