import { createSlice } from '@reduxjs/toolkit';
import {
  AuthorizationStatus,
  Comments,
  OfferDetails,
  Offers,
  UserData,
  startCity,
} from '../../const/const';
import {
  changeCity,
  changeStatus,
  getFavoritesOffers,
  getUserData,
  loadComments,
  loadCurrentOffer,
  loadNearByCurrentOffer,
  loadOffers,
  requireAuth,
  sendCommentActionDispatcher,
  setCurrentCard,
  setIsQuesLoaded,
  setSortType,
} from '../actions';

const initialState: initialStateInt = {
  apiOffersList: [],
  NearByOffers: [],
  currentOffer: undefined,
  favoritesOffers: [],
  comments: [],
  city: startCity,
  sortType: 'popular',
  AuthorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    id: '',
    email: '',
    token: '',
    avatarUrl: '',
    emailUser: '',
    isPro: false,
  },
  isQuesLoaded: false,
  currentCard: 0,
};
interface initialStateInt {
  apiOffersList: Offers[];
  NearByOffers: Offers[];
  favoritesOffers: Offers[];
  currentOffer: OfferDetails | undefined;
  comments: Comments[];
  city: string;
  sortType: string;
  AuthorizationStatus: AuthorizationStatus;
  userData: UserData;
  isQuesLoaded: boolean;
  currentCard: Offers | number;
}

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeCity, (state, action) => {
        state.city = action.payload;
      })
      .addCase(loadOffers, (state, action) => {
        state.apiOffersList = action.payload;
      })
      .addCase(changeStatus, (state, action) => {
        state.apiOffersList = state.apiOffersList.map((offer) =>
          offer.id === action.payload.id ? action.payload : offer
        );
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
      .addCase(getFavoritesOffers, (state, action) => {
        state.favoritesOffers = action.payload;
      })

      .addCase(setSortType, (state, action) => {
        state.sortType = action.payload;
      })
      .addCase(setCurrentCard, (state, action) => {
        state.currentCard = action.payload;
      });
  },
});
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadComments, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(sendCommentActionDispatcher, (state, action) => {
        state.comments = [...state.comments, action.payload];
      });
  },
});
export const dataLoadAndAuthSlice = createSlice({
  name: 'loadAndAuthSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(requireAuth, (state, action) => {
        state.AuthorizationStatus = action.payload;
      })
      .addCase(getUserData, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(setIsQuesLoaded, (state, action) => {
        state.isQuesLoaded = action.payload;
      });
  },
});
