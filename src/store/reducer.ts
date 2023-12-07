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
  loadComments,
  sendCommentActionDispatcher,
  getUserData,
  getFavoritesOffers,
  changeStatus,
} from './actions';
import {
  AuthorizationStatus,
  Comments,
  startCity,
  OfferDetails,
  UserData,
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
  comments: [],
  currentOffer: undefined,
  sendedComment: [],
  userData: {
    id: '',
    email: '',
    token: '',
    avatarUrl: '',
    emailUser: '',
    isPro: false,
  },
  favoritesOffers: [],
};

interface initialStateInt {
  city: string;
  sortType: string;
  apiOffersList: Offers[];
  currentCard: Offers | number;
  isQuesLoaded: boolean;
  AuthorizationStatus: AuthorizationStatus;
  comments: Comments[];
  NearByOffers: Offers[];
  currentOffer: OfferDetails | undefined;
  sendedComment: Comments[];
  userData: UserData;
  favoritesOffers: Offers[];
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
      if (!state.currentOffer) {
        return;
      }
      const currentOfferInfo: Offers = {
        ...state.currentOffer,
        city: {
          ...state.currentOffer.city,
          name: state.currentOffer.city.city,
          location: state.currentOffer.location,
        },
      };

      state.NearByOffers = [...action.payload.slice(0, 3), currentOfferInfo];
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(sendCommentActionDispatcher, (state, action) => {
      state.comments = [...state.comments, action.payload];
    })
    .addCase(getUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(getFavoritesOffers, (state, action) => {
      state.favoritesOffers = action.payload;
    })
    .addCase(changeStatus, (state, action) => {
      state.apiOffersList = state.apiOffersList.map((offer) => offer.id === action.payload.id ? action.payload : offer);
    });
});
