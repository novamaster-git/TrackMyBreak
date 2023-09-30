import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Backward from '../assets/images/svg/backward.svg';
import Forward from '../assets/images/svg/forward.svg';
import {fonts} from '../theme/fonts';
import {hp, wp} from '../utils/responsive.util';
import BlankSpacer from './BlankSpacer';
type WallClockType = {
  onPressDate?: () => void;
  showDate?: boolean;
};
function WallClock({
  showDate = false,
  onPressDate = () => {},
}: WallClockType): JSX.Element {
  const {colors} = useTheme();
  return (
    <View
      style={[
        style.container,
        {
          backgroundColor: colors.secondary,
        },
      ]}>
      {showDate && (
        <>
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
              style={{
                paddingVertical: wp(5),
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Backward height={wp(5)} width={wp(5)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressDate} style={style.singleClock}>
              {/* <View> */}
              <Text style={[style.clockTitle, {color: colors.red}]}>Date</Text>
              <Text style={[style.clockTime, {color: 'grey'}]}>
                12 Sep 2023
              </Text>
              {/* </View> */}
            </TouchableOpacity>
            <TouchableOpacity
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
        </>
      )}
      <View style={[style.cardContainer, {backgroundColor: colors.white}]}>
        <View style={style.singleClock}>
          <View>
            <Text style={[style.clockTitle, {color: colors.red}]}>
              Work Served
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>1h 2m 20s</Text>
          </View>
        </View>
        <View
          style={[
            style.singleClock,
            {borderLeftWidth: wp(0.2), borderColor: colors.secondary},
          ]}>
          <View>
            <Text style={[style.clockTitle, {color: colors.green}]}>
              Ongoing break
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>1h 2m 20s</Text>
          </View>
        </View>
      </View>
      <BlankSpacer height={hp(2)} />
      <View style={[style.cardContainer, {backgroundColor: colors.white}]}>
        <View style={style.singleClock}>
          <View>
            <Text style={[style.clockTitle, {color: colors.red}]}>
              Office In
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>10:21 AM</Text>
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
            <Text style={[style.clockTime, {color: 'grey'}]}>7:12 AM</Text>
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
            <Text style={[style.clockTime, {color: 'grey'}]}>1h 2m 20s</Text>
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
    paddingHorizontal: wp(5),
  },
  singleClock: {
    flex: 1,
    alignItems: 'center',
  },
  clockTitle: {
    fontFamily: fonts.RobotoMedium,
    fontSize: wp(3.5),
    lineHeight: wp(3.5),
  },
  clockTime: {
    fontFamily: fonts.RobotoBold,
    fontSize: wp(4.5),
    lineHeight: wp(5),
  },
});
export default WallClock;
