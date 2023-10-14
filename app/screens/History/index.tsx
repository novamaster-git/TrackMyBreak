import {useNavigation, useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import BlankSpacer from '../../components/BlankSpacer';
import Header from '../../components/Header';
import PastWallClock from '../../components/PastWallClock';
import {CurrentDay} from '../../model/currentDay.model';
import {
  errorMessage,
  infoMessage,
} from '../../services/inAppNotification.service';
import {
  getAllKeysAsDate,
  getCurrentDayData,
} from '../../services/localStorage.service';
import {fonts} from '../../theme/fonts';
import {generateKey} from '../../utils/keyGenerator.util';
import {hp, wp} from '../../utils/responsive.util';
import {
  timeDiffCalculator,
  totalBreakCalculatorInSeconds,
  totalBreaksCalculatorToFormat,
} from '../../utils/time.util';
function History() {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [openSettingModal, setOpenSettingsModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [allDates, setAllDates] = useState<Array<any>>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedDateInformation, setSelectedDateInformation] =
    useState<CurrentDay>({});
  useEffect(getAllAvailableDates, []);
  function getAllAvailableDates() {
    getAllKeysAsDate().then(result => {
      if (result) {
        setAllDates(result);
        setCurrentIndex(result.length - 2);
      } else {
        infoMessage('No Recordes Yet');
      }
    });
  }

  useEffect(() => {
    if (currentIndex > -1) {
      getCurrentDayData(allDates[currentIndex])
        .then(result => setSelectedDateInformation(result))
        .catch(error => errorMessage('Failed to get data'));
    }
  }, [currentIndex]);

  function handleNext() {
    if (allDates.length - 2 > currentIndex) {
      setCurrentIndex(prev => prev + 1);
    } else {
      errorMessage('No More Recorders');
    }
  }
  function handlePrev() {
    if (currentIndex !== 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      errorMessage('No More Recorders past');
    }
  }

  const renderItem = ({item, index}: any) => {
    const isEnd = index === selectedDateInformation?.breaks.length - 1;
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
                {moment(item.breakIn).format('HH:MM:SS a')}
              </Text>
            </View>
          </View>
          <View style={style.singleClock}>
            <View>
              <Text style={[style.clockTitle, {color: colors.green}]}>
                Break out
              </Text>
              <Text style={[style.clockTime, {color: 'white'}]}>
                {moment(item.breakOut).format('HH:MM:SS a')}
              </Text>
            </View>
          </View>
          <View style={style.singleClock}>
            <View>
              <Text style={[style.clockTitle, {color: colors.yellow}]}>
                Total Time
              </Text>
              <Text style={[style.clockTime, {color: 'white'}]}>
                {timeDiffCalculator(item.breakIn, item.breakOut)}
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
        title="History"
        isBack={true}
        onPressMenu={() => {
          navigation.goBack();
        }}
      />
      <PastWallClock
        onPressDate={() => {
          setOpenSettingsModal(true);
        }}
        nextPress={handleNext}
        prevPress={handlePrev}
        officeIn={selectedDateInformation.officeIn}
        officeOut={selectedDateInformation.officeOut}
        breakHours={totalBreaksCalculatorToFormat(
          selectedDateInformation?.breaks ?? [],
        )}
        workingHours={timeDiffCalculator(
          selectedDateInformation?.officeIn ?? '',
          selectedDateInformation.officeOut ?? '',
          totalBreakCalculatorInSeconds(selectedDateInformation?.breaks ?? []),
        )}
      />

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
          data={selectedDateInformation?.breaks ?? []}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: wp(1)}}
        />
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
              height: hp(35),
              backgroundColor: 'white',
              borderTopRightRadius: wp(4),
              borderTopLeftRadius: wp(4),
              paddingHorizontal: wp(5),
              paddingTop: wp(5),
            }}>
            <Text
              style={{
                fontFamily: fonts.RobotoRegular,
                fontSize: wp(5),
                color: 'black',
                textAlign: 'center',
              }}>
              Pickup Date
            </Text>
            <DatePicker
              date={date}
              onDateChange={setDate}
              mode="date"
              minimumDate={new Date()}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: colors.red,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: wp(2),
                  flex: 1,
                  borderRadius: wp(1),
                }}>
                <Text
                  style={{
                    fontFamily: fonts.RobotoBlack,
                    color: 'white',
                    fontSize: wp(5),
                    letterSpacing: wp(0.2),
                  }}>
                  Today
                </Text>
              </TouchableOpacity>
              <BlankSpacer width={wp(2)} />
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: colors.green,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: wp(2),
                  flex: 1,
                  borderRadius: wp(1),
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.RobotoBlack,
                    color: 'white',
                    fontSize: wp(5),
                    letterSpacing: wp(0.2),
                  }}>
                  Set
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
export default History;
