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

import Spinner from '../../Components/spinner/spinner';
import SendingCommentsForm from '../../Components/sending-comment-form/sending-comment-form';
import CommentsAmount from '../../Components/comments-amount/comments-amount';

function OffersNotLogged() {
  const isAuth = useAppSelector((state: State) => state.AuthorizationStatus);
  const cityOffer = useAppSelector((state: State) => state.currentOffer);
  const nearByList = useAppSelector((state: State) => state.NearByOffers);
  const loading = useAppSelector((state: State) => state.isQuesLoaded);
  const favoritesList = useAppSelector((state: State) => state.favoritesOffers);
  const changedStatus = useAppSelector((state: State) => state.isFavorite);
  const newCommentsLength = useAppSelector(
    (state: State) => state.commentsLength
  );
  const navigate = useNavigate(); // TODO

  const cityOfferComments = useAppSelector(
    (state: State) => state.OfferComments
  );

  interface OfferParams {
    id?: string;
  }
  const params: OfferParams = useParams<string>();

  useEffect(() => {
    if (params.id !== undefined) {
      store.dispatch(fetchCurrentOfferAction(params.id));
      store.dispatch(fetchNearByCurrentOfferAction(params.id));
      store.dispatch(fetchOfferCommentsAction(params.id));
    }
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
                    /* onClick={() => {
                      console.log(Number(cityOffer.isFavorite), changedStatus);

                      store.dispatch(
                        changeOfferStatus({
                          offerID: cityOffer.id,
                          favoritesStatus:
                            changedStatus === 0
                              ? Number(!cityOffer.isFavorite)
                              : Number(!changedStatus.favoritesStatus),
                        })
                      );
                    }} */
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
                  <CommentsAmount
                    cityOfferComments={cityOfferComments}
                    newCommentsLength={newCommentsLength}
                  />
                  <CommentsList commentsList={cityOfferComments} />

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
  /* return ( */
  {
    /* <div className="page">
      <header className="header">
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
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/room.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-02.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-03.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/studio-01.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>Premium</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  Beautiful &amp; luxurious studio at great location
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: '80%' }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;120</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">Wi-Fi</li>
                  <li className="offer__inside-item">Washing machine</li>
                  <li className="offer__inside-item">Towels</li>
                  <li className="offer__inside-item">Heating</li>
                  <li className="offer__inside-item">Coffee machine</li>
                  <li className="offer__inside-item">Baby seat</li>
                  <li className="offer__inside-item">Kitchen</li>
                  <li className="offer__inside-item">Dishwasher</li>
                  <li className="offer__inside-item">Cabel TV</li>
                  <li className="offer__inside-item">Fridge</li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by
                    the unique lightness of Amsterdam. The building is green and
                    from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">1</span>
                </h2>
                <ul className="reviews__list">
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
                </ul>
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/room.jpg"
                      width="260"
                      height="200"
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;80</b>
                      <span className="place-card__price-text">
                        &#47;&nbsp;night
                      </span>
                    </div>
                    <button
                      className="place-card__bookmark-button place-card__bookmark-button--active button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Wood and stone place</a>
                  </h2>
                  <p className="place-card__type">Room</p>
                </div>
              </article>

              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/apartment-02.jpg"
                      width="260"
                      height="200"
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;132</b>
                      <span className="place-card__price-text">
                        &#47;&nbsp;night
                      </span>
                    </div>
                    <button
                      className="place-card__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Canal View Prinsengracht</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>

              <article className="near-places__card place-card">
                <div className="place-card__mark">
                  <span>Premium</span>
                </div>
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/apartment-03.jpg"
                      width="260"
                      height="200"
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;180</b>
                      <span className="place-card__price-text">
                        &#47;&nbsp;night
                      </span>
                    </div>
                    <button
                      className="place-card__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Nice, cozy, warm big bed apartment</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div> */
  }
  /*  ); */
}
export default OffersNotLogged;
