import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeOffers, sortOffers } from './actions';
import { startCity } from '../const/const';
import { Offers } from '../const/const';
import { OffersList } from '../const/const';

/* const filteredOffers = offers.filter((city) => city.city === startCity);

const filtredOffersList = filteredOffers[0].offers.map((offer) => offer); */

const initialState: initialStateInt = {
  city: startCity,
  offersList: [],
  sortedOffers: [],
};

interface initialStateInt {
  city: string | ((evt: React.MouseEvent<HTMLLIElement>) => string);
  offersList: Offers[];
  sortedOffers: OffersList[];
}
/* const filteredOffers = offersList.filter((city) => city.city === CITY_NAME); */
export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeOffers, (state, action) => {
      const cityList: OffersList = action.payload;

      cityList.map((city) => {
        if (city.city === state.city) {
          state.offersList = city;
        }
      });
    })
    .addCase(sortOffers, (state, action) => {
      state.sortedOffers = action.payload;
    });
});
