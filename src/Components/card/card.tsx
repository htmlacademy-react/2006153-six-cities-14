import { Link } from 'react-router-dom';
import { Offers } from '../../const/const';
import { useState } from 'react';
type cardProps = {
  cardProp: Offers;
};

function Card({ cardProp }: cardProps) {
  const [isActive, setIsAcive] = useState<boolean>(false);

  function handleCardHover() {
    setIsAcive(true);
  }
  function handleCardLeave() {
    setIsAcive(false);
  }

  return (
    <Link
      to="/offer"
      className={
        isActive ? 'cities__card place-card active' : 'cities__card place-card'
      }
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
    >
      {cardProp.isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={cardProp.imageSrc}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cardProp.price}</b>
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
            <span style={{ width: cardProp.rating }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{cardProp.name}</a>
        </h2>
        <p className="place-card__type">{cardProp.type}</p>
      </div>
    </Link>
  );
}

export default Card;
