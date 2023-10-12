import AsyncStorage from '@react-native-async-storage/async-storage';
import {CurrentDay} from '../model/currentDay.model';

async function setOfficeIn(key: any, body: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(body));
  } catch (error) {
    console.log(error);
  }
}
async function setOfficeOut(key: any, body: any) {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(body));
  } catch (error) {
    console.log(error);
  }
}
async function getCurrentDayData(key: string): Promise<CurrentDay | null> {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result === null || result === undefined) {
      return null;
    }
    const parsedResult: CurrentDay = JSON.parse(result);
    return parsedResult;
  } catch (error) {
    return null;
  }
}
async function setOfficeBreakInStorage(key: string, body: string) {
  try {
    await AsyncStorage.setItem('CURRENT_BREAK', body);
    const result = await AsyncStorage.getItem(key);
    if (result === null) return;
    await AsyncStorage.setItem(
      key,
      JSON.stringify({
        ...JSON.parse(result),
        breaks: [...JSON.parse(result).breaks, {breakIn: body, breakOut: ''}],
      }),
    );
  } catch (error) {
    console.log(error);
  }
}
async function setOfficeBreakOutStorage(
  key: string,
  body: string,
  totalBreak: number,
) {
  try {
    await AsyncStorage.setItem('CURRENT_BREAK', '');
    const result = await AsyncStorage.getItem(key);
    if (result === null) return;
    const parsedResult = JSON.parse(result);
    parsedResult.breaks[parsedResult.breaks.length - 1] = {
      ...parsedResult.breaks[parsedResult.breaks.length - 1],
      breakOut: body,
      totalBreak: totalBreak,
    };
    await AsyncStorage.setItem(key, JSON.stringify(parsedResult));
  } catch (error) {
    console.log(error);
  }
}
async function getOfficeBreakInfromStorage() {
  try {
    await AsyncStorage.getItem('CURRENT_BREAK');
  } catch (error) {
    console.log(error);
  }
}
export {
  setOfficeIn,
  setOfficeOut,
  getCurrentDayData,
  setOfficeBreakInStorage,
  getOfficeBreakInfromStorage,
  setOfficeBreakOutStorage,
};
