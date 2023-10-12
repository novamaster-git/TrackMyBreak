import React from 'react';
import Home from '../screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from '../screens/History';
import Splash from '../screens/Splash';
function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
}
export default Navigation;
