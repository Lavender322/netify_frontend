import Moment from 'moment';

export function getFormattedDate(date) {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  var nextDate = Moment(currentDate).format('ll').split(',')[0];
  var eventDate = Moment(date).format('ll').split(',')[0];
  if (eventDate === nextDate) {
    return 'Tomorrow';
  };
  return eventDate;
};