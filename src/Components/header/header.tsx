import { Link } from 'react-router-dom';
import {
  AuthorizationStatus,
  useAppDispatch,
  useAppSelector,
} from '../../const/const';
import { State } from '../../const/const';
import { LogoutAction } from '../../../api-actions/api-actions';

function Header(): JSX.Element {
  const isAuth = useAppSelector((state: State) => state.AuthorizationStatus);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: State) => state.userData);

  function signOut() {
    dispatch(LogoutAction());
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
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {userData.login}
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
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
