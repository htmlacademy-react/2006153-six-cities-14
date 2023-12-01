import { createAction } from '@reduxjs/toolkit';
import {
  Offers,
  AuthorizationStatus,
  Comments,
  OfferDetails,
} from '../const/const';

export const changeCity = createAction<string | null>('main/changeCity');
export const setSortType = createAction<string>('typeOfSort/setSortType');
export const loadOffers = createAction<Offers | Offers[]>('data/loadOffers');
export const setCurrentCard = createAction<Offers | number>(
  'card/setCurrentCard'
);
export const setIsQuesLoaded = createAction<boolean>('app/setIsQuesLoaded');
export const requireAuth = createAction<AuthorizationStatus>('app/requireAuth');
export const loadCurrentOfferID = createAction<Offers | number>(
  'offer/loadCurrentOfferID'
);
export const loadCurrentOffer = createAction<OfferDetails | string>(
  'offer/loadCurrentOffer'
);
export const loadNearByCurrentOffer = createAction<Offers[] | string>(
  'offer/loadNearByCurrentOffer'
);
export const loadOfferComments = createAction<Comments[] | string>(
  'offer/loadOfferComments'
);
export const sendCommentActionDispatcher = createAction<object>(
  'form/sendCommentActionDispatcher'
);
export const getUserData = createAction<object>('login/getUserData');
export const getFavoritesOffers = createAction<object>(
  'favorites/getFavoritesOffers'
);
export const changeStatus = createAction<object>('favorites/changeStatus');
