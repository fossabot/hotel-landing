/* eslint-disable no-console */
import '../../styles/fonts/_fonts.scss';
import './ui_kit.scss';

import '../../blocks/masked-input/masked-input';
import '../../blocks/radiobutton/radiobutton';
import '../../blocks/range-slider/range-slider';
import '../../blocks/rate-button/rate-button';
import '../../blocks/expandable-checkbox-list/expandable-checkbox-list';
import '../../blocks/toggle/toggle';

import Dropdown from '../../blocks/dropdown/dropdown';
import DateFilter from '../../blocks/date-filter/date-filter';

console.log(DateFilter);
const data = require('./data.json');

const uiKitDropdowns = [];
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((d) => {
  /* eslint-disable no-new */
  const jsClass = Array.from(d.classList).filter((klass) => klass.startsWith('js-'))[0];
  const dropdownData = jsClass.substr(3, jsClass.length);
  uiKitDropdowns.push(new Dropdown(d, data[dropdownData]));
});
