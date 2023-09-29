import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Navigation from './navigation';
import {useColorScheme} from 'react-native';
import {darkColors, lightColors} from './theme/colors';
function App(): JSX.Element {
  const theme = useColorScheme();
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer theme={theme === 'dark' ? darkColors : lightColors}>
        <Navigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}
export default App;
