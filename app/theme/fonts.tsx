import {Platform} from 'react-native';

const androidFonts = {
  RobotoBlack: 'Roboto-Black.ttf',
  RobotoBlackItalic: 'Roboto-BlackItalic.ttf',
  RobotoBold: 'Roboto-Bold.ttf',
  RobotoBoldItalic: 'Roboto-BoldItalic.ttf',
  RobotoItalic: 'Roboto-Italic.ttf',
  RobotoLight: 'Roboto-Light.ttf',
  RobotoLightItalic: 'Roboto-LightItalic.ttf',
  RobotoMedium: 'Roboto-Medium.ttf',
  RobotoMediumItalic: 'Roboto-MediumItalic.ttf',
  RobotoRegular: 'Roboto-Regular.ttf',
  RobotoThin: 'Roboto-Thin.ttf',
  RobotoThinItalic: 'Roboto-ThinItalic.ttf',
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
