import { Offers, useAppSelector } from '../../const/const';
import { getSortedOffers } from '../../selectors/offers-list-selector';
import Card from '../card/card';
interface CardListProps {
  offersList: Offers[] | number;
  isNeedHover: boolean;
}
function CardList({ offersList, isNeedHover }: CardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {typeof offersList !== 'number' &&
      offersList !== undefined &&
      offersList.length !== 0
        ? offersList.map((card) => (
            <Card card={card} key={card.id} isNeedHover={isNeedHover} />
          ))
        : null}
    </div>
  );
}

export default CardList;
