import CardList from '../../Components/card-list/card-list';
import Header from '../../Components/header/header';
import LocationLink from '../../Components/location-link/location-link';
import { useState, useEffect } from 'react';
import Map from '../../Components/map/map';
import { OffersList } from '../../const/const';
import { Helmet } from 'react-helmet-async';
import { HotelsPoints } from '../../const/const';
import { useAppSelector, useAppDispatch } from '../../const/const';
import { changeOffers } from '../../store/actions';
import { offers } from '../../Mocks/offers';
import TypesOfSort from '../../Components/types-of-sort/types-of-sort';

type MainProps = {
  offersList: OffersList[];
};

function Main({ offersList }: MainProps): JSX.Element {
  const CITY_NAME = useAppSelector((state) => state.city);
  const CITY_OFFERS = useAppSelector((state) => state.offersList);
  const filteredOffers = offersList.filter((city) => city.city === CITY_NAME);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeOffers(offers));
  }, [CITY_NAME, CITY_OFFERS, dispatch, filteredOffers]);

  const [selectedPoint, setSelectedPoint] = useState<HotelsPoints | undefined>(
    undefined
  );

  function getEndOfWord() {
    if (CITY_OFFERS.offers.length > 1) {
      return ' places';
    } else {
      return ' place';
    }
  }

  const handleListItemHover = (cardItemId: number | null) => {
    const currentPoint = CITY_OFFERS.points.find(
      (point) => point.id === cardItemId
    );

    setSelectedPoint(currentPoint);
  };

  return (
    <div>
      <Helmet>
        <title>Главная Страница</title>
      </Helmet>
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list">
                <LocationLink />
                {/*  <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>Paris</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>Cologne</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>Brussels</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item tabs__item--active">
                    <span>Amsterdam</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>Hamburg</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>Dusseldorf</span>
                  </a>
                </li> */}
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {CITY_OFFERS.offers !== undefined
                    ? CITY_OFFERS.offers.length + getEndOfWord()
                    : null}{' '}
                  to stay in {CITY_OFFERS.city}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                </form>
                <TypesOfSort />
                <CardList
                  offersList={offersList}
                  onListItemHover={handleListItemHover}
                />
              </section>
              <div className="cities__right-section">
                <section
                  className="cities__map map"
                  style={{ background: 'none' }}
                >
                  <Map selectedPoint={selectedPoint} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
