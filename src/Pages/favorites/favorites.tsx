import Header from '../../Components/header/header';
import { State, useAppSelector } from '../../const/const';
import FavoritesPageEmpty from '../favorites-page-empty/favorites-page-empty';
import { locations } from '../../const/const';
import CardList from '../../Components/card-list/card-list';
import { useLocation } from 'react-router-dom';

function Favorites(): JSX.Element {
  const currentUrl = useLocation().pathname;
  const favoritesList = useAppSelector(
    (state: State) => state.offers.favoritesOffers
  );

  function checkForCity(locationCityName: string) {
    let shown = false;
    favoritesList.filter((favoriteOffer) => {
      if (favoriteOffer.city.name === locationCityName) {
        shown = true;
      }
    });
    return shown;
  }

  if (favoritesList === undefined || favoritesList.length === 0) {
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
                {locations.map((location) => (
                  <li key={location.id} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item" key={location.id}>
                        {checkForCity(location.city) ? (
                          <a
                            className="locations__item-link"
                            href="#"
                            key={`${location.id}-${location.city}`}
                          >
                            <span>{location.city}</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoritesList !== undefined
                        ? favoritesList.map((favoriteOffer) => {
                          if (favoriteOffer.city.name === location.city) {
                            return (
                              <CardList
                                key={favoriteOffer.id}
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
                ))}
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
