/* eslint-disable no-console */
import '../../styles/fonts/_fonts.scss';
import './cards.scss';
import DateFilter from '../../blocks/date-filter/date-filter';

function initAll() {
  const calendars = document.querySelectorAll('.js-calendar');
  console.log('Initializing, ', calendars);
  const isCalendarInline = true;
  calendars.forEach((calendar) => new DateFilter(calendar, isCalendarInline));
}

document.addEventListener('DOMContentLoaded', initAll);
