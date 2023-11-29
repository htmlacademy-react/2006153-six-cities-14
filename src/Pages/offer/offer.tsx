import CommentsList from '../../Components/comments-list/comments-list';
import Map from '../../Components/map/map';
import CardList from '../../Components/card-list/card-list';
import { useEffect } from 'react';
import { comments } from '../../Mocks/comments';
import { State, UserID, useAppSelector } from '../../const/const';

import { store } from '../../store';
import {
  fetchCurrentOfferAction,
  fetchNearByCurrentOfferAction,
  fetchOfferCommentsAction,
} from '../../../api-actions/api-actions';
import Header from '../../Components/header/header';
import ImageComponent from '../../Components/image-component/image-component';

function Offer(): JSX.Element {
  const currentCard = useAppSelector((state: State) => state.currentCard);
  const cityOffer = useAppSelector((state: State) => state.currentCard);
  const nearByList = useAppSelector((state: State) => state.NearByOffers);
  const cityOfferComments = useAppSelector(
    (state: State) => state.OfferComments
  );
  const isNeedHover = false;
  useEffect(() => {
    store.dispatch(fetchCurrentOfferAction(currentCard.id));
    store.dispatch(fetchNearByCurrentOfferAction(currentCard.id));
    store.dispatch(fetchOfferCommentsAction(currentCard.id));
  }, [currentCard.id]);
  const currentOffer = useAppSelector((state) => state.currentOffer);
  function getRating() {
    const maxRating = 5;
    const rating = Math.round((currentOffer.rating / maxRating) * 100);
    return rating;
  }

  const stopper = 3;
  const offersNearByArr = [];
  const offersNearByArrPins = [];
  if (nearByList.length !== 0) {
    for (let index = 0; index < nearByList.length; index++) {
      if (offersNearByArr.length < 3) {
        offersNearByArr.push(nearByList[index]);
        offersNearByArrPins.push(nearByList[index]);
      }
    }
    offersNearByArrPins.push(cityOffer);
  }

  return (
    <div className="page">
      {/* <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header> */}
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images !== undefined
                ? currentOffer.images.map((image) => {
                    return (
                      <div key={image} className="offer__image-wrapper">
                        <ImageComponent
                          image={image}
                          classProp={'offer__image'}
                        />
                        ;
                      </div>
                    );
                  })
                : null}

              {/* <img
                  className="offer__image"
                  src="img/room.jpg"
                  alt="Photo studio"
                /> */}
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
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
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
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods !== undefined
                    ? currentOffer.goods.map((good) => (
                        <li key={good} className="offer__inside-item">
                          {good}
                        </li>
                      ))
                    : null}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <ImageComponent
                      key={
                        currentOffer.host !== undefined
                          ? currentOffer.host.avatarUrl
                          : 0
                      }
                      image={
                        currentOffer.host !== undefined
                          ? currentOffer.host.avatarUrl
                          : null
                      }
                      classProp={'offer__avatar user__avatar'}
                      widthProp={'74'}
                      heightProp={'74'}
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host !== undefined
                      ? currentOffer.host.name
                      : null}
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
                {/* <ul className="reviews__list">
                  <li className="reviews__item">
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img
                          className="reviews__avatar user__avatar"
                          src="img/avatar-max.jpg"
                          width="54"
                          height="54"
                          alt="Reviews avatar"
                        />
                      </div>
                      <span className="reviews__user-name">Max</span>
                    </div>
                    <div className="reviews__info">
                      <div className="reviews__rating rating">
                        <div className="reviews__stars rating__stars">
                          <span style={{ width: '80%' }}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <p className="reviews__text">
                        A quiet cozy and picturesque that hides behind a a river
                        by the unique lightness of Amsterdam. The building is
                        green and from 18th century.
                      </p>
                      <time className="reviews__time" dateTime="2019-04-24">
                        April 2019
                      </time>
                    </div>
                  </li>
                </ul> */}
                <CommentsList commentsList={cityOfferComments} />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              hotelsPins={
                offersNearByArrPins.length !== 0 ? offersNearByArrPins : {}
              }
              isNeedHover={isNeedHover}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <CardList
                offersList={offersNearByArr !== 0 ? offersNearByArr : 0}
                /* onListItemHover={handleListItemHover} */
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
