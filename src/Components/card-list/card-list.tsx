import { Offers } from '../../const/const';
import Card from '../card/card';

type offersListProps = {
  offersList: Offers[];
  onListItemHover: (onListItemHover: number | null) => void;
};

function CardList({ offersList, onListItemHover }: offersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList.map((card) => (
        <Card card={card} key={card.id} onListItemHover={onListItemHover} />
      ))}
    </div>
  );
}

export default CardList;
