import moment from 'moment';

function timeDiffCalculator(
  officein: string,
  officeout: string,
  diff: number = 0,
) {
  var startTime = moment(officein);
  var endTime = moment(officeout);
  var duration = moment.duration(
    endTime.diff(startTime, 'seconds') - diff,
    'seconds',
  );
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

function totalBreaksCalculatorToFormat(breaks: Array<any>) {
  const duration = moment.duration(
    breaks.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalBreak,
      0,
    ),
    'seconds',
  );
  return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
}

function totalBreakCalculatorInSeconds(breaks: Array<any>) {
  return moment
    .duration(
      breaks.reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalBreak,
        0,
      ),
      'seconds',
    )
    .seconds();
}

export {
  timeDiffCalculator,
  totalBreaksCalculatorToFormat,
  totalBreakCalculatorInSeconds,
};
