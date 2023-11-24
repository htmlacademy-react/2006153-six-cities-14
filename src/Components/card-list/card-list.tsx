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
  const getOffersList = (state) => state.apiOffersList;
  const getSelectedCity = (state) => state.city;
  const getSortType = (state) => state.sortType;

  const getSortedOffers = createSelector(
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

  const sortedOffers = useAppSelector(getSortedOffers);

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
