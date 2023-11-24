import { createAction } from '@reduxjs/toolkit';
import { OffersList } from '../const/const';

export const changeCity = createAction<string>('main/changeCity');
export const changeOffers = createAction<OffersList[]>('main/changeOffers');
export const setSortType = createAction<string>('typeOfSort/setSortType');
