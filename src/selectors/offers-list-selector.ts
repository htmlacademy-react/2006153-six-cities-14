import { createSelector } from '@reduxjs/toolkit';
import { State } from '../const/const';

const getOffersList = (state: State) => state.apiOffersList;
const getSelectedCity = (state: State) => state.city;
const getSortType = (state: State) => state.sortType;

export const getSortedOffers = createSelector(
  [getOffersList, getSelectedCity, getSortType],
  (offersList, selectedCity, sortType) => {
    const currentCity = offersList.filter(
      (city) => city.city.name === selectedCity
    );

    if (!currentCity) {
      return [];
    }

    const copiedOffers = [...currentCity];
    copiedOffers.sort((a, b) => {
      if (sortType === 'lth') {
        return a.price - b.price;
      }
      if (sortType === 'htl') {
        return b.price - a.price;
      }
      if (sortType === 'top') {
        return b.rating - a.rating;
      }
      return 0;
    });

    return copiedOffers;
  }
);
