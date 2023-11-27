import { Link } from 'react-router-dom';
import {
  AuthorizationStatus,
  Offers,
  useAppDispatch,
  useAppSelector,
} from '../../const/const';
import { setCurrentCard } from '../../store/actions';

type cardProps = {
  card: Offers;
};

function Card({ card }: cardProps) {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.AuthorizationStatus);
  function getRating() {
    const maxRating = 5;
    const rating = Math.round((card.rating / maxRating) * 100);
    return rating;
  }
  const handleHover = () => {
    dispatch(setCurrentCard(card));
  };
  const handleLeave = () => {
    dispatch(setCurrentCard(0));
  };

  return (
    <Link
      to={isAuth === AuthorizationStatus.Auth ? `/offer/:${card.id}` : '/login'}
      className={
        card ? 'cities__card place-card active' : 'cities__card place-card'
      }
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
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
            src={card.previewImage}
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
            <span style={{ width: getRating() }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <p>{card.title}</p>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </Link>
  );
}

export default Card;
