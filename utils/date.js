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

function addDays(date, days) {
  date.setDate(date.getDate() + days);

  return date;
};

export function getEventStartEndTime(date, startTime, endTime) {
  var selectedStartTime = new Date(startTime);
  var selectedEndTime = new Date(endTime);
  var startDate = new Date(date);
  var endDate = new Date(date);
  startDate.setHours(selectedStartTime.getHours());
  startDate.setMinutes(selectedStartTime.getMinutes());
  startDate.setSeconds(0);
  endDate.setHours(selectedEndTime.getHours());
  endDate.setMinutes(selectedEndTime.getMinutes());
  endDate.setSeconds(0);
  return [Moment(startDate).format('YYYY-MM-DD HH:mm:ss'), Moment(endDate).format('YYYY-MM-DD HH:mm:ss')];
};

export function roundUpTime() {
  var time = 1000 * 60 * 15;
  var date = new Date();
  var rounded = new Date(date.getTime() + time - (date.getTime() % time));
  return rounded;
};