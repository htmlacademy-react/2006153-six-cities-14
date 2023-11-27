import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  setSortType,
  loadOffers,
  setCurrentCard,
  setIsQuesLoaded,
  requireAuth,
  getUserData,
} from './actions';
import { AuthorizationStatus, startCity, userDataType } from '../const/const';
import { Offers } from '../const/const';

const initialState: initialStateInt = {
  city: startCity,
  sortType: 'popular',
  apiOffersList: [],
  currentCard: 0,
  isQuesLoaded: false,
  AuthorizationStatus: AuthorizationStatus.Unknown,
  userData: {},
};

interface initialStateInt {
  city: string | null;
  sortType: string;
  apiOffersList: Offers | Offers[];
  currentCard: Offers | number;
  isQuesLoaded: boolean;
  AuthorizationStatus: AuthorizationStatus;
  userData: userDataType | object;
}
export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.apiOffersList = action.payload;
    })
    .addCase(setCurrentCard, (state, action) => {
      state.currentCard = action.payload;
    })
    .addCase(setIsQuesLoaded, (state, action) => {
      state.isQuesLoaded = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.AuthorizationStatus = action.payload;
    })
    .addCase(getUserData, (state, action) => {
      state.userData = action.payload;
    });
});
