import { createAction } from '@reduxjs/toolkit';
import {
  Offers,
  AuthorizationStatus,
  Comments,
  OfferDetails,
  UserData,
} from '../const/const';

export const changeCity = createAction<string>('main/changeCity');
export const setSortType = createAction<string>('typeOfSort/setSortType');
export const loadOffers = createAction<Offers[]>('data/loadOffers');
export const setCurrentCard = createAction<Offers | number>(
  'card/setCurrentCard'
);
export const setIsQuesLoaded = createAction<boolean>('app/setIsQuesLoaded');
export const requireAuth = createAction<AuthorizationStatus>('app/requireAuth');

export const loadCurrentOffer = createAction<OfferDetails>(
  'offer/loadCurrentOffer'
);
export const loadNearByCurrentOffer = createAction<Offers[]>(
  'offer/loadNearByCurrentOffer'
);
export const loadComments = createAction<Comments[]>('offer/loadOfferComments');
export const sendCommentActionDispatcher = createAction<Comments>(
  'form/sendCommentActionDispatcher'
);
export const getUserData = createAction<UserData>('login/getUserData');
export const getFavoritesOffers = createAction<Offers[]>(
  'favorites/getFavoritesOffers'
);
export const changeStatus = createAction<Offers>('favorites/changeStatus');
