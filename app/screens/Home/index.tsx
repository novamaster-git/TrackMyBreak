import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Break from '../../assets/images/svg/Break.svg';
import Office from '../../assets/images/svg/Office.svg';
import Header from '../../components/Header';
import WallClock from '../../components/WallClock';
import {fonts} from '../../theme/fonts';
import {wp} from '../../utils/responsive.util';
function Home() {
  const {colors} = useTheme();
  const data = [1, 2, 3, 4, 5, 6];
  const renderItem = ({item, index}) => {
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
      <Header title="Track My Break" />
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
          data={data}
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
            onPress={() => {}}
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
              Office In
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
            onPress={() => {}}
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
              Break In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
