import { createAction } from '@reduxjs/toolkit';
import { Offers, AuthorizationStatus, userDataType } from '../const/const';

export const changeCity = createAction<string | null>('main/changeCity');
export const setSortType = createAction<string>('typeOfSort/setSortType');
export const loadOffers = createAction<Offers | Offers[]>('data/loadOffers');
export const setCurrentCard = createAction<Offers | number>(
  'card/setCurrentCard'
);
export const setIsQuesLoaded = createAction<boolean>('app/setIsQuesLoaded');
export const requireAuth = createAction<AuthorizationStatus>('app/requireAuth');
export const getUserData = createAction<userDataType | object>(
  'login/getUserData'
);
