/* eslint-disable import/no-unresolved */
import { DateRangePicker } from 'vanillajs-datepicker';
import Datepicker from 'vanillajs-datepicker/js/Datepicker';
import ru from '../../../node_modules/vanillajs-datepicker/js/i18n/locales/ru';

Object.assign(Datepicker.locales, ru);

const isRange = (calendar) => calendar.querySelector('.start').length > 0;
const DateFilter = [];

const calendar = document.querySelector('.js-dates');
const options = {
  language: 'ru',
  container: '.js-dates',
  buttonClass: 'date-filter__button',
  nextArrow: '<i class="material-icons datepicker-icon">arrow_forward</i>',
  prevArrow: '<i class="material-icons datepicker-icon">arrow_back</i>',
  todayHighlight: true,
  weekStart: 1,
};

if (isRange) {
  DateFilter.push(new DateRangePicker(calendar, options));
}

export default DateFilter;
