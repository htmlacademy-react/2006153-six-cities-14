/* import { createSelector } from '@reduxjs/toolkit';
import { State } from '../const/const';

const getOffersList = (state: State) => state.apiOffersList;
const getSelectedCity = (state: State) => state.city;
const getCurrentCityCard = (state: State) => state.currentOfferID;

export const getCurrentCard = createSelector(
  [getCurrentCityCard, getOffersList, getSelectedCity],
  (currentCityCard, offersList, selectedCity) => {
    const currentCity = offersList.filter(
      (city) => city.city.name === selectedCity
    );

    if (!currentCity) {
      return [];
    }

    const copiedOffers = [...currentCity];

    const currentCard = copiedOffers.filter((card) => {
      if (card.id === currentCityCard.id) {
        return card;
      }
    });
    return currentCard;
  }
); */
