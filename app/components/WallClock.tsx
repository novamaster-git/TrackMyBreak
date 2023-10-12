import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {fonts} from '../theme/fonts';
import {hp, wp} from '../utils/responsive.util';
import BlankSpacer from './BlankSpacer';
type WallClockType = {
  onPressDate?: () => void;
  showDate?: boolean;
};
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
  return (
    duration.hours() +
    ' h ' +
    duration.minutes() +
    ' m ' +
    duration.seconds() +
    ' s '
  );
}
function timeConverter(breaks: Array<any>) {
  const duration = moment.duration(
    breaks.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalBreak,
      0,
    ),
    'seconds',
  );
  return `${duration.hours()} h ${duration.minutes()} m ${duration.seconds()} s`;
}
function WallClock({
  showDate = false,
  onPressDate = () => {},
}: WallClockType): JSX.Element {
  const {colors} = useTheme();

  const officeOut = useAppSelector(state => state.timeManager.officeOut);
  const officeIn = useAppSelector(state => state.timeManager.officeIn);
  const currentBreak =
    useAppSelector(state => state.timeManager.currentBreak) ?? '';
  const breaks = useAppSelector(state => state.timeManager.breaks) ?? [];
  const officeInTime = officeIn ? moment(officeIn).format('h:mm:ss a') : 'N/A';
  const officeOutTime = officeOut
    ? moment(officeOut).format('h:mm:ss a')
    : 'N/A';
  const intervalRef = useRef(null);
  const breakintervalRef = useRef(null);
  const [timer, setTimer] = useState(
    officeIn && officeOut
      ? timeDiffCalculator(
          officeIn,
          officeOut,
          moment
            .duration(
              breaks.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.totalBreak,
                0,
              ),
              'seconds',
            )
            .seconds(),
        )
      : '0 h 0 m 0 s',
  );
  const [breakTimer, setBreakTimer] = useState('0 h 0 m 0 s');

  useEffect(() => {
    if (officeIn && officeOut?.length === 0 && currentBreak === '') {
      intervalRef.current = setInterval(() => {
        setTimer(
          timeDiffCalculator(
            officeIn,
            moment().format(),
            moment
              .duration(
                breaks.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.totalBreak,
                  0,
                ),
                'seconds',
              )
              .seconds(),
          ),
        );
      }, 100);
    }
    if (officeOut || currentBreak) {
      clearInterval(intervalRef.current);
    }
  }, [officeIn, officeOut, currentBreak]);

  useEffect(() => {
    if (currentBreak) {
      breakintervalRef.current = setInterval(() => {
        setBreakTimer(timeDiffCalculator(currentBreak, moment().format()));
      }, 100);
    } else {
      clearInterval(breakintervalRef.current);
    }
  }, [currentBreak]);

  return (
    <View
      style={[
        style.container,
        {
          backgroundColor: colors.secondary,
        },
      ]}>
      <View style={[style.cardContainer, {backgroundColor: colors.white}]}>
        <View style={style.singleClock}>
          <View>
            <Text style={[style.clockTitle, {color: colors.red}]}>
              Work Served
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>{timer}</Text>
          </View>
        </View>
        <View
          style={[
            style.singleClock,
            {borderLeftWidth: wp(0.2), borderColor: colors.secondary},
          ]}>
          <View>
            <Text style={[style.clockTitle, {color: colors.green}]}>
              {currentBreak ? 'Current Break' : 'Total Break'}
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>
              {currentBreak ? breakTimer : timeConverter(breaks)}
            </Text>
          </View>
        </View>
      </View>
      <BlankSpacer height={hp(2)} />
      <View style={[style.cardContainer, {backgroundColor: colors.white}]}>
        <View style={style.singleClock}>
          <View style={{}}>
            <Text style={[style.clockTitle, {color: colors.red}]}>
              Office In
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>
              {officeInTime}
            </Text>
          </View>
        </View>
        <View
          style={[
            style.singleClock,
            {borderLeftWidth: wp(0.2), borderColor: colors.secondary},
          ]}>
          <View>
            <Text style={[style.clockTitle, {color: colors.green}]}>
              Office Out
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>
              {officeOutTime}
            </Text>
          </View>
        </View>
        <View
          style={[
            style.singleClock,
            {borderLeftWidth: wp(0.2), borderColor: colors.secondary},
          ]}>
          <View>
            <Text style={[style.clockTitle, {color: colors.green}]}>
              Total Time
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>
              {officeIn && officeOut
                ? timeDiffCalculator(officeIn, officeOut)
                : 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: wp(5),
    paddingHorizontal: wp(2),
  },
  titleText: {
    color: 'white',
    fontFamily: fonts.RobotoMedium,
    fontSize: wp(6),
  },
  cardContainer: {
    width: '90%',
    flexDirection: 'row',
    borderRadius: wp(1),
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
  },
  singleClock: {
    flex: 1,
    paddingHorizontal: wp(2),
    // alignItems: 'center',
  },
  clockTitle: {
    fontFamily: fonts.RobotoMedium,
    fontSize: wp(3.5),
    lineHeight: wp(3.5),
  },
  clockTime: {
    fontFamily: fonts.RobotoBold,
    fontSize: wp(4),
    lineHeight: wp(5),
  },
});
export default WallClock;
