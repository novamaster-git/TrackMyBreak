import moment from 'moment';

function timeDiffCalculator(officein: string, officeout: string) {
  var startTime = moment(officein);
  var endTime = moment(officeout);
  var duration = moment.duration(endTime.diff(startTime));
  return (
    duration.hours() +
    ' h ' +
    duration.minutes() +
    ' m ' +
    duration.seconds() +
    ' s '
  );
}
export {timeDiffCalculator};
