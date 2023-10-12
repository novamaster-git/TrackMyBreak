import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useAppDispatch} from '../../redux/hooks';
import {setCurrentDayData} from '../../redux/timeManager.slice';
import {getCurrentDayData} from '../../services/localStorage.service';
import {fonts} from '../../theme/fonts';
import {generateKey} from '../../utils/keyGenerator.util';
import {wp} from '../../utils/responsive.util';

function Splash() {
  const dispatch = useAppDispatch();
  const navigator = useNavigation();
  async function getDataFromLocalStorage() {
    try {
      const result = await getCurrentDayData(generateKey());
      if (result === null) {
      } else {
        dispatch(setCurrentDayData(result));
      }
      navigator.replace('Home');
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDataFromLocalStorage();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontFamily: fonts.RobotoBlack, fontSize: wp(10)}}>
        Splash
      </Text>
    </View>
  );
}
export default Splash;
