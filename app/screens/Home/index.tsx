import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Break from '../../assets/images/svg/Break.svg';
import Office from '../../assets/images/svg/Office.svg';
import Graph from '../../assets/images/svg/graph.svg';
import Settings from '../../assets/images/svg/settings.svg';
import BlankSpacer from '../../components/BlankSpacer';
import Header from '../../components/Header';
import WallClock from '../../components/WallClock';
import {fonts} from '../../theme/fonts';
import {hp, wp} from '../../utils/responsive.util';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  setOfficeBreakIn,
  setOfficeBreakOut,
  setOfficeInRedux,
  setOfficeOutRedux,
} from '../../redux/timeManager.slice';
import {timeDiffCalculator} from '../../utils/time.util';
import moment from 'moment';
import {
  errorMessage,
  infoMessage,
  successMessage,
} from '../../services/inAppNotification.service';
function Home() {
  const dispatch = useAppDispatch();
  const officeIn = useAppSelector(state => state.timeManager.officeIn);
  const officeOut = useAppSelector(state => state.timeManager.officeOut);
  const isOfficeIn = useAppSelector(state => state.timeManager.isInOffice);
  const breaks = useAppSelector(state => state.timeManager.breaks) ?? [];
  const currentBreak =
    useAppSelector(state => state.timeManager.currentBreak) ?? '';
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [openSettingModal, setOpenSettingsModal] = useState(false);

  function handleBreak() {
    if (currentBreak) {
      dispatch(setOfficeBreakOut());
    } else {
      dispatch(setOfficeBreakIn());
    }
  }

  function handleOfficeButton() {
    if (currentBreak) {
      errorMessage('Please turn off the current break');
      return;
    }
    if (officeIn && officeOut) {
      infoMessage('You already signout for the day');
      return;
    }
    if (isOfficeIn) {
      successMessage('Good Night!', "Don't let the bedbugs bite");
      dispatch(setOfficeOutRedux());
    } else {
      successMessage('Have a nice day');
      dispatch(setOfficeInRedux());
    }
  }

  const renderItem = ({item, index}: any) => {
    const isEnd = index === breaks?.length - 1;
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          borderBottomColor: 'white',
          borderBottomWidth: wp(0.1),
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              width: wp(0.5),
              backgroundColor: colors.lightGrey,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{backgroundColor: colors.lightGrey, flex: 1}} />
            <View
              style={{
                width: wp(2),
                height: wp(2),
                backgroundColor: colors.yellow,
                borderRadius: wp(5),
              }}
            />
            <View
              style={{
                backgroundColor: isEnd ? colors.primary : colors.lightGrey,
                flex: 1,
                width: '100%',
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: wp(2), flex: 5}}>
          <View style={style.singleClock}>
            <View>
              <Text style={[style.clockTitle, {color: colors.red}]}>
                Break in
              </Text>
              <Text style={[style.clockTime, {color: 'white'}]}>
                {moment(item.breakIn).format('h:mm:ss a') ?? 'N/A'}
              </Text>
            </View>
          </View>
          <View style={style.singleClock}>
            <View>
              <Text style={[style.clockTitle, {color: colors.green}]}>
                Break out
              </Text>
              <Text style={[style.clockTime, {color: 'white'}]}>
                {item.breakOut
                  ? moment(item.breakOut).format('h:mm:ss a')
                  : 'N/A'}
              </Text>
            </View>
          </View>
          <View style={style.singleClock}>
            <View>
              <Text style={[style.clockTitle, {color: colors.yellow}]}>
                Total Time
              </Text>
              <Text style={[style.clockTime, {color: 'white'}]}>
                {item.breakIn && item.breakOut
                  ? timeDiffCalculator(item.breakIn, item.breakOut)
                  : 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        title="Track My Break"
        onPressMenu={() => {
          setOpenSettingsModal(prev => !prev);
        }}
      />
      <WallClock />
      <View
        style={{
          backgroundColor: colors.greyBlue,
          paddingVertical: wp(1),
          paddingHorizontal: wp(5),
        }}>
        <Text
          style={{
            fontFamily: fonts.RobotoBold,
            color: colors.white,
            justifyContent: 'center',
          }}>
          Breaks
        </Text>
      </View>
      <View style={{backgroundColor: colors.primary, flex: 1}}>
        <FlatList
          data={breaks}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: wp(1)}}
        />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: wp(2),
          backgroundColor: colors.primary,
          borderTopWidth: wp(0.2),
          borderColor: colors.lightGrey,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: wp(2),
          }}>
          <TouchableOpacity
            onPress={handleOfficeButton}
            style={{
              backgroundColor: colors.red,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: wp(2),
              width: '100%',
              borderRadius: wp(1),
              flexDirection: 'row',
            }}>
            <View
              style={{
                padding: wp(1.5),
                borderRadius: wp(10),
                backgroundColor: colors.lightRed,
                marginRight: wp(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Office width={wp(5)} height={wp(5)} style={{color: 'white'}} />
            </View>
            <Text
              style={{
                fontFamily: fonts.RobotoBlack,
                color: 'white',
                fontSize: wp(5),
                letterSpacing: wp(0.2),
              }}>
              {isOfficeIn ? 'Office Out' : 'Office in'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: wp(2),
          }}>
          <TouchableOpacity
            onPress={handleBreak}
            disabled={!isOfficeIn}
            style={{
              backgroundColor: colors.green,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: wp(2),
              width: '100%',
              borderRadius: wp(1),
              flexDirection: 'row',
            }}>
            <View
              style={{
                padding: wp(1.5),
                borderRadius: wp(10),
                backgroundColor: colors.lightGreen,
                marginRight: wp(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Break width={wp(5)} height={wp(5)} style={{color: 'white'}} />
            </View>
            <Text
              style={{
                fontFamily: fonts.RobotoBlack,
                color: 'white',
                fontSize: wp(5),
                letterSpacing: wp(0.2),
              }}>
              {currentBreak ? 'Break Out' : 'Break In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={openSettingModal}
        transparent={true}
        animationType="slide">
        <View style={{flex: 1, backgroundColor: '#0000002f'}}>
          <TouchableOpacity
            onPress={() => setOpenSettingsModal(false)}
            style={{flex: 1}}
          />
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: wp(2),
            }}>
            <View
              style={{
                width: wp(10),
                height: wp(2),
                backgroundColor: 'grey',
                borderRadius: wp(5),
              }}
            />
          </View>
          <View
            style={{
              height: hp(20),
              backgroundColor: 'white',
              borderTopRightRadius: wp(4),
              borderTopLeftRadius: wp(4),
              paddingHorizontal: wp(5),
              paddingTop: wp(5),
            }}>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#B39DDB',
                  borderRadius: wp(3),
                  marginRight: wp(2),
                  padding: wp(2),
                }}>
                <Settings height={wp(10)} width={wp(10)} />
                <BlankSpacer height={wp(2)} />
                <Text
                  style={{
                    fontSize: wp(4),
                    fontFamily: fonts.RobotoMedium,
                    color: 'white',
                    lineHeight: wp(4),
                  }}>
                  Settings
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setOpenSettingsModal(false);
                  setTimeout(() => {
                    navigation.navigate('History');
                  }, 100);
                }}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#9FA8DA',
                  borderRadius: wp(3),
                  marginLeft: wp(2),
                  padding: wp(2),
                }}>
                <Graph height={wp(10)} width={wp(10)} />
                <BlankSpacer height={wp(2)} />
                <Text
                  style={{
                    fontSize: wp(4),
                    fontFamily: fonts.RobotoMedium,
                    color: colors.white,
                    lineHeight: wp(4),
                  }}>
                  History
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
export default Home;
