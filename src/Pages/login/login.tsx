import Header from '../../Components/header/header';
import { useRef } from 'react';
import { useAppDispatch } from '../../const/const';
import { LoginAction } from '../../../api-actions/api-actions';
import { getUserData } from '../../store/actions';
import { Link } from 'react-router-dom';
function Login(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  function sendUserData() {
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(
        LoginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  }
  function sendUserMail() {
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(
        getUserData({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  }

  return (
    <div className="page page--gray page--login">
      {/* <header className="header">
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
          </div>
        </div>
      </header> */}
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <Link
                onClick={() => {
                  sendUserData();
                  sendUserMail();
                }}
                to={'/'}
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </Link>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
