import Dropdown from '../dropdown/dropdown';

const data = require('../../data.json');

const searchCardDropdowns = [];
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((d) => {
  /* eslint-disable no-new */
  const jsClass = Array.from(d.classList).filter((klass) => klass.startsWith('js-'))[0];
  const dropdownData = jsClass.substr(3, jsClass.length);
  searchCardDropdowns.push(new Dropdown(d, data[dropdownData]));
});
