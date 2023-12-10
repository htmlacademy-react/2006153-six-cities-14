import { Link } from 'react-router-dom';
import {
  AuthorizationStatus,
  useAppDispatch,
  useAppSelector,
} from '../../const/const';
import { State } from '../../const/const';
import {
  LogoutAction,
  fetchFavoritesOffers,
} from '../../api-actions/api-actions';
import { useEffect } from 'react';
import { store } from '../../store';
import './header.css';

function Header(): JSX.Element {
  const isAuth = useAppSelector(
    (state: State) => state.dataLoadAndAuthSlice.AuthorizationStatus
  );
  const favoritesList = useAppSelector(
    (state: State) => state.offers.favoritesOffers
  );
  const offersList = useAppSelector(
    (state: State) => state.offers.apiOffersList
  );
  const userData = useAppSelector(
    (state: State) => state.dataLoadAndAuthSlice.userData
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    store.dispatch(fetchFavoritesOffers());
  }, [offersList]);

  function signOut() {
    dispatch(LogoutAction({}));
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to="/"
              title="/"
              className="header__logo-link header__logo-link--active"
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            {isAuth === AuthorizationStatus.NoAuth ? (
              <Link className="header__login" to={'/login'}>
                SignIn
              </Link>
            ) : null}

            <ul className="header__nav-list">
              {isAuth === AuthorizationStatus.Auth ? (
                <Link
                  to={
                    AuthorizationStatus.Auth === isAuth
                      ? '/favorites'
                      : '/login'
                  }
                  onClick={() => {
                    if (AuthorizationStatus.Auth === isAuth) {
                      dispatch(fetchFavoritesOffers());
                    }
                  }}
                  className="header__nav-item user"
                >
                  <div className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img src={userData?.avatarUrl}></img>
                    </div>

                    <span className="header__user-name user__name">
                      {userData?.email}
                    </span>
                    <span className="header__favorite-count">
                      {favoritesList.length}
                    </span>
                  </div>
                  <li className="header__nav-item">
                    <button onClick={signOut} className="header__nav-link">
                      <span className="header__signout">Sign out</span>
                    </button>
                  </li>
                </Link>
              ) : null}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
