import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {CurrentDay} from '../model/currentDay.model';
import moment from 'moment';
import {
  setOfficeBreakInStorage,
  setOfficeBreakOutStorage,
  setOfficeIn,
  setOfficeOut,
} from '../services/localStorage.service';
import {generateKey} from '../utils/keyGenerator.util';

const initialState: CurrentDay = {
  officeIn: '',
  officeOut: '',
  breaks: [],
  date: '',
  currentBreak: '',
  isInOffice: false,
};

export const timeMaganger = createSlice({
  name: 'timeManager',
  initialState,
  reducers: {
    setOfficeInRedux: state => {
      state.officeIn = moment().format();
      state.date = moment().format();
      state.isInOffice = true;
      setOfficeIn(generateKey(), state);
    },
    setOfficeOutRedux: state => {
      state.officeOut = moment().format();
      state.isInOffice = false;
      setOfficeOut(generateKey(), state);
    },
    setOfficeBreakIn: state => {
      const theTime = moment().format();
      state.currentBreak = theTime;
      state.breaks?.push({
        breakIn: theTime,
        breakOut: '',
      });
      setOfficeBreakInStorage(generateKey(), theTime);
    },
    setOfficeBreakOut: state => {
      const theTime = moment().format();
      state.currentBreak = '';
      if (state?.breaks?.length) {
        state.breaks[state.breaks?.length - 1] = {
          ...state.breaks[state.breaks?.length - 1],
          breakOut: theTime,
          totalBreak: moment(theTime).diff(
            moment(state.breaks[state.breaks?.length - 1].breakIn),
            'seconds',
          ),
        };
      }
      setOfficeBreakOutStorage(generateKey(), theTime, moment(theTime).diff(
        moment(state.breaks[state.breaks?.length - 1].breakIn),
        'seconds',
      ));
    },
    setCurrentDayData: (_state, action: PayloadAction<CurrentDay>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const {
  setOfficeInRedux,
  setOfficeOutRedux,
  setCurrentDayData,
  setOfficeBreakIn,
  setOfficeBreakOut,
} = timeMaganger.actions;

export default timeMaganger.reducer;
