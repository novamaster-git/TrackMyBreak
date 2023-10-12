import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {fonts} from '../theme/fonts';
import {hp, wp} from '../utils/responsive.util';
import {
  timeDiffCalculator,
  totalBreakCalculatorInSeconds,
  totalBreaksCalculatorToFormat,
} from '../utils/time.util';
import BlankSpacer from './BlankSpacer';

function WallClock(): JSX.Element {
  const {colors} = useTheme();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breakintervalRef = useRef<NodeJS.Timeout | null>(null);
  const officeOut = useAppSelector(state => state.timeManager.officeOut);
  const officeIn = useAppSelector(state => state.timeManager.officeIn);
  const currentBreak =
    useAppSelector(state => state.timeManager.currentBreak) ?? '';
  const breaks = useAppSelector(state => state.timeManager.breaks) ?? [];
  const officeInTime = officeIn ? moment(officeIn).format('h:mm:ss a') : 'N/A';
  const officeOutTime = officeOut
    ? moment(officeOut).format('h:mm:ss a')
    : 'N/A';

  const [timer, setTimer] = useState(
    officeIn && officeOut
      ? timeDiffCalculator(
          officeIn,
          officeOut,
          totalBreakCalculatorInSeconds(breaks),
        )
      : '0 sec',
  );
  const [breakTimer, setBreakTimer] = useState('0 sec');

  useEffect(() => {
    if (officeIn && officeOut?.length === 0 && currentBreak === '') {
      // this code is added for fast response
      setTimer(
        timeDiffCalculator(
          officeIn,
          moment().format(),
          totalBreakCalculatorInSeconds(breaks),
        ),
      );
      intervalRef.current = setInterval(() => {
        setTimer(
          timeDiffCalculator(
            officeIn,
            moment().format(),
            totalBreakCalculatorInSeconds(breaks),
          ),
        );
      }, 100);
    }
    if (officeOut || currentBreak) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [officeIn, officeOut, currentBreak]);

  useEffect(() => {
    if (currentBreak) {
      // this code is added for fast response
      setBreakTimer(timeDiffCalculator(currentBreak, moment().format()));
      breakintervalRef.current = setInterval(() => {
        setBreakTimer(timeDiffCalculator(currentBreak, moment().format()));
      }, 100);
    } else {
      if (breakintervalRef.current) clearInterval(breakintervalRef.current);
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
              {currentBreak
                ? breakTimer
                : totalBreaksCalculatorToFormat(breaks)}
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
