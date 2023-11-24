import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeOffers, setSortType } from './actions';
import { startCity } from '../const/const';
import { OffersList } from '../const/const';

const initialState: initialStateInt = {
  city: startCity,
  offersList: [],
  sortType: 'popular',
};

interface initialStateInt {
  city: string | ((evt: React.MouseEvent<HTMLLIElement>) => string);
  offersList: OffersList[];
  sortType: string;
}
export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeOffers, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    });
});
