import { Offers } from '../../const/const';
import Card from '../card/card';
interface CardListProps {
  offersList: Offers[];
  isNeedHover: boolean;
  url?: string;
  imageHeight?: string;
  imageWidth?: string;
}
function CardList({
  offersList,
  isNeedHover,
  url,
  imageHeight,
  imageWidth,
}: CardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {typeof offersList !== 'number' &&
      offersList !== undefined &&
      offersList.length !== 0
        ? offersList.map((card) => (
          <Card
            imageHeight={imageHeight}
            imageWidth={imageWidth}
            card={card}
            key={card.id}
            isNeedHover={isNeedHover}
            url={url}
          />
        ))
        : null}
    </div>
  );
}

export default CardList;
