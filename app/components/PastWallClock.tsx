import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Backward from '../assets/images/svg/backward.svg';
import Forward from '../assets/images/svg/forward.svg';
import {fonts} from '../theme/fonts';
import {hp, wp} from '../utils/responsive.util';
import {timeDiffCalculator} from '../utils/time.util';
import BlankSpacer from './BlankSpacer';
type PastWallClockType = {
  onPressDate?: () => void;
  officeIn?: string;
  officeOut?: string;
  workingHours?: string;
  breakHours?: string;
  prevPress?: () => void;
  nextPress?: () => void;
  nextPressDisabled?: boolean;
  prevPressDisabled?: boolean;
};

function PastWallClock({
  onPressDate = () => {},
  officeIn = '',
  officeOut = '',
  workingHours = '',
  breakHours = '',
  prevPress = () => {},
  nextPress = () => {},
  nextPressDisabled = false,
  prevPressDisabled = false,
}: PastWallClockType): JSX.Element {
  const {colors} = useTheme();
  const officeInTime = officeIn ? moment(officeIn).format('h:mm:ss a') : 'N/A';
  const officeOutTime = officeOut
    ? moment(officeOut).format('h:mm:ss a')
    : 'N/A';

  return (
    <View
      style={[
        style.container,
        {
          backgroundColor: colors.secondary,
        },
      ]}>
      <View
        style={[
          {
            width: '90%',
            flexDirection: 'row',
            borderRadius: wp(1),
            paddingHorizontal: wp(2),
          },
          {backgroundColor: colors.white, alignItems: 'center'},
        ]}>
        <TouchableOpacity
          disabled={prevPressDisabled}
          onPress={prevPress}
          style={{
            paddingVertical: wp(5),
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Backward height={wp(5)} width={wp(5)} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDate} style={style.singleClock}>
          <Text style={[style.clockTitle, {color: colors.red}]}>Date</Text>
          <Text style={[style.clockTime, {color: 'grey'}]}>
            {moment(officeIn).format('Do MMM YY')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={nextPressDisabled}
          onPress={nextPress}
          style={{
            paddingVertical: wp(5),
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Forward height={wp(5)} width={wp(5)} />
        </TouchableOpacity>
      </View>
      <BlankSpacer height={hp(2)} />

      <View style={[style.cardContainer, {backgroundColor: colors.white}]}>
        <View style={style.singleClock}>
          <View>
            <Text style={[style.clockTitle, {color: colors.red}]}>
              Work Served
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>
              {workingHours}
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
              Total Break
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>{breakHours}</Text>
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
    alignItems: 'center',
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
export default PastWallClock;
