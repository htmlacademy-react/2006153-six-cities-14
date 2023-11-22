import { OffersList, useAppDispatch, useAppSelector } from '../../const/const';
import Card from '../card/card';
import { changeOffers } from '../../store/actions';
import { useEffect, useState } from 'react';

type offersListProps = {
  offersList: OffersList[];
  onListItemHover: (onListItemHover: number | null) => void;
};

function CardList({ onListItemHover }: offersListProps) {
  const CITY_SORTED_OFFERS = useAppSelector((state) => state.sortedOffers);
  const CITY_NAME = useAppSelector((state) => state.city);
  const CITY_OFFERS = useAppSelector((state) => state.offersList.offers);
  const activeCity = CITY_OFFERS;
  console.log(activeCity);

  return (
    <div className="cities__places-list places__list tabs__content">
      {activeCity !== undefined && activeCity.length !== 0
        ? activeCity.map((card) => (
            <Card card={card} key={card.id} onListItemHover={onListItemHover} />
          ))
        : null}
    </div>
  );
}

export default CardList;
