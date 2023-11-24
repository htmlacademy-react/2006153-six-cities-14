import { useAppSelector } from '../../const/const';
import Card from '../card/card';
import { createSelector } from '@reduxjs/toolkit';

type offersListProps = {
  onListItemHover: (onListItemHover: number | null) => void;
};
interface dataInt {
  getData: (arg: string) => void;
}

function CardList({ onListItemHover }: offersListProps) {
  const getOffersList: dataInt = (state) => state.offersList;
  const getSelectedCity = (state) => state.city;
  const getSortType = (state) => state.sortType;

  const getSortedOffers = createSelector(
    [getOffersList, getSelectedCity, getSortType],
    (offersList, selectedCity, sortType) => {
      const currentCity = offersList.find((city) => city.city === selectedCity);

      if (!currentCity) {
        return [];
      }

      const copiedOffers = [...currentCity.offers];
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
  const sortedOffers = useAppSelector(getSortedOffers);
  console.log(sortedOffers);

  /* const CITY_OFF = useAppSelector((state) => {
    const currentCity = state.offersList.find((city) => {
      return state.city === city.city;
    });
    if (currentCity === undefined) {
      return [];
    }
    const copiedOffers = [...currentCity.offers];
    copiedOffers.sort((a, b) => {
      if (state.sortType === 'lth') {
        return a.price - b.price;
      }
      if (state.sortType === 'htl') {
        return b.price - a.price;
      }
      if (state.sortType === 'top') {
        return b.rating - a.rating;
      }
      if (state.sortType === 'popular') {
        return 0;
      }
    });
    return copiedOffers;
  }); */

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers !== undefined && sortedOffers.length !== 0
        ? sortedOffers.map((card) => (
            <Card card={card} key={card.id} onListItemHover={onListItemHover} />
          ))
        : null}
    </div>
  );
}

export default CardList;
