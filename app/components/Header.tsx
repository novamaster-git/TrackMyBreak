import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HanBerger from '../assets/images/svg/hanburder.svg';
import {fonts} from '../theme/fonts';
import {wp} from '../utils/responsive.util';
type HeaderTypes = {
  title: string;
  onPressMenu?: () => void;
};
function Header({title, onPressMenu = () => {}}: HeaderTypes): JSX.Element {
  const {colors} = useTheme();
  return (
    <View
      style={[
        style.container,
        {
          backgroundColor: colors.primary,
        },
      ]}>
      <TouchableOpacity onPress={() => {}} style={{paddingHorizontal: wp(3)}}>
        <HanBerger width={wp(5)} height={wp(5)} />
      </TouchableOpacity>
      <Text style={style.titleText}>{title}</Text>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
  },
  titleText: {
    color: 'white',
    fontFamily: fonts.RobotoMedium,
    fontSize: wp(6),
  },
});
export default Header;
