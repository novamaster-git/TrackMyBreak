import React from 'react';
import {StyleSheet, View} from 'react-native';
type BlankSpacerProps = {
  height?: number;
  width?: number;
};
function BlankSpacer({height = 0, width = 0}: BlankSpacerProps): JSX.Element {
  return <View style={[styles.container, {height, width}]} />;
}
const styles = StyleSheet.create({
  container: {
    height: 0,
    width: 0,
  },
});
export default BlankSpacer;
