import CardList from '../../Components/card-list/card-list';
import Header from '../../Components/header/header';
import LocationLink from '../../Components/location-link/location-link';
import { useState, useEffect } from 'react';
import Map from '../../Components/map/map';
import { Offers, OffersList } from '../../const/const';
import { Helmet } from 'react-helmet-async';
import { HotelsPoints } from '../../const/const';
import { useAppSelector, useAppDispatch } from '../../const/const';
import { changeOffers } from '../../store/actions';
import { offers } from '../../Mocks/offers';
import TypesOfSort from '../../Components/types-of-sort/types-of-sort';
import { createSelector } from '@reduxjs/toolkit';
import { fetchOffersAction } from '../../../api-actions/api-actions';
import { store } from '../../store';
type MainProps = {
  offersList: OffersList[];
};

function Main({ offersList }: MainProps): JSX.Element {
  const CITY_NAME = useAppSelector((state) => state.city);
  const CITY_OFFERS = useAppSelector((state) => {
    state.offersList;
  });
  /*   */

  /* async function Test() {
    const CITY_OFFERS_API = useAppSelector((state) => {
      state.apiOffersList;
    });
    console.log(CITY_OFFERS_API);
  }
  Test(); */
  /* const currentCity = state.offersList.find(
    (city) => state.city === city.city
  );
  if (currentCity === undefined) {
    return [];
  }
  const copiedCity = [...currentCity.offers];
  console.log(currentCity);

  return copiedCity; */

  const filteredOffers = offersList.filter((city) => city.city === CITY_NAME);
  const dispatch = useAppDispatch();

  const [selectedPoint, setSelectedPoint] = useState<HotelsPoints | undefined>(
    undefined
  );

  const getOffersList = (state) => state.apiOffersList;
  const getSelectedCity = (state) => state.city;
  const getSortType = (state) => state.sortType;

  const getSortedOffers = createSelector(
    [getOffersList, getSelectedCity, getSortType],
    (offersList, selectedCity, sortType) => {
      const currentCity = offersList.filter(
        (city) => city.city.name === selectedCity
      );

      if (!currentCity) {
        return [];
      }

      const copiedOffers = [...currentCity];

      return copiedOffers;
    }
  );
  const sortedOffers = useAppSelector(getSortedOffers);

  function getCityName() {
    let cityName = '';
    if (sortedOffers[0] !== undefined) {
      cityName = sortedOffers[0].city.name;
    }
    return cityName;
  }

  function getEndOfWord() {
    if (sortedOffers.length > 1) {
      return ' places';
    } else {
      return ' place';
    }
  }

  const handleListItemHover = (cardItemId: number | null) => {
    let currentPoint = 0;
    sortedOffers.map((offer) => {
      offer.location;
    });

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
                  {sortedOffers !== undefined
                    ? sortedOffers.length + getEndOfWord()
                    : null}{' '}
                  to stay in {getCityName()}
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
                <CardList onListItemHover={handleListItemHover} />
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
