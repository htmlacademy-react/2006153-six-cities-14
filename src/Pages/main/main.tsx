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

function Main(): JSX.Element {
  const imageHeight = '200';
  const imageWidth = '260';
  const sortedOffers = useAppSelector(getSortedOffers);
  const sortType = useAppSelector((state) => state.sortType);
  const [isSortOpened, setIsSortOpened] = useState(false);
  const loading = useAppSelector((state: State) => state.isQuesLoaded);
  const isNeedHover = true;
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
                  <CardList
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                    offersList={sortedOffers}
                    isNeedHover={isNeedHover}
                  />
                </section>
              )}
              <div className="cities__right-section">
                <section
                  className="cities__map map"
                  style={{ background: 'none' }}
                >
                  <Map hotelsPins={sortedOffers} isNeedHover={isNeedHover} />
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
