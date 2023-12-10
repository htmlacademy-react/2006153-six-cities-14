import { combineReducers} from '@reduxjs/toolkit';
import {
  AuthorizationStatus,
  Comments,
  startCity,
  OfferDetails,
  UserData,
} from '../const/const';
import { Offers } from '../const/const';
import {
  commentsSlice,
  offersSlice,
  dataLoadAndAuthSlice,
} from './slicers/slice';

export const initialState: initialStateInt = {
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
export const reducer = combineReducers({
  offers: offersSlice.reducer,
  comments: commentsSlice.reducer,
  dataLoadAndAuthSlice: dataLoadAndAuthSlice.reducer,
});

