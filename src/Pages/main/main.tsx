import CardList from '../../Components/card-list/card-list';
import Header from '../../Components/header/header';
import Spinner from '../../Components/spinner/spinner';
import Map from '../../Components/map/map';
import TypesOfSort from '../../Components/types-of-sort/types-of-sort';
import './main.css';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { State, useAppSelector } from '../../const/const';
import { getSortedOffers } from '../../selectors/offers-list-selector';
import { sortListsItems } from '../../const/const';
import CitiesList from '../../Components/cities-list/cities-list';
import MainEmpty from '../main-empty/main-empty';
import { useLocation } from 'react-router-dom';
import { ImageSize } from '../../const/const';

function Main(): JSX.Element {
  const sortedOffers = useAppSelector(getSortedOffers);
  const sortType = useAppSelector((state) => state.offers.sortType);
  const [isSortOpened, setIsSortOpened] = useState(false);
  const loading = useAppSelector(
    (state: State) => state.dataLoadAndAuthSlice.isQuesLoaded
  );
  const isNeedHover = true;

  const currentUrl = useLocation().pathname;
  function takeClass() {
    if (isSortOpened) {
      setIsSortOpened(false);
    } else {
      setIsSortOpened(true);
    }
  }

  function getCityName() {
    let cityName: string = '';
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
  if (sortedOffers.length === 0 && loading !== false) {
    return <MainEmpty />;
  } else {
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
                  <CitiesList />
                </ul>
              </section>
            </div>
            <div className="cities">
              <div className="cities__places-container container">
                {loading === false ? (
                  <Spinner />
                ) : (
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">
                      {sortedOffers !== undefined
                        ? sortedOffers.length + getEndOfWord()
                        : null}{' '}
                      to stay in {getCityName()}
                    </b>
                    <form
                      onClick={takeClass}
                      className="places__sorting"
                      action="#"
                      method="get"
                    >
                      <span className="places__sorting-caption">Sort by</span>
                      <span className="places__sorting-type" tabIndex={0}>
                        {sortListsItems.map((item) => {
                          if (item.value === sortType) {
                            return item.text;
                          }
                        })}
                        <svg
                          className="places__sorting-arrow"
                          width="7"
                          height="4"
                        >
                          <use xlinkHref="#icon-arrow-select"></use>
                        </svg>
                      </span>
                      <TypesOfSort classForSort={isSortOpened} />
                    </form>
                    {sortedOffers !== undefined ? (
                      <CardList
                        url={currentUrl}
                        imageWidth={ImageSize.imageWidth}
                        imageHeight={ImageSize.imageHeight}
                        offersList={sortedOffers}
                        isNeedHover={isNeedHover}
                      />
                    ) : (
                      <div className="cities">
                        <div className="cities__places-container cities__places-container--empty container">
                          <section className="cities__no-places">
                            <div className="cities__status-wrapper tabs__content">
                              <b className="cities__status">
                                No places to stay available
                              </b>
                              <p className="cities__status-description">
                                We could not find any property available at the
                                moment in Dusseldorf
                              </p>
                            </div>
                          </section>
                          <div className="cities__right-section"></div>
                        </div>
                      </div>
                    )}
                  </section>
                )}
                <div className="cities__right-section">
                  <section
                    className="cities__map map"
                    style={{ background: 'none' }}
                  >
                    <Map hotelsPins={sortedOffers} />
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
