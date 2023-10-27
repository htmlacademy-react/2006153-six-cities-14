import { Offers } from '../../const/const';
import Card from '../card/card';

type offersListProps = {
  offersList: Offers[];
};

function CardList({ offersList }: offersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList.map((card) => (
        <Card cardProp={card} key={card.id} />
      ))}
    </div>
  );
}

export default CardList;
