import CommentsList from '../../Components/comments-list/comments-list';
import Map from '../../Components/map/map';
import CardList from '../../Components/card-list/card-list';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Offers,
  State,
  useAppSelector,
  AuthorizationStatus,
} from '../../const/const';
import { store } from '../../store';
import {
  fetchCurrentOfferAction,
  fetchNearByCurrentOfferAction,
  fetchOfferCommentsAction,
  changeOfferStatus,
} from '../../api-actions/api-actions';
import Header from '../../Components/header/header';
import ImageComponent from '../../Components/image-component/image-component';
import './offer.css';
import Spinner from '../../Components/spinner/spinner';
import SendingCommentsForm from '../../Components/sending-comment-form/sending-comment-form';
import QuantityOfThings from '../../const/const';
function Offer(): JSX.Element {
  const isAuth = useAppSelector(
    (state: State) => state.dataLoadAndAuthSlice.AuthorizationStatus
  );
  const currentOffer = useAppSelector(
    (state: State) => state.offers.currentOffer
  );
  const offersList = useAppSelector(
    (state: State) => state.offers.apiOffersList
  );
  const nearByList = useAppSelector(
    (state: State) => state.offers.NearByOffers
  );
  const loading = useAppSelector(
    (state: State) => state.dataLoadAndAuthSlice.isQuesLoaded
  );
  const currentUrl = useLocation().pathname;
  const comments = useAppSelector((state: State) => state.comments.comments);

  interface OfferParams {
    id?: string;
  }
  const params: OfferParams = useParams<string>();
  const navigate = useNavigate();
  useEffect(() => {
    if (params.id !== undefined) {
      store.dispatch(fetchCurrentOfferAction(params.id));
      store.dispatch(fetchNearByCurrentOfferAction(params.id));
      store.dispatch(fetchOfferCommentsAction(params.id));
    }
  }, [params]);

  let currentCard: Offers | undefined;
  if (offersList !== undefined) {
    currentCard = offersList.find((offer) => {
      if (offer.id === currentOffer?.id) {
        return offer;
      }
    });
  }

  function changeCardStatus() {
    if (isAuth === AuthorizationStatus.Auth) {
      store.dispatch(
        changeOfferStatus({
          offerID: currentCard !== undefined ? currentCard?.id : '',
          favoritesStatus:
            currentCard !== undefined ? currentCard.isFavorite : 0,
        })
      );
    } else {
      navigate('/login');
    }
  }

  function getRating() {
    if (typeof currentOffer !== 'object') {
      return 0;
    }
    const rating = Math.round(
      (currentOffer.rating / QuantityOfThings.MAX_RATING) * 100
    );
    return rating;
  }

  return (
    <div className="page">
      <Header />
      {(loading === false && currentOffer !== undefined) ||
      currentOffer?.id === undefined ? (
          <Spinner />
        ) : (
          <main className="page__main page__main--offer">
            <section className="offer">
              <div className="offer__gallery-container container">
                <div className="offer__gallery">
                  {currentOffer?.images.slice(0, 6).map((image) => (
                    <div key={image} className="offer__image-wrapper">
                      <ImageComponent image={image} classProp={'offer__image'} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="offer__container container">
                <div className="offer__wrapper">
                  {currentOffer.isPremium ? (
                    <div className="offer__mark">
                      <span>Premium</span>
                    </div>
                  ) : null}
                  <div className="offer__name-wrapper">
                    <h1 className="offer__name">{currentOffer.title}</h1>
                    <button
                      onClick={changeCardStatus}
                      className={
                        currentCard !== undefined &&
                      currentCard.isFavorite === true
                          ? 'offer__bookmark-button active-button button'
                          : 'offer__bookmark-button  button'
                      }
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
                      {currentOffer.rating}
                    </span>
                  </div>
                  <ul className="offer__features">
                    <li className="offer__feature offer__feature--entire">
                      {currentOffer.type}
                    </li>
                    <li className="offer__feature offer__feature--bedrooms">
                      {currentOffer.bedrooms}{' '}
                      {currentOffer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                    </li>
                    <li className="offer__feature offer__feature--adults">
                    Max {currentOffer.maxAdults}{' '}
                      {currentOffer.maxAdults > 1 ? 'adults' : 'adult'}
                    </li>
                  </ul>
                  <div className="offer__price">
                    <b className="offer__price-value">
                    &euro;{currentOffer.price}
                    </b>
                    <span className="offer__price-text">&nbsp;night</span>
                  </div>
                  <div className="offer__inside">
                    <h2 className="offer__inside-title">What&apos;s inside</h2>
                    <ul className="offer__inside-list">
                      {currentOffer.goods.map((good) => (
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
                          key={currentOffer.host.avatarUrl}
                          image={currentOffer.host.avatarUrl}
                          classProp={'offer__avatar user__avatar'}
                          widthProp={'74'}
                          heightProp={'74'}
                        />
                      </div>
                      <span className="offer__user-name">
                        {currentOffer.host.name}
                      </span>
                      {currentOffer.host !== undefined &&
                    currentOffer.host.isPro !== undefined ? (
                          <span className="offer__user-status">Pro</span>
                        ) : null}
                    </div>
                    <div className="offer__description">
                      <p className="offer__text">{currentOffer.description}</p>
                    </div>
                  </div>
                  <section className="offer__reviews reviews">
                    <h2 className="reviews__title">
                    Reviews &middot;{' '}
                      <span className="reviews__amount">{comments.length}</span>
                    </h2>
                    <CommentsList commentsList={comments} />
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
                <Map hotelsPins={nearByList} activePin={currentOffer.id} />
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
                  <CardList
                    offersList={nearByList.slice(0, 3)}
                    isNeedHover={false}
                    url={currentUrl}
                  />
                </div>
              </section>
            </div>
          </main>
        )}
    </div>
  );
}

export default Offer;
