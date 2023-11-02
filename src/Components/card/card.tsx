import { Link } from 'react-router-dom';
import { Offers } from '../../const/const';
import { useState } from 'react';

type cardProps = {
  card: Offers;
};

function Card({ card }: cardProps) {
  const [whichCardIsActive, setWhichCardIsActive] = useState(card);
  function handleCardHover() {
    setWhichCardIsActive(card);
  }
  return (
    <Link
      to={`/offer/:${card.id}`}
      className={
        whichCardIsActive
          ? 'cities__card place-card active'
          : 'cities__card place-card'
      }
      onMouseEnter={() => {
        handleCardHover();
      }}
    >
      {card.isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <p>
          <img
            className="place-card__image"
            src={card.imageSrc}
            width="260"
            height="200"
            alt="Place image"
          />
        </p>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{card.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: card.rating }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <p>{card.name}</p>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </Link>
  );
}

export default Card;
