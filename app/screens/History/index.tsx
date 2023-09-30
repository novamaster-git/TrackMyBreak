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
import DatePicker from 'react-native-date-picker';
import BlankSpacer from '../../components/BlankSpacer';
import Header from '../../components/Header';
import WallClock from '../../components/WallClock';
import {fonts} from '../../theme/fonts';
import {hp, wp} from '../../utils/responsive.util';
function History() {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const data = [1, 2, 3, 4, 5, 6];
  const [openSettingModal, setOpenSettingsModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const renderItem = ({item, index}: any) => {
    const isEnd = index === data.length - 1;
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
              <Text style={[style.clockTime, {color: 'white'}]}>1h 2m 20s</Text>
            </View>
          </View>
          <View style={style.singleClock}>
            <View>
              <Text style={[style.clockTitle, {color: colors.green}]}>
                Break out
              </Text>
              <Text style={[style.clockTime, {color: 'white'}]}>1h 2m 20s</Text>
            </View>
          </View>
          <View style={style.singleClock}>
            <View>
              <Text style={[style.clockTitle, {color: colors.yellow}]}>
                Total Time
              </Text>
              <Text style={[style.clockTime, {color: 'white'}]}>1h 2m 20s</Text>
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
      <WallClock
        showDate={true}
        onPressDate={() => {
          setOpenSettingsModal(true);
        }}
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
          data={data}
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
