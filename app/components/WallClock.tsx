import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HanBerger from '../assets/images/svg/hanburder.svg';
import {fonts} from '../theme/fonts';
import {hp, wp} from '../utils/responsive.util';
import BlankSpacer from './BlankSpacer';
type HeaderTypes = {
  onPressMenu?: () => void;
};
function WallClock({onPressMenu = () => {}}: HeaderTypes): JSX.Element {
  const {colors} = useTheme();
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
            <Text style={[style.clockTime, {color: 'grey'}]}>1h 2m 20s</Text>
          </View>
        </View>
        <View style={style.singleClock}>
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
        <View style={style.singleClock}>
          <View>
            <Text style={[style.clockTitle, {color: colors.green}]}>
              Office Out
            </Text>
            <Text style={[style.clockTime, {color: 'grey'}]}>7:12 AM</Text>
          </View>
        </View>
        <View style={style.singleClock}>
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
