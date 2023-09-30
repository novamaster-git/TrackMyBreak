import {Platform} from 'react-native';

const androidFonts = {
  RobotoBlack: 'Roboto-Black',
  RobotoBlackItalic: 'Roboto-BlackItalic',
  RobotoBold: 'Roboto-Bold',
  RobotoBoldItalic: 'Roboto-BoldItalic',
  RobotoItalic: 'Roboto-Italic',
  RobotoLight: 'Roboto-Light',
  RobotoLightItalic: 'Roboto-LightItalic',
  RobotoMedium: 'Roboto-Medium',
  RobotoMediumItalic: 'Roboto-MediumItalic',
  RobotoRegular: 'Roboto-Regular',
  RobotoThin: 'Roboto-Thin',
  RobotoThinItalic: 'Roboto-ThinItalic',
};
const iosFonts = {
  RobotoBlack: 'Roboto-Black',
  RobotoBlackItalic: 'Roboto-BlackItalic',
  RobotoBold: 'Roboto-Bold',
  RobotoBoldItalic: 'Roboto-BoldItalic',
  RobotoItalic: 'Roboto-Italic',
  RobotoLight: 'Roboto-Light',
  RobotoLightItalic: 'Roboto-LightItalic',
  RobotoMedium: 'Roboto-Medium',
  RobotoMediumItalic: 'Roboto-MediumItalic',
  RobotoRegular: 'Roboto-Regular',
  RobotoThin: 'Roboto-Thin',
  RobotoThinItalic: 'Roboto-ThinItalic',
};
const fonts = Platform.OS === 'ios' ? iosFonts : androidFonts;
export {fonts};
/**
Roboto-Black.ttf
Roboto-BlackItalic.ttf
Roboto-Bold.ttf
Roboto-BoldItalic.ttf
Roboto-Italic.ttf
Roboto-Light.ttf
Roboto-LightItalic.ttf
Roboto-Medium.ttf
Roboto-MediumItalic.ttf
Roboto-Regular.ttf
Roboto-Thin.ttf
Roboto-ThinItalic.ttf
 */
