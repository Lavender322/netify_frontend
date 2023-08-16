import Moment from 'moment';

export function getFormattedDate(date, withDayInfo) {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  var nextDate = Moment(currentDate).format('ll').split(',')[0];
  var eventDate = Moment(date).format('ll').split(',')[0];
  if (eventDate === nextDate) {
    return 'Tomorrow';
  };
  if (withDayInfo) {
    eventDate = Moment(date).format('llll').split(',')[0] + ',' + Moment(date).format('llll').split(',')[1];
  };
  return eventDate;
};

export function getEventDates() {
  var eventDates = [];
          
  for (let i = 0; i < 7; i++) {
    var today = new Date();
    today = addMinutes(today, 15);
    var targetDate = addDays(today, i);
    var targetDay = Moment(targetDate).format('llll').split(', ')[0];
    targetDate = Moment(targetDate).format('llll').split(', ')[1].split(' ')[1];
    eventDates.push({[targetDay]: targetDate})
  };
  return eventDates;
};

function addMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() + minutes);

  return date;
};

function addDays(date, days) {
  date.setDate(date.getDate() + days);

  return date;
};