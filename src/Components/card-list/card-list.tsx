import { useAppSelector } from '../../const/const';
import { getSortedOffers } from '../selectors/offers-list-selector';
import Card from '../card/card';

function CardList() {
  const sortedOffers = useAppSelector(getSortedOffers);

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers !== undefined && sortedOffers.length !== 0
        ? sortedOffers.map((card) => <Card card={card} key={card.id} />)
        : null}
    </div>
  );
}

export default CardList;
