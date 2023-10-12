import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Navigation from './navigation';
import {useColorScheme} from 'react-native';
import {darkColors, lightColors} from './theme/colors';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
function App(): JSX.Element {
  const theme = useColorScheme();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer
          theme={theme === 'dark' ? darkColors : lightColors}>
          <Navigation />
        </NavigationContainer>
        <FlashMessage />
      </Provider>
    </SafeAreaView>
  );
}
export default App;
