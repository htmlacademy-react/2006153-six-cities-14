import CommentsList from '../../Components/comments-list/comments-list';
import Map from '../../Components/map/map';
import CardList from '../../Components/card-list/card-list';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Offers,
  State,
  OfferDetails,
  useAppSelector,
  AuthorizationStatus,
} from '../../const/const';
import { store } from '../../store';
import {
  fetchCurrentOfferAction,
  fetchNearByCurrentOfferAction,
  fetchOfferCommentsAction,
  changeOfferStatus,
} from '../../../api-actions/api-actions';
import Header from '../../Components/header/header';
import ImageComponent from '../../Components/image-component/image-component';
import './offer.css';
import Spinner from '../../Components/spinner/spinner';
import SendingCommentsForm from '../../Components/sending-comment-form/sending-comment-form';

function Offer(): JSX.Element {
  const isAuth = useAppSelector((state: State) => state.AuthorizationStatus);
  const isFavorite = useAppSelector((state: State) => state.isFavorite);
  const cityOffer = useAppSelector((state: State) => state.currentOffer);
  const nearByList = useAppSelector((state: State) => state.NearByOffers);
  const loading = useAppSelector((state: State) => state.isQuesLoaded);
  const navigate = useNavigate();

  const cityOfferComments = useAppSelector(
    (state: State) => state.OfferComments
  );

  interface OfferParams {
    readonly id: string;
  }
  const params: OfferParams = useParams<string>(); // TODO Не понимаю как типизировать

  const cardID = params.id.slice(1, params.id.length);

  useEffect(() => {
    store.dispatch(fetchCurrentOfferAction(cardID));
    store.dispatch(fetchNearByCurrentOfferAction(cardID));
    store.dispatch(fetchOfferCommentsAction(cardID));
  }, [params]);

  function getRating() {
    const maxRating = 5;
    if (typeof cityOffer !== 'object') {
      return 0;
    }
    const rating = Math.round((cityOffer.rating / maxRating) * 100);
    return rating;
  }

  const stopper = 3;
  const offersNearByArr: Offers[] = [];
  const offersNearByArrPins: Offers[] & OfferDetails[] = [];
  if (nearByList.length !== 0) {
    for (let index = 0; index < nearByList.length; index++) {
      if (offersNearByArr.length < stopper && typeof nearByList === 'object') {
        offersNearByArr.push(nearByList[index]);
        offersNearByArrPins.push(nearByList[index]);
      }
    }
    if (typeof cityOffer === 'object') {
      offersNearByArrPins.push(cityOffer);
    }
  }

  return (
    <div className="page">
      <Header />
      {(loading === false && cityOffer !== undefined) ||
      typeof cityOffer !== 'object' ? (
        <Spinner />
      ) : (
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {cityOffer.images.map((image) => {
                  return (
                    <div key={image} className="offer__image-wrapper">
                      <ImageComponent
                        image={image}
                        classProp={'offer__image'}
                      />
                      ;
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {cityOffer.isPremium ? (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                ) : null}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{cityOffer.title}</h1>
                  <button
                    onClick={() => {
                      /* if (AuthorizationStatus.Auth !== isAuth) {
                        navigate('/login');
                      } */
                      store.dispatch(
                        changeOfferStatus({
                          offerID: cardID,
                          favoritesStatus: Number(cityOffer.isFavorite),
                        })
                      );
                    }}
                    className="offer__bookmark-button button"
                    type="button"
                  >
                    <svg
                      className="offer__bookmark-icon"
                      width="31"
                      height="33"
                    >
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${getRating()}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">
                    {cityOffer.rating}
                  </span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {cityOffer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {cityOffer.bedrooms}{' '}
                    {cityOffer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {cityOffer.maxAdults}{' '}
                    {cityOffer.maxAdults > 1 ? 'adults' : 'adult'}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{cityOffer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {cityOffer.goods.map((good) => (
                      <li key={good} className="offer__inside-item">
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <ImageComponent
                        key={cityOffer.host.avatarUrl}
                        image={cityOffer.host.avatarUrl}
                        classProp={'offer__avatar user__avatar'}
                        widthProp={'74'}
                        heightProp={'74'}
                      />
                    </div>
                    <span className="offer__user-name">
                      {cityOffer.host.name}
                    </span>
                    {cityOffer.host !== undefined &&
                    cityOffer.host.isPro !== undefined ? (
                      <span className="offer__user-status">Pro</span>
                    ) : null}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{cityOffer.description}</p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews &middot;{' '}
                    <span className="reviews__amount">
                      {cityOfferComments.length < 10
                        ? cityOfferComments.length
                        : 10}
                    </span>
                  </h2>
                  <CommentsList commentsList={cityOfferComments} />
                  {AuthorizationStatus.Auth === isAuth ? (
                    <SendingCommentsForm />
                  ) : (
                    <div className="offer__noAuth__form">
                      <h3 className="offer__noAuth__form--text">
                        <Link to={'/login'}>
                          <span className="offer__noAuth__form--text-decoration">
                            Sign in
                          </span>
                        </Link>{' '}
                        to leave comments
                      </h3>
                    </div>
                  )}
                </section>
              </div>
            </div>
            <section className="offer__map map">
              <Map hotelsPins={offersNearByArrPins} activePin={cityOffer.id} />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div
                className="near-places__list places__list"
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
              >
                <CardList offersList={offersNearByArr} isNeedHover={false} />
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export default Offer;
