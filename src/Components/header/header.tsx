import { Link } from 'react-router-dom';
import {
  AuthorizationStatus,
  UserData,
  useAppDispatch,
  useAppSelector,
} from '../../const/const';
import { State } from '../../const/const';
import {
  LogoutAction,
  fetchFavoritesOffers,
} from '../../../api-actions/api-actions';

function Header(): JSX.Element {
  const isAuth = useAppSelector((state: State) => state.AuthorizationStatus);
  const dispatch = useAppDispatch();
  let userData: string | UserData = '';
  if (AuthorizationStatus.Auth === isAuth) {
    userData = JSON.parse(localStorage.getItem('userData'));
  }

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
              <Link to={'/login'}>SignIn</Link>
            ) : (
              <ul className="header__nav-list">
                <Link
                  to={
                    AuthorizationStatus.Auth === isAuth
                      ? '/favorites'
                      : '/login'
                  }
                  onClick={() => {
                    if (AuthorizationStatus.Auth === isAuth) {
                      dispatch(fetchFavoritesOffers()); // TODO хочет чтобы передал параметр , какой ?
                    }
                  }}
                  className="header__nav-item user"
                >
                  <div className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img
                        src={
                          typeof userData !== 'string' ? userData.avatarUrl : ''
                        }
                      ></img>
                    </div>

                    <span className="header__user-name user__name">
                      {typeof userData !== 'string' ? userData.emailUser : ''}
                    </span>
                    <span className="header__favorite-count">3</span>
                  </div>
                </Link>
                <li className="header__nav-item">
                  <button
                    onClick={signOut}
                    className="header__nav-link" /* to="/Login" title="/Login" */
                  >
                    <span className="header__signout">Sign out</span>
                  </button>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
