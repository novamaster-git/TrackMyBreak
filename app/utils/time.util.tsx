import moment from 'moment';

function timeDiffCalculator(officein: string, officeout: string) {
  var startTime = moment(officein);
  var endTime = moment(officeout);
  var duration = moment.duration(endTime.diff(startTime));
  if (
    duration.hours() === 0 &&
    duration.minutes() === 0 &&
    duration.seconds() !== 0
  ) {
    return duration.seconds() + ' sec';
  } else if (
    duration.hours() === 0 &&
    duration.minutes() !== 0 &&
    duration.seconds() !== 0
  ) {
    return duration.minutes() + ' min' + duration.seconds() + ' sec';
  } else {
    return (
      duration.hours() +
      'h ' +
      duration.minutes() +
      'm ' +
      duration.seconds() +
      's '
    );
  }
}
export {timeDiffCalculator};
