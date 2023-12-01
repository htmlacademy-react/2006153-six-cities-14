import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  setSortType,
  loadOffers,
  setCurrentCard,
  setIsQuesLoaded,
  requireAuth,
  loadCurrentOffer,
  loadNearByCurrentOffer,
  loadOfferComments,
  sendCommentActionDispatcher,
  getUserData,
  getFavoritesOffers,
} from './actions';
import {
  AuthorizationStatus,
  Comments,
  startCity,
  OfferDetails,
} from '../const/const';
import { Offers } from '../const/const';

const initialState: initialStateInt = {
  city: startCity,
  sortType: 'popular',
  apiOffersList: [],
  currentCard: 0,
  isQuesLoaded: false,
  AuthorizationStatus: AuthorizationStatus.Unknown,
  NearByOffers: [],
  OfferComments: [],
  currentOffer: '',
  sendedComment: 0,
  userData: 0,
  favoritesOffers: [],
};

interface initialStateInt {
  city: string | null;
  sortType: string;
  apiOffersList: Offers | Offers[];
  currentCard: Offers | number;
  isQuesLoaded: boolean;
  AuthorizationStatus: AuthorizationStatus;
  OfferComments: Comments[] | string;
  NearByOffers: Offers[] | string;
  currentOffer: OfferDetails | string;
  sendedComment: object | 0;
  userData: object | 0;
  favoritesOffers: Offers[] | object;
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
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadNearByCurrentOffer, (state, action) => {
      state.NearByOffers = action.payload;
    })
    .addCase(loadOfferComments, (state, action) => {
      state.OfferComments = action.payload;
    })
    .addCase(sendCommentActionDispatcher, (state, action) => {
      state.sendedComment = action.payload;
    })
    .addCase(getUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(getFavoritesOffers, (state, action) => {
      state.favoritesOffers = action.payload;
    });
});
getFavoritesOffers;
