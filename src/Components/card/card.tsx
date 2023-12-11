import { Link, useNavigate } from 'react-router-dom';
import {
  AuthorizationStatus,
  Offers,
  useAppDispatch,
  useAppSelector,
  State,
  MAX_VALUE_OF_SHOWN_IMAGES,
} from '../../const/const';
import { setCurrentCard } from '../../store/actions';
import ImageComponent from '../image-component/image-component';
import { store } from '../../store';
import { changeOfferStatus } from '../../api-actions/api-actions';
import QuantityOfThings from '../../const/const';
import './card.css';

type cardProps = {
  card: Offers;
  isNeedHover: boolean;
  url?: string;
  imageWidth?: string;
  imageHeight?: string;
};

function Card({ card, isNeedHover, url, imageWidth, imageHeight }: cardProps) {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(
    (state: State) => state.dataLoadAndAuthSlice.AuthorizationStatus
  );
  const currentCard = useAppSelector(
    (state: State) => state.offers.currentCard
  );
  const navigate = useNavigate();
  function getRating(cardObj: Offers) {
    if (typeof currentCard !== 'object') {
      return 0;
    }
    const rating = Math.round(
      (cardObj.rating / QuantityOfThings.maxRating) * 100
    );
    return rating;
  }
  const handleCardHover = () => {
    if (isNeedHover) {
      dispatch(setCurrentCard(card));
    }
  };
  const handleCardLeave = () => {
    if (isNeedHover) {
      dispatch(setCurrentCard(0));
    }
  };
  function checkForClass() {
    let classForCard = '';
    if (url === '/favorites') {
      classForCard = 'favorites__card';
    }
    if (url === '/') {
      classForCard = 'cities__card';
    }
    if (
      url !== undefined &&
      url.slice(0, MAX_VALUE_OF_SHOWN_IMAGES) === '/offer'
    ) {
      classForCard = 'near-places__card';
    }

    return classForCard;
  }

  return (
    <div
      className={
        card === currentCard
          ? `${checkForClass()} place-card active`
          : `${checkForClass()} place-card`
      }
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
      onClick={() => {
        handleCardHover();
      }}
    >
      {card.isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}
      <div
        className={
          url === '/favorites'
            ? 'favorites__image-wrapper place-card__image-wrapper'
            : 'cities__image-wrapper place-card__image-wrapper '
        }
      >
        <a>
          <ImageComponent
            widthProp={imageWidth}
            heightProp={imageHeight}
            image={card.previewImage}
            classProp={'place-card__image'}
          />
        </a>
      </div>
      <div
        className={
          url === '/favorites' ? 'favorites__card-info' : 'place-card__info'
        }
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{card.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button
            onClick={() => {
              if (isAuth !== AuthorizationStatus.Auth) {
                navigate('/login');
              } else if (
                url !== '/offer' &&
                isAuth === AuthorizationStatus.Auth
              ) {
                store.dispatch(
                  changeOfferStatus({
                    offerID: card.id,
                    favoritesStatus: Number(card.isFavorite),
                  })
                );
              }
            }}
            className={`${
              !card.isFavorite
                ? 'place-card__bookmark-button'
                : 'place-card__bookmark-button place-card__bookmark-button--active'
            } button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(card) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <Link
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          to={`/offer/${card.id}`}
          className="place-card__name"
        >
          <p>{card.title}</p>
        </Link>
        <p className="place-card__type">
          {`${card.type.slice(0, 1).toUpperCase()}${card.type.slice(
            1,
            card.type.length
          )}`}
        </p>
      </div>
    </div>
  );
}

export default Card;
