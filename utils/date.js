import Moment from 'moment';
// import 'moment/locale/en-gb';

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
  // Moment.locale('en-gb');
          
  for (let i = 0; i < 7; i++) {
    var today = new Date();
    today = addMinutes(today, 15);
    var targetDate = addDays(today, i);
    var targetPreviewDate = Moment(targetDate).format('ddd, D MMM YYYY');
    var targetDay = Moment(targetDate).format('llll').split(', ')[0];
    var targetDateNum = Moment(targetDate).format('llll').split(', ')[1].split(' ')[1];
    eventDates.push({
      fullDate: targetDate.toString(),
      day: targetDay,
      date: targetDateNum,
      previewDate: targetPreviewDate
    })
  };
  return eventDates;
};

export function addMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() + minutes);

  return date;
};

function addHours(date, hours) {
  date.setHours(date.getHours() + hours);
  console.log(date);
  return date;
};

function addDays(date, days) {
  date.setDate(date.getDate() + days);

  return date;
};

export function getEventStartEndTime() {
  var today = new Date();
  var startDate = new Date();
  var endDate = new Date();
  var startDate = startDate.setHours(today.getHours() + 2);
  var endDate = endDate.setHours(today.getHours() + 3);
  return [Moment(startDate).format('YYYY-MM-DD HH:mm:ss'), Moment(endDate).format('YYYY-MM-DD HH:mm:ss')];
};