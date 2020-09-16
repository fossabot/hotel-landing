/* eslint-disable no-param-reassign */

import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { Russian } from 'flatpickr/dist/l10n/ru';
import './theme.css';
import 'flatpickr/dist/flatpickr.min.css';

const addClasses = (element, classes) => {
  classes.split(' ').forEach((c) => {
    element.classList.add(c);
  });
};

const storeDates = (dates) => {
  window.localStorage.setItem('toxin_dates', JSON.stringify(dates));
};

/* eslint-disable consistent-return */
const getStoredDates = () => {
  const datesString = window.localStorage.getItem('toxin_dates');
  if (datesString) {
    const datesArr = JSON.parse(datesString);
    return datesArr.map((d) => new Date(d));
  }
};
const clearStoredDates = () => {
  window.localStorage.removeItem('toxin_dates');
};

const addClearApply = (selectedDates, dateStr, instance) => {
  const buttons = document.createElement('div');
  addClasses(buttons, 'date-filter__buttons js-buttons');
  const clearDates = () => {
    instance.clear();
    clearStoredDates();
  };
  const applyDates = () => {
    instance.close();
    storeDates(instance.selectedDates);
  };
  const clearButton = document.createElement('button');
  addClasses(clearButton, 'button button_text button_gray');
  clearButton.textContent = 'Очистить';
  clearButton.addEventListener('click', clearDates);

  const applyButton = document.createElement('button');
  addClasses(applyButton, 'button button_text');
  applyButton.textContent = 'Применить';
  applyButton.addEventListener('click', applyDates);

  buttons.appendChild(clearButton);
  buttons.appendChild(applyButton);

  instance.calendarContainer.appendChild(buttons);
};

const defaultConfig = {
  locale: Russian,
  nextArrow: '<i class="material-icons datepicker-icon">arrow_forward</i>',
  prevArrow: '<i class="material-icons datepicker-icon">arrow_back</i>',
  weekStart: 1,
  mode: 'range',
  dateFormat: 'j M',
  plugins: [],
  closeOnSelect: false,
  onReady: [addClearApply],
  minDate: new Date(),
};

class DateFilter {
  constructor(element) {
    this.element = element;
    this.initPickers();
  }

  initPickers() {
    const config = { ...defaultConfig };
    const defaultDates = getStoredDates();
    if (defaultDates) {
      config.defaultDate = defaultDates;
    }
    const inputs = this.element.querySelectorAll('input');
    this.hasTwoInputs = inputs.length === 2;
    if (this.hasTwoInputs) {
      /* eslint-disable new-cap */
      this.picker = flatpickr(
        inputs[0],
        {
          ...config,
          plugins: [
            ...config.plugins,
            new rangePlugin({ input: inputs[1] }),
          ],
        },
      );
    } else {
      config.wrap = true;
      this.picker = flatpickr(this.element, config);
    }
  }
}

export default DateFilter;
