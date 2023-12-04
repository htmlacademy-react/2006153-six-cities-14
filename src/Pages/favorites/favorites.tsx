import Header from '../../Components/header/header';
import { State, useAppSelector } from '../../const/const';
import { store } from '../../store';
import { useEffect } from 'react';
import { fetchFavoritesOffers } from '../../../api-actions/api-actions';
import FavoritesPageEmpty from '../favorites-page-empty/favorites-page-empty';
import { locations } from '../../const/const';
import CardList from '../../Components/card-list/card-list';
function Favorites(): JSX.Element {
  const currentUrl = window.location.pathname;

  const favoritesList = useAppSelector((state: State) => state.favoritesOffers);
  const changedStatus = useAppSelector((state: State) => state.isFavorite);
  console.log(favoritesList);

  const updatedFavoritesList = favoritesList.filter((cityStatus) => {
    return cityStatus.isFavorite === true;
  });
  console.log(updatedFavoritesList);
  if (favoritesList.length === 0 && favoritesList === undefined) {
    return <FavoritesPageEmpty />;
  } else {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {locations.map((location) => {
                  return (
                    <li
                      key={location.id}
                      className="favorites__locations-items"
                    >
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{location.city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {favoritesList !== undefined
                          ? favoritesList.map((favoriteOffer) => {
                              if (favoriteOffer.city.name === location.city) {
                                return (
                                  <CardList
                                    imageHeight={'110'}
                                    imageWidth={'150'}
                                    offersList={[favoriteOffer]}
                                    isNeedHover={false}
                                    url={currentUrl}
                                  />
                                );
                              }
                            })
                          : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </a>
        </footer>
      </div>
    );
  }
}

export default Favorites;
