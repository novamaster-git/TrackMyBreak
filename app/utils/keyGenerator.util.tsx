import moment from 'moment';

function generateKey(time: string = moment().format()) {
  return moment(time).format('YYYY_MM_DD');
}
export {generateKey};
