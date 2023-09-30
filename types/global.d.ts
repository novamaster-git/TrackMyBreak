import '@react-navigation/native';
import {ColorValue} from 'react-native/types';
// Override the theme in react native navigation to accept our custom theme props.
declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      background: ColorValue | string;
      border: ColorValue | string;
      card: ColorValue | string;
      notification: ColorValue | string;
      text: ColorValue | string;
      // ignore above
      primary: ColorValue | string;
      secondary: ColorValue | string;
      lightGrey: ColorValue | string;
      red: ColorValue | string;
      lightRed: ColorValue | string;
      green: ColorValue | string;
      lightGreen: ColorValue | string;
      greyBlue: ColorValue | string;
      yellow: ColorValue | string;
      white: ColorValue | string;
      black: ColorValue | string;
    };
  };
  export function useTheme(): ExtendedTheme;
}
