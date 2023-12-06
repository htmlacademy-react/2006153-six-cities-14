import { Link } from 'react-router-dom';
import {
  AuthorizationStatus,
  Offers,
  useAppDispatch,
  useAppSelector,
  State,
} from '../../const/const';
import { setCurrentCard } from '../../store/actions';
import ImageComponent from '../image-component/image-component';
import { store } from '../../store';
import { changeOfferStatus } from '../../api-actions/api-actions';

type cardProps = {
  card: Offers;
  isNeedHover: boolean;
  url?: string;
  imageWidth?: string;
  imageHeight?: string;
};

function Card({ card, isNeedHover, url, imageWidth, imageHeight }: cardProps) {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state: State) => state.AuthorizationStatus);

  function getRating() {
    const maxRating = 5;
    const rating = Math.round((card.rating / maxRating) * 100);
    return rating;
  }
  const handleHover = () => {
    if (isNeedHover) {
      dispatch(setCurrentCard(card));
    }
  };
  const handleLeave = () => {
    if (isNeedHover) {
      dispatch(setCurrentCard(0));
    }
  };

  return (
    <div
      /* to={`/offer/:${card.id}`} */
      className={
        url === '/favorites'
          ? card
            ? 'favorites__card place__card active'
            : 'favorites__card place__card '
          : card
          ? 'cities__card place-card active'
          : 'cities__card place-card'
      }
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleHover}
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
        } /* favorites__image-wrapper */
      >
        <Link to={`/offer/${card.id}`}>
          <ImageComponent
            widthProp={imageWidth}
            heightProp={imageHeight}
            image={card.previewImage}
            classProp={'place-card__image'}
          />
        </Link>
      </div>
      <div
        className={
          url === '/favorites' ? 'favorites__card-info' : 'place-card__info'
        } /* favorites__card-info */
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{card.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {isAuth !== AuthorizationStatus.Auth ? null : (
            <button
              onClick={() => {
                store.dispatch(
                  changeOfferStatus({
                    offerID: card.id,
                    favoritesStatus: Number(card.isFavorite),
                  })
                );
              }}
              className="place-card__bookmark-button button"
              type="button"
            >
              <svg
                className="place-card__bookmark-icon"
                width="18"
                height="19"
                style={
                  card.isFavorite ? { fill: '#4481c3', stroke: '#4481c3' } : {}
                }
              >
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          )}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating() }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <p>{card.title}</p>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </div>
  );
}

export default Card;
