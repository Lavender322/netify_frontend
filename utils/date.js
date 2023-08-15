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

// export function getEventDates() {
//   var eventDates = {};
//   var currentDate = new Date();
//   // currentDate.setDate(currentDate.getDate() + 1);
//   Moment.locale('en-gb');        
//   var currentDay = Moment(currentDate).format('llll').split(', ')[0];
//   var currentDate = Moment(currentDate).format('llll').split(', ')[1].split(' ')[0];
//   console.log("currentDay")
// };